import express from "express";
import cors from "cors";
import path from "path";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

const publicPath = path.join(import.meta.dirname, "../public");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);

export default app;