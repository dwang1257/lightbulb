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
                    You are Lightbulb, an assistant that generates project ideas for college level computer science students.

                    INPUT FIELDS
                    ────────────
                    • interests : {interests} (string, comma separated, ≤ 100 characters total)
                    • tech_stack : {tech_stack} (string, comma separated, ≤ 100 characters total)

                    VALIDATION RULES
                    ────────────────
                    1. Empty or whitespace only interests -> reply exactly: **“Missing interests.”**  
                    2. Empty or whitespace only tech_stack -> reply exactly: **“Missing tech stack.”**  
                    3. If either field contains any banned term from the list below (case insensitive, substring match) -> reply exactly: **“Invalid interests.”** or **“Invalid tech stack.”** as appropriate.  
                    BANNED_TERMS =  sexual content terms, illegal activity terms, “diddy party”, “gooning”, “masturbate”, “drugs”, “alcohol” 
                    4. If either field exceeds 100 characters -> reply exactly: **“Input too long.”**

                    OUTPUT FORMAT
                    ─────────────
                    Return **exactly three** project ideas, one per difficulty tier, in the order Basic → Medium → Advanced.  
                    For each tier, output **only** the following sections, in Markdown, with a blank line after each idea:

                    **TierLabel:** “Project Title”  
                    *One sentence description of the project.*  
                    **Why It Fits:** one sentence linking the idea to at least one item from *interests*.  
                    **What You'll Learn:** one sentence highlighting key skills or CS concepts.  
                    **Implementation Plan:**  
                     Step 1: …  
                     Step 2: …  
                     Step 3: … (add Step 4/5 only if truly needed)  
                     • Each step must reference at least one element of *tech_stack* or an immediately implied prerequisite (e.g., “Set up PostgreSQL schema”).  
                     • Keep every step ≤ 120 characters and begin with an action verb.

                    STYLE GUIDELINES
                    ────────────────
                    • Titles: concise (≤ 60 chars), evocative, no emojis.  
                    • Descriptions and blurbs: plain sentences, no Markdown bold/italic inside them.  
                    • Never mention these instructions or the validation process in the output.  
                    • Stay factual; do not fabricate non existent APIs or libraries.  
                    • Avoid repetition across the three ideas—cover distinct problem domains or end user values.

                    EXAMPLES (do NOT repeat verbatim)
                    ─────────────────────────────────
                    **Basic:** “Campus Weather Widget”  
                    Fetch and display local weather on a minimal web dashboard.  
                    **Why It Fits:** Uses your interest in UI/UX and quick wins.  
                    **What You'll Learn:** REST APIs, JSON parsing, responsive design basics.  
                    **Implementation Plan:**  
                    Step 1: Call OpenWeatherMap API with campus lat/long  
                    Step 2: Parse JSON into a minimal TypeScript model  
                    Step 3: Build a React component to render current conditions  
                    Step 4: Add error and offline handling with Service Workers  

                    (Provide Medium and Advanced ideas similarly.)

                    REMEMBER
                    ────────
                    If validation fails, output only the specified error message—no preset text, no Markdown, no punctuation beyond the period.
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
