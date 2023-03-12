import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import * as AuthenticationApi from '../network/authentication.api';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
	const userContext = useContext(UserContext);
	const navigate = useNavigate();
	const documentTitle = 'Photo Diary';

	useEffect(() => {
		document.title = documentTitle;
		const authUser = async () => {
			try {
				const loggedInUser = await AuthenticationApi.authenticateUser();
				userContext.setUser(loggedInUser);
			} catch (error) {
				console.log(error);
				navigate(ROUTES.LOGIN);
			}
		};
		authUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<p>{JSON.stringify(userContext.user)}</p>
			<Header />
			<div>
				<Timeline />
				<Sidebar />
			</div>
		</div>
	);
};
export default Dashboard;
