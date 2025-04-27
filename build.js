// Imports the function to render React components to HTML markup
import { renderToStaticMarkup } from "react-dom/server";

// Imports React's createElement function and rename it 'h' for shorthand
import { createElement as h } from "react";

// Imports the main App component
import App from "./app.js";

// Imports file system utilities from Node.js
import {
  readFileSync, // To read files
  writeFileSync, // To write files
  existsSync, // To check if a path exists
  mkdirSync, // To create directories
  readdirSync, // To read directory contents
  unlinkSync, // To delete files
} from "node:fs";

// Import utilities to work with file paths
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

// Get the current file's absolute path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set the output directory for built files (e.g., ./dist)
const distDir = path.join(__dirname, "dist");

// Read the base HTML template (probably a simple HTML file with <!-- ROOT --> placeholder)
const shell = readFileSync(path.join(__dirname, "index.html"), "utf8");

// Render the App component into static HTML markup
const app = renderToStaticMarkup(h(App));

// Replace the <!-- ROOT --> placeholder in the template with the rendered App HTML
const html = shell.replace("<!-- ROOT -->", app);

// Check if the dist folder exists
if (!existsSync(distDir)) {
  // If not, create it
  mkdirSync(distDir);
} else {
  // If it does exist, clean it by deleting all existing files
  const files = readdirSync(distDir);
  for (const file of files) {
    unlinkSync(path.join(distDir, file));
  }
}

// Write the final HTML to dist/index.html
writeFileSync(path.join(distDir, "index.html"), html);

// Log the output directory to the console
console.log(`Output written to ${distDir}/index.html`);
