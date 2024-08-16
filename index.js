const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

app.post('/start-crd', (req, res) => {
    const { authcode, pincode } = req.body;

    const setupScript = `
    $P = $env:TEMP + '\\chromeremotedesktophost.msi';
    Invoke-WebRequest 'https://dl.google.com/edgedl/chrome-remote-desktop/chromeremotedesktophost.msi' -OutFile $P;
    Start-Process $P -Wait;
    Remove-Item $P;
    $P = $env:TEMP + '\\chrome_installer.exe';
    Invoke-WebRequest 'https://dl.google.com/chrome/install/latest/chrome_installer.exe' -OutFile $P;
    Start-Process -FilePath $P -Args '/install' -Verb RunAs -Wait;
    Remove-Item $P;
    chrome-remote-desktop --start ${authcode} --pin=${pincode}
    `;

    exec(`powershell -command "${setupScript}"`, (err, stdout, stderr) => {
        if (err) {
            return res.status(500).send(`Error: ${stderr}`);
        }
        res.send(`Success: ${stdout}`);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
      
