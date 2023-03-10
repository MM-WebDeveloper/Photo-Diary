import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { UserContext } from '../context/UserContext';
import * as AuthenticationApi from '../network/authentication.api';

const Register = () => {
	const [inputs, setInputs] = useState({
		username: '',
		fullName: '',
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const userContext = useContext(UserContext);
	const isInvalid =
		inputs.username === '' ||
		inputs.fullName === '' ||
		inputs.email === '' ||
		inputs.password === '';
	const documentTitle = 'Register \u2022 Photo Diary';

	const navigate = useNavigate();

	const logInHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const loggedInUser = await AuthenticationApi.registerUser(inputs);
			userContext.setUser(loggedInUser);
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
					aria-label='Enter your username'
					onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
					value={inputs.username}
					id='username'
					name='username'
					type='text'
					placeholder='Username'
				/>
				<input
					aria-label='Enter your full name'
					onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
					value={inputs.fullName}
					id='fullName'
					name='fullName'
					type='text'
					placeholder='Enter your full name'
				/>
				<input
					aria-label='Enter your email'
					onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
					value={inputs.email}
					id='email'
					name='email'
					type='text'
					placeholder='E-mail'
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
					Register
				</button>
			</form>
			<div>
				<p style={{ display: 'inline' }}>Already have an account?</p>
				<Link to={ROUTES.LOGIN}>Login</Link>
			</div>
		</>
	);
};
export default Register;
