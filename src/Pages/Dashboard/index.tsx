import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../Hooks/reduxHooks';
import { logout } from '../../Services/Reducers/UserReducer';
import {
	styled,
	useTheme,
	type Theme,
	type CSSObject,
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, {
	type AppBarProps as MuiAppBarProps,
} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Container, Grid, Paper } from '@mui/material';
import { Copyright } from '@mui/icons-material';
// import Orders from './orders';
import ItemsCharts from './chart';
import ManageInventory from './ManageInventory';
import ManageItem from './ManageItem';
import InviteUser from './InviteUser';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...((open ?? false) && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open === true && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!(open ?? false) && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const Dashboard = (): React.JSX.Element => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.user);

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [activePage, setActivePage] = useState('Dashboard');

	const handleDrawerOpen = (): void => {
		setOpen(true);
	};

	const handleDrawerClose = (): void => {
		setOpen(false);
	};

	useEffect(() => {
		const storedUserInfo: string | null =
			localStorage.getItem('PhillyUser');
		if (storedUserInfo != null) {
			const userInfo = JSON.parse(storedUserInfo);
			if (userInfo === null && user === null) {
				navigate('/login');
			}
		} else {
			navigate('/login'); // Handle the case where 'PhillyUser' is not in localStorage
		}
	}, [user, navigate]);

	const handleLogout = (): void => {
		dispatch(logout());
		navigate('/login');
	};

	const handleActivePage = (type: string): void => {
		setActivePage(type);
	};

	return (
		<>
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					open={open}
					sx={{ bgcolor: '#dc442e' }}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={{
								marginRight: 5,
								...(open && { display: 'none' }),
							}}>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							Philly&apos;s Best Pizza
						</Typography>
					</Toolbar>
				</AppBar>
				<Drawer variant="permanent" open={open}>
					<DrawerHeader>
						<IconButton onClick={handleDrawerClose}>
							{theme.direction === 'rtl' ? (
								<ChevronRightIcon />
							) : (
								<ChevronLeftIcon />
							)}
						</IconButton>
					</DrawerHeader>
					<Divider />
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
										justifyContent: open
											? 'initial'
											: 'center',
										px: 2.5,
									}}>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}>
										{index % 2 === 0 ? (
											<InboxIcon />
										) : (
											<MailIcon />
										)}
									</ListItemIcon>
									<ListItemText
										primary={text}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
					<Divider />
					<List>
						{['Logout'].map((text, index) => (
							<ListItem
								key={text}
								disablePadding
								sx={{ display: 'block' }}
								onClick={handleLogout}>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open
											? 'initial'
											: 'center',
										px: 2.5,
									}}>
									<ListItemIcon
										sx={{
											minWidth: 0,
											mr: open ? 3 : 'auto',
											justifyContent: 'center',
										}}>
										{index % 2 === 0 ? (
											<InboxIcon />
										) : (
											<MailIcon />
										)}
									</ListItemIcon>
									<ListItemText
										primary={text}
										sx={{ opacity: open ? 1 : 0 }}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Drawer>
				<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
					<DrawerHeader />

					{activePage === 'Dashboard' ? (
						<Box
							sx={{
								minHeight: 1,
								display: 'flex',
								flexDirection: { xs: 'column', lg: 'row' },
							}}>
							<Box
								component="main"
								sx={{
									flexGrow: 1,
									minHeight: 1,
									display: 'flex',
									flexDirection: 'column',
								}}>
								<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
									<Grid container spacing={3}>
										{/* Chart */}
										<Grid item xs={12} md={4} lg={3}>
											<Paper
												sx={{
													p: 2,
													display: 'flex',
													flexDirection: 'column',
													height: 240,
												}}>
												<React.Fragment>
													<Typography
														component="h2"
														variant="h6"
														color="primary"
														gutterBottom>
														Quantity in hand
													</Typography>
													<Typography
														component="p"
														variant="h4">
														868
													</Typography>
													{/* <Typography
								color="text.secondary"
								sx={{ flex: 1 }}>
								Quantity in hand
							</Typography> */}
												</React.Fragment>
											</Paper>
										</Grid>
										{/* Recent Deposits */}
										<Grid item xs={12} md={4} lg={3}>
											<Paper
												sx={{
													p: 2,
													display: 'flex',
													flexDirection: 'column',
													height: 240,
												}}>
												<React.Fragment>
													<Typography
														component="h2"
														variant="h6"
														color="primary"
														gutterBottom>
														Quantity received this
														month
													</Typography>
													<Typography
														component="p"
														variant="h4">
														200
													</Typography>
													{/* <Typography
								color="text.secondary"
								sx={{ flex: 1 }}>
								Quantity received this month
							</Typography> */}
												</React.Fragment>
											</Paper>
										</Grid>
										{/* Recent Orders */}
										<Grid item xs={12}>
											<Paper
												sx={{
													p: 2,
													display: 'flex',
													flexDirection: 'column',
												}}>
												{/* <Orders /> */}
												<ItemsCharts />
											</Paper>
										</Grid>
									</Grid>
									<Copyright sx={{ pt: 4 }} />
								</Container>
							</Box>
						</Box>
					) : activePage === 'Inventory Management' ? (
						<ManageInventory />
					) : activePage === 'Manage Items' ? (
						<ManageItem />
					) : activePage === 'Invite Users' ? (
						<InviteUser />
					) : (
						<h1>Work In progress</h1>
					)}
				</Box>
			</Box>
		</>
	);
};

export default Dashboard;
