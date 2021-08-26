import ChannelButton from "../components/Button";
import Footer from "../components/Footer";
import "./Home.css";
import PropTypes from "prop-types";
import { CohortList } from "../components/CohortList";

const Home = ({ setToken }) => {
	Home.propTypes = {
		setToken: PropTypes.func.isRequired,
	};

	return (
		<main>
			<div className="introMessage">
				<h3>Hi there, welcome to CYF Slacktastic dashboard!</h3>
				<h4>
					This site allows you to access all sorts of stats about the Code Your
					Future slack channels and users.
				</h4>
			</div>
			<ChannelButton setToken={setToken} />
			<Footer />
		</main>
	);
};
export default Home;
