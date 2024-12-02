#!/bin/bash

# Set variables (update these to match your AWS account details and repository name)
AWS_REGION="us-east-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query "Account" --output text)
ECR_REPOSITORY="dev-csw24-grupob-ecr"
IMAGE_NAME="$ECR_REPOSITORY"
TAG="latest"

# Login to Amazon ECR
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"
if [ $? -ne 0 ]; then
  echo "Error: Failed to authenticate with Amazon ECR."
  read -p "Press any key to continue..."
  exit 1
fi

# Build the Docker image
echo "Building the Docker image..."
docker build -t $IMAGE_NAME:$TAG .
if [ $? -ne 0 ]; then
  echo "Error: Docker build failed."
  read -p "Press any key to continue..."
  exit 1
fi

# Tag the Docker image for Amazon ECR
ECR_IMAGE_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$IMAGE_NAME:$TAG"
echo "Tagging the Docker image as $ECR_IMAGE_URI..."
docker tag $IMAGE_NAME:$TAG $ECR_IMAGE_URI

# Push the Docker image to Amazon ECR
echo "Pushing the Docker image to Amazon ECR..."
docker push $ECR_IMAGE_URI
if [ $? -eq 0 ]; then
  echo "Docker image pushed successfully: $ECR_IMAGE_URI"
else
  echo "Error: Failed to push the Docker image."
  read -p "Press any key to continue..."
  exit 1
fi

# Freeze the script to display the output
read -p "Press any key to continue..."
