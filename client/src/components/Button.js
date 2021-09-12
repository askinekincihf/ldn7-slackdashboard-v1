import { Button } from "reactstrap";

const ChannelButton = ({ setToken }) => {
	return (
		<div>
			<Button
				className="getStartedButton"
				onClick={() => {
					setToken("Home");
				}}
			>
				Get started
			</Button>{" "}
		</div>
	);
};

export default ChannelButton;
