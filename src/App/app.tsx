import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '../Routes';
import { ToastContainer } from 'react-toastify';

function App(): React.JSX.Element {
	return (
		<BrowserRouter>
			<Router />
			<ToastContainer />
		</BrowserRouter>
	);
}
export default App;
