import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component
 * Automatically scrolls to the top of the page when the route changes
 * This provides better UX by ensuring users start at the top of each new page
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.smooth - Whether to use smooth scrolling (default: true)
 */
export default function ScrollToTop({ smooth = true }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure the page content is loaded before scrolling
    const timeoutId = setTimeout(() => {
      if (smooth) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' // Use smooth scrolling for better UX
        });
      } else {
        // Instant scroll to top
        window.scrollTo(0, 0);
      }
    }, 100); // 100ms delay

    // Cleanup timeout on unmount or pathname change
    return () => clearTimeout(timeoutId);
  }, [pathname, smooth]);

  return null; // This component doesn't render anything
}