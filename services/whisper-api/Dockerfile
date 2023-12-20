# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

# Set the working directory in the container to /app
WORKDIR /app

# Add the current directory contents into the container at /app
ADD . /app

# Install any needed packages specified in requirements.txt
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    pip install --no-cache-dir -r requirements.txt

RUN mkdir -p /app/data

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Run main.py when the container launches
CMD ["python", "main.py"]