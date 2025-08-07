const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = 3000;

// Load env vars
dotenv.config();

// Convert env vars to key-value array for rendering
const envVars = Object.entries(process.env)
  .filter(([key]) => !key.startsWith('npm_')) // ignore npm's internal vars
  .map(([key, value]) => ({ key, value }));

// Serve HTML
app.get('/', (req, res) => {
  let html = `
    <h1>Environment Variables</h1>
    <table border="1" cellpadding="5">
      <tr><th>Key</th><th>Value</th></tr>
  `;

  envVars.forEach(({ key, value }) => {
    html += `<tr><td>${key}</td><td>${value}</td></tr>`;
  });

  html += `</table>`;
  res.send(html);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
