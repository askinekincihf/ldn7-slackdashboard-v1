import { useState } from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import "../pages/Home.css";

const CohortSearchField = ({ updateValue }) => {
	const [input, setInput] = useState("");

	function onChange(event) {
		setInput(event.target.value);
		updateValue(event.target.value);
	}

	function clearInput() {
		setInput("");
		updateValue("");
	}

	return (
		<>
			<div>
				<TextField
					className="searchCohort"
					placeholder="Search a cohort"
					type="text"
					value={input}
					variant="outlined"
					size="small"
					onChange={onChange}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),

						endAdornment: (
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => clearInput()}
							>
								<CancelRoundedIcon />
							</IconButton>
						),
					}}
				/>
				<div>
					<hr className="dividerLine" />
				</div>
			</div>
		</>
	);
};

export default CohortSearchField;
