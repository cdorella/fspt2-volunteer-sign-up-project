const express = require("express");
const db = require("./lib/db");
const router = express.Router();

router.get("/", (req, res) => {
	res.send({
		message: "Hello World",
	});
});

// ADD NEW EVENT
router.post("/events", (req, res) => {
	const { date, route, tasks } = req.body;

	const taskQuery = tasks.map(
		task =>
			`INSERT INTO tasks (task_name, task_description) VALUES ('${task.task_name}', '${task.task_description}'); 
			SELECT LAST_INSERT_ID() INTO @taskId; 
			INSERT INTO event_tasks (event_id, task_id, spots_available) VALUES (@eventId, @taskId, '${task.spots_available}');`
	);

	db(`INSERT INTO events (date, route) VALUES ('${date}','${route}'); 
			SELECT LAST_INSERT_ID() INTO @eventId; 
			${taskQuery.join("")}`)
		.then(() => res.status(201).send({}))
		.catch(err => res.status(500).send(err));
});

// GET EVENTS (DATE & ROUTE ONLY)
router.get("/events", (req, res) => {
	db("SELECT * FROM events ORDER BY date ASC;")
		.then(results => {
			if (results.error) {
				res.status(400).send({ message: "Error" });
			}
			res.send(results.data);
		})
		.catch(err => res.status(500).send(err));
});

// GET EVENTS (FULL INFORMATION)
router.get("/events/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const eventData = await db(`SELECT * FROM events where id=${id};`);
		const tasks = await db(
			`SELECT event_tasks.id, tasks.task_name, tasks.task_description, event_tasks.spots_available FROM event_tasks INNER JOIN tasks ON event_tasks.task_id = tasks.id WHERE event_tasks.event_id = ${id}`
		);

		res.send({
			id: eventData.data[0].id,
			date: eventData.data[0].date,
			route: eventData.data[0].route,
			tasks: tasks.data,
		});
	} catch (err) {
		res.status(500).send(err);
	}
});

// ADD VOLUNTEER
router.post("/registration", (req, res) => {
	const { first_name, last_name, email, phone_number } = req.body;
	db(
		`INSERT INTO volunteers (first_name, last_name, email, phone_number) VALUES ('${first_name}','${last_name}','${email}', '${phone_number}');
		SELECT LAST_INSERT_ID();`
	)
		.then(results => {
			console.log(results.data[0].insertId);
			if (!results.error) {
				res.status(201).send({ volunteer_id: results.data[0].insertId });
			}
		})
		.catch(err => res.status(500).send(err));
});

// MATCH VOLUNTEER TO SELECTED TASK
router.post("/events/attend", (req, res) => {
	const { selected_task_id, volunteer_id } = req.body;
	db(
		`INSERT INTO tasks_volunteers (selected_task_id, volunteer_id) VALUES ('${selected_task_id}','${volunteer_id}');`
	)
		.then(results => {
			if (!results.error) {
				res.status(201).send({});
			}
		})
		.catch(err => res.status(500).send(err));
});

// UPDATE SPOTS AVAILABLE
router.patch("/events/:id", (req, res) => {
	const { id } = req.params;
	const { spots_available } = req.body;

	db(
		`UPDATE event_tasks SET spots_available='${spots_available}' WHERE id='${id}';`
	)
		.then(results => {
			if (!results.error) {
				res.status(201).send({});
			}
		})
		.catch(err => res.status(500).send(err));
});

// GET VOLUNTEER PERSONAL INFO ***NOT CURRENTLY BEING USED
router.get("/volunteers/:id", (req, res) => {
	const { id } = req.params;
	db(`SELECT * from volunteers WHERE id='${id}';`)
		.then(results => {
			if (results.data[0]) {
				res.status(200).send(results.data[0]);
			}
			res.status(404).send({});
		})
		.catch(err => res.status(500).send(err));
});

// GET VOLUNTEERS & TASKS BY EVENT
router.get("/events/:id/volunteers", async (req, res) => {
	try {
		const { id } = req.params;
		const eventData = await db(`SELECT * FROM events where id=${id};`);
		const volunteers = await db(
			`SELECT tasks.task_name, volunteers.id, volunteers.first_name, volunteers.last_name, volunteers.email, volunteers.phone_number FROM tasks_volunteers INNER JOIN volunteers ON volunteers.id = tasks_volunteers.volunteer_id INNER JOIN event_tasks ON event_tasks.id = tasks_volunteers.selected_task_id INNER JOIN events ON events.id = event_tasks.event_id INNER JOIN tasks ON tasks.id = event_tasks.task_id WHERE events.id = '${id}';`
		);

		res.send({
			date: eventData.data[0].date,
			route: eventData.data[0].route,
			volunteers: volunteers.data,
		});
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
