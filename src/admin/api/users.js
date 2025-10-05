import { request } from './client';
import { sha256Hex, DEFAULT_PASSWORD } from '../utils/crypto';

export async function fetchUsers() {
    console.log('[fetchUsers] Starting request to /api/users');

    // Check if we have a token before making the request
    const { getAuthToken } = await import('./client');
    const token = getAuthToken();
    console.log('[fetchUsers] Token status:', token ? `Present (${token.length} chars)` : 'Missing');

    try {
        const json = await request('/api/users', { method: 'GET' });
        console.log('[fetchUsers] Raw response:', json);

        // Check response structure
        if (json?.statusCode !== undefined) {
            console.log('[fetchUsers] API Status Code:', json.statusCode);
            console.log('[fetchUsers] API Status Message:', json.statusMessage);
        }

        const users = Array.isArray(json?.data) ? json.data : [];
        console.log('[fetchUsers] Extracted users array:', users);
        console.log('[fetchUsers] Users count:', users.length);

        // If no users, log the full response structure
        if (users.length === 0) {
            console.log('[fetchUsers] No users found. Full response structure:', JSON.stringify(json, null, 2));
        }

        return users;
    } catch (error) {
        console.error('[fetchUsers] Request failed:', error);
        console.error('[fetchUsers] Error details:', {
            message: error.message,
            status: error.status,
            response: error.response
        });

        // Check if it's a permission error
        if (error.message.includes('401') || error.message.includes('Unauthorized')) {
            console.error('[fetchUsers] Permission denied - user may not have admin access');
        }

        throw error;
    }
}

export async function deleteUser(email) {
    if (!email) throw new Error('email is required');
    return request('/api/users/delete', {
        method: 'POST',
        body: JSON.stringify({ email }),
    });
}

export async function createUser(payload) {
    const passwordHash = await sha256Hex(DEFAULT_PASSWORD);
    const body = { ...payload, passwordHash };
    const json = await request('/api/users', {
        method: 'POST',
        body: JSON.stringify(body),
    });
    return json?.data;
}

export async function updateUser(payload) {
    const json = await request('/api/users/update', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return json?.data;
}

// Diagnostic function to test API access
export async function testUserApiAccess() {
    console.log('[testUserApiAccess] Testing user API access...');

    const { getAuthToken, verifyAuthSetup } = await import('./client');
    const authInfo = verifyAuthSetup();
    console.log('[testUserApiAccess] Auth setup:', authInfo);

    // Check current user info from token
    const currentUserInfo = await getCurrentUserInfo();
    console.log('[testUserApiAccess] Current user info:', currentUserInfo);

    if (!authInfo.hasToken) {
        return {
            success: false,
            error: 'No authentication token found',
            solution: 'Please login first'
        };
    }

    try {
        // Try the exact same request as fetchUsers
        const response = await request('/api/users', { method: 'GET' });
        console.log('[testUserApiAccess] Success! Response:', response);

        return {
            success: true,
            data: response,
            usersCount: Array.isArray(response?.data) ? response.data.length : 0,
            message: 'API access successful',
            currentUser: currentUserInfo.success ? currentUserInfo.currentUser : null
        };
    } catch (error) {
        console.error('[testUserApiAccess] Failed:', error);

        let diagnosis = 'Unknown error';
        let solution = 'Check console for details';

        if (error.message.includes('401')) {
            diagnosis = 'Unauthorized - insufficient permissions';
            solution = 'Current user needs admin role to access user management';
        } else if (error.message.includes('404')) {
            diagnosis = 'API endpoint not found';
            solution = 'Check if /api/users endpoint exists on server';
        } else if (error.message.includes('CORS')) {
            diagnosis = 'CORS error';
            solution = 'Server needs to allow browser requests from this domain';
        } else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
            diagnosis = 'Network connectivity issue';
            solution = 'Check if server is running and accessible';
        }

        return {
            success: false,
            error: error.message,
            diagnosis,
            solution,
            authInfo,
            currentUser: currentUserInfo.success ? currentUserInfo.currentUser : currentUserInfo.error
        };
    }
}

// Check current user info from stored token
export async function getCurrentUserInfo() {
    const { getAuthToken } = await import('./client');
    const token = getAuthToken();

    if (!token) {
        return { error: 'No token found' };
    }

    try {
        // Decode JWT token to see current user info
        const parts = token.split('.');
        if (parts.length !== 3) {
            return { error: 'Invalid token format' };
        }

        // Decode the payload
        const payload = parts[1];
        const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
        const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));
        const tokenData = JSON.parse(decodedPayload);

        return {
            success: true,
            tokenData,
            currentUser: {
                email: tokenData.email,
                username: tokenData.sub,
                isAdmin: tokenData.isAdmin === 'true' || tokenData.isAdmin === true,
                roles: tokenData.roles,
                expires: new Date(tokenData.exp * 1000).toLocaleString()
            }
        };
    } catch (error) {
        return { error: `Failed to decode token: ${error.message}` };
    }
}

export default {
    fetchUsers,
    deleteUser,
    createUser,
    updateUser,
    testUserApiAccess,
    getCurrentUserInfo,
};
