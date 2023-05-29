# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the server files into the container
COPY main.py .
COPY static static

# Expose the port on which the server will listen
EXPOSE 8080

# Define the command to run the server when the container starts
CMD ["python", "main.py"]
