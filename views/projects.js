import template from "./shared/template.js";

export default function projects(title, data) {
  return template(
    title,
    `
        <h2>My Projects</h2>
        <input type="text" placeholder="Search projects...">
        ${data}
    `
  );
}
