// ScrollTopButton.jsx
// Floating action button to scroll to top and reload the page.

import React, { useEffect, useState } from 'react';
import { Fab, Zoom, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function ScrollTopButton() {
    const [visible, setVisible] = useState(false);

    // Robust scrollTop getter for cross-browser support
    const getScrollTop = () => (
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    );

    // Detect touch devices to avoid Tooltip click delays on mobile
    const isTouchDevice = typeof window !== 'undefined' && (
        'ontouchstart' in window || (navigator && navigator.maxTouchPoints > 0)
    );

    useEffect(() => {
        const onScroll = () => setVisible(getScrollTop() > 200);
        // Initialize
        onScroll();
        // Listen to scroll and resize to update visibility reliably
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    const handleClick = () => {
        try {
            const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReducedMotion) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch {
            window.scrollTo(0, 0);
        }

        // Reload only after we reach (or nearly reach) the top, with a max wait to avoid hanging
        const start = Date.now();
        const maxWait = 2000; // ms
        const check = () => {
            if (getScrollTop() <= 2 || Date.now() - start > maxWait) {
                window.location.reload();
            } else {
                window.requestAnimationFrame(check);
            }
        };
        window.requestAnimationFrame(check);
    };

    const FabNode = (
        <Fab
            color="secondary"
            aria-label="scroll to top and reload"
            onClick={handleClick}
            sx={{
                position: 'fixed',
                bottom: { xs: 16, md: 24 },
                right: { xs: 16, md: 24 },
                zIndex: (theme) => theme.zIndex.snackbar + 1, // stays above most UI but below tooltips/modals where appropriate
            }}
        >
            <ArrowUpwardIcon />
        </Fab>
    );

    return (
        <Zoom in={visible} mountOnEnter unmountOnExit>
            {isTouchDevice ? (
                FabNode
            ) : (
                <Tooltip title="Back to top & reload" placement="left">
                    {FabNode}
                </Tooltip>
            )}
        </Zoom>
    );
}
