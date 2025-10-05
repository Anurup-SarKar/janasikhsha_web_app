import React from 'react';
import { fetchUsers, deleteUser as apiDeleteUser, createUser as apiCreateUser, updateUser as apiUpdateUser } from '../api/users';

export function useUsers(initial = []) {
    const [users, setUsers] = React.useState(initial);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [actionLoading, setActionLoading] = React.useState(false);
    // Keep per-field validation errors to show inline helper texts in inputs
    const [fieldErrors, setFieldErrors] = React.useState({});

    // simple validators
    const validators = React.useMemo(() => ({
        required: (v) => Boolean(String(v || '').trim()),
        email: (v) => /^(?:[a-zA-Z0-9_'^&\-]+(?:\.[a-zA-Z0-9_'^&\-]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(String(v || '').trim()),
        mobile: (v) => /^\d{10}$/.test(String(v || '').trim()),
    }), []);

    // Sanitize mobile to digits only and cap to 10
    const normalizeMobileInput = React.useCallback((value) => {
        return String(value || '').replace(/\D/g, '').slice(0, 10);
    }, []);

    // Centralized field validation so UI can also call it onBlur/onChange if needed
    const validate = React.useCallback((payload) => {
        const errs = {};
        if (!validators.required(payload?.fullName)) errs.fullName = 'Full name is required';
        if (!validators.required(payload?.username)) errs.username = 'Username is required';
        if (!validators.email(payload?.email)) errs.email = 'Valid email is required';
        if (!validators.mobile(payload?.mobile)) errs.mobile = 'Mobile must be 10 digits';
        return errs;
    }, [validators]);

    // Validate a single field and update fieldErrors live
    const validateField = React.useCallback((name, value) => {
        let msg;
        switch (name) {
            case 'fullName':
                if (!validators.required(value)) msg = 'Full name is required';
                break;
            case 'username':
                if (!validators.required(value)) msg = 'Username is required';
                break;
            case 'email':
                if (!validators.email(value)) msg = 'Valid email is required';
                break;
            case 'mobile':
                if (!validators.mobile(value)) msg = 'Mobile must be 10 digits';
                break;
            default:
                msg = undefined;
        }
        setFieldErrors(prev => {
            const next = { ...prev };
            if (msg) next[name] = msg; else delete next[name];
            return next;
        });
        return msg;
    }, [validators]);

    // Helper for onChange handlers: returns sanitized value and updates errors
    const validateOnChange = React.useCallback((name, value) => {
        const val = name === 'mobile' ? normalizeMobileInput(value) : value;
        validateField(name, val);
        return val;
    }, [validateField, normalizeMobileInput]);

    // Prevent typing non-numeric keys in number-like inputs
    const enforceNumericKeyDown = React.useCallback((e) => {
        const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
        if (e.ctrlKey || e.metaKey) return; // allow copy/paste/select all
        if (allowed.includes(e.key)) return;
        if (!/\d/.test(e.key)) {
            e.preventDefault();
        }
    }, []);

    // Block non-digits before they appear (covers IME and some browsers)
    const enforceNumericBeforeInput = React.useCallback((e) => {
        const data = e.data ?? '';
        if (data && /\D/.test(data)) e.preventDefault();
    }, []);

    // Block non-digit paste
    const enforceNumericPaste = React.useCallback((e) => {
        const text = e.clipboardData?.getData('text') ?? '';
        if (/\D/.test(text)) e.preventDefault();
    }, []);

    // Block non-digit drop text
    const enforceNumericDrop = React.useCallback((e) => {
        const text = e.dataTransfer?.getData('text') ?? '';
        if (/\D/.test(text)) e.preventDefault();
    }, []);

    const load = React.useCallback(async () => {
        console.log('[useUsers] Starting to load users...');
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUsers();
            console.log('[useUsers] Loaded users:', data);
            setUsers(data);
        } catch (e) {
            console.error('[useUsers] Error loading users:', e);
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

    const addUser = React.useCallback(async (payload) => {
        setActionLoading(true);
        setError(null);
        setFieldErrors({});
        try {
            // sanitize mobile before validation and submit
            const sanitizedPayload = { ...payload, mobile: normalizeMobileInput(payload?.mobile) };

            // client-side validation
            const errs = validate(sanitizedPayload);
            if (Object.keys(errs).length) {
                setFieldErrors(errs);
                const err = new Error('Validation failed');
                err.fields = errs;
                throw err;
            }

            const created = await apiCreateUser(sanitizedPayload);
            if (created) {
                setUsers(prev => [...prev, created]);
            }
            return created;
        } catch (e) {
            setError(e);
            // Map server-side field errors (or the ones we threw) back to UI
            if (e && e.fields) {
                setFieldErrors(e.fields);
            } else if (e?.response?.data?.errors && typeof e.response.data.errors === 'object') {
                setFieldErrors(e.response.data.errors);
            }
            throw e;
        } finally {
            setActionLoading(false);
        }
    }, [validate, normalizeMobileInput]);

    const updateUser = React.useCallback(async (payload) => {
        setActionLoading(true);
        setError(null);
        try {
            // sanitize mobile and validate
            const sanitized = { ...payload, mobile: String(payload?.mobile || '').replace(/\D/g, '').slice(0, 10) };
            const errs = validate(sanitized);
            if (Object.keys(errs).length) {
                setFieldErrors(errs);
                const err = new Error('Validation failed');
                err.fields = errs;
                throw err;
            }
            const updated = await apiUpdateUser(sanitized);
            if (updated) {
                setUsers(prev => prev.map(u => (u.id === updated.id || u.email === updated.email) ? { ...u, ...updated } : u));
            }
            return updated;
        } catch (e) {
            setError(e);
            if (e && e.fields) setFieldErrors(e.fields);
            else if (e?.response?.data?.errors && typeof e.response.data.errors === 'object') setFieldErrors(e.response.data.errors);
            throw e;
        } finally {
            setActionLoading(false);
        }
    }, [validate]);

    React.useEffect(() => { load(); }, [load]);

    const getTextFieldProps = React.useCallback((name) => ({
        error: Boolean(fieldErrors?.[name]),
        helperText: fieldErrors?.[name] || '',
    }), [fieldErrors]);

    // Convenience: props to guard mobile inputs in UI TextField
    const getMobileInputGuardProps = React.useCallback(() => ({
        type: 'text', // keep full control over input
        onKeyDown: enforceNumericKeyDown,
        onBeforeInput: enforceNumericBeforeInput,
        onPaste: enforceNumericPaste,
        onDrop: enforceNumericDrop,
        inputProps: {
            inputMode: 'numeric',
            pattern: '\\d*',
            maxLength: 10,
            // Native onInput: strip any non-digits immediately for visual feedback
            onInput: (e) => {
                const target = e.target;
                const digits = String(target.value || '').replace(/\D/g, '').slice(0, 10);
                if (target.value !== digits) target.value = digits;
            },
        },
    }), [enforceNumericKeyDown, enforceNumericBeforeInput, enforceNumericPaste, enforceNumericDrop]);

    return {
        users,
        setUsers,
        loading,
        actionLoading,
        error,
        reload: load,
        deleteByEmail: removeByEmail,
        createUser: addUser,
        updateUser,
        validators,
        validate,
        validateField,
        validateOnChange,
        fieldErrors,
        clearFieldErrors: () => setFieldErrors({}),
        normalizeMobileInput,
        enforceNumericKeyDown,
        enforceNumericBeforeInput,
        enforceNumericPaste,
        enforceNumericDrop,
        getTextFieldProps,
        getMobileInputGuardProps,
        // expose to allow UI to clear last API error messages
        clearError: () => setError(null),
    };
}

export default useUsers;
