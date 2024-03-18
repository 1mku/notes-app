import { supabase, type Session } from "../supabaseClient";

import {
	createContext,
	ReactNode,
	useState,
	useEffect,
	useContext,
} from "react";

type AuthSessionContextValue = {
	session: Session | null;
	loading: boolean;
};

const AuthSessionContext = createContext<AuthSessionContextValue>(
	{} as AuthSessionContextValue,
);

type AuthSessionProviderProps = {
	children: ReactNode;
};

export const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data: { session } }) => {
				setSession(session);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setLoading(false);
		});
	}, []);

	return (
		<AuthSessionContext.Provider value={{ session, loading }}>
			{children}
		</AuthSessionContext.Provider>
	);
};

export const useAuthSession = () => useContext(AuthSessionContext);
