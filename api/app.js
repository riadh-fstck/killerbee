import express from "express";
import mongoose from "mongoose";
import auth from "./src/router/authRouter.js";
import users from "./src/router/usersRouter.js";
import dotenv from "dotenv";
import sequelize from "./src/config/sequelize-config.js";
import mailTransporter from "./src/config/mail-config.js";

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

app.use("/auth", auth);
app.use("/users", users);

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
