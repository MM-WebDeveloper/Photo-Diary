import { useEffect } from 'react';

const NotFound = () => {
	useEffect(() => {
		document.title = 'Not Found';
	}, []);
	return <div>404 | Page Not Found</div>;
};
export default NotFound;
