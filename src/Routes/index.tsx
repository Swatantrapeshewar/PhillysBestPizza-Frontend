import * as React from 'react';
import { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Login from '../Pages/Login';
import ForgotPassword from '../Pages/Forgot Password';
import ResetPassword from '../Pages/Reset Password';
import CommonLayout from '../Layout/Common';

const Router = (): React.JSX.Element => {
	return (
		<Suspense fallback={null}>
			<Routes>
				<Route path="/login" Component={Login} />
				<Route path="/forgot-password" Component={ForgotPassword} />
				<Route path="/reset-password" Component={ResetPassword} />

				<Route
					element={
						<CommonLayout>
							{' '}
							<Outlet />{' '}
						</CommonLayout>
					}>
					<Route path="/" Component={Dashboard} />
					<Route path="/invite-user" Component={Dashboard} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default Router;
