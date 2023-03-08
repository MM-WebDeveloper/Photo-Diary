import { User } from '../models/user';
import { fetchData } from './fetch';

export interface RegisterCredentials {
	username: string;
	fullName: string;
	email: string;
	password: string;
}

export const registerUser = async (
	credentials: RegisterCredentials
): Promise<User> => {
	const res = await fetchData('/api/users/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	return res.json();
};

export interface LoginCredentials {
	usernameOrEmail: string;
	password: string;
}

export const loginUser = async (
	credentials: LoginCredentials
): Promise<User> => {
	const res = await fetchData('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	return res.json();
};
