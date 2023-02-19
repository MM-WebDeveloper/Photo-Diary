import app from './app';
import env from './util/validateEnv';

app.listen(env.PORT, () => {
	console.log(`Server running on port: ${env.PORT}`);
});
