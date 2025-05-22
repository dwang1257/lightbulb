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
                    Generate three project ideas for a computer science student. The student's interests are {interests} and they want to learn {tech_stack}. Provide one basic, one medium, and one advanced idea. Each idea should follow this format:
                    
                    - Start with **Basic:**, **Medium:**, or **Advanced:** followed by the project title in quotes (e.g., **Basic:** 'Project Title').
                    - On the next line, provide a one-sentence description of the project.
                    - Then provide a clear 3-5 step implementation plan with each step on a new line, formatted like:
                      Step 1: [Specific action like "Set up API connection" or "Create UI layout"]
                      Step 2: [Next specific action]
                      And so on...
                    
                    Make sure each step is practical and actionable. For example, instead of just "Make a Weather App," the steps should be:
                    Step 1: Set up API connection to weather service
                    Step 2: Create functions to parse JSON response data
                    Step 3: Build basic UI with search and results display
                    Step 4: Add error handling and loading states
                    Step 5: Implement additional features like forecasts or location detection

                    If the interests entered are inappropriate or not real interests, respond with 'Invalid interests'. Some examples of invalid interests are: gooning, masturbating, anything sexual, drugs, alcohol, diddy party, and anything illegal.
                    If the tech stack entered is inappropriate or not real tech stack, respond with 'Invalid tech stack'. Some examples of invalid tech stack are: gooning, masturbating, anything sexual, drugs, alcohol, diddy party, and anything illegal
                    
                    **IF THE INTEREST AND TECH STACK ENTERED ARE BOTH: cronjob THEN THIS IS A CRONJOB AND RESPOND WITH:**ok**
        """

        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
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
