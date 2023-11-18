import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
	Button,
	CardActions,
	Container,
	Grid,
	Typography,
} from '@mui/material';

// Asset
import phillysLogo from '../../Assets/Images/Phillys_Logo.png';

const ManageBranch = (): React.JSX.Element => {
	return (
		<>
			<Box id="Invite-User" sx={{ p: 3 }}>
				<Stack spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Typography variant="h4">Manage Branch</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Container className="right-menu-items">
								<Button variant="contained" size="small">
									Add Branch
								</Button>
							</Container>
						</Grid>
					</Grid>
				</Stack>

				<Stack spacing={2} sx={{ mt: 3, ml: 2, mr: 2 }}>
					<Card
						sx={{
							display: 'flex',
							boxShadow: 'none',
							border: '1px solid #FF6347',
						}}>
						<CardMedia
							component="img"
							sx={{ width: 200 }}
							image={phillysLogo}
							alt="Philly's Best Pizza Logo"
						/>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: '1 0 auto' }}>
								<Typography component="div" variant="h5">
									ELKRIDGE, MD
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div">
									6501 HUNTSHIRE DR ELKRIDGE, MD 21075
								</Typography>
								<Typography
									variant="subtitle1"
									color="text.secondary"
									component="div">
									410-579-1504
								</Typography>
							</CardContent>
						</Box>

						<CardActions
							sx={{ display: 'flex', flexDirection: 'column' }}>
							<Button
								size="small"
								color="primary"
								variant="outlined">
								Edit
							</Button>
							<Button
								size="small"
								color="primary"
								variant="outlined">
								Delete
							</Button>
						</CardActions>
					</Card>
				</Stack>
			</Box>
		</>
	);
};

export default ManageBranch;
