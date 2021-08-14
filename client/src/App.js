import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import SingleUser from "./pages/SingleUser";
import Channels from "./pages/Channels";
import Channel from "../src/pages/Channel";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
//import useToken from "./pages/useToken";

const App = () => {
	//const { token, setToken } = useToken();
	const [token, setToken] = useState(false);
	console.log(token);
	if (!token) return <Home setToken={setToken} />;
	else if (token == "Home") return <Login setToken={setToken} />;
	else if (token != "login") {
		return <Login setToken={setToken} />;
	}

	return (
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/user/:channelId/:userId/:userName">
				<SingleUser setToken={setToken} />
			</Route>
			<Route path="/channels">
				<Channels setToken={setToken} />
			</Route>
			<Route path="/channel/:name/:channelId">
				<Channel setToken={setToken} />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
			<Route path="/logout">
				<Logout />
			</Route>
		</Switch>
	);
};

export default App;
