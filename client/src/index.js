import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./pages/store";
import App from "./App";
import NavBar from "./components/NavBar";

ReactDOM.render(
	<div>
		<NavBar />
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</div>,
	document.getElementById("root")
);
