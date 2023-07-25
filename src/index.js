import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Router from "./Router";
import ContextProvider from "./store/ContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ContextProvider>
			<Router>
				<App />
			</Router>
		</ContextProvider>
	</React.StrictMode>
);
