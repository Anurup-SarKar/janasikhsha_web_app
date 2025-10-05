import React from 'react';
import { Paper, Stack, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, CircularProgress, Backdrop, Grid, Box, Slide, InputAdornment, Alert, Snackbar } from '@mui/material';
import ConfirmDialog from '../components/ConfirmDialog';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { testAuth } from '../api/auth';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function AdminUsers({ users, setUsers, loading = false, actionLoading = false, reloadUsers, deleteByEmail, createUser, /* injected from hook */ validateOnChange, getTextFieldProps, getMobileInputGuardProps, fieldErrors, clearFieldErrors, /* add api error */ apiError, clearApiError, /* new */ updateUser }) {
    const [editOpen, setEditOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [current, setCurrent] = React.useState(null);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    const [pendingDelete, setPendingDelete] = React.useState(null);
    const [errors, setErrors] = React.useState({});
    // Success snackbar state
    const [successOpen, setSuccessOpen] = React.useState(false);
    const [successMsg, setSuccessMsg] = React.useState('');

    const openEdit = (u) => { setCurrent({ ...u }); setErrors({}); clearFieldErrors?.(); clearApiError?.(); setEditOpen(true); };
    const openAdd = () => {
        setCurrent({
            username: '', email: '', mobile: '', fullName: '', cctvLink: '',
            isCctvVisible: false, isCctvStorageVisible: false, isAdmin: false, isActive: true,
        });
        setErrors({});
        clearFieldErrors?.();
        setAddOpen(true);
    };
    const closeDialogs = () => { setEditOpen(false); setAddOpen(false); setConfirmOpen(false); setPendingDelete(null); setErrors({}); clearFieldErrors?.(); };

    const validateCommon = (obj) => {
        const e = {};
        if (!String(obj.fullName || '').trim()) e.fullName = 'Full name is required';
        if (!String(obj.username || '').trim()) e.username = 'Username is required';
        if (!/^(?:[a-zA-Z0-9_'^&\-]+(?:\.[a-zA-Z0-9_'^&\-]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(String(obj.email || '').trim())) e.email = 'Enter a valid email';
        if (!/^\d{10}$/.test(String(obj.mobile || '').trim())) e.mobile = 'Mobile must be 10 digits';
        return e;
    };

    const validateAdd = (obj) => {
        const e = validateCommon(obj);
        return e;
    };

    const saveEdit = async () => {
        if (!current) return;
        const e = validateCommon(current);
        setErrors(e);
        if (Object.keys(e).length) return;
        try {
            const updated = await updateUser?.({
                username: current.username,
                email: current.email,
                mobile: current.mobile,
                fullName: current.fullName,
                cctvLink: current.cctvLink || null,
                isCctvVisible: current.isCctvVisible,
                isCctvStorageVisible: current.isCctvStorageVisible,
                isAdmin: current.isAdmin,
                isActive: current.isActive,
            });
            if (updated) {
                setEditOpen(false);
                setSuccessMsg(`User "${current.fullName || current.username}" updated successfully`);
                setSuccessOpen(true);
                clearApiError?.();
            }
        } catch (e) {
            // error handled by hook; banner will show
        }
    };
    const saveAdd = async () => {
        if (!current) return;
        const e = validateAdd(current);
        setErrors(e);
        if (Object.keys(e).length) return;
        try {
            const created = await createUser?.({
                username: current.username,
                email: current.email,
                mobile: current.mobile,
                fullName: current.fullName,
                cctvLink: current.cctvLink || null,
                isCctvVisible: current.isCctvVisible,
                isCctvStorageVisible: current.isCctvStorageVisible,
                isAdmin: current.isAdmin,
                isActive: current.isActive,
            });
            if (created) {
                setAddOpen(false);
                setSuccessMsg(`User "${current.fullName || current.username}" added successfully`);
                setSuccessOpen(true);
                clearApiError?.();
            }
        } catch (e) {
            // error is handled by hook
        }
    };

    const askDelete = (u) => { setPendingDelete(u); setConfirmOpen(true); };
    const doDelete = async () => {
        if (!pendingDelete) return;
        try {
            await deleteByEmail?.(pendingDelete.email);
            setConfirmOpen(false);
            setSuccessMsg(`User "${pendingDelete.fullName || pendingDelete.username}" deleted successfully`);
            setSuccessOpen(true);
            setPendingDelete(null);
        } catch (e) {
            // error is handled by hook; could add toast/snackbar later
        }
    };

    const addDisabled = actionLoading
        || !current?.username
        || !current?.email
        || !current?.fullName
        || !current?.mobile
        // disable when hook has any field errors with truthy messages
        || Boolean(fieldErrors && Object.values(fieldErrors).some(Boolean));

    const editDisabled = actionLoading
        || !current?.username
        || !current?.email
        || !current?.fullName
        || !current?.mobile
        || Boolean(fieldErrors && Object.values(fieldErrors).some(Boolean));

    const errorText = (field) => errors[field] || ' ';

    // Robust API error extractor: prefers response.data.statusMessage, else tries to parse JSON from string messages like
    // "HTTP 400 Bad Request - {\"statusCode\":400,\"statusMessage\":\"Email already exists\",...}"
    const getApiErrorMessage = (err) => {
        if (!err) return null;
        const data = err?.response?.data;
        if (data && (data.statusMessage || data.message)) return data.statusMessage || data.message;
        const tryExtract = (s) => {
            if (!s || typeof s !== 'string') return null;
            const idx = s.indexOf('{');
            if (idx >= 0) {
                try {
                    const json = JSON.parse(s.slice(idx));
                    if (json && (json.statusMessage || json.message)) return json.statusMessage || json.message;
                } catch { }
            }
            const m = s.match(/\"statusMessage\"\s*:\s*\"([^\"]+)\"/i);
            return m ? m[1] : null;
        };
        return tryExtract(typeof err === 'string' ? err : err.message) || err?.message || 'Something went wrong';
    };

    return (
        <>
            <Backdrop open={Boolean(loading || actionLoading)} sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>User List</Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        onClick={async () => {
                            try {
                                const { testUserApiAccess } = await import('../api/users');
                                const result = await testUserApiAccess();
                                console.log('[Debug] API Test Result:', result);

                                if (result.success) {
                                    const userInfo = result.currentUser ?
                                        `\nCurrent User: ${result.currentUser.email} (Admin: ${result.currentUser.isAdmin})` :
                                        '';
                                    alert(`✓ API Test Success!\nUsers found: ${result.usersCount}${userInfo}\nCheck console for details.`);
                                } else {
                                    const userInfo = result.currentUser && typeof result.currentUser === 'object' ?
                                        `\nCurrent User: ${result.currentUser.email} (Admin: ${result.currentUser.isAdmin})` :
                                        result.currentUser ? `\nToken Issue: ${result.currentUser}` : '';
                                    alert(`✗ API Test Failed!\nIssue: ${result.diagnosis}\nSolution: ${result.solution}${userInfo}\nCheck console for details.`);
                                }
                            } catch (error) {
                                console.error('[Debug] Test failed:', error);
                                alert('Test Failed! Check console for details.');
                            }
                        }}
                        disabled={actionLoading || loading}
                        sx={{ minWidth: 'auto', px: 1.5, fontSize: '0.75rem' }}
                    >
                        Diagnose API
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={reloadUsers}
                        disabled={actionLoading || loading}
                        sx={{ minWidth: 'auto', px: 2 }}
                    >
                        Reload
                    </Button>
                    <Button variant="contained" onClick={openAdd} disabled={actionLoading}>Add User</Button>
                </Stack>
            </Stack>
            <Paper variant="outlined" sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Mobile</TableCell>
                            <TableCell>Admin</TableCell>
                            <TableCell>Active</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u.id} hover>
                                <TableCell>{u.fullName}</TableCell>
                                <TableCell>{u.username}</TableCell>
                                <TableCell>{u.email}</TableCell>
                                <TableCell>{u.mobile}</TableCell>
                                <TableCell>{u.isAdmin ? <Chip label="Yes" color="secondary" size="small" /> : <Chip label="No" size="small" />}</TableCell>
                                <TableCell>{u.isActive ? <Chip label="Active" color="success" size="small" /> : <Chip label="Inactive" color="default" size="small" />}</TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Button size="small" variant="outlined" onClick={() => openEdit(u)} disabled={actionLoading}>Edit</Button>
                                        <Button size="small" color="error" variant="outlined" onClick={() => askDelete(u)} disabled={actionLoading}>Delete</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete user?"
                message={pendingDelete ? `Are you sure you want to delete "${pendingDelete.fullName}" (${pendingDelete.email})?` : ''}
                confirmText="OK, Delete"
                cancelText="Cancel"
                onCancel={closeDialogs}
                onConfirm={doDelete}
                loading={actionLoading}
            />

            {/* Edit Dialog (redesigned) */}
            <Dialog open={editOpen} onClose={() => { clearApiError?.(); closeDialogs(); }} maxWidth="sm" fullWidth TransitionComponent={Transition} PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden', boxShadow: (t) => `0 16px 50px ${t.palette.mode === 'dark' ? 'rgba(0,0,0,.7)' : 'rgba(0,0,0,.25)'}` } }}>
                <Box sx={{ background: (t) => `linear-gradient(135deg, ${t.palette.primary.light} 0%, ${t.palette.primary.main} 100%)`, color: (t) => t.palette.getContrastText(t.palette.primary.main), px: 3, py: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <EditRoundedIcon />
                        <DialogTitle sx={{ p: 0, fontWeight: 800 }}>Edit User</DialogTitle>
                    </Stack>
                </Box>
                <DialogContent sx={{ pt: 2 }}>
                    {/* API error banner */}
                    {apiError && (
                        <Alert severity="error" onClose={clearApiError} sx={{ mb: 2 }}>
                            {getApiErrorMessage(apiError)}
                        </Alert>
                    )}

                    {current && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Full Name"
                                    value={current.fullName}
                                    onChange={(e) => { setCurrent({ ...current, fullName: validateOnChange ? validateOnChange('fullName', e.target.value) : e.target.value }); setErrors({ ...errors, fullName: undefined }); }}
                                    fullWidth
                                    required
                                    {...(getTextFieldProps ? getTextFieldProps('fullName') : { helperText: errors.fullName || ' ', error: Boolean(errors.fullName) })}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><BadgeOutlinedIcon fontSize="small" /></InputAdornment> }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Username"
                                    value={current.username}
                                    onChange={(e) => { setCurrent({ ...current, username: validateOnChange ? validateOnChange('username', e.target.value) : e.target.value }); setErrors({ ...errors, username: undefined }); }}
                                    fullWidth
                                    required
                                    {...(getTextFieldProps ? getTextFieldProps('username') : { helperText: errors.username || ' ', error: Boolean(errors.username) })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={current.email}
                                    onChange={(e) => { setCurrent({ ...current, email: validateOnChange ? validateOnChange('email', e.target.value) : e.target.value }); setErrors({ ...errors, email: undefined }); }}
                                    fullWidth
                                    required
                                    {...(getTextFieldProps ? getTextFieldProps('email') : { helperText: errors.email || ' ', error: Boolean(errors.email) })}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><AlternateEmailRoundedIcon fontSize="small" /></InputAdornment> }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mobile"
                                    value={current.mobile}
                                    onChange={(e) => { const v = validateOnChange ? validateOnChange('mobile', e.target.value) : e.target.value; setCurrent({ ...current, mobile: v }); setErrors({ ...errors, mobile: undefined }); }}
                                    fullWidth
                                    required
                                    {...(getTextFieldProps ? getTextFieldProps('mobile') : { helperText: errors.mobile || ' ', error: Boolean(errors.mobile) })}
                                    {...(getMobileInputGuardProps ? getMobileInputGuardProps() : {})}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIphoneRoundedIcon fontSize="small" /></InputAdornment> }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="CCTV Link" value={current.cctvLink ?? ''} onChange={(e) => setCurrent({ ...current, cctvLink: e.target.value })} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ mt: 0.5, '& .MuiFormGroup-root': { gap: 1.5 }, '& .MuiFormControlLabel-root': { mr: 1 }, '& .MuiRadio-root': { p: 0.5 }, '& .MuiTypography-root': { fontSize: 13, fontWeight: 600 } }}>
                                    <FormLabel sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>Is Admin</FormLabel>
                                    <RadioGroup row value={current.isAdmin ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isAdmin: e.target.value === 'yes' })}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ mt: 0.5, '& .MuiFormGroup-root': { gap: 1.5 }, '& .MuiFormControlLabel-root': { mr: 1 }, '& .MuiRadio-root': { p: 0.5 }, '& .MuiTypography-root': { fontSize: 13, fontWeight: 600 } }}>
                                    <FormLabel sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>Active</FormLabel>
                                    <RadioGroup row value={current.isActive ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isActive: e.target.value === 'yes' })}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ mt: 0.5, '& .MuiFormGroup-root': { gap: 1.5 }, '& .MuiFormControlLabel-root': { mr: 1 }, '& .MuiRadio-root': { p: 0.5 }, '& .MuiTypography-root': { fontSize: 13, fontWeight: 600 } }}>
                                    <FormLabel sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>Show CCTV</FormLabel>
                                    <RadioGroup row value={current.isCctvVisible ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isCctvVisible: e.target.value === 'yes' })}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ mt: 0.5, '& .MuiFormGroup-root': { gap: 1.5 }, '& .MuiFormControlLabel-root': { mr: 1 }, '& .MuiRadio-root': { p: 0.5 }, '& .MuiTypography-root': { fontSize: 13, fontWeight: 600 } }}>
                                    <FormLabel sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>Show CCTV Storage</FormLabel>
                                    <RadioGroup row value={current.isCctvStorageVisible ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isCctvStorageVisible: e.target.value === 'yes' })}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => { clearApiError?.(); closeDialogs(); }} disabled={actionLoading}>Cancel</Button>
                    <Button variant="contained" onClick={saveEdit} disabled={editDisabled}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Add Dialog (redesigned) */}
            <Dialog open={addOpen} onClose={() => { clearApiError?.(); closeDialogs(); }} maxWidth="sm" fullWidth TransitionComponent={Transition} PaperProps={{ sx: { borderRadius: 3, overflow: 'hidden', boxShadow: (t) => `0 16px 50px ${t.palette.mode === 'dark' ? 'rgba(0,0,0,.7)' : 'rgba(0,0,0,.25)'}` } }}>
                <Box sx={{ background: (t) => `linear-gradient(135deg, ${t.palette.primary.light} 0%, ${t.palette.primary.main} 100%)`, color: (t) => t.palette.getContrastText(t.palette.primary.main), px: 3, py: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <PersonAddAltRoundedIcon />
                        <DialogTitle sx={{ p: 0, fontWeight: 800 }}>Add User</DialogTitle>
                    </Stack>
                </Box>
                <DialogContent sx={{ pt: 2 }}>
                    {/* API error banner */}
                    {apiError && (
                        <Alert severity="error" onClose={clearApiError} sx={{ mb: 2 }}>
                            {getApiErrorMessage(apiError)}
                        </Alert>
                    )}

                    {current && (
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Full Name"
                                    value={current.fullName}
                                    onChange={(e) => { setCurrent({ ...current, fullName: validateOnChange ? validateOnChange('fullName', e.target.value) : e.target.value }); setErrors({ ...errors, fullName: undefined }); }}
                                    fullWidth
                                    required
                                    {...(getTextFieldProps ? getTextFieldProps('fullName') : { helperText: errors.fullName || ' ', error: Boolean(errors.fullName) })}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><BadgeOutlinedIcon fontSize="small" /></InputAdornment> }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Username"
                                    value={current.username}
                                    onChange={(e) => { setCurrent({ ...current, username: validateOnChange ? validateOnChange('username', e.target.value) : e.target.value }); setErrors({ ...errors, username: undefined }); }}
                                    fullWidth
                                    required
                                    {...(getTextFieldProps ? getTextFieldProps('username') : { helperText: errors.username || ' ', error: Boolean(errors.username) })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={current.email}
                                    onChange={(e) => { setCurrent({ ...current, email: validateOnChange ? validateOnChange('email', e.target.value) : e.target.value }); setErrors({ ...errors, email: undefined }); }}
                                    fullWidth
                                    required
                                    {...(getTextFieldProps ? getTextFieldProps('email') : { helperText: errors.email || ' ', error: Boolean(errors.email) })}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><AlternateEmailRoundedIcon fontSize="small" /></InputAdornment> }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Mobile"
                                    value={current.mobile}
                                    onChange={(e) => { const v = validateOnChange ? validateOnChange('mobile', e.target.value) : e.target.value; setCurrent({ ...current, mobile: v }); setErrors({ ...errors, mobile: undefined }); }}
                                    fullWidth
                                    required
                                    {...(getTextFieldProps ? getTextFieldProps('mobile') : { helperText: errors.mobile || ' ', error: Boolean(errors.mobile) })}
                                    {...(getMobileInputGuardProps ? getMobileInputGuardProps() : {})}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIphoneRoundedIcon fontSize="small" /></InputAdornment> }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField label="CCTV Link" value={current.cctvLink ?? ''} onChange={(e) => setCurrent({ ...current, cctvLink: e.target.value })} fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ mt: 0.5, '& .MuiFormGroup-root': { gap: 1.5 }, '& .MuiFormControlLabel-root': { mr: 1 }, '& .MuiRadio-root': { p: 0.5 }, '& .MuiTypography-root': { fontSize: 13, fontWeight: 600 } }}>
                                    <FormLabel sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>Is Admin</FormLabel>
                                    <RadioGroup row value={current.isAdmin ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isAdmin: e.target.value === 'yes' })}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ mt: 0.5, '& .MuiFormGroup-root': { gap: 1.5 }, '& .MuiFormControlLabel-root': { mr: 1 }, '& .MuiRadio-root': { p: 0.5 }, '& .MuiTypography-root': { fontSize: 13, fontWeight: 600 } }}>
                                    <FormLabel sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>Active</FormLabel>
                                    <RadioGroup row value={current.isActive ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isActive: e.target.value === 'yes' })}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ mt: 0.5, '& .MuiFormGroup-root': { gap: 1.5 }, '& .MuiFormControlLabel-root': { mr: 1 }, '& .MuiRadio-root': { p: 0.5 }, '& .MuiTypography-root': { fontSize: 13, fontWeight: 600 } }}>
                                    <FormLabel sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>Show CCTV</FormLabel>
                                    <RadioGroup row value={current.isCctvVisible ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isCctvVisible: e.target.value === 'yes' })}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl sx={{ mt: 0.5, '& .MuiFormGroup-root': { gap: 1.5 }, '& .MuiFormControlLabel-root': { mr: 1 }, '& .MuiRadio-root': { p: 0.5 }, '& .MuiTypography-root': { fontSize: 13, fontWeight: 600 } }}>
                                    <FormLabel sx={{ fontSize: 12, color: 'text.secondary', mb: 0.5 }}>Show CCTV Storage</FormLabel>
                                    <RadioGroup row value={current.isCctvStorageVisible ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isCctvStorageVisible: e.target.value === 'yes' })}>
                                        <FormControlLabel value="yes" control={<Radio size="small" />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size="small" />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => { clearApiError?.(); closeDialogs(); }} disabled={actionLoading}>Cancel</Button>
                    <Button variant="contained" onClick={saveAdd} disabled={addDisabled}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* Success Snackbar */}
            <Snackbar
                open={successOpen}
                autoHideDuration={3000}
                onClose={(_, reason) => { if (reason !== 'clickaway') setSuccessOpen(false); }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccessOpen(false)} severity="success" variant="filled" elevation={3}>
                    {successMsg || 'User added successfully'}
                </Alert>
            </Snackbar>

        </>
    );
}
