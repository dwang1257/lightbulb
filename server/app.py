from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from groq import Groq

# Initialize Flask app
app = Flask(__name__)
CORS(app)
load_dotenv()

client = Groq(
    api_key=os.environ.get("API_KEY")
)

@app.route('/server/generate-ideas', methods=['POST'])
def generate_ideas():
    data = request.json
    hobby = data.get('hobby')
    technologies = data.get('technologies')

    print(f"Received request with hobby: {hobby}, technologies: {technologies}")

    if not hobby or not technologies:
        return jsonify({'error': 'Hobby and technologies are required'}), 400

    try:
        prompt = f"""
                    Generate three project ideas for a computer science student. The student's hobby is {hobby} and they want to learn {technologies}. Provide one basic, one medium, and one advanced idea. Each idea should follow this format:

                    - Start with **Basic:**, **Medium:**, or **Advanced:** followed by the project title in quotes (e.g., **Basic:** 'Project Title').
                    - On the next line, provide a one-sentence description of the project.

                    If the hobby or interest entered is inappropriate or not a real hobby, respond with 'Invalid hobby'. Some examples of invalid hobbies are: gooning, masturbating, anything sexual, drugs, alcohol, diddy party, and anything illegal.
                    
                    If the technology entered is an invalid technology, respond with 'Invalid technology'. Some examples of invalid technologies are: anything illegal, anything that is not a coding technology, anything that would not immediately be recognized as a coding technology.
                """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile"
        )

        ideas = chat_completion.choices[0].message.content.strip().split('\n')
        print(f"Generated ideas: {ideas}")
        return jsonify({'ideas': ideas})

    except Exception as e:
        print(f"Error generating ideas: {e}")
        return jsonify({'error': 'Failed to generate ideas'}), 500
    
@app.route('/test', methods=['GET'])
def test():
    return 'Backend is working!'


@app.route('/')
def health_check():
    return 'Backend is running!'