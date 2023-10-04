import express from "express";
import dotenv from "dotenv";
import auth from "./src/router/authRouter.js";
import users from "./src/router/usersRouter.js";
import sequelize from "./src/config/sequelize-config.js";
import models from "./src/router/modelsRouter.js";
import processes from "./src/router/processesRouter.js";
import ingredients from "./src/router/ingredientsRouter.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

// Routes
app.use("/auth", auth);
app.use("/users", users)
app.use("/models", models);
app.use("/processes", processes);
app.use("/ingredients", ingredients);

// Sequelize
try {
	await sequelize.authenticate();
	console.log("Connected to postgres");
} catch (e) {
	console.error(`Error connecting to postgres: ${e}`);
}

export default app;
