import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

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
			following: [],
			followers: [],
		});

		res.status(201).json(newUser);
	} catch (error) {
		next(error);
	}
};
