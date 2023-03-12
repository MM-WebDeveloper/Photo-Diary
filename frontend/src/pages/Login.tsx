import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import * as AuthenticationApi from '../network/authentication.api';

const Login = () => {
	const [inputs, setInputs] = useState({
		usernameOrEmail: '',
		password: '',
	});
	const [error, setError] = useState('');
	const isInvalid = inputs.usernameOrEmail === '' || inputs.password === '';
	const documentTitle = 'Login \u2022 Photo Diary';

	const navigate = useNavigate();

	const logInHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await AuthenticationApi.loginUser(inputs);
			navigate(ROUTES.DASHBOARD);
		} catch (error) {
			let message = 'Unknown Error';
			if (error instanceof Error) message = error.message;
			setError(message);
		}
	};

	useEffect(() => {
		document.title = documentTitle;
	}, []);

	return (
		<>
			<form id='login' onSubmit={logInHandler} action='submit' method='POST'>
				{error && <p>{error}</p>}

				<input
					aria-label='Enter your email or username'
					onChange={(e) =>
						setInputs({ ...inputs, usernameOrEmail: e.target.value })
					}
					value={inputs.usernameOrEmail}
					id='usernameOrEmail'
					name='usernameOrEmail'
					type='text'
					placeholder='Username or e-mail'
				/>
				<input
					aria-label='Enter your password'
					onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
					value={inputs.password}
					id='password'
					name='password'
					type='password'
					placeholder='Password'
				/>
				<button disabled={isInvalid} type='submit'>
					Log In
				</button>
			</form>
			<div>
				<p style={{ display: 'inline' }}>Don't have an account?</p>
				<Link to={ROUTES.REGISTER}>Register</Link>
			</div>
		</>
	);
};

export default Login;
