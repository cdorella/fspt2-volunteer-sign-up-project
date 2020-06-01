import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import HomePage from "./pages/home-page";
import Admin from "./pages/admin-page";
import About from "./pages/about-page";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			path: "/",
		};
	}

	handleOnClick = path => {
		this.setState({ path });
	};

	render() {
		return (
			<div className="App">
				<div className="page-container">
					<div className="content-wrap">
						<BrowserRouter>
							<div className="main-header">
								<div className="clearfix">
									<div className="float-left">
										<NavLink className="link" to="/">
											<h6>Home Page</h6>
										</NavLink>
									</div>
									<div className="float-right">
										<NavLink className="link" to="/about">
											<h6>About us</h6>
										</NavLink>
									</div>
								</div>
							</div>

							<Switch>
								<Route exact path="/" component={HomePage}>
									<HomePage />
								</Route>
								<Route path="/admin" component={Admin}>
									<Admin />
								</Route>
								<Route path="/about" component={About}>
									<About />
								</Route>
							</Switch>

							<div className="clearfix">
								<div className="main-footer">
									<div className="float-left">
										<NavLink className="link" to="/admin">
											<h6>Admin Access</h6>
										</NavLink>
									</div>
									<div className="float-right">
										<h6>
											{" "}
											Made in Barcelona with 🤍 &copy;{new Date().getFullYear()}
										</h6>
									</div>
								</div>
							</div>
						</BrowserRouter>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
