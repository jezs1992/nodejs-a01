import template from "./shared/template.js";

export const contact = (title) => {
  return template(
    title,
    `
            <h2>Contact Me</h2>
            <form action="/contact" method="POST">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                <label for="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
                <button type="submit">Send</button>
            </form>
        `
  );
};

export const postContact = (title, data) => {
  return template(
    title,
    `
                ${data}
        `
  );
};
