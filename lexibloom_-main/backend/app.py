from flask import Flask, jsonify
from flask_cors import CORS
import subprocess
import os
import sys

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "✅ Backend is running!"


@app.route("/start-keyboard", methods=["GET"])
def start_keyboard():
    try:
        # Absolute path to keyboard.py
        backend_dir = os.path.dirname(os.path.abspath(__file__))
        script_path = os.path.join(backend_dir, "keyboard.py")

        # Try to use the virtualenv python if it exists
        venv_dir = os.path.join(backend_dir, "venv")
        if sys.platform.startswith("win"):  # Windows
            venv_python = os.path.join(venv_dir, "Scripts", "python.exe")
        else:  # Linux/Mac
            venv_python = os.path.join(venv_dir, "bin", "python")

        if os.path.exists(venv_python):
            python_exe = venv_python
            print(f"Using virtualenv python: {python_exe}")
        else:
            python_exe = sys.executable
            print(f"Using system python: {python_exe}")

        # Start keyboard.py in a new process
        subprocess.Popen([python_exe, script_path], cwd=backend_dir)
        print("🎹 keyboard.py started.")
        return jsonify({"status": "success", "message": "keyboard.py started"}), 200

    except Exception as e:
        print(f"❌ Error starting keyboard: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    print("🚀 Starting Flask server at http://127.0.0.1:5000")
    app.run(host="127.0.0.1", port=5000, debug=True)
