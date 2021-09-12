import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SingleUserChart from "../components/SingleUserChart";
import "./Home.css";
// import notFound from "../images/unknown_profile.png";
import {
	getWeeklyMessageAverage,
	getWeeklyReactionAverage,
} from "../utility/Averages";

const SingleUser = () => {
	const location = useLocation();
	const { userId, channelId, userName } = useParams();
	const [userData, setUserData] = useState(null);
	const channelData = location.state?.channelData;
	const numberOfUsers = location.state?.numberOfUsers;

	useEffect(() => {
		fetch(`/api/userSum/${channelId}/${userId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setUserData(body.splice(0, 4).reverse());
			})
			.catch((err) => {
				console.error(err);
			});
	}, [channelId, userId]);

	const messagesChannelAverage = getWeeklyMessageAverage(
		channelData,
		numberOfUsers
	);
	const reactionsChannelAverage = getWeeklyReactionAverage(
		channelData,
		numberOfUsers
	);

	return (
		<main role="main">
			<div className="container">
				<div className="username">{userName}</div>
				<div className="userDetails">
					{/* <img
						className="profilePic"
						data-qa="logo"
						src={notFound}
						alt="profile pic"
					/> */}
					<div className="userStats"></div>
				</div>
			</div>
			<div>
				{userData ? (
					<SingleUserChart
						messagesDataSet={userData.map((message) => message.total_message)}
						reactionsDataSet={userData.map(
							(reaction) => reaction.total_reaction
						)}
						label={userData.map((week) => `Week ${week.week_no}`)}
						averageMessages={messagesChannelAverage}
						averageReactions={reactionsChannelAverage}
					/>
				) : null}
			</div>
		</main>
	);
};

export default SingleUser;
