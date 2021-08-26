import React from "react";
import renderer from "react-test-renderer";
import TableHead from "../components/TableHead";

describe("TableHead", () => {
	it("should render table head correctly", () => {
		const component = renderer.create(<TableHead />).toJSON();

		expect(component).toMatchSnapshot();
	});
});
