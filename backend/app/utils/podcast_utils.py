


# import os
# import uuid
# from gtts import gTTS
# import google.generativeai as genai
# import requests

# AUDIO_DIR = "generated_audio"
# os.makedirs(AUDIO_DIR, exist_ok=True)

# def generate_podcast_script(context_type: str, text_content: str) -> str:
#     model_name = 'gemini-1.5-flash'
#     model = genai.GenerativeModel(model_name)
    
#     if context_type == 'copied_text':
#         return text_content
#     elif context_type == "insights":
#         prompt_instruction = "Your task is to transform the following AI-generated insights into a short, engaging podcast script..."
#     elif context_type == "recommendations":
#         prompt_instruction = "You are a podcast host. Your task is to summarize the following list of recommended text snippets..."
#     else: # page_content
#         prompt_instruction = "You are a podcast host. Your task is to provide a brief audio summary of the following text..."

#     prompt = f"""
#     {prompt_instruction}
#     The script should be approximately 2 minutes long when spoken...
#     Here is the content:
#     ---
#     {text_content}
#     ---
#     """
    
#     try:
#         response = model.generate_content(prompt)
#         return response.text
#     except Exception as e:
#         return "There was an error creating the podcast script."

# def convert_text_to_speech(text: str) -> str:
#     # provider = os.environ.get("TTS_PROVIDER", "google").lower()
#     filename = f"podcast_{uuid.uuid4()}.mp3"
#     filepath = os.path.join(AUDIO_DIR, filename)


#     tts = gTTS(text=text, lang='en', slow=False)
#     tts.save(filepath)
        
#     # --- THIS IS THE CRUCIAL CHANGE ---
#     # Return only the relative path to the audio file.
#     return f"/audio/{filename}"






import os
import uuid
from gtts import gTTS
import google.generativeai as genai
import requests

AUDIO_DIR = "generated_audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

def generate_podcast_script(context_type: str, text_content: str) -> str:
    """Uses Gemini to convert a block of provided context into a high-quality podcast script."""
    if not text_content.strip():
        return "There is no content to discuss in this podcast."

    model_name = 'gemini-1.5-flash'
    model = genai.GenerativeModel(model_name)
    
    # --- NEW, MORE PROFESSIONAL PROMPTS ---
    if context_type == "insights":
        prompt_instruction = """
        You are a podcast host for 'Insight in Minutes'. Your task is to transform the following AI-generated insights into a polished and engaging audio script.
        
        Structure your script as follows:
        1.  Start with a welcoming intro: "Welcome to Insight in Minutes. Let's break down what we've discovered."
        2.  Discuss the 'Key Insights' in a clear, narrative style. Explain their significance.
        3.  Present the 'Did You Know?' facts as interesting, quick highlights.
        4.  Conclude by summarizing the 'Clarifications', explaining the bigger picture or what might be missing.
        5.  End with: "That's your insight in minutes. Stay curious."
        """
    elif context_type == "recommendations":
        prompt_instruction = """
        You are a podcast host for 'Docu-Dive'. Your task is to synthesize the following list of disconnected text snippets into a single, cohesive, and conversational audio script.
        
        Do not just list the snippets. Your goal is to find the common thread that connects them and weave them into a compelling narrative. Start with a hook, connect the different ideas smoothly, and end with a concluding thought that ties everything together.
        """
    else: # This covers 'page_content' and 'copied_text'
        prompt_instruction = "You are a narrator. Your task is to read the following text aloud in a clear, professional, and engaging voice. Read the text exactly as it is written, without adding any extra commentary."

    prompt = f"""
    {prompt_instruction}

    The final script must be plain text, without any special characters like asterisks or markdown. It should be suitable for a text-to-speech engine and be approximately 2-3 minutes long when spoken.

    Here is the content to use:
    ---
    {text_content}
    ---
    """
    
    try:
        print(f"Generating improved podcast script for context: {context_type}...")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating podcast script: {e}")
        return "There was an error creating the podcast script."

def convert_text_to_speech(text: str) -> str:
    # This function's logic remains the same
    # provider = os.environ.get("TTS_PROVIDER", "google").lower()
    filename = f"podcast_{uuid.uuid4()}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)


    tts = gTTS(text=text, lang='en', slow=False)
    tts.save(filepath)
        
    return f"/audio/{filename}"
