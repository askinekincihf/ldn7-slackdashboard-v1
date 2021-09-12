import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Logout = ({ setToken }) => {
	const user = useSelector(selectUser);
	Logout.propTypes = {
		setToken: PropTypes.func.isRequired,
	};
	const history = useHistory();

	const dispatch = useDispatch();

	fetch("/api/logout", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	});
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

	return <div></div>;
};
export default Logout;
