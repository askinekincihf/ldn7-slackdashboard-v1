import React, { useEffect, useState } from "react";
import arrow from "../images/arrow.png";
import "../pages/Home.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const TableRow = ({ channel }) => {
	const [channelData, setChannelData] = useState([]);
	const [numberOfUsers, setNumberOfUsers] = useState(0);
	const [userList, setUserList] = useState([]);
	const [averageMessages, setAverageMessages] = useState([]);
	const [averageReactions, setAverageReactions] = useState([]);
	const [selectedRow, setSelectedRow] = useState(false);
	const user = useSelector(selectUser);
	const role = user.userId;
	const path =
		role == "mentor"
			? `/channel/${channel.name}/${channel.id}`
			: `/user/${channel.id}/${role}/${user.name}`;
	function rowSelected() {
		setSelectedRow(!selectedRow);
	}
	useEffect(() => {
		fetch(`/api/channelUser/${channel.id}`)
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
		fetch(`/api/channelSum/${channel.id}`)
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
	}, [channel.id, numberOfUsers]);
	return (
		<tr className={selectedRow ? "selectedRow" : " "} onClick={rowSelected}>
			<th scope="row">
				<Link
					style={{
						textDecoration: "none",
						textTransform: "capitalize",
						color: "black",
						fontWeight: "lighter",
					}}
					// TO BE USED with real data
					// to={`/channel/${channel.channel_name}/${channel.channel_id}`}
					to={{
						pathname: path,
						state: {
							channelData,
							numberOfUsers,
						},
					}}
				>
					{/* TO BE USED with real data */}
					{/* {channel.channel_name} */}
					{channel.name}
				</Link>
			</th>
			<td>
				<Link
					style={{
						textDecoration: "none",
						color: "black",
						fontWeight: "lighter",
					}}
					// TO BE USED with real data
					// to={`/channel/${channel.channel_name}/${channel.channel_id}`}
					to={{
						pathname: path,
						state: {
							channelData,
							numberOfUsers,
						},
					}}
				>
					{channel.num_members}
				</Link>
			</td>
			<td className="arrowSelector">
				<Link
					style={{
						textDecoration: "none",
						color: "black",
						fontWeight: "lighter",
					}}
					// TO BE USED with real data
					// to={`/channel/${channel.channel_name}/${channel.channel_id}`}
					to={{
						pathname: path,
						state: {
							channelData,
							numberOfUsers,
						},
					}}
				>
					{<img className="arrow" src={arrow} alt="arrow" />}
				</Link>
			</td>
		</tr>
	);
};

export default TableRow;
