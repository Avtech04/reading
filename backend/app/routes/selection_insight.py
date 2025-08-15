from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import google.generativeai as genai

router = APIRouter()

class SelectionInsightRequest(BaseModel):
    selected_text: str

# --- THIS IS THE FIX ---
# The path should not include "/api" here, because it is already
# added as a prefix in your main.py file.
@router.post("/selection-insight")
async def get_selection_insight(request: SelectionInsightRequest):
    """
    Generates a deep and concise insight for a specific piece of selected text.
    """
    if not request.selected_text or len(request.selected_text) < 20:
        raise HTTPException(status_code=400, detail="Not enough text selected.")

    try:
        model_name = os.environ.get("GEMINI_MODEL", 'gemini-1.5-flash')
        model = genai.GenerativeModel(model_name)
        
        prompt = f"""
        Act as an expert analyst. Your task is to provide a single, powerful insight based on the following selected text from a document.

        The insight should not just summarize the text. Instead, it should reveal the deeper meaning, implication, or a connection that isn't immediately obvious. Focus on the "so what?" of the information provided.

        The final insight must be a single, concise sentence.

        Selected Text:
        ---
        {request.selected_text}
        ---
        """
        
        response = model.generate_content(prompt)
        return {"insight": response.text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
