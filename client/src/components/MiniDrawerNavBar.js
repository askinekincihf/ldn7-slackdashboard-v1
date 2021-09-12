import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, AppBar, Toolbar, CssBaseline } from "@material-ui/core";
import { Divider, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import LoginIcon from "@material-ui/icons/AccountCircle";
import ContactIcon from "@material-ui/icons/ContactPhoneSharp";
import HomeIcon from "@material-ui/icons/HomeSharp";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Footer from "./Footer";
import cyfBrand from "../images/cyf_brand.png";
import Avatar from "@material-ui/core/Avatar";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	purple: {
		color: theme.palette.getContrastText(deepPurple[500]),
		backgroundColor: deepPurple[500],
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		backgroundColor: "#EED2EE",
		float: "right",
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
		color: "#800080",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
		"& .MuiBackdrop-root": {
			display: "none",
		},
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "rgba(120,120,120,0.2)",
		PaperProps: { elevation: 9 },
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	navbarlinks: {
		textDecoration: "none",
		fontFamily: "Varela Round",
		color: "black",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	footer: {
		zIndex: theme.zIndex.drawer + 10000,
		position: theme.relative,
	},
}));

const MiniDrawerNavBar = ({ children }) => {
	// const history = useHistory();
	const user = useSelector(selectUser);
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const openCloseDrawer = () => {
		open ? setOpen(false) : setOpen(true);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={clsx(classes.appBar)}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={openCloseDrawer}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open,
						})}
					>
						{open ? <CancelPresentationIcon /> : <MenuIcon />}
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						onClick={() => window.open("https://codeyourfuture.io/about/")}
					>
						<img className="cyf_logo" src={cyfBrand} alt="CYF logo" />
					</Typography>
					<Avatar className={classes.orange}>
						{user && user.name.trim().charAt(0).toUpperCase()}
					</Avatar>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}>
					{/* DO NOT REMOVE - Padding for menu items */}
				</div>
				<Divider />
				<List>
					<Link to="/" className={classes.navbarlinks}>
						<ListItem button>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText>
								<span className={classes.navbarlinks}>Home</span>
							</ListItemText>
						</ListItem>
					</Link>

					<Link to="/login" className={classes.navbarlinks}>
						<ListItem button>
							<ListItemIcon>
								<LoginIcon />
							</ListItemIcon>
							<ListItemText>
								<span className={classes.navbarlinks}>Login</span>
							</ListItemText>
						</ListItem>
					</Link>

					<Link to="/logout" className={classes.navbarlinks}>
						<ListItem button>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText>
								<span className={classes.navbarlinks}>Logout</span>
							</ListItemText>
						</ListItem>
					</Link>

					<ListItem
						button
						className={classes.navbarlinks}
						onClick={() => window.open("https://codeyourfuture.io/")}
					>
						<ListItemIcon>
							<ContactIcon />
						</ListItemIcon>
						<ListItemText>
							<span className={classes.navbarlinks}>Contact</span>
						</ListItemText>
					</ListItem>
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
			<div>
				<Footer className={classes.footer} />
			</div>
		</div>
	);
};

export default MiniDrawerNavBar;
