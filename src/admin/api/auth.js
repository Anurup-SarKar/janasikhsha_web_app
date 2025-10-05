// Auth API functions for admin login
import { request } from './client';
import { sha256Hex } from '../utils/crypto';

// Test basic API connectivity (no auth required)
export async function testApiConnectivity() {
    console.log('[testApiConnectivity] Testing basic API connectivity...');
    try {
        // Try a simple request to a public endpoint or health check  
        const response = await fetch('/api');
        console.log('[testApiConnectivity] Basic connectivity test:', response.status, response.statusText);
        return {
            success: true,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        };
    } catch (error) {
        console.error('[testApiConnectivity] Basic connectivity failed:', error);
        throw error;
    }
}

// Decode JWT token to inspect its contents
export function decodeJWT(token) {
    if (!token) return null;

    try {
        // JWT has 3 parts separated by dots: header.payload.signature
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Invalid JWT format');
        }

        // Decode the payload (base64url)
        const payload = parts[1];
        // Add padding if needed for base64 decoding
        const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
        const decodedPayload = atob(paddedPayload.replace(/-/g, '+').replace(/_/g, '/'));

        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('[decodeJWT] Failed to decode token:', error);
        return null;
    }
}

// Test token contents and permissions
export async function inspectCurrentToken() {
    // Import dynamically to avoid circular dependency
    const { getAuthToken } = await import('./client');
    const token = getAuthToken();

    if (!token) {
        return { error: 'No token found' };
    }

    const decoded = decodeJWT(token);
    const now = Math.floor(Date.now() / 1000);

    return {
        token: {
            exists: true,
            length: token.length,
            preview: `${token.substring(0, 20)}...${token.substring(token.length - 10)}`
        },
        decoded,
        isExpired: decoded && decoded.exp ? decoded.exp < now : 'unknown',
        timeUntilExpiry: decoded && decoded.exp ? decoded.exp - now : null,
        // Check both isAdmin field and roles for admin permissions
        hasAdminRole: (decoded && decoded.isAdmin === "true") || (decoded && decoded.roles && decoded.roles.includes('ADMIN')),
        currentRole: decoded && decoded.roles ? decoded.roles : 'unknown',
        isAdminField: decoded && decoded.isAdmin ? decoded.isAdmin : 'not present',
        userEmail: decoded && decoded.email ? decoded.email : 'unknown'
    };
}

// Test function to verify auth token is working
export async function testAuth() {
    console.log('[testAuth] Testing API authentication...');
    try {
        const response = await request('/api/users', { method: 'GET' });
        console.log('[testAuth] Success - API is working:', response);
        return response;
    } catch (error) {
        console.error('[testAuth] Failed - API error:', error);
        throw error;
    }
}

export async function adminLogin(email, password) {
    // Hash the password before sending
    const hashedPassword = await sha256Hex(password);

    const response = await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password: hashedPassword
        }),
    });

    return response;
}

export async function validateOtp(email, password, otp) {
    // Hash the password before sending
    const hashedPassword = await sha256Hex(password);

    const response = await request('/api/auth/validate-otp', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password: hashedPassword,
            otp
        }),
    });

    return response;
}

// Test login flow with debug credentials
export async function testLoginFlow() {
    console.log('[testLoginFlow] Testing login flow...');
    try {
        // This is just for debugging - using placeholder credentials
        const loginResponse = await adminLogin('test@example.com', 'testpassword');
        console.log('[testLoginFlow] Login response:', loginResponse);

        if (loginResponse?.data?.otp) {
            return {
                step: 'otp_required',
                otp: loginResponse.data.otp, // For debugging only
                message: 'Login successful, OTP required'
            };
        } else {
            return {
                step: 'login_failed',
                response: loginResponse,
                message: 'Login failed or unexpected response format'
            };
        }
    } catch (error) {
        console.error('[testLoginFlow] Login test failed:', error);
        return {
            step: 'error',
            error: error.message,
            message: 'Login test error'
        };
    }
}

// Test if current user has admin permissions
export async function testAdminPermissions() {
    console.log('[testAdminPermissions] Testing admin permissions...');
    try {
        // First inspect the token
        const tokenInfo = inspectCurrentToken();
        console.log('[testAdminPermissions] Token info:', tokenInfo);

        // Try to access users API
        const response = await request('/api/users', { method: 'GET' });
        console.log('[testAdminPermissions] Users API response:', response);

        return {
            tokenInfo,
            apiResponse: response,
            hasAccess: true,
            message: 'Admin API access successful'
        };
    } catch (error) {
        console.error('[testAdminPermissions] Admin permission test failed:', error);

        const tokenInfo = inspectCurrentToken();

        return {
            tokenInfo,
            error: error.message,
            hasAccess: false,
            message: 'Admin API access denied or failed',
            suggestion: !tokenInfo.hasAdminRole
                ? `User is not admin (isAdmin: ${tokenInfo.isAdminField}, roles: ${tokenInfo.currentRole}) - need admin credentials`
                : 'API call failed despite admin permissions - check backend logs'
        };
    }
}

export default {
    adminLogin,
    validateOtp,
    testAuth,
    testApiConnectivity,
};
