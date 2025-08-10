

# # backend/app/routes/pdf.py

# import os
# from fastapi import APIRouter, UploadFile, File
# from fastapi.responses import JSONResponse
# from typing import List

# UPLOAD_DIR = "uploaded_pdfs"
# os.makedirs(UPLOAD_DIR, exist_ok=True)

# router = APIRouter()

# # @router.post("/upload")
# # async def upload_pdf(file: UploadFile = File(...)):
# #     file_location = os.path.join(UPLOAD_DIR, file.filename)
# #     with open(file_location, "wb") as f:
# #         f.write(await file.read())
# #     return {"message": f"Successfully uploaded {file.filename}"}

# # --- THIS IS THE CORRECTED UPLOAD FUNCTION ---
# @router.post("/upload")
# async def upload_pdfs(files: List[UploadFile] = File(...)):
#     """
#     Handles uploading one or more PDF files.
#     The frontend form key must be "files".
#     """
#     uploaded_filenames = []
#     for file in files:
#         # Basic security check for file extension
#         if not file.filename.lower().endswith(".pdf"):
#             raise HTTPException(status_code=400, detail=f"Invalid file type: {file.filename}. Only PDFs are allowed.")
        
#         file_location = os.path.join(UPLOAD_DIR, file.filename)
        
#         try:
#             with open(file_location, "wb") as f:
#                 f.write(await file.read())
#             uploaded_filenames.append(file.filename)
#         except Exception as e:
#             # Handle potential write errors
#             return JSONResponse(status_code=500, content={"error": f"Could not save file: {file.filename}", "detail": str(e)})

#     # Here you would typically trigger the indexing/processing of the new files
#     # For example: await process_new_pdfs(uploaded_filenames)

#     return {"message": f"Successfully uploaded {len(uploaded_filenames)} file(s)", "filenames": uploaded_filenames}



# @router.get("/list")
# async def list_pdfs():
#     pdfs = [f for f in os.listdir(UPLOAD_DIR) if f.lower().endswith(".pdf")]
#     return {"pdfs": pdfs}

# @router.get("/view/{filename}")
# async def view_pdf(filename: str):
#     file_path = os.path.join(UPLOAD_DIR, filename)
#     if not os.path.exists(file_path):
#         return JSONResponse(status_code=404, content={"error": "File not found"})
#     return {"url": f"/static/{filename}"}

# @router.delete("/delete/{filename}")
# async def delete_pdf(filename: str):
#     file_path = os.path.join(UPLOAD_DIR, filename)
#     if os.path.exists(file_path):
#         os.remove(file_path)
#         return {"message": f"{filename} deleted"}
#     return JSONResponse(status_code=404, content={"error": "File not found"})


import os
from vercel_blob import put
from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from fastapi.responses import JSONResponse
from typing import List
from sqlalchemy.orm import Session
from backend.app import models, schemas
from backend.app.database import SessionLocal

# --- VERCEL BLOB CONFIGURATION ---
# It's best to set this as an environment variable.
# For now, paste the token you copied from your Vercel dashboard.

os.environ['BLOB_READ_WRITE_TOKEN'] = os.environ.get("BLOB_READ_WRITE_TOKEN")

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/upload")
async def upload_pdfs(files: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    for file in files:
        # ... (file type and existing file checks)
        try:
            # Vercel Blob requires reading the file into memory first
            file_contents = await file.read()

            # Upload the file to Vercel Blob
            blob_result = put(
                f"pdfs/{file.filename}", # The path in the blob store
                file_contents,
                {'access': 'public'} # Make the file publicly accessible
            )

            # The result directly gives us the public URL
            file_url = blob_result['url']

            db_file = models.FileRecord(
                filename=file.filename,
                url=file_url,
                public_id=file_url # We can use the URL as the ID for deletion
            )
            db.add(db_file)
            db.commit()

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Could not upload {file.filename}: {str(e)}")

    return JSONResponse(content={"message": "Upload successful"})

@router.get("/list", response_model=List[schemas.File])
async def list_pdfs(db: Session = Depends(get_db)):
    files = db.query(models.FileRecord).all()
    return files

@router.delete("/delete/{filename}")
async def delete_pdf(filename: str, db: Session = Depends(get_db)):
    # Vercel Blob deletion requires the full URL
    from vercel_blob import delete

    db_file = db.query(models.FileRecord).filter(models.FileRecord.filename == filename).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")

    try:
        delete(db_file.url) # Delete from Vercel Blob using the URL
        db.delete(db_file) # Delete from our database
        db.commit()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not delete file: {str(e)}")

    return {"message": f"{filename} deleted successfully"}