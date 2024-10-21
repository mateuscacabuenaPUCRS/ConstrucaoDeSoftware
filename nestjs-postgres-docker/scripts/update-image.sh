#!/bin/bash

# Set variables (change these values to match your Docker Hub account and image name)
IMAGE_NAME="felipefreitassilva/csw24-grupob-tickets"
TAG="latest"

# Build the Docker image
echo "Building the Docker image..."
docker build -t $IMAGE_NAME:$TAG .

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Error: Docker build failed."
  exit 1
fi

# Push the Docker image to Docker Hub
echo "Pushing the Docker image to Docker Hub..."
docker push $IMAGE_NAME:$TAG

# Check if the push was successful
if [ $? -eq 0 ]; then
  echo "Docker image pushed successfully: $IMAGE_NAME:$TAG"
else
  echo "Error: Failed to push the Docker image."
  exit 1
fi

# Freeze the script to display the output
read -p "Press any key to continue..."
