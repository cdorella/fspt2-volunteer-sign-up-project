require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const apiRoutes = require("./api");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
	res.send({
		message: "Hello World",
	});
});

app.listen(process.env.PORT, () => {
	console.log(`Starting server in PORT ${process.env.PORT}`);
});
