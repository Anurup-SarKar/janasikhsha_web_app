// ErrorBoundary.jsx
// Catches runtime errors and shows a friendly message instead of a blank screen.

import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // eslint-disable-next-line no-console
        console.error('App error:', error, errorInfo);
    }

    handleReload = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{ p: 4, m: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        Something went wrong.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Please reload the page. If the problem persists, share the console error message.
                    </Typography>
                    <Button variant="contained" sx={{ mt: 2 }} onClick={this.handleReload}>Reload</Button>
                </Box>
            );
        }
        return this.props.children;
    }
}
