import template from "./template.js";

export default function notFound(title, request) {
  return template(
    title,
    `
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <p>Request: ${request}</p>
            <a href="/">Return to Home</a>
        `
  );
}
