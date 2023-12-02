import React, { useState, useEffect } from 'react';
import {
	TextField,
	Typography,
	Box,
	Modal,
	InputLabel,
	Button,
	FormControl,
	MenuItem,
	Select,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '../../Hooks/reduxHooks';
import { toast } from 'react-toastify';

// Reducer
import { fetchBranches } from '../../Services/Reducers/BranchReducer';

// Helper
import { isAPIActionRejected } from '../../Utils/helper';

// Layout
// import Loader from '../../Layout/Loader';

// Services
import {
	getBranchesUser,
	inviteUser,
	updateUser,
} from '../../Services/Reducers/UserReducer';

// Interfaces
import { type UserRoleResponse } from '../../Services/APIs/UserAPI';
import { type ListBranchesResponse } from '../../Services/APIs/BranchAPI';

const style = {
	position: 'absolute' as const,
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	textAlign: 'center',
	bgcolor: 'background.paper',
	border: '1px solid #5C5C5C',
	borderRadius: '8px',
	boxShadow: 24,
	p: 4,
};

interface EditUserDetailsProps {
	id: string;
	email?: string;
	firstName?: string | undefined;
	lastName?: string | undefined;
	avatar?: string | undefined;
	phoneNumber?: number | undefined;
	role?: UserRoleResponse;
	branch?: ListBranchesResponse;
	action?: string;
}

interface AddUpdateBranchProps {
	open: boolean;
	handleClose: () => void;
	toBeEditedUserDetails: EditUserDetailsProps;
}
interface UserDataState {
	id: string;
	name: string;
	email: string;
	role: string;
	branch: string;
}

const initialBranchDataState = {
	id: '',
	name: '',
	email: '',
	role: '',
	branch: '',
};
const InviteUser = (props: AddUpdateBranchProps): React.JSX.Element => {
	const dispatch = useAppDispatch();

	const { open, handleClose, toBeEditedUserDetails } = props;

	const { branches } = useAppSelector((state) => state.branch);
	// const { loading } = useAppSelector((state) => state.user);

	const [userData, setUserData] = useState<UserDataState>(
		initialBranchDataState,
	);
	const [branch, setBranch] = React.useState('');
	console.log('toBeEditedUserDetails', toBeEditedUserDetails);
	useEffect(() => {
		if (toBeEditedUserDetails.id !== '') {
			setUserData({
				id: toBeEditedUserDetails.id ?? '',
				name: toBeEditedUserDetails.firstName ?? '',
				email: toBeEditedUserDetails.email ?? '',
				role:
					toBeEditedUserDetails.role != null
						? toBeEditedUserDetails?.role.roleName ?? ''
						: '',
				branch:
					toBeEditedUserDetails.branch != null
						? toBeEditedUserDetails?.branch.id ?? ''
						: '',
			});
		} else {
			setUserData(initialBranchDataState);
		}
	}, [open, toBeEditedUserDetails]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				await dispatch(fetchBranches());
			} catch (error) {
				console.error('Error fetching branches:', error);
			}
		};

		void fetchData();
	}, [dispatch]);

	const handleInputChange = (field: string, value: string): void => {
		setUserData((prevData: UserDataState) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleInvite = async (): Promise<void> => {
		if (userData.name.trim() === '') {
			toast.error('Please enter user name');
			return;
		}
		if (userData.email.trim() === '') {
			toast.error('Please enter user email');
			return;
		}
		if (userData.role.trim() === '') {
			toast.error('Please enter user role');
			return;
		}
		if (branch.trim() === '') {
			toast.error('Please enter user branch');
			return;
		}
		const requestBody = {
			firstName: userData.name,
			email: userData.email,
			role: userData.role,
			branchId: branch,
		};
		const result = await dispatch(inviteUser(requestBody));
		if (!isAPIActionRejected(result.type)) {
			toast.success('User invited Successfully');
			// await dispatch(getBranchesUser(branchId))
			handleClose();
		}
	};

	const handleUpdateUser = async (): Promise<void> => {
		if (userData.name.trim() === '') {
			toast.error('Please enter user name');
			return;
		}
		if (userData.email.trim() === '') {
			toast.error('Please enter user email');
			return;
		}
		if (userData.role.trim() === '') {
			toast.error('Please enter user role');
			return;
		}
		if (branch.trim() === '') {
			toast.error('Please enter user branch');
			return;
		}
		const requestBody = {
			userId: userData.id,
			firstName: userData.name,
			role: userData.role,
			branch,
		};
		const result = await dispatch(updateUser(requestBody));
		if (!isAPIActionRejected(result.type)) {
			toast.success('User updated Successfully');
			await dispatch(getBranchesUser(branch));
			handleClose();
		}
	};

	return (
		<>
			{/* <Loader open={loading} /> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h4"
						component="h2">
						Invite User
					</Typography>
					<Box sx={{ width: '100%' }}>
						<Stack spacing={2} sx={{ mt: 2 }}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Name
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									type="text"
									placeholder="Name"
									value={userData.name}
									onChange={(e) => {
										handleInputChange(
											'name',
											e.target.value,
										);
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Email
								</InputLabel>
								<TextField
									sx={{ width: '65%' }}
									type="email"
									placeholder="Address"
									value={userData.email}
									disabled={toBeEditedUserDetails.id !== ''}
									onChange={(e) => {
										handleInputChange(
											'email',
											e.target.value,
										);
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Role
								</InputLabel>
								<FormControl
									sx={{ mt: 0, mb: 0, mr: 3, minWidth: 105 }}>
									<InputLabel id="branch-select-autowidth-label">
										Role
									</InputLabel>
									<Select
										labelId="branch-select-autowidth-label"
										id="branch-select-autowidth"
										sx={{ width: '100%' }}
										value={userData.role}
										onChange={(e) => {
											handleInputChange(
												'role',
												e.target.value,
											);
										}}
										autoWidth
										label="Branch"
										size="small">
										<MenuItem value={'manager'}>
											Manager
										</MenuItem>
										<MenuItem value={'admin'}>
											Admin
										</MenuItem>
									</Select>
								</FormControl>
							</Box>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignTtems: 'baseline',
								}}>
								<InputLabel sx={{ marginRight: '10%' }}>
									Branch
								</InputLabel>
								<FormControl
									sx={{ mt: 0, mb: 0, mr: 3, minWidth: 105 }}>
									<InputLabel id="branch-select-autowidth-label">
										Branch
									</InputLabel>
									<Select
										labelId="branch-select-autowidth-label"
										// id="branch-select-autowidth"
										sx={{ width: '100%' }}
										value={branch}
										onChange={(e) => {
											setBranch(e.target.value);
										}}
										// autoWidth
										label="Branch"
										size="small">
										{branches.map((branchItem) => (
											<MenuItem
												key={branchItem.id}
												value={branchItem.id}>
												{branchItem.storeName}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
						</Stack>
					</Box>

					<Box
						sx={{
							width: '100%',
							mt: 5,
							display: 'flex',
							justifyContent: 'space-around',
						}}>
						<Button
							variant="outlined"
							size="medium"
							onClick={handleClose}>
							Cancel
						</Button>
						{toBeEditedUserDetails.id === '' ? (
							<Button
								variant="contained"
								size="medium"
								onClick={() => {
									void handleInvite();
								}}>
								Invite
							</Button>
						) : (
							<Button
								variant="contained"
								size="medium"
								onClick={() => {
									void handleUpdateUser();
								}}>
								Update
							</Button>
						)}
					</Box>
				</Box>
			</Modal>
		</>
	);
};

export default InviteUser;
