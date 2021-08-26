// let body = [
// 	{
// 		week_no: 31,
// 		channel_id: "C027M110K9T",
// 		total_message: "0",
// 		total_reaction: "0",
// 	},
// 	{
// 		week_no: 30,
// 		channel_id: "C027M110K9T",
// 		total_message: "19",
// 		total_reaction: "15",
// 	},
// 	{
// 		week_no: 29,
// 		channel_id: "C027M110K9T",
// 		total_message: "11",
// 		total_reaction: "13",
// 	},
// 	{
// 		week_no: 28,
// 		channel_id: "C027M110K9T",
// 		total_message: "2",
// 		total_reaction: "2",
// 	},
// 	{
// 		week_no: 27,
// 		channel_id: "C027M110K9T",
// 		total_message: "7",
// 		total_reaction: "5",
// 	},
// ];

export function getWeeklyMessageAverage(channelData, numberOfUsers) {
	let fourWeeksData = channelData.slice(0, 4);

	let averageMessagesArray = fourWeeksData.map((obj) => {
		const averagePerUser = parseInt(obj.total_message) / numberOfUsers;
		return averagePerUser.toFixed(1);
	});

	return averageMessagesArray;
}

export function getWeeklyReactionAverage(channelData, numberOfUsers) {
	let fourWeeksData = channelData.slice(0, 4);

	let averageReactionsArray = fourWeeksData.map((obj) => {
		const averagePerUser = parseInt(obj.total_reaction) / numberOfUsers;
		return averagePerUser.toFixed(1);
	});

	return averageReactionsArray;
}
