import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "reactstrap";
import "./admin-page.css";

const Admin = () => {
	return (
		<div>
			<h1>Admin Page</h1>
			<hr />
			<h5>Welcome Admin</h5>
			<br></br>
			<Button className="admin_button" color="success">
				Click here to add new event:
			</Button>
			<hr />
		</div>
	);
};

export default Admin;
