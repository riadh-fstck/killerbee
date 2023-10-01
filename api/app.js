import express from "express";
import mongoose from "mongoose";
import cron from "node-cron";
import dotenv from "dotenv";
import auth from "./src/router/authRouter.js";
import users from "./src/router/usersRouter.js";
import categories from "./src/router/categoriesRouter.js";
import brands from "./src/router/brandsRouter.js";
import models from "./src/router/modelsRouter.js";
import sequelize from "./src/config/sequelize-config.js";
import mailTransporter from "./src/config/mail-config.js";
import passwordRenewal from "./src/scripts/passwordRenewal.js";

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
app.use("/users", users);
app.use("/categories", categories);
app.use("/brands", brands);
app.use("/models", models);

// CRON job
cron.schedule("0 0 * * *", async () => {
	passwordRenewal();
});

// MongoDB
try {
	await mongoose.connect(process.env.MONGODB_URI);
	console.log("Connected to MongoDB");
} catch (e) {
	console.error(`Error connecting to MongoDB: ${e}`);
}

// Sequelize
try {
	await sequelize.authenticate();
	console.log("Connected to postgres");
} catch (e) {
	console.error(`Error connecting to postgres: ${e}`);
}

//mail
try {
	await mailTransporter.verify();
	console.log("SMTP server authentification succeed");
} catch (e) {
	console.error(`Error connecting to mail: ${e}`);
}

export default app;
