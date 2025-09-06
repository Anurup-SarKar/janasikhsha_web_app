import React from 'react';
import { Paper, Stack, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function AdminUsers({ users, setUsers }) {
    const [editOpen, setEditOpen] = React.useState(false);
    const [addOpen, setAddOpen] = React.useState(false);
    const [current, setCurrent] = React.useState(null);

    const openEdit = (u) => { setCurrent({ ...u }); setEditOpen(true); };
    const openAdd = () => {
        setCurrent({
            id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
            username: '', email: '', mobile: '', fullName: '', cctvLink: '',
            isCctvVisible: false, isCctvStorageVisible: false, isAdmin: false, isActive: true,
        });
        setAddOpen(true);
    };
    const closeDialogs = () => { setEditOpen(false); setAddOpen(false); };

    const saveEdit = () => {
        if (!current) return;
        setUsers(prev => prev.map(u => u.id === current.id ? current : u));
        setEditOpen(false);
    };
    const saveAdd = () => {
        if (!current) return;
        setUsers(prev => [...prev, current]);
        setAddOpen(false);
    };
    const delUser = (id) => setUsers(prev => prev.filter(u => u.id !== id));

    return (
        <>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>User List</Typography>
                <Button variant="contained" onClick={openAdd}>Add User</Button>
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
                                        <Button size="small" variant="outlined" onClick={() => openEdit(u)}>Edit</Button>
                                        <Button size="small" color="error" variant="outlined" onClick={() => delUser(u.id)}>Delete</Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* Edit Dialog */}
            <Dialog open={editOpen} onClose={closeDialogs} maxWidth="sm" fullWidth>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    {current && (
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <TextField label="Full Name" value={current.fullName} onChange={(e) => setCurrent({ ...current, fullName: e.target.value })} fullWidth />
                            <TextField label="Username" value={current.username} onChange={(e) => setCurrent({ ...current, username: e.target.value })} fullWidth />
                            <TextField label="Email" type="email" value={current.email} onChange={(e) => setCurrent({ ...current, email: e.target.value })} fullWidth />
                            <TextField label="Mobile" value={current.mobile} onChange={(e) => setCurrent({ ...current, mobile: e.target.value })} fullWidth />
                            <TextField label="CCTV Link" value={current.cctvLink ?? ''} onChange={(e) => setCurrent({ ...current, cctvLink: e.target.value })} fullWidth />

                            <FormControl>
                                <FormLabel>Is Admin</FormLabel>
                                <RadioGroup row value={current.isAdmin ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isAdmin: e.target.value === 'yes' })}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Active</FormLabel>
                                <RadioGroup row value={current.isActive ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isActive: e.target.value === 'yes' })}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Show CCTV</FormLabel>
                                <RadioGroup row value={current.isCctvVisible ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isCctvVisible: e.target.value === 'yes' })}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Show CCTV Storage</FormLabel>
                                <RadioGroup row value={current.isCctvStorageVisible ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isCctvStorageVisible: e.target.value === 'yes' })}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogs}>Cancel</Button>
                    <Button variant="contained" onClick={saveEdit}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Add Dialog */}
            <Dialog open={addOpen} onClose={closeDialogs} maxWidth="sm" fullWidth>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    {current && (
                        <Stack spacing={2} sx={{ mt: 1 }}>
                            <TextField label="Full Name" value={current.fullName} onChange={(e) => setCurrent({ ...current, fullName: e.target.value })} fullWidth />
                            <TextField label="Username" value={current.username} onChange={(e) => setCurrent({ ...current, username: e.target.value })} fullWidth />
                            <TextField label="Email" type="email" value={current.email} onChange={(e) => setCurrent({ ...current, email: e.target.value })} fullWidth />
                            <TextField label="Mobile" value={current.mobile} onChange={(e) => setCurrent({ ...current, mobile: e.target.value })} fullWidth />
                            <TextField label="CCTV Link" value={current.cctvLink ?? ''} onChange={(e) => setCurrent({ ...current, cctvLink: e.target.value })} fullWidth />

                            <FormControl>
                                <FormLabel>Is Admin</FormLabel>
                                <RadioGroup row value={current.isAdmin ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isAdmin: e.target.value === 'yes' })}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Active</FormLabel>
                                <RadioGroup row value={current.isActive ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isActive: e.target.value === 'yes' })}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Show CCTV</FormLabel>
                                <RadioGroup row value={current.isCctvVisible ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isCctvVisible: e.target.value === 'yes' })}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Show CCTV Storage</FormLabel>
                                <RadioGroup row value={current.isCctvStorageVisible ? 'yes' : 'no'} onChange={(e) => setCurrent({ ...current, isCctvStorageVisible: e.target.value === 'yes' })}>
                                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="no" control={<Radio />} label="No" />
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialogs}>Cancel</Button>
                    <Button variant="contained" onClick={saveAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
