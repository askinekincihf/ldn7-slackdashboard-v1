import React from "react";
import "../pages/Home.css";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
	return (
		<footer className="container-fluid">
			<Container maxWidth="lg">
				<Typography className="myFooter">
					<span>
						&copy; Code Your Future 2021 | All rights reserved | Registered
						charity 1174929
					</span>
				</Typography>
			</Container>
		</footer>
	);
};

export default Footer;
