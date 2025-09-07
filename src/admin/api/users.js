import { request } from './client';

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

export default {
    fetchUsers,
    deleteUser,
};
