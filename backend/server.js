import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { error404, error500 } from "./middlewares/errorMiddlewares.js";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 8080;
const __dirname = path.resolve();

dotenv.config();

if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

connectDB();

app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/frontend/build", "index.html"));
    });
}

app.use(error404);
app.use(error500);

app.listen(port, () => console.log(`listening on ${port}`));
