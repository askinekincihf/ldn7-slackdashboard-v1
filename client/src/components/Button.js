import { Button } from "reactstrap";

const ChannelButton = ({ setToken }) => {
	return (
		<div className="text-center">
			<Button
				className="linkButtons blueButton"
				onClick={() => {
					setToken("Home");
					history.push("/channels");
				}}
			>
				Get started
			</Button>{" "}
		</div>
	);
};

export default ChannelButton;
