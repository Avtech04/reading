
# import os
# import uuid
# from gtts import gTTS
# import google.generativeai as genai
# import requests

# AUDIO_DIR = "generated_audio"
# os.makedirs(AUDIO_DIR, exist_ok=True)

# def generate_podcast_script(context_type: str, text_content: str) -> str:
#     """Uses the Gemini model from env variables to create a podcast script."""
#     if not text_content.strip():
#         return "There is no content to discuss in this podcast."

#     # Read the model name from the environment, with a fallback for local dev
#     model_name = os.environ.get("GEMINI_MODEL", 'gemini-1.5-flash')
#     model = genai.GenerativeModel(model_name)
    
#     if context_type == "insights":
#         prompt_instruction = "Your task is to transform the following AI-generated insights into a short, engaging podcast script. Explain the key insights and fun facts to the listener."
#     elif context_type == "recommendations":
#         prompt_instruction = "You are a podcast host. Your task is to summarize the following list of recommended text snippets into a cohesive audio script. Connect the ideas and present them in a friendly, informative tone."
#     elif context_type == "page_content":
#         prompt_instruction = "You are a podcast host. Your task is to provide a brief audio summary of the following text, which is from a single page of a document."
#     else:
#         prompt_instruction = "You are a podcast host. Summarize the following content in an engaging way."

#     prompt = f"""
#     {prompt_instruction}
#     The script should be approximately 2 minutes long when spoken. Do not use any special characters or formatting, just plain text.

#     Here is the content:
#     ---
#     {text_content}
#     ---
#     """
    
#     try:
#         print(f"Generating podcast script for context '{context_type}' using model '{model_name}'...")
#         response = model.generate_content(prompt)
#         return response.text
#     except Exception as e:
#         print(f"Error generating podcast script: {e}")
#         return "There was an error creating the podcast script."

# def convert_text_to_speech(text: str) -> str:
#     """
#     Converts text to speech using the provider specified in the TTS_PROVIDER
#     environment variable ('azure' or 'google').
#     """
#     provider = os.environ.get("TTS_PROVIDER", "google").lower()
    
#     filename = f"podcast_{uuid.uuid4()}.mp3"
#     filepath = os.path.join(AUDIO_DIR, filename)

#     print(f"Using TTS Provider: {provider}")

#     if provider == "azure":
#         azure_key = os.environ.get("AZURE_TTS_KEY")
#         azure_endpoint = os.environ.get("AZURE_TTS_ENDPOINT")
#         if not all([azure_key, azure_endpoint]):
#             raise ValueError("Azure TTS credentials (AZURE_TTS_KEY, AZURE_TTS_ENDPOINT) are not set in environment.")
            
#         headers = {
#             "Ocp-Apim-Subscription-Key": azure_key,
#             "Content-Type": "application/ssml+xml",
#             "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
#             "User-Agent": "pdf-insight-hackathon"
#         }
#         ssml_body = f"<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'><voice name='en-US-JennyNeural'>{text}</voice></speak>"
        
#         response = requests.post(azure_endpoint, headers=headers, data=ssml_body.encode('utf-8'))
#         response.raise_for_status()
        
#         with open(filepath, 'wb') as audio_file:
#             audio_file.write(response.content)

#     else: # Default to Google TTS for local development
#         tts = gTTS(text=text, lang='en', slow=False)
#         tts.save(filepath)
        
#     return f"/audio/{filename}"



# import os
# import uuid
# from gtts import gTTS
# import google.generativeai as genai
# import requests

# AUDIO_DIR = "generated_audio"
# os.makedirs(AUDIO_DIR, exist_ok=True)

# def generate_podcast_script(context_type: str, text_content: str) -> str:
#     # This will use the model name from the environment variables
#     model_name = os.environ.get("GEMINI_MODEL", 'gemini-1.5-flash')
#     model = genai.GenerativeModel(model_name)
    
#     if context_type == "insights":
#         prompt_instruction = "Your task is to transform the following AI-generated insights into a short, engaging podcast script. Explain the key insights and fun facts to the listener."
#     elif context_type == "recommendations":
#         prompt_instruction = "You are a podcast host. Your task is to summarize the following list of recommended text snippets into a cohesive audio script. Connect the ideas and present them in a friendly, informative tone."
#     elif context_type == "page_content":
#         prompt_instruction = "You are a podcast host. Your task is to provide a brief audio summary of the following text, which is from a single page of a document."
#     else:
#         prompt_instruction = "You are a podcast host. Summarize the following content in an engaging way."

#     prompt = f"""
#     {prompt_instruction}
#     The script should be approximately 2 minutes long when spoken. Do not use any special characters or formatting, just plain text.

#     Here is the content:
#     ---
#     {text_content}
#     ---
#     """
    
#     try:
#         response = model.generate_content(prompt)
#         return response.text
#     except Exception as e:
#         print(f"Error generating podcast script: {e}")
#         return "There was an error creating the podcast script."

# def convert_text_to_speech(text: str) -> str:
#     # provider = os.environ.get("TTS_PROVIDER", "google").lower()
#     filename = f"podcast_{uuid.uuid4()}.mp3"
#     filepath = os.path.join(AUDIO_DIR, filename)

    
#         # Default to Google TTS
#     tts = gTTS(text=text, lang='en', slow=False)
#     tts.save(filepath)
        
#     # --- THIS IS THE CRUCIAL CHANGE ---
#     # We now hardcode your live deployed URL.
#     base_url = "https://avtech03-pdf-insight-backend.hf.space"
    
#     # Return the full, absolute URL that can be accessed from anywhere.
#     return f"{base_url}/audio/{filename}"





import os
import uuid
from gtts import gTTS
import google.generativeai as genai
import requests

AUDIO_DIR = "generated_audio"
os.makedirs(AUDIO_DIR, exist_ok=True)

def generate_podcast_script(context_type: str, text_content: str) -> str:
    model_name = 'gemini-1.5-flash'
    model = genai.GenerativeModel(model_name)
    
    if context_type == 'copied_text':
        return text_content
    elif context_type == "insights":
        prompt_instruction = "Your task is to transform the following AI-generated insights into a short, engaging podcast script..."
    elif context_type == "recommendations":
        prompt_instruction = "You are a podcast host. Your task is to summarize the following list of recommended text snippets..."
    else: # page_content
        prompt_instruction = "You are a podcast host. Your task is to provide a brief audio summary of the following text..."

    prompt = f"""
    {prompt_instruction}
    The script should be approximately 2 minutes long when spoken...
    Here is the content:
    ---
    {text_content}
    ---
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return "There was an error creating the podcast script."

def convert_text_to_speech(text: str) -> str:
    provider = os.environ.get("TTS_PROVIDER", "google").lower()
    filename = f"podcast_{uuid.uuid4()}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)

    
    tts = gTTS(text=text, lang='en', slow=False)
    tts.save(filepath)
        
    # --- THIS IS THE CRUCIAL CHANGE ---
    # Return only the relative path to the audio file.
    return f"/audio/{filename}"