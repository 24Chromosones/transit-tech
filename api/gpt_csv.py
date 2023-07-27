import os
import tempfile
import uuid


import pandas as pd
from dotenv import load_dotenv
from flask import Flask, request, session, jsonify
from langchain.agents import create_csv_agent
from langchain.llms import OpenAI

secret_key = uuid.uuid4().hex

app = Flask(__name__)
app.secret_key = secret_key

TEMP_DIR = "temp_uploads"
agent = None

@app.route("/api/test")
def test():
    return "<p>test<p>"

# FIXME: Currently, this is dangerous as there is no security between different sessions
@app.route("/api/upload-csv", methods=['POST'])
def receive_file():
    if "file" not in request.files:
        return "No file part", 400

    file = request.files["file"]

    if file.filename == "":
        return "No selected file", 400

    temp_dir = os.path.join(os.path.dirname(__file__), TEMP_DIR)
    os.makedirs(temp_dir, exist_ok=True)

    file_path = os.path.join(temp_dir, file.filename)
    session['file_path'] = file_path
    file.save(file_path)

    return "received", 200


@app.route("/api/ask-gpt", methods=['POST'])
def ask_gpt():
    if request.json['question'] == 'test':
        return jsonify(answer='testing alot of words testing alot of words testing alot of words testing alot of words testing alot of words testing alot of words testing alot of words testing alot of words testing alot of words ')

    global agent

    load_dotenv()
    os.getenv("OPENAI_API_KEY")

    csv_path = session.get('file_path')

    content = request.json
    content = content['question']
    print(str(csv_path), flush=True)
    print(content, flush=True)

    if agent is None:
        agent = create_csv_agent(
            OpenAI(temperature=0),
            csv_path,
        )
        print("agent created", flush=True)

    if content is not None and content != "":
        return jsonify(answer=agent.run(content))
    else:
        return "Invalid question"


if __name__ == "__main__":
    app.run(port=5328)
