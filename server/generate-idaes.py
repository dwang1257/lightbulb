from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from groq import Groq

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins="*") 
load_dotenv()

client = Groq(
    api_key=os.environ.get("API_KEY"),
)

@app.route('/generate-ideas', methods=['POST'])
def generate_ideas():
    # Get data from the request
    data = request.json
    hobby = data.get('hobby')
    technologies = data.get('technologies')
    
    print(f"Received request with hobby: {hobby}, technologies: {technologies}")  # Debug logging

    if not hobby or not technologies:
        return jsonify({'error': 'Hobby and technologies are required'}), 400

    try:
        # Prepare the prompt for Groq Cloud
        prompt = f"""
                    Generate three project ideas for a computer science student. The student's hobby is {hobby} and they want to learn {technologies}. Provide one basic, one medium, and one advanced idea. Each idea should follow this format:

                    - Start with **Basic:**, **Medium:**, or **Advanced:** followed by the project title in quotes (e.g., **Basic:** 'Project Title').
                    - On the next line, provide a one-sentence description of the project.

                    If the hobby or interest entered is inappropriate or not a real hobby, respond with 'Invalid hobby'.
                """

        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="llama-3.3-70b-versatile"
        )

        # Extract ideas from the response
        ideas = chat_completion.choices[0].message.content.strip().split('\n')
        print(f"Generated ideas: {ideas}")  # Debug logging
        return jsonify({'ideas': ideas})

    except Exception as e:
        print(f"Error generating ideas: {e}")
        return jsonify({'error': 'Failed to generate ideas'}), 500

# Vercel requires a handler function
def handler(request):
    if request.method == "POST" and request.path == "/server/generate-ideas":
        return generate_ideas()
    else:
        return jsonify({"error": "Not found"}), 404