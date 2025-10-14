// API client for admin features with authentication support
// Use proxy in development, direct URL in production
export const API_BASE = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? '' // dev will go through Vite proxy to /api -> https://jpkindia.org
    : 'https://jpkindia.org';

// Auth token storage
let authToken = null;

export function setAuthToken(token) {
    authToken = token;
    if (token) {
        localStorage.setItem('admin_auth_token', token);
        console.log('[API Client] Token set and stored in localStorage');
    } else {
        localStorage.removeItem('admin_auth_token');
        console.log('[API Client] Token cleared from localStorage');
    }
}

export function getAuthToken() {
    if (!authToken) {
        authToken = localStorage.getItem('admin_auth_token');
        if (authToken) {
            console.log('[API Client] Token restored from localStorage');
        }
    }
    return authToken;
}

export function clearAuthToken() {
    authToken = null;
    localStorage.removeItem('admin_auth_token');
    console.log('[API Client] Auth token cleared');
}

// Logout function that clears token and can trigger UI updates
export function logout(reason = 'Manual logout') {
    console.log('[API Client] Logging out:', reason);
    clearAuthToken();

    // If we're on an admin page, redirect to admin login
    if (window.location.pathname.includes('/admin')) {
        console.log('[API Client] Redirecting to admin login');
        window.location.reload(); // This will show the login dialog again
    } else {
        // Redirect to home page
        window.location.href = '/';
    }
}

// Verify current token and authorization header format
export function verifyAuthSetup() {
    const token = getAuthToken();
    if (!token) {
        return { hasToken: false, message: 'No token stored' };
    }

    const authHeader = `Bearer ${token}`;
    return {
        hasToken: true,
        tokenLength: token.length,
        authHeader: authHeader,
        tokenPreview: `${token.substring(0, 20)}...${token.substring(token.length - 10)}`,
        message: 'Token is properly stored and will be sent as Authorization header'
    };
}

// Debug function to test network connectivity
export async function testConnection() {
    try {
        console.log('[API Client] Testing connection to https://jpkindia.org');
        const response = await fetch('https://jpkindia.org');
        console.log('[API Client] Connection test result:', response.status, response.statusText);
        return { success: true, status: response.status };
    } catch (error) {
        console.error('[API Client] Connection test failed:', error);
        return { success: false, error: error.message };
    }
}

export async function request(pathOrUrl, options = {}) {
    const isAbsolute = /^https?:\/\//i.test(pathOrUrl);
    const url = isAbsolute ? pathOrUrl : `${API_BASE}${pathOrUrl}`;
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
    };
    // Add auth token if available
    const token = getAuthToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
        console.log(`[API Client] ${options.method || 'GET'} ${url} - authenticated request`);
    } else {
        console.warn(`[API Client] ${options.method || 'GET'} ${url} - no auth token available`);
    }

    try {
        const res = await fetch(url, {
            headers,
            ...options,
        });

        if (!res.ok) {
            const text = await res.text().catch(() => '');
            console.error(`[API Client] ${res.status} ${res.statusText} - ${text}`);

            // Handle 401 Unauthorized - clear token and redirect to login
            if (res.status === 401) {
                logout('401 Unauthorized - session expired or invalid');
            }

            throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
        }

        const jsonResponse = await res.json();
        console.log(`[API Client] ${options.method || 'GET'} ${url} - success`);
        return jsonResponse;
    } catch (error) {
        console.error(`[API Client] Request failed:`, error);
        throw error;
    }
}
