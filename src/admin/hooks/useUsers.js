import React from 'react';
import { fetchUsers, deleteUser as apiDeleteUser } from '../api/users';

export function useUsers(initial = []) {
    const [users, setUsers] = React.useState(initial);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [actionLoading, setActionLoading] = React.useState(false);

    const load = React.useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const removeByEmail = React.useCallback(async (email) => {
        setActionLoading(true);
        setError(null);
        try {
            await apiDeleteUser(email);
            setUsers(prev => prev.filter(u => u.email !== email));
        } catch (e) {
            setError(e);
            throw e;
        } finally {
            setActionLoading(false);
        }
    }, []);

    React.useEffect(() => { load(); }, [load]);

    return { users, setUsers, loading, actionLoading, error, reload: load, deleteByEmail: removeByEmail };
}

export default useUsers;
