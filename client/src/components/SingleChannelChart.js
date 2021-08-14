import { Bar } from "react-chartjs-2";

const SingleChannelChart = (props) => {
	const state = {
		data: {
			labels: ["Current Week", "Previous Week"],
			datasets: [
				{
					label: "Messages",
					backgroundColor: "#ffa600",
					borderColor: "#003f5c",
					borderWidth: 1,
					hoverBackgroundColor: "#ff7c43",
					hoverBorderColor: "#003f5c",
					data: props.messagesDataSet,
				},

				{
					label: "Reactions",
					backgroundColor: "#ff6361",
					borderColor: "#003f5c",
					borderWidth: 1,
					hoverBackgroundColor: "#d45087",
					hoverBorderColor: "#003f5c",
					data: props.reactionsDataSet,
				},
			],
		},
	};
	const options = {
		responsive: true,
		legend: {
			display: false,
		},
		type: "bar",
	};
	return (
		<div className="chart">
			<Bar data={state.data} options={options} />
		</div>
	);
};

export default SingleChannelChart;
