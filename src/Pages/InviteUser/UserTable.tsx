import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
	id: 'firstName' | 'lastName' | 'email' | 'role' | 'branch' | 'action';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: string) => string;
}

const columns: readonly Column[] = [
	{ id: 'firstName', label: 'First Name', minWidth: 170 },
	{ id: 'lastName', label: 'Last Name', minWidth: 170 },
	{ id: 'email', label: 'Email', minWidth: 200 },
	{ id: 'role', label: 'Role', minWidth: 100 },
	{ id: 'branch', label: 'Branch', minWidth: 100 },
	{ id: 'action', label: 'Action', minWidth: 100 },
];

interface Data {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	branch: string;
	action: string;
}

function createData(
	firstName: string,
	lastName: string,
	email: string,
	role: string,
	branch: string,
	action: string,
): Data {
	return { firstName, lastName, email, role, branch, action };
}

const rows = [
	createData(
		'John',
		'Doe',
		'john.doe@example.com',
		'Admin',
		'Main Branch',
		'Edit/Delete',
	),
	createData(
		'Jane',
		'Smith',
		'jane.smith@example.com',
		'User',
		'Branch A',
		'Edit/Delete',
	),
	// Add more sample data as needed
];

export default function StickyHeadTable(): React.JSX.Element {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number): void => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>,
	): void => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<>
			<Paper
				sx={{
					width: '100%',
					overflow: 'hidden',
					boxShadow: 'none',
					borderRadius: '0',
				}}>
				<TableContainer sx={{ maxHeight: 440 }}>
					<Table
						aria-label="sticky table"
						sx={{ background: '#fff' }}>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage,
								)
								.map((row, index) => {
									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={`item-${index}-${row.firstName}`}>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell
														key={column.id}
														align={column.align}>
														{column.format !=
															null &&
														typeof value ===
															'string'
															? column.format(
																	value,
															  )
															: value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</>
	);
}
