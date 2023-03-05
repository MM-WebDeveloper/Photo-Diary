import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

interface LoginBody {
	username?: string;
	email?: string;
	password: string;
}

export const Login: RequestHandler<
	unknown,
	unknown,
	LoginBody,
	unknown
> = async (req, res, next) => {
	const { username, email, password } = req.body;

	try {
		if ((!username && !email) || !password) {
			throw createHttpError(400, 'Enter your credentials');
		}

		const user = await UserModel.findOne({ $or: [{ username }, { email }] })
			.select('+password')
			.exec();

		if (!user) {
			throw createHttpError(401, 'Invalid credentials');
		}

		const pwdMatch = await bcrypt.compare(password, user.password);

		if (!pwdMatch) {
			throw createHttpError(401, 'Invalid credentials');
		}

		req.session.userId = user._id;
		res.json(user);
	} catch (error) {
		next(error);
	}
};

interface RegisterBody {
	username: string;
	fullName: string;
	email: string;
	password: string;
}

export const Register: RequestHandler<
	unknown,
	unknown,
	RegisterBody,
	unknown
> = async (req, res, next) => {
	const { username, fullName, email, password } = req.body;

	try {
		if (!username || !fullName || !email || !password) {
			throw createHttpError(400, 'Register parameters missing');
		}

		const usernameExists = await UserModel.findOne({ username }).exec();

		if (usernameExists) {
			throw createHttpError(409, 'This username is already taken');
		}

		const emailExists = await UserModel.findOne({ email }).exec();

		if (emailExists) {
			throw createHttpError(409, 'This email is already registered');
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await UserModel.create({
			username,
			fullName,
			email,
			password: hashedPassword,
		});

		req.session.userId = newUser._id;

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};
