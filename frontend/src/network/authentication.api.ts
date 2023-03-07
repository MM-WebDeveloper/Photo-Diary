import { User } from '../models/user';
import { fetchData } from './fetch';

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
