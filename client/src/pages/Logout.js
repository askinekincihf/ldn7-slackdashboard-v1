import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Logout = ({ setToken }) => {
	const user = useSelector(selectUser);
	console.log(user);
	Logout.propTypes = {
		setToken: PropTypes.func.isRequired,
	};
	const history = useHistory();
	async function logout() {
		return fetch(`/api/logout`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		}).then((data) => data.json());
	}
	const dispatch = useDispatch();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await logout();
		console.log(result);
		setToken(false);
		history.push(`/`);
		dispatch(
			login({
				name: "",
				loggedIn: false,
				message: "",
				userId: "",
			})
		);
	};
	return <></>;
};

export default Logout;
