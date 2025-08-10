# Use the same Python version as your original Dockerfile
FROM python:3.11-slim

# Set the working directory
WORKDIR /code

# Create a writable cache directory and set the correct owner
RUN mkdir -p /code/.cache && chown -R user:user /code/.cache

# Tell huggingface libraries to use this folder for caching models
ENV HF_HOME /code/.cache

# Copy requirements file from the root and install dependencies
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy all your project files into the container
COPY . /code/

# Expose the port your app runs on
EXPOSE 8080

# The command to run your app.py file
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]