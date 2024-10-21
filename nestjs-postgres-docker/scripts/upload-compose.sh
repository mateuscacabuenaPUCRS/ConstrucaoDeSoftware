#!/bin/bash

# Define variables (change these values to match your S3 bucket and Docker Compose file name)
S3_BUCKET="csw24-ticket-docker-compose-bucket"
DOCKER_COMPOSE_FILE="docker-compose.prod.yml"
DOCKER_COMPOSE_FILENAME="docker-compose.yml"
S3_PATH="s3://${S3_BUCKET}/${DOCKER_COMPOSE_FILENAME}"

# Ensure AWS CLI is installed
if ! [ -x "$(command -v aws)" ]; then
  echo 'Error: aws CLI is not installed.' >&2
  exit 1
fi

# Upload docker-compose.yml to S3
echo "Uploading ${DOCKER_COMPOSE_FILE} to ${S3_PATH}..."
aws s3 cp ${DOCKER_COMPOSE_FILE} ${S3_PATH}

if [ $? -eq 0 ]; then
  echo "Successfully uploaded ${DOCKER_COMPOSE_FILE} to ${S3_BUCKET}"
else
  echo "Failed to upload ${DOCKER_COMPOSE_FILE} to ${S3_BUCKET}"
fi

# Freeze the script to display the output
read -p "Press any key to continue..."
