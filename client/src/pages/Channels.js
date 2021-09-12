import { useState, useEffect } from "react";
// TO BE USED with real data
// import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import TableHead from "../components/TableHead";
import TableRow from "../components/TableRow";

const Channels = () => {
	// TO BE USED with real data
	// const { cohortId, cohortName } = useParams();

	const [channelList, setChannelList] = useState([]);

	// TO BE USED with real data
	// useEffect(() => {
	// 	fetch(`/api/channels/${cohortId}`)
	// 		.then((res) => {
	// 			if (!res.ok) {
	// 				throw new Error(res.statusText);
	// 			}
	// 			return res.json();
	// 		})
	// 		.then((body) => {
	// 			console.log(body);
	// 			setChannelList(body);
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 		});
	// }, []);

	useEffect(() => {
		fetch("/api/channelList")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setChannelList(body.channels);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<main className="allChannelsTableContainer">
			<Table borderless hover className="table" responsive>
				<thead className="text-center">
					<TableHead />
				</thead>
				<tbody className="text-center">
					{channelList.map((channel, index) => (
						<TableRow channel={channel} key={index} />
					))}
				</tbody>
			</Table>
		</main>
	);
};

export default Channels;
