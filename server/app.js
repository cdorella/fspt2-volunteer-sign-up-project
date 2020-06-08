require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const apiRoutes = require("./api");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.get('/super-duper/:toWhom', (req, res) => {
	const { toWhom } = req.params

	res.send({
		message: `This is a super duper for ${toWhom}`
	})
})

app.get("/", (req, res) => {
	res.send({
		message: "Hello World",
	});
});

app.listen(process.env.API_PORT, () => {
	console.log(`Starting server in PORT ${process.env.API_PORT}`);
});
