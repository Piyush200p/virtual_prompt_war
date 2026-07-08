import os
import sys
import json
import argparse
from pathlib import Path

try:
    import google.generativeai as genai
    from dotenv import load_dotenv
except ImportError:
    print("Error: Required packages missing.")
    print("Please run: pip install google-generativeai python-dotenv pillow")
    sys.exit(1)

# Load environment variables from .env file
load_dotenv()

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Error: GEMINI_API_KEY not found in environment variables or .env file.")
    sys.exit(1)

genai.configure(api_key=api_key)

SYSTEM_PROMPT = """You are an expert stadium logistics architect and JSON data engineer.
Your task is to analyze the provided stadium seating blueprint, floor plan, or CAD image, and extract its spatial and logistical properties into a strict JSON configuration block.

This JSON block will be injected directly into the ArenaFlow AI React frontend.

The JSON MUST follow this exact structure (do not include markdown blocks, just raw JSON):
{
  "id": "stadium_identifier",
  "name": "Stadium Name, Location",
  "sport": "Primary Sport",
  "capacity": "String with comma separated numbers, e.g., '80,000'",
  "currentMatch": "Example Matchup",
  "currentScan": "Random high percentage, e.g., '85.2% (68,160 Fans)'",
  "weather": "Reasonable weather string",
  "svgRoute": [
    { "x": 100, "y": 150, "label": "Gate Name", "step": 0 },
    { "x": 150, "y": 150, "label": "Concourse", "step": 1 },
    { "x": 200, "y": 120, "label": "Section Name", "step": 2 }
  ],
  "ticket": {
    "holder": "Alex Morgan",
    "seat": "Extracted from typical seating in image",
    "gate": "Extracted gate name",
    "barcode": "Random ID"
  },
  "sectors": [
    { "name": "North Stand", "density": "...", "status": "...", "security": "...", "temp": "...", "colorClass": "sector-high/medium/low" },
    ... (generate 4 sectors based on the layout)
  ],
  "concessions": [
    { "id": 1, "name": "Local themed food based on stadium location", "price": "...", "wait": "...", "calories": "..." },
    ... (generate 4 concessions)
  ],
  "wayfinding": [
    { "step": 0, "title": "Gate Entry", "desc": "..." },
    { "step": 1, "title": "Concourse", "desc": "..." },
    { "step": 2, "title": "Seating", "desc": "..." }
  ]
}

Analyze the image carefully. If specific gates, sections, or concessions are visible, use them. If not, infer them based on the stadium's real-world location and architecture.
"""

def parse_blueprint(image_path, output_path):
    print(f"Loading image from {image_path}...")
    
    if not os.path.exists(image_path):
        print(f"Error: File not found at {image_path}")
        sys.exit(1)
        
    try:
        from PIL import Image
        img = Image.open(image_path)
    except Exception as e:
        print(f"Error loading image: {e}")
        sys.exit(1)

    print("Sending blueprint to Gemini 1.5 Pro Vision model...")
    # Use gemini-1.5-pro for complex multimodal layout reasoning
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    try:
        response = model.generate_content([SYSTEM_PROMPT, img])
        
        # Clean the response to ensure it's pure JSON
        result_text = response.text.strip()
        if result_text.startswith("```json"):
            result_text = result_text.replace("```json\n", "")
            if result_text.endswith("```"):
                result_text = result_text[:-3]
        elif result_text.startswith("```"):
            result_text = result_text.replace("```\n", "")
            if result_text.endswith("```"):
                result_text = result_text[:-3]
                
        # Validate JSON
        json_data = json.loads(result_text)
        
        # Ensure output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=2)
            
        print(f"✅ Success! Stadium configuration generated and saved to {output_path}")
        print("\nYou can now copy this JSON object and paste it into src/data/stadiums.js!")
        
    except json.JSONDecodeError as e:
        print(f"Error parsing Gemini's output as JSON: {e}")
        print("Raw output:")
        print(result_text)
    except Exception as e:
        print(f"API Error: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Parse stadium blueprints into ArenaFlow JSON schema.")
    parser.add_argument("image_path", help="Path to the stadium blueprint image (PNG, JPG)")
    parser.add_argument("--output", "-o", default=".tmp/generated_stadium.json", help="Path to save the generated JSON (default: .tmp/generated_stadium.json)")
    
    args = parser.parse_args()
    parse_blueprint(args.image_path, args.output)
