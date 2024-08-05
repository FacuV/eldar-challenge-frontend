import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Navbar from "./components/Navbar.tsx";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Navbar />
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
