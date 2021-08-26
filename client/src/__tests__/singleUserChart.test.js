import React from "react";
import renderer from "react-test-renderer";
import SingleUserChart from "../components/SingleUserChart";

describe("SingleUserChart", () => {
	it("should render a chart for a single user correctly", () => {
		const component = renderer.create(<SingleUserChart />).toJSON();

		expect(component).toMatchSnapshot();
	});
});
