import mongoose from 'mongoose';
import app from './app';
import env from './util/validateEnv';

mongoose
	.connect(env.MONGO_CONNECTION_STRING)
	.then(() => {
		console.log(`MongoDB Atlas connection was successful`);
		app.listen(env.PORT, () => {
			console.log(`Server running on port: ${env.PORT}`);
		});
	})
	.catch(console.error);
