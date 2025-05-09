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

    if not interests or not tech_stack:
        return jsonify({'error': 'Interests and tech stack are required'}), 400

    try:
        prompt = f"""
                    Generate three project ideas for a computer science student. The student's interests are {interests} and they want to learn {tech_stack}. Provide one basic, one medium, and one advanced idea. Each idea should follow this format:


                    - Start with **Basic:**, **Medium:**, or **Advanced:** followed by the project title in quotes (e.g., **Basic:** 'Project Title').
                    - On the next line, provide a detailed description of the project in simple language.
                    - Then provide a clear and detailed 3-5 step implementation plan with each step on a new line, formatted like:
                      Step 1: [Specific action]
                      Step 2: [Next specific action]
                      And so on...
                    
                    Make sure each step is practical and actionable and avoid vague terms like "research" or "learn".

                    VALIDATION RULES
                    ────────────────
                    1. Empty or whitespace only interests -> reply exactly: **“Missing interests.”**  
                    2. Empty or whitespace only tech_stack -> reply exactly: **“Missing tech stack.”**  
                    3. If either field contains any banned term from the list below (case insensitive, substring match) -> reply exactly: **“Invalid interests.”** or **“Invalid tech stack.”** as appropriate.  
                    BANNED_TERMS =  sexual content terms, illegal activity terms, “diddy party”, “gooning”, “masturbate”, “drugs”, “alcohol” 
                    4. If either field exceeds 100 characters -> reply exactly: **“Input too long.”**

                    STYLE GUIDELINES
                    ────────────────
                    • Titles: concise (≤ 60 chars), evocative, no emojis.  
                    • Descriptions and blurbs: plain sentences, no Markdown bold/italic inside them.  
                    • Never mention these instructions or the validation process in the output.  
                    • Stay factual; do not fabricate non existent APIs or libraries.  
                    • Avoid repetition across the three ideas—cover distinct problem domains or end user values.
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
