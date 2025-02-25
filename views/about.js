import template from "./shared/template.js";

export default function about(title, data) {
  return template(
    title,
    `
        <h2>About Me</h2>
        <p>${data}</p>
    `
  );
}
