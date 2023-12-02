import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#FF6347',
			dark: '#dc442e',
		},
		secondary: { main: '#dc0250' },
		error: { main: '#8D0000' },
		warning: { main: '##FFD700' },
		info: { main: '##6296b7' },
		success: { main: '#12B76A', light: '#7FFF00' },
		background: {
			// default: '#FFF',
			default: '#ededed',
		},
	},
	typography: {
		h4: {
			color: '#333',
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				contained: {
					color: '#fff',
					textTransform: 'none',
					boxShadow: 'none',
				},
			},
		},
	},
});

export default theme;
