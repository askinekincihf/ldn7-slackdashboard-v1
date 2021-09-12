import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import SaveIcon from "@material-ui/icons/Save";
import MenuItem from "@material-ui/core/MenuItem";

const tableIcons = {
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => (
		<ChevronLeft {...props} ref={ref} />
	)),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
};

tableIcons.NextPage.displayName = "NextPage";
tableIcons.FirstPage.displayName = "FirstPage";
tableIcons.LastPage.displayName = "LastPage";
tableIcons.PreviousPage.displayName = "PreviousPage";
tableIcons.ResetSearch.displayName = "ResetSearch";
tableIcons.Search.displayName = "Search";
tableIcons.SortArrow.displayName = "SortArrow";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));
const Approve = () => {
	const classes = useStyles();
	const [changes, setChanges] = useState([]);
	const [tableData, setTableData] = useState([]);

	const [status, setStatus] = useState("0");

	const handleChange = (value, rowData) => {
		setStatus(value);
		const tempData = tableData;
		const index = rowData.tableData.id;
		tempData[index].status = value;
		setTableData(tempData);
		const newChange = {
			id: index,
			email: rowData.email,
			status: rowData.status,
		};
		changes.push(newChange);
	};
	async function updateStatus(credentials) {
		return axios.put(`/api/approve`, credentials);
	}
	const handleClickSave = (event, rowData) => {
		const change = changes.find(
			(element) => element.id == rowData.tableData.id
		);

		const email = change.email;
		const status = change.status;

		updateStatus({ email, status })
			.then((result) => {
				alert(`The new status is saved for ${rowData.user_name}`);
			})
			.catch(() => {});

		// alert("You saved status of" + rowData.status);
	};
	useEffect(() => {
		fetch(`/api/request`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setTableData(body);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);
	return (
		<div className="container pt-5">
			<MaterialTable
				icons={tableIcons}
				title=""
				columns={[
					{
						title: "Name",
						field: "user_name",
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#FFF",
						},
					},
					{
						title: "Role",
						field: "role",
						lookup: { 1: "Trainee", 2: "Mentor" },
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#FFF",
						},
					},
					{
						title: "Email",
						field: "email",
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#FFF",
						},
					},
					{
						title: "Status",
						field: "status",
						headerStyle: {
							backgroundColor: "#01579b",
							color: "#FFF",
						},
						// eslint-disable-next-line react/display-name
						render: (rowData) => (
							<FormControl className={classes.formControl}>
								<Select
									labelId="label"
									id={rowData.email}
									value={rowData.status}
									onChange={(event) => {
										handleChange(event.target.value, rowData);
									}}
									className="text-secondary"
								>
									<MenuItem value={1}>Pending</MenuItem>
									<MenuItem value={2}>Reject</MenuItem>
									<MenuItem value={3}>Accept</MenuItem>
								</Select>
							</FormControl>
						),
					},
				]}
				data={tableData}
				actions={[
					{
						icon: SaveIcon,
						tooltip: "Save change status",
						onClick: handleClickSave,
					},
				]}
				options={{
					sorting: true,
					headerStyle: {
						backgroundColor: "#01579b",
						color: "#01579b",
					},
				}}
			/>
		</div>
	);
};

Approve.displayName = "Approve";

export default Approve;
