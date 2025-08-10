# # backend/app/main.py

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles
# from app.routes import pdf, recommend

# app = FastAPI(title="Adobe Hackathon Backend")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Serve uploaded PDFs
# app.mount("/static", StaticFiles(directory="uploaded_pdfs"), name="static")

# # Route includes
# app.include_router(pdf.router, prefix="/api/pdf")
# app.include_router(recommend.router, prefix="/api/recommend")

# @app.get("/")
# def root():
#     return {"message": "Backend is running"}




# backend/app/main.py
from fastapi import FastAPI
from dotenv import load_dotenv

# This MUST be at the very top, before any of your other app imports.
load_dotenv()

# Now, with the environment loaded, we can safely import everything else.
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app import models
from app.database import engine
from app.routes import pdf, recommend, insights, chat, podcast

# This creates the database table if it doesn't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Adobe Hackathon Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve generated audio files
app.mount("/audio", StaticFiles(directory="generated_audio"), name="audio")

# --- Route includes ---
app.include_router(pdf.router, prefix="/api/pdf", tags=["PDFs"])
app.include_router(recommend.router, prefix="/api/recommend", tags=["Recommendations"])
app.include_router(insights.router, prefix="/api", tags=["Insights"])
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(podcast.router, prefix="/api", tags=["Podcast"])

@app.get("/")
def root():
    return {"message": "Backend is running"}