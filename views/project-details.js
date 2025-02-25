import template from "./shared/template.js";

export default function projectDetails(title, data) {
  return template(
    title,
    `
        <h2>${data.title}</h2>
        <p>${data.summary}</p>
        <ul>
            ${data.tech.map((tech) => `<li>${tech}</li>`).join("")}
        </ul>
        <img src="${data.screenshot}" alt="${data.title} Screenshot">
    `
  );
}
