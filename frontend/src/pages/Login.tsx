import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import * as AuthenticationApi from '../network/authentication.api';

const Login = () => {
	const [inputs, setInputs] = useState({
		usernameOrEmail: '',
		password: '',
	});
	const [error, setError] = useState('');
	const userContext = useContext(UserContext);
	const isInvalid = inputs.usernameOrEmail === '' || inputs.password === '';

	const navigate = useNavigate();

	const logInHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const loggedInUser = await AuthenticationApi.loginUser(inputs);
			userContext.setUser(loggedInUser);
			navigate('/dashboard');
		} catch (error) {
			let message = 'Unknown Error';
			if (error instanceof Error) message = error.message;
			setError(message);
		}
	};

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
		</>
	);
};

export default Login;
