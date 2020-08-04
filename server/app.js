require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const clientPath = path.join(__dirname, "../", "client", "build");
const apiRoutes = require("./api");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(clientPath));

app.use("/api", apiRoutes);

app.get("/*", function (req, res) {
	res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(process.env.PORT, () => {
	console.log(`Starting server in PORT ${process.env.PORT}`);
});
