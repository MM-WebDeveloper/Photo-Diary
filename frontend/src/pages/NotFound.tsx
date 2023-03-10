import { useEffect } from 'react';

const NotFound = () => {
	const documentTitle = 'Not Found \u2022 Photo Diary';
	useEffect(() => {
		document.title = documentTitle;
	}, []);
	return <div>404 | Page Not Found</div>;
};
export default NotFound;
