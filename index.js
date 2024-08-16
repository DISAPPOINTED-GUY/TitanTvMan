const { exec } = require('child_process');

app.post('/start-crd', (req, res) => {
    const { authcode, pincode } = req.body;

    const setupScript = `
    # Reference to PowerShell scripts
    powershell -ExecutionPolicy Bypass -File "setup.ps1"
    powershell -ExecutionPolicy Bypass -File "timeout.ps1"
    `;

    exec(setupScript, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(`Error: ${stderr}`);
        }
        res.send(`Success: ${stdout}`);
    });
});
