import { createContext, useState } from 'react';

// const user = {
// 	username: 'Miller',
// };

// type UserContextProviderProps = {
// 	children: React.ReactNode;
// };

// export const UserContext = createContext(user);

// export const UserContextProvider = ({ children }: UserContextProviderProps) => {
// 	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
// };

export type AuthUser = {
	username: string;
	email: string;
	fullName: string;
};

type UserContextType = {
	user: AuthUser | null;
	setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
};

type UserContextProviderProps = {
	children: React.ReactNode;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
	const [user, setUser] = useState<AuthUser | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
