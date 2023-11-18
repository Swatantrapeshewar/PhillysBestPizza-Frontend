import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	type SelectChangeEvent,
	Typography,
} from '@mui/material';

// Component
import UserTable from './UserTable';

const InviteUser = (): React.JSX.Element => {
	const [branch, setBranch] = React.useState('');

	const handleChange = (event: SelectChangeEvent): void => {
		setBranch(event.target.value);
	};
	return (
		<>
			<Box id="Invite-User">
				<Stack spacing={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={4}>
							<Typography variant="h4">Invite User</Typography>
						</Grid>
						<Grid item xs={12} md={8}>
							<Container className="right-menu-items">
								<FormControl
									sx={{ mt: 0, mb: 0, mr: 3, minWidth: 105 }}>
									<InputLabel id="branch-select-autowidth-label">
										Branch
									</InputLabel>
									<Select
										labelId="branch-select-autowidth-label"
										id="branch-select-autowidth"
										value={branch}
										onChange={handleChange}
										autoWidth
										label="Branch"
										size="small">
										<MenuItem value={10}>Columbia</MenuItem>
										<MenuItem value={21}>Elkridge</MenuItem>
									</Select>
								</FormControl>
								<Button variant="contained" size="small">
									Invite User
								</Button>
							</Container>
						</Grid>
					</Grid>
				</Stack>

				<Stack spacing={2} sx={{ mt: 3 }}>
					<UserTable />
				</Stack>
			</Box>
		</>
	);
};

export default InviteUser;
