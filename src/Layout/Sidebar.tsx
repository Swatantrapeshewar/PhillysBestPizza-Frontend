import { Drawer } from '@mui/material';
import React from 'react';

interface SidebarProps {
	open: boolean;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
	const { open } = props;
	return (
		<Drawer
			id="Sidebar"
			variant="persistent"
			className={open ? 'Open' : 'Close'}></Drawer>
	);
};

export default Sidebar;
