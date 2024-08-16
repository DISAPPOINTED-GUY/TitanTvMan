const { exec } = require('child_process');

// Function to execute a command
function runCommand(command, callback) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
        if (callback) callback();
    });
}

// Get environment variables from Heroku config
const authKey = process.env.AUTH_KEY;
const pinCode = process.env.PIN_CODE;

// Check if AUTH_KEY is undefined
if (!authKey) {
    console.error('AUTH_KEY is undefined. Please ensure it is set in the Heroku environment variables.');
    process.exit(1); // Exit the process with an error code
}

// Command to set up Chrome Remote Desktop
const setupCommand = `
${authKey} --pin=${pinCode}
`;

// Run the setup command
runCommand(setupCommand, () => {
    console.log("Chrome Remote Desktop setup completed.");
});

// Optionally, keep the process running to ensure the RDP session stays active
const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('CRD Session Active\n');
}).listen(process.env.PORT || 8080);

console.log("Server running...");
