import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { type ReactNode } from 'react';

import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

interface CommonLayoutProps {
	children: ReactNode;
}

const sidebarList = ['/'];
const CommonLayout: React.FC<CommonLayoutProps> = ({ children }) => {
	const location = useLocation();
	const [open, setOpen] = useState<boolean>(true);

	const handleSidebar = (): void => {
		const isOpen = sidebarList.some(
			(screen) => screen === location.pathname,
		);
		setOpen(isOpen);
	};
	useEffect(() => {
		handleSidebar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return (
		<Box id="handleSidebar">
			<Sidebar open={open} />
			<Box className="main-layout-right-side">{children}</Box>
		</Box>
	);
};

export default CommonLayout;
