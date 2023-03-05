import './App.css';
import {
	createBrowserRouter,
	Link,
	Outlet,
	RouterProvider,
} from 'react-router-dom';
import { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('./pages/Login'));

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			children: [
				{
					path: '/',
					element: (
						<Suspense fallback={<p>Loading...</p>}>
							<LoginPage />
						</Suspense>
					),
				},
			],
		},
	]);
	return (
		<div className='App'>
			<RouterProvider router={router} />
		</div>
	);
}

const Root = () => {
	return (
		<>
			<nav>
				<Link to='/'>Home</Link>
			</nav>
			<div>
				<Outlet />
			</div>
		</>
	);
};

export default App;
