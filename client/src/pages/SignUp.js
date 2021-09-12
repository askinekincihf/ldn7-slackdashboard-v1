import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "axios";
import { useLocation, useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = ({ setToken }) => {
	const classes = useStyles();
	SignUp.propTypes = {
		setToken: PropTypes.func.isRequired,
	};
	const role = useLocation().pathname.split("/")[2];
	const user = useSelector(selectUser);
	const history = useHistory();
	async function SignUpUser(credentials) {
		if (!validEmail) {
			return axios.post(`/api/signUp`, credentials);
		}
	}
	const [name, setName] = useState(" ");
	const [userId, setUserId] = useState(role == 2 ? "mentor" : "");
	const [email, setEmail] = useState(" ");
	const [password, setPassword] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const isValidEmail = (email) => {
		const result = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
		return result;
	};
	const validateEmail = (e) => {
		const email = e.target.value;
		if (!email || isValidEmail(email)) {
			setValidEmail(false);
		} else {
			setValidEmail(true);
		}
	};

	const handleClickLogin = () => {
		setToken("Home");
		history.push(`/login/${role}`);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		SignUpUser({
			name,
			userId,
			email,
			password,
		})
			.then((result) => {
				setToken(false);
				// const path =
				// 	role == 2 ? "/cohorts" : role == 1 ? `/channels/${userId}` : "";
				const isSuccess = result.data.message == "Done" && !validEmail;
				isSuccess && history.push("/Home");
			})
			.catch(() => {});
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form
					className={classes.form}
					onSubmit={(e) => handleSubmit(e)}
					noValidate
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="name"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="MemberID"
								label="Member ID"
								name="MemberID"
								autoComplete="Member-ID"
								disabled={role == "2"}
								value={role == "2" ? "mentor" : userId}
								onChange={(e) => setUserId(e.target.value)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								type="email"
								value={email}
								error={validEmail}
								helperText={validEmail ? "Please enter a valid Email" : " "}
								onChange={(e) => setEmail(e.target.value)}
								onBlur={validateEmail}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link variant="body2" onClick={handleClickLogin}>
								Already have an account? Login
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};
export default SignUp;
