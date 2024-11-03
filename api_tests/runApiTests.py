import subprocess
import sys
import os
import psutil
import time

operatingSystem = os.name
try:
    port = sys.argv[1]
except IndexError:
    port = '8000' 

os.environ['PORT'] = port

try:
    if (operatingSystem == 'posix'):
        newTerminal = subprocess.Popen(["gnome-terminal", "--", "bash", "-c", f"npm start dev{port}; exec bash"], stderr=subprocess.PIPE, text=True)
    elif (operatingSystem == 'nt'):
        newTerminal = subprocess.Popen(["cmd", "/k", f"npm run dev {port}"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding="utf-8", text=True)
    else:
        print("OS not supported yet")
        sys.exit(1)

    time.sleep(1) #give time for the terminal to open and run the command

    terminalReturnCode = newTerminal.poll()
    if terminalReturnCode != 0 and terminalReturnCode is not None:
        stderr = newTerminal.stderr.read()
        print(f"An error occurred: {stderr}")
        sys.exit(1)
except Exception as terminalError:
    print(f"Error starting a new terminal, error output: {terminalError}")
    sys.exit(1)

testProcess = subprocess.run("npm test", shell=True, encoding="utf-8", check=False, text=True)

try:
    closeTerminal = psutil.Process(newTerminal.pid)
    closeTerminal.terminate()
    closeTerminal.wait()
except Exception as killTerminalError:
    print(f"Error Closing Terminal, Error output: {killTerminalError}")
    sys.exit(1)

sys.exit(0)

    