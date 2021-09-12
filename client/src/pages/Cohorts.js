import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import CohortSearchField from "../components/CohortSearchField";
import CohortCard from "../components/CohortCard";
import slack_logo from "../images/slack_logo.png";
import "./Home.css";
// import mockCohortList from "../data/fakeData.json";

const Cohorts = () => {
	// const [cohortList, setCohortList] = useState(mockCohortList);
	// PERHAPS ADD CHECK TO ENSURE YOU GET THE RIGHT DATA TYPE
	const [cohortList, setCohortList] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	function updateValue(value) {
		setSearchValue(value);
	}

	useEffect(() => {
		fetch("/api/cohortList")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((data) => {
				setCohortList(data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	// const cohort_values = Object.values(mockCohortList);

	return (
		<div>
			<h1 className="cohortTitle">
				<img className="slack_logo" src={slack_logo} alt="Slack logo" />
				Cohorts
			</h1>
			<div className="cohortContainer">
				<CohortSearchField updateValue={updateValue} />
			</div>
			<div className="cohortCardContainer">
				{cohortList.length > 0 ? (
					<Grid container spacing={4}>
						{cohortList
							.filter((cohort) => {
								if (
									searchValue == "" ||
									cohort.cohort_name
										.toLowerCase()
										.includes(searchValue.toLowerCase())
								) {
									return cohort;
								}
							})
							.map((cohort, index) => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
									<CohortCard
										cohortName={cohort.cohort_name}
										cohortId={cohort.id}
									/>
								</Grid>
							))}
					</Grid>
				) : (
					<div className="circularProgressContainer">
						<CircularProgress className="circularProgress" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Cohorts;
