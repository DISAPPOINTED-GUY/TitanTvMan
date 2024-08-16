import os
import subprocess

def run_command(command):
    process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        raise Exception(f"Error running command: {command}\n{stderr.decode().strip()}")
    return stdout.decode().strip()

def setup():
    try:
        # Disable firewall
        run_command("netsh advfirewall set allprofiles state off")

        # Install Chrome Remote Desktop Host
        crd_url = "https://dl.google.com/edgedl/chrome-remote-desktop/chromeremotedesktophost.msi"
        crd_file = os.path.join(os.getenv('TEMP'), 'chromeremotedesktophost.msi')
        run_command(f"curl -o {crd_file} {crd_url}")
        run_command(f"msiexec /i {crd_file} /quiet /qn /norestart")
        os.remove(crd_file)

        # Install Google Chrome
        chrome_url = "https://dl.google.com/chrome/install/latest/chrome_installer.exe"
        chrome_file = os.path.join(os.getenv('TEMP'), 'chrome_installer.exe')
        run_command(f"curl -o {chrome_file} {chrome_url}")
        run_command(f"{chrome_file} /silent /install")
        os.remove(chrome_file)

    except Exception as e:
        print(f"Setup failed: {e}")

if __name__ == "__main__":
    setup()
