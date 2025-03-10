import { Project } from '../models/index.js';
import projectsView from '../views/projects.js';
import projectDetailsView from '../views/project-details.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    if (req.query.format === 'json') {
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
        <br>
        <a href="/projects/${project._id}">View Details</a>
      </div>
    `
      )
      .join("");

    res.send(projectsView('My Projects', projectsHtml));
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).send('Server Error');
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).send('Project not found');
    }

    if (req.query.format === 'json') {
      return res.json(project);
    }

    res.send(projectDetailsView(`Project Details - ${project.title}`, project));
  } catch (error) {
    console.error('Error fetching project:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).send('Project not found');
    }
    
    res.status(500).send('Server Error');
  }
};

export const searchProjects = async (req, res) => {
  try {
    const searchTerm = req.query.query;

    if (!searchTerm) {
      return res.status(400).send('Search term is required');
    }

    const results = await Project.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { summary: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    if (req.query.format === 'json') {
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
        <br>
        <a href="/projects/${project._id}">View Details</a>
      </div>
    `).join('');

    res.send(projectsView(`Search Results for "${searchTerm}"`, resultsHtml));
  } catch (error) {
    console.error('Error searching projects:', error);
    res.status(500).send('Server Error');
  }
};
