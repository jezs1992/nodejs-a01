import express from "express";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import homeRoutes from "./routes/homeRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import notFoundView from "./views/shared/404.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;

await connectDB();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));


app.use("/", homeRoutes);
app.use("/about", aboutRoutes);
app.use("/projects", projectRoutes);
app.use("/contact", contactRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.use((req, res) => {
  res.status(404).send(notFoundView("Page Not Found", req.path));
});
