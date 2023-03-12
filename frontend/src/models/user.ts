export interface User {
	username: string;
	email: string;
	fullName: string;
	followers: [string];
	following: [string];
}
