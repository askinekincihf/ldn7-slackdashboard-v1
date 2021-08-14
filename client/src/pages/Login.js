import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import "./LoginForm.css";
import Footer from "../components/Footer";
import axios from "axios";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Login = ({ setToken }) => {
	Login.propTypes = {
		setToken: PropTypes.func.isRequired,
	};
	const user = useSelector(selectUser);
	const history = useHistory();
	async function loginUser(credentials) {
		return axios.post(`/api/login`, credentials);
	}
	const [name, setName] = useState(" ");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser({
			name,
			password,
		})
			.then((result) => {
				dispatch(
					login({
						name: name,
						password: password,
						loggedIn: true,
						message: true,
					})
				);
				setToken("login");
				history.push("/channels");
			})
			.catch(() => {
				dispatch(
					login({
						name: "",
						password: "",
						loggedIn: false,
						message: "Please enter your correct password",
					})
				);
			});
	};
	//user && console.log(user && user.loggedIn);
	return (
		<>
			<form
				name="loginForm"
				className="mx-auto "
				onSubmit={(e) => handleSubmit(e)}
			>
				<div className=" login-group ">
					<div className="input-group my-5 ">
						<div className="input-group-prepend">
							<span className="span-text" id="basic-addon1">
								user name
							</span>
						</div>

						<input
							id="username"
							type="text"
							className="form-control"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						></input>
					</div>
					<div className="input-group my-5 ">
						<div className="input-group-prepend">
							<span className="span-text" id="basic-addon">
								Password
							</span>
						</div>
						<input
							id="password"
							type="password"
							className="form-control"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></input>
					</div>
					<div className="message">{user && <div>{user.message}</div>}</div>
					<button type="submit" className=" blueButton text-uppercase btn">
						Login
					</button>
				</div>
			</form>
			<Footer />
		</>
	);
};
export default Login;
