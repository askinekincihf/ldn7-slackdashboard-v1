import "../pages/Home.css";
import { Link } from "react-router-dom";
import { BsPersonBoundingBox } from "react-icons/bs";

const HomeUserButtons = ({ content, setToken }) => {
	const role = content == "Admin" ? 3 : content == "Mentor" ? 2 : 1;
	function onClick() {
		setToken("Home");
	}
	return (
		<div>
			<Link
				to={{
					pathname: `/login/${role}`,
				}}
				onClick={onClick}
			>
				<button className="userButton">
					<BsPersonBoundingBox className="userIconBs" />
					{content}
				</button>
			</Link>
		</div>
	);
};

export default HomeUserButtons;
