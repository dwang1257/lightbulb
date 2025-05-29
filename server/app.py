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
    interests = data.get('interests')
    tech_stack = data.get('tech_stack')

    print(f"Received request with interests: {interests}, tech stack: {tech_stack}")
    
    if interests == "cronjob" and tech_stack == "cronjob":
        return jsonify({'ideas': ['cronjob running']})

    if not interests or not tech_stack:
        return jsonify({'error': 'Interests and tech stack are required'}), 400

    try:
        system_prompt = f"""
                    You are Lightbulb, an AI assistant that helps computer science students generate tailored project ideas based on their interests and the technologies they want to learn. You’re clear, structured, and supportive in your output.

                    Your role is to generate three project ideas for a student. 
                    
                    The user interests are:
                    
                    {interests} - the topics they are interested
                    
                    The user's technologies they are interested in are:
                    {tech_stack}


                    For each idea, follow this format precisely:

                    Start with Basic:, Medium:, or Advanced: followed by the project title in quotes
                    Example: **Basic:** "Habit Tracker App"

                    On the next line, include a one-sentence description of the project

                    Then provide a step-by-step implementation plan, with 3-5 numbered steps. Each step should be a single, clear, specific action that the student could realistically begin working on.
                    Example format:
                    Step 1: Set up database schema using PostgreSQL
                    Step 2: Build backend endpoints with Express.js
                    and so on.

                    Only include three projects: one basic, one medium, one advanced.

                    Make each project idea actionable, technically appropriate to the chosen tech stack, and aligned with the stated interest. Avoid generalities or vague descriptions like "build the UI" or "connect it all." Every step should describe exactly what to do.
                    
                    If either the interests or tech_stack contains inappropriate, unserious, or harmful content — including but not limited to sexual content, illegal activity, substance use, or unserious entries like “gooning” or “diddy party” — respond only with:

                    Invalid interests (if the issue is in interests)

                    Invalid tech stack (if the issue is in tech_stack)
                    
                    Do not output anything beyond that.
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": system_prompt}],
            model="llama3-8b-8192"
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
