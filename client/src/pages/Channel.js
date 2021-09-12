import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import SingleChannelChart from "../components/SingleChannelChart";
import SingleUserData from "../components/SingleUserData";
import slack_logo from "../images/slack_logo.png";
import "./Home.css";

const Channel = () => {
	const { name, channelId } = useParams();
	const [userList, setUserList] = useState([]);
	const [channelData, setChannelData] = useState([]);
	const [averageMessages, setAverageMessages] = useState([]);
	const [averageReactions, setAverageReactions] = useState([]);
	const [numberOfUsers, setNumberOfUsers] = useState(0);

	useEffect(() => {
		fetch(`/api/channelUser/${channelId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setUserList(body);
				setNumberOfUsers(body.length);
			})
			.catch((err) => {
				console.error(err);
			});

		fetch(`/api/channelSum/${channelId}`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				let messagesArray = [];
				let reactionsArray = [];
				let lastTwoWeeks = body.slice(0, 2);
				lastTwoWeeks.forEach((element) => {
					messagesArray.push(element.total_message / numberOfUsers);
					reactionsArray.push(element.total_reaction / numberOfUsers);
				});
				setAverageMessages(messagesArray);
				setAverageReactions(reactionsArray);
				setChannelData(body.slice(0, 4));
			})
			.catch((err) => {
				console.error(err);
			});
	}, [channelId, numberOfUsers]);
	console.log(channelData);
	return (
		<main>
			<div>
				<h1 className="text-center">
					<img className="slack_logo" src={slack_logo} alt="Slack logo" />
					{name.replace(/^./, name[0].toUpperCase())} Channel Users
				</h1>
				<div className="chanelTableContainer">
					<Table borderless className="channelTable" responsive>
						<thead>
							<tr className="text-center thickBottomBorder">
								<th colSpan="2">Trainee</th>
								<th colSpan="2">Current week</th>
								<th colSpan="2">Previous week</th>
								{/* <th colSpan="2">Previous week</th>
								<th colSpan="2">Current week</th> */}
							</tr>
							<tr className="thickBottomBorder">
								<th>#</th>
								<th>User name</th>
								<th>Messages</th>
								<th>Reactions</th>
								<th>Messages</th>
								<th>Reactions</th>
							</tr>
						</thead>
						<tbody>
							{userList.map((user, index) => (
								<tr key={index}>
									<th scope="row">{index + 1}</th>
									<td className="usernameButton">
										<Link
											style={{
												textDecoration: "none",
												textTransform: "capitalize",
												color: "black",
												fontWeight: "lighter",
											}}
											to={{
												pathname: `/user/${channelId}/${user.id}/${user.real_name}`,
												state: {
													channelData,
													numberOfUsers,
												},
											}}
										>
											{/* <button className="usernameButton">{user.real_name}</button>
											 */}
											{user.real_name}
										</Link>
									</td>
									<SingleUserData
										channelId={channelId}
										userId={user.id}
										averageMessages={averageMessages}
										averageReactions={averageReactions}
									/>
									{/* {console.log(user.id)} */}
								</tr>
							))}
						</tbody>
					</Table>
				</div>
			</div>
			<div>
				<SingleChannelChart
					messagesDataSet={averageMessages}
					reactionsDataSet={averageReactions}
				/>
			</div>
		</main>
	);
};

export default Channel;
