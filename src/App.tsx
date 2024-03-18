import { Route, Routes } from "react-router-dom";

import { Page } from "./Page/Page";
import { AppStateProvider } from "./state/AppStateContext";
import { Auth } from "./auth/Auth";
import { Private } from "./auth/Private";

function App() {
	return (
		<Routes>
			<Route path="/auth" element={<Auth />} />
			<Route
				path="/:id"
				element={
					<Private component={<AppStateProvider children={<Page />} />} />
				}
			/>
			<Route
				index
				path="/"
				element={
					<Private component={<AppStateProvider children={<Page />} />} />
				}
			/>
		</Routes>
	);
}

export default App;
