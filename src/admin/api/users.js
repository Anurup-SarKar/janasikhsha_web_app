import { request } from './client';
import { sha256Hex, DEFAULT_PASSWORD } from '../utils/crypto';

export async function fetchUsers() {
    const json = await request('/api/users', { method: 'GET' });
    return Array.isArray(json?.data) ? json.data : [];
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

export default {
    fetchUsers,
    deleteUser,
    createUser,
    updateUser,
};
