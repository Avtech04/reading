# Use the same Python version as your original Dockerfile
FROM python:3.11-slim

# Set the working directory
WORKDIR /code

# Copy requirements file from the root and install dependencies
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy all your project files (backend, frontend, app.py, etc.) into the container
COPY . /code/

# Expose the port your app runs on (from your original Dockerfile)
EXPOSE 8080

# The command to run your app.py file
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]