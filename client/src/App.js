import React from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import "./App.css";

import Admin from "./pages/admin-page";
import HomePage from "./pages/home-page";
import About from "./pages/about-page";

class App extends React.Component {
	state = {
		path: "/",
	};

	handleOnClick = path => {
		this.setState({ path });
	};

	render() {
		return (
			<div className="App">
				<h1>Esperança Project</h1>
				<BrowserRouter>
					<ul>
						<li>
							<NavLink exact activeClassName="active-item" to="/">
								Home Page
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="active-item" to="/admin">
								Admin
							</NavLink>
						</li>
						<li>
							<NavLink activeClassName="active-item" to="/about">
								About Us
							</NavLink>
						</li>
					</ul>
					<Switch>
						<Route exact path="/" children={HomePage} />
						<Route path="/admin" children={Admin} />
						<Route path="/about" children={About} />
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
