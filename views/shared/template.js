export default function template(title, main) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <header>
        <h1>${title}</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        ${main}
      </main>
      <footer>
        &copy; 2025 Eduardo Zuniga
      </footer>
    </body>
    </html>
  `;
}