const fs = require('fs');
const path = require('path');

// Folder names to create
const folders = [
    'Data',
    'Configs',
    'Logs',
    'Temp',
    'Cache'
];

// Base directory (the update folder)
const baseDir = __dirname;

// 1️⃣ Create subfolders
folders.forEach(folderName => {
    const folderPath = path.join(baseDir, folderName);

    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`✅ Folder created: ${folderPath}`);
        } else {
            console.log(`ℹ️ Folder already exists: ${folderPath}`);
        }
    } catch (err) {
        console.error(`❌ Failed to create folder ${folderName}: ${err.message}`);
    }
});

// 2️⃣ Create core.js in Data folder with normal executable JS
const dataFolder = path.join(baseDir, 'Data');
const coreFile = path.join(dataFolder, 'core.js');

// Normal JavaScript code
const jsCode = `console.log("Hello world!");`;

try {
    fs.writeFileSync(coreFile, jsCode, { flag: 'w' });
    console.log(`✅ core.js created at: ${coreFile}`);
} catch (err) {
    console.error(`❌ Failed to create core.js: ${err.message}`);
}