// deploy.js
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deploy() {
  try {
    // Copy 404.html to dist folder
    console.log('Copying 404.html to dist folder...');
    const html404Path = path.join(__dirname, '404.html');
    const distHtml404Path = path.join(__dirname, 'dist', '404.html');
    
    try {
      await fs.access(html404Path);
      await fs.copyFile(html404Path, distHtml404Path);
      console.log('404.html copied successfully');
    } catch (error) {
      console.error('Error copying 404.html:', error);
    }

    // Deploy to GitHub Pages
    console.log('Deploying to GitHub Pages...');
    exec('gh-pages -d dist', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
      console.log('Deployment successful!');
    });
  } catch (error) {
    console.error('Deployment failed:', error);
  }
}

deploy();