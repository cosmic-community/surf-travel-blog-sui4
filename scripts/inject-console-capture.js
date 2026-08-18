const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, results) {
  results = results || [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath, results);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }

  return results;
}

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

  if (content.includes('dashboard-console-capture.js')) {
    return;
  }

  if (content.includes('</head>')) {
    content = content.replace('</head>', `${scriptTag}</head>`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected console capture script into ${filePath}`);
  }
}

function main() {
  const buildDirs = ['.next/server/pages', '.next/server/app', 'out', 'dist', 'build'];

  for (const dir of buildDirs) {
    const fullDir = path.join(process.cwd(), dir);
    if (fs.existsSync(fullDir)) {
      const htmlFiles = findHtmlFiles(fullDir, []);
      for (const file of htmlFiles) {
        injectScript(file);
      }
    }
  }
}

main();