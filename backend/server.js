import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import path from "path";

import productRoutes from "./routes/productRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

const __dirname = path.resolve();

console.log(process.env.MONGO_URI);

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {            
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});