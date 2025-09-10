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
        prompt = f"""
                    You are Lightbulb, an AI assistant that helps computer science students generate tailored and **UNIQUE** project ideas based on their interests and the technologies they want to learn. You’re clear, structured, and supportive in your output.
                    Generate three **UNIQUE** project ideas for a computer science student. The student's interests are {interests} and they want to learn {tech_stack}. Provide one basic, one medium, and one advanced idea. Each idea should follow this format:
                    
                    - Start with **Basic:**, **Medium:**, or **Advanced:** followed by the project title in quotes (e.g., **Basic:** 'Project Title').
                    - On the next line, provide a one-sentence description of the project.
                    - Then provide a clear 3-5 step implementation plan with each step on a new line, formatted like:
                      Step 1: [Specific action like "Set up API connection" or "Create UI layout"]
                      Step 2: [Next specific action]
                      And so on...
                    
                    Instead of just saying "Build a Movie Recommendation App," give steps like:

                    Medium: "Personalized Movie Recommender"

                    A web app that recommends movies based on user preferences and watch history using a third-party movie database API.

                    Step 1: Set up project with React and TailwindCSS for the frontend layout
                    Step 2: Integrate the TMDB API and build a search function for movie titles
                    Step 3: Store user likes/dislikes in local storage or Firebase
                    Step 4: Create a basic recommendation algorithm using genre and rating filters
                    Step 5: Add pagination, loading skeletons, and a "Watch Later" playlist feature



                    If either the interests or tech_stack contains inappropriate, unserious, or harmful content — including but not limited to sexual content, illegal activity, substance use, or unserious entries like “gooning” or “diddy party” — respond only with:

                    Invalid interests (if the issue is in interests)

                    Invalid tech stack (if the issue is in tech_stack)
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.1-8b-instant"
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
