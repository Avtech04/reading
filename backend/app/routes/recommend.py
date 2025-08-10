# # backend/app/routes/recommend.py

# from fastapi import APIRouter, HTTPException, Request
# from pydantic import BaseModel
# from app.utils.embedding_utils import extract_sections, find_related_sections
# from app.utils.summarizer import generate_insight

# router = APIRouter()

# class RecommendRequest(BaseModel):
#     persona: str
#     task: str

# class InsightRequest(BaseModel):
#     section_text: str
#     persona: str
#     task: str

# @router.post("/related")
# def recommend_related(data: RecommendRequest):
#     try:
#         sections = extract_sections()
#         results = find_related_sections(data.persona, data.task, sections)
#         return {"recommendations": results}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# @router.post("/insight")
# def recommend_insight(data: InsightRequest):
#     try:
#         response = generate_insight(data.section_text, data.persona, data.task)
#         return {"insight": response}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))



from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

# Import your database models and session dependency
from backend.app import models
from backend.app.database import SessionLocal

# Import your existing utility functions
from backend.app.utils.embedding_utils import extract_sections, find_related_sections
from backend.app.utils.summarizer import generate_insight

router = APIRouter()

class RecommendRequest(BaseModel):
    persona: str
    task: str

# Dependency to get a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/related")
def recommend_related(data: RecommendRequest, db: Session = Depends(get_db)):
    try:
        # 1. Get all file records (including filenames and URLs) from the database.
        all_files = db.query(models.FileRecord).all()
        if not all_files:
            return {"recommendations": []}

        # 2. Pass the list of file records to your extraction logic.
        sections = extract_sections(all_files)
        
        # 3. Your find_related_sections function will find the best matches.
        results = find_related_sections(data.persona, data.task, sections)
        
        return {"recommendations": results}
    except Exception as e:
        # It's good practice to log the actual error for debugging
        print(f"An error occurred in /related: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# Your /insight endpoint remains unchanged
class InsightRequest(BaseModel):
    section_text: str
    persona: str
    task: str
    
@router.post("/insight")
def recommend_insight(data: InsightRequest):
    try:
        response = generate_insight(data.section_text, data.persona, data.task)
        return {"insight": response}
    except Exception as e:
        print(f"An error occurred in /insight: {e}")
        raise HTTPException(status_code=500, detail=str(e))