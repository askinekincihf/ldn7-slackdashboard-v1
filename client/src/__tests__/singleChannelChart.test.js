import React from "react";
import renderer from "react-test-renderer";
import SingleChannelChart from "../components/SingleChannelChart";

describe("SingleUserChart", () => {
	it("should render a chart for a single channel correctly", () => {
		const component = renderer.create(<SingleChannelChart />).toJSON();

		expect(component).toMatchSnapshot();
	});
});
