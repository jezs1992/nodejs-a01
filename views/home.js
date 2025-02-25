import template from "./shared/template.js";

export default function home(title, data) {
  return template(
    title,
    `
        <h2>Welcome to My Node.js Portfolio</h2>
        <p>${data}</p>
    `
  );
}
