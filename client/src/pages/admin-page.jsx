import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "reactstrap";
import "./admin-page.css";

const Admin = () => {
	return (
		<div>
			<h1>Welcome Admin</h1>
			<hr />
			<br></br>
			<Button color="success">Click here to add new event:</Button>
		</div>
	);
};

export default Admin;
