import axios from 'axios';

export interface LoginRequest {
	email: string;
	password: string;
}

const baseAPIURL = process.env.API_URL;

export const login = async (data: LoginRequest): Promise<string> => {
	const response = axios
		.post(`${baseAPIURL}/user/login`, data)
		.then(function (response) {
			localStorage.setItem('PhillyUser', JSON.stringify(response.data));
			return response.data;
		})
		.catch(function (error) {
			console.log(error);
			throw error;
		});
	return await response;
};
