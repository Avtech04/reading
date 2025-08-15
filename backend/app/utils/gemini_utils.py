# import os
# import google.generativeai as genai
# from PyPDF2 import PdfReader

# # Configure the Gemini API key
# # It's recommended to set this as an environment variable for security
# # For example: os.environ.get("GEMINI_API_KEY")
# # For now, you can replace "YOUR_GEMINI_API_KEY" with your actual key.
# try:
#     genai.configure(api_key="AIzaSyC2AJpLxpqt8CZQGr925qW3SeIlUx8rbcc") 
# except Exception as e:
#     print(f"Error configuring Gemini API: {e}")

# UPLOAD_DIR = "uploaded_pdfs"

# def extract_text_from_all_pdfs() -> str:
#     """Reads all PDF files from the upload directory and extracts their text."""
#     full_text = ""
#     pdf_files = [f for f in os.listdir(UPLOAD_DIR) if f.lower().endswith(".pdf")]
    
#     print(f"Found {len(pdf_files)} PDFs to process.")

#     for filename in pdf_files:
#         file_path = os.path.join(UPLOAD_DIR, filename)
#         try:
#             reader = PdfReader(file_path)
#             full_text += f"\n\n--- Content from {filename} ---\n"
#             for page in reader.pages:
#                 full_text += page.extract_text() or ""
#         except Exception as e:
#             print(f"Could not read or extract text from {filename}: {e}")
            
#     return full_text

# # ... other code ...

# def get_insights_from_gemini(text_content: str) -> str:
#     """
#     Sends the provided text content to the Gemini 1.5 Flash model
#     and asks for insights in a structured JSON format.
#     """
#     if not text_content.strip():
#         return "No text content found in PDFs to generate insights."

#     model = genai.GenerativeModel('gemini-1.5-flash')
    
#     # --- THIS IS THE UPDATED PROMPT ---
#     prompt = f"""
#     Analyze the following text from multiple documents. Based *only* on this text, generate a response in a valid JSON format.
#     The JSON object should have three keys: "key_insights", "did_you_know", and "clarifications".
#     - "key_insights" should be a single paragraph summary.
#     - "did_you_know" should be an array of short, interesting fact strings.
#     - "clarifications" should be a single paragraph explaining potential counterpoints or areas lacking detail.

#     Here is the content:
#     ---
#     {text_content}
#     ---
#     """
    
#     try:
#         print("Sending request to Gemini API for structured JSON...")
#         # The response will now be a JSON string
#         response = model.generate_content(prompt)
        
#         # Clean up the response to ensure it's valid JSON
#         cleaned_json_string = response.text.strip().replace("```json", "").replace("```", "")
#         print("Received structured response from Gemini API.")
        
#         return cleaned_json_string
#     except Exception as e:
#         print(f"Error communicating with Gemini API: {e}")
#         return f"An error occurred while generating insights: {e}"




# import os
# import requests
# import google.generativeai as genai
# from PyPDF2 import PdfReader
# from io import BytesIO

# # Configure the Gemini API key (should be an environment variable)
# try:
#     genai.configure(api_key="GEMINI_API_KEY") 
# except Exception as e:
#     print(f"Error configuring Gemini API: {e}")

# def extract_text_from_all_pdfs(file_records: list) -> str:
#     """
#     Accepts file records from the database, downloads each PDF from its URL,
#     and extracts the text.
#     """
#     full_text = ""
#     print(f"Found {len(file_records)} PDFs from database to process.")

#     for record in file_records:
#         try:
#             # 1. Download the PDF content from the public URL
#             print(f"Downloading {record.filename} for insights analysis...")
#             response = requests.get(record.url)
#             response.raise_for_status()
            
#             # 2. Open the downloaded PDF from memory
#             pdf_stream = BytesIO(response.content)
#             reader = PdfReader(pdf_stream)
            
#             # 3. Extract text
#             full_text += f"\n\n--- Content from {record.filename} ---\n"
#             for page in reader.pages:
#                 full_text += page.extract_text() or ""
#         except Exception as e:
#             print(f"Could not read or extract text from {record.filename}: {e}")
            
#     return full_text

# def get_insights_from_gemini(text_content: str) -> str:
#     """
#     Sends the provided text content to the Gemini 1.5 Flash model
#     and asks for insights in a structured JSON format.
#     """
#     if not text_content.strip():
#         return "No text content found in PDFs to generate insights."

#     model = genai.GenerativeModel('gemini-1.5-flash')
    
#     prompt = f"""
#     Analyze the following text from multiple documents. Based *only* on this text, generate a response in a valid JSON format.
#     The JSON object should have three keys: "key_insights", "did_you_know", and "clarifications".
#     - "key_insights" should be a single paragraph summary.
#     - "did_you_know" should be an array of short, interesting fact strings.
#     - "clarifications" should be a single paragraph explaining potential counterpoints or areas lacking detail.

#     Here is the content:
#     ---
#     {text_content}
#     ---
#     """
    
#     try:
#         print("Sending request to Gemini API for structured JSON...")
#         response = model.generate_content(prompt)
#         cleaned_json_string = response.text.strip().replace("```json", "").replace("```", "")
#         print("Received structured response from Gemini API.")
#         return cleaned_json_string
#     except Exception as e:
#         print(f"Error communicating with Gemini API: {e}")
#         return f'{{"error": "An error occurred while generating insights: {str(e)}"}}'



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
    
    if context_type == "insights":
        prompt_instruction = "Your task is to transform the following AI-generated insights into a short, engaging podcast script..."
    elif context_type == "recommendations":
        prompt_instruction = "You are a podcast host. Your task is to summarize the following list of recommended text snippets..."
    elif context_type == "page_content":
        prompt_instruction = "You are a podcast host. Your task is to provide a brief audio summary of the following text..."
    else:
        prompt_instruction = "You are a podcast host. Summarize the following content..."

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
    # provider = os.environ.get("TTS_PROVIDER", "google").lower()
    filename = f"podcast_{uuid.uuid4()}.mp3"
    filepath = os.path.join(AUDIO_DIR, filename)


    tts = gTTS(text=text, lang='en', slow=False)
    tts.save(filepath)
        
    # --- THIS IS THE CRUCIAL CHANGE ---
    # Return only the relative path to the audio file.
    return f"/audio/{filename}"