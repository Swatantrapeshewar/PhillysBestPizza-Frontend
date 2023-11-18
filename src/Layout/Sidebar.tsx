import {
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// Hooks
import { useAppDispatch } from '../Hooks/reduxHooks';

// Services
import { logout } from '../Services/Reducers/UserReducer';

// Assets
import phillyLogo from '../Assets/Images/Phillys_Logo.png';

interface SidebarProps {
	open: boolean;
	handleOpen: (status: boolean) => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const Sidebar: React.FC<SidebarProps> = (props) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const { open, handleOpen } = props;

	const handleDrawerClose = (): void => {
		handleOpen(false);
	};

	const handleLogout = (): void => {
		dispatch(logout());
		navigate('/login');
	};

	const handleActivePage = (type: string): void => {};

	return (
		<Drawer
			variant="permanent"
			open={open}
			className={!open ? 'main-drawer' : ''}
			// sx={{ width: !open ? '5%' : '', overflow: !open ? 'hidden' : '' }}
		>
			<DrawerHeader sx={{ justifyContent: 'center' }}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? (
						<ChevronRightIcon />
					) : (
						<>
							<img src={phillyLogo} width="150" />
							{/* <ChevronLeftIcon /> */}
						</>
					)}
				</IconButton>
			</DrawerHeader>
			{/* <Divider /> */}
			<List>
				{[
					'Dashboard',
					'Inventory Management',
					'Manage Items',
					'Invite Users',
					'Profile',
					'Manage Branch',
				].map((text, index) => (
					<ListItem
						key={text}
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => {
							handleActivePage(text);
						}}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? 'initial' : 'center',
								px: 2.5,
							}}>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : 'auto',
									justifyContent: 'center',
								}}>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							{open && (
								<ListItemText
									primary={text}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							)}
						</ListItemButton>
					</ListItem>
				))}
			</List>
			{/* <Divider /> */}
			<List>
				<ListItem
					key="Logout"
					disablePadding
					sx={{ display: 'block' }}
					onClick={handleLogout}>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
						}}>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							}}>
							<MailIcon />
						</ListItemIcon>
						{open && (
							<ListItemText
								primary="Logout"
								sx={{ opacity: open ? 1 : 0 }}
							/>
						)}
					</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Sidebar;
