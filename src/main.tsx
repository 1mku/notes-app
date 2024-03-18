import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { AuthSessionProvider } from "./auth/AuthSessionContext";

import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthSessionProvider>
				<MantineProvider>
					<App />
				</MantineProvider>
			</AuthSessionProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
