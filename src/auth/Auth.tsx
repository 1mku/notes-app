import { useState, FormEventHandler } from "react";
import { Navigate } from "react-router-dom";

import {
	Button,
	Fieldset,
	Group,
	PasswordInput,
	Stack,
	Switch,
	TextInput,
} from "@mantine/core";

import { useAuthSession } from "./AuthSessionContext";
import { supabase } from "../supabaseClient";

import styles from "../utils.module.css";

function LoginWithEmailPassword() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleLogin: FormEventHandler<HTMLFieldSetElement> = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) throw error;
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};
	return loading ? (
		"Loading..."
	) : (
		<Fieldset
			miw={360}
			onKeyDown={(e) => {
				if (e.code === "Enter") handleLogin(e);
			}}
			onSubmit={handleLogin}
		>
			<TextInput
				type="email"
				label="Email"
				value={email}
				placeholder="Email"
				onChange={(e) => setEmail(e.target.value)}
			/>
			<PasswordInput
				type="email"
				label="Password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Group justify="flex-end" mt="md">
				<Button type="submit">Submit</Button>
			</Group>
		</Fieldset>
	);
}

function LoginOtp() {
	const [email, setEmail] = useState("");

	const [loading, setLoading] = useState(false);
	const handleLogin: FormEventHandler<HTMLFieldSetElement> = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					shouldCreateUser: false,
				},
			});
			if (error) throw error;
			alert("Check your email for the login link!");
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};
	return loading ? (
		"Sending magic link..."
	) : (
		<>
			<Fieldset
				miw={360}
				onKeyDown={(e) => {
					if (e.code === "Enter") handleLogin(e);
				}}
				onSubmit={handleLogin}
			>
				<p>Sign in via magic link with your email below</p>
				<TextInput
					label="Email"
					type="email"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Your email"
				/>
				<Group justify="flex-end" mt="md">
					<Button>Send magic link</Button>
				</Group>
			</Fieldset>
		</>
	);
}

export const Auth = () => {
	const [useOTP, setUseOTP] = useState(false);
	const { session } = useAuthSession();

	if (session) {
		return <Navigate to="/" />;
	}

	return (
		<div className={styles.centeredFlex}>
			<Stack>
				<h1>🗒️ Notes App</h1>
				<Switch
					label="Use OTP"
					checked={useOTP}
					onChange={(event) => setUseOTP(event.currentTarget.checked)}
				/>

				{!useOTP && <LoginWithEmailPassword />}
				{useOTP && <LoginOtp />}
			</Stack>
		</div>
	);
};
