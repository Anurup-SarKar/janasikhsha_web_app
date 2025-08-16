// SinglePage.jsx
// Composes all sections into one responsive, scrollable page with anchor ids.

import React from 'react';
import { Box } from '@mui/material';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import DonationForm from '../components/DonationForm';
import LoginForm from '../components/LoginForm';
import LiveCCTV from '../components/LiveCCTV';
import Home from './Home';
import AboutUs from './AboutUs';
import WhatWeDo from './WhatWeDo';
import LatestProjects from './LatestProjects';
import NewsRoom from './NewsRoom';
import CaseHistory from './CaseHistory';
import SuccessStory from './SuccessStory';
import SupportUs from './SupportUs';
import Location from './Location';
import WhoWeAre from './WhoWeAre';
import OurManifesto from './OurManifesto';
import OurTeam from './OurTeam';
import ChildProtection from './ChildProtection';
import ChildEducation from './ChildEducation';
import AfterCare from './AfterCare';
import Swadhar from './Swadhar';
import ElderlyCare from './ElderlyCare';
import StaffList from './StaffList';
import BeneficiaryDetails from './BeneficiaryDetails';

export default function SinglePage({ isLoggedIn }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
            {/* Top/Home section */}
            <Box id="home"><Home /></Box>

            {/* About sections */}
            <Box id="aboutus"><AboutUs /></Box>
            <Box id="whoweare"><WhoWeAre /></Box>
            <Box id="ourmanifesto"><OurManifesto /></Box>
            <Box id="ourteam"><OurTeam /></Box>

            {/* What we do and programs */}
            <Box id="whatwedo"><WhatWeDo /></Box>
            <Box id="childprotection"><ChildProtection /></Box>
            <Box id="childeducation"><ChildEducation /></Box>
            <Box id="aftercare"><AfterCare /></Box>
            <Box id="swadhar"><Swadhar /></Box>
            <Box id="elderlycare"><ElderlyCare /></Box>

            {/* Projects, news, stories */}
            <Box id="latestprojects"><LatestProjects /></Box>
            <Box id="newsroom"><NewsRoom /></Box>
            <Box id="casehistory"><CaseHistory /></Box>
            <Box id="successstory"><SuccessStory /></Box>

            {/* Media and location */}
            <Box id="gallery"><Gallery /></Box>
            <Box id="location"><Location /></Box>

            {/* Support and donate */}
            <Box id="supportus"><SupportUs /></Box>
            <Box id="donate"><DonationForm /></Box>

            {/* Contact */}
            <Box id="contact"><Contact /></Box>

            {/* Conditional live CCTV */}
            {isLoggedIn && (
                <Box id="livecctv"><LiveCCTV /></Box>
            )}

            {/* Login form (for convenience in the single page) */}
            <Box id="login"><LoginForm onLogin={() => { }} /></Box>
        </Box>
    );
}
