import express from "express";
import morgan from "morgan";
import path from "path";
import { home, projects, about, contact } from "./data.js";
import homeView from "./views/home.js";
import aboutView from "./views/about.js";
import projectsView from "./views/projects.js";
import projectDetailsView from "./views/project-details.js";
import {
  contact as contactView,
  postContact as postContactView,
} from "./views/contact.js";
import notFoundView from "./views/shared/404.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

// Routes
app.get("/", (req, res) => {
  if (req.query.format === "json") {
    return res.json(home);
  }
  res.send(homeView("Welcome to My Node.js Portfolio", home.bio));
});

app.get("/about", (req, res) => {
  if (req.query.format === "json") {
    return res.json(about);
  }
  res.send(aboutView("About Me", about.bio));
});

app.get("/projects", (req, res) => {
  if (req.query.format === "json") {
    return res.json(projects);
  }

  const projectsHtml = projects
    .map(
      (project) => `
    <div class="project-card">
      <h2>${project.title}</h2>
      <p>${project.summary}</p>
      <ul>
        ${project.tech.map((tech) => `<li>${tech}</li>`).join("")}
      </ul>
      <img src="${project.screenshot}" alt="${project.title} Screenshot">
      <a href="/projects/${project.id}">View Details</a>
    </div>
  `
    )
    .join("");

  res.send(projectsView("My Projects", projectsHtml));
});

app.get("/projects/:id", (req, res) => {
  const projectId = parseInt(req.params.id, 10);
  const selectedProject = projects.find((project) => project.id === projectId);
  if (!selectedProject) {
    return res.status(404).send("Project not found");
  }
  if (req.query.format === "json") {
    return res.json(selectedProject);
  }
  res.send(
    projectDetailsView(`Project Details - ${projectId}`, selectedProject)
  );
});

app.get("/projects/search", (req, res) => {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    return res.status(400).send("Search term is required");
  }

  const results = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (req.query.format === "json") {
    return res.json({
      searchTerm,
      results
    });
  }

  const resultsHtml = results.map(project => `
    <div class="project-card">
      <h2>${project.title}</h2>
      <p>${project.summary}</p>
      <ul>
        ${project.tech.map(tech => `<li>${tech}</li>`).join('')}
      </ul>
      <img src="${project.screenshot}" alt="${project.title} Screenshot">
      <a href="/projects/${project.id}">View Details</a>
    </div>
  `).join('');

  res.send(projectsView(`Search Results for "${searchTerm}"`, resultsHtml));
});

app.get("/contact", (req, res) => {
  if (req.query.format === "json") {
    return res.json(contact);
  }
  res.send(contactView("Contact Me"));
});

app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send(
    postContactView("Contact Me", "<h1>Thank you for reaching out!</h1>")
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send(notFoundView("Page Not Found", req.path));
});
