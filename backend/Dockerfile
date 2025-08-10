# Use an official, slim Python image for a smaller final size
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Set an environment variable to tell sentence-transformers where to find models
# This will be used if you copy a local 'models' folder in the future
ENV TRANSFORMERS_CACHE=/models

# Copy only the requirements file first to leverage Docker's layer caching
COPY ./requirements.txt /app/requirements.txt

# Install all the Python dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy your application code into the container
COPY ./app /app/app

# Tell Docker that the container listens on port 8080
EXPOSE 8080

# The command to run your application when the container starts
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]