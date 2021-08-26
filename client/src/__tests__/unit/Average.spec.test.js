import {
	getWeeklyMessageAverage,
	getWeeklyReactionAverage,
} from "../../utility/Averages";

describe("Averages; getWeeklyMessageAverage", () => {
	const testBody = [
		{
			week_no: 1,
			channel_id: "XYZ123",
			total_message: "10",
			total_reaction: "20",
		},
		{
			week_no: 2,
			channel_id: "ABC456",
			total_message: "12",
			total_reaction: "10",
		},
	];

	it("should get the correct weekly averages for messages", () => {
		// Given [precondition]
		const numberOfUsers = 2;

		// When [action]
		const result = getWeeklyMessageAverage(testBody, numberOfUsers);

		// Then [assertion]
		const expectedResult = ["5.0", "6.0"];
		expect(result).toEqual(expectedResult);
	});

	it("should get the correct weekly averages for reactions", () => {
		// Given [precondition]
		const numberOfUsers = 4;

		// When [action]
		const result = getWeeklyReactionAverage(testBody, numberOfUsers);

		// Then [assertion]
		const expectedResult = ["5.0", "2.5"];
		expect(result).toEqual(expectedResult);
	});
});
