#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(realpath "$0")")

# Construct the path to the AWS credentials file
AWS_CREDENTIALS_FILE="$SCRIPT_DIR/../.aws/credentials"

echo "Script directory: $SCRIPT_DIR"
echo "Looking for AWS credentials file at: $AWS_CREDENTIALS_FILE"

if [ ! -f "$AWS_CREDENTIALS_FILE" ]; then
  echo "AWS credentials file not found at $AWS_CREDENTIALS_FILE"
  # Freeze the script to display the output
  read -p "Press any key to continue..."
  exit 1
fi

# Debug: Display the contents of the credentials file
echo "Contents of $AWS_CREDENTIALS_FILE:"
cat "$AWS_CREDENTIALS_FILE"

# Extract AWS Access Key ID and Secret Access Key
AWS_ACCESS_KEY_ID=$(grep -A 3 '\[default\]' "$AWS_CREDENTIALS_FILE" | grep 'aws_access_key_id' | awk -F '=' '{print $2}' | xargs)
AWS_SECRET_ACCESS_KEY=$(grep -A 3 '\[default\]' "$AWS_CREDENTIALS_FILE" | grep 'aws_secret_access_key' | awk -F '=' '{print $2}' | xargs)
AWS_SESSION_TOKEN=$(grep -A 3 '\[default\]' "$AWS_CREDENTIALS_FILE" | grep 'aws_session_token' | awk -F '=' '{print $2}' | xargs)

# Debug: Display the extracted values
echo "Extracted AWS_ACCESS_KEY_ID: $AWS_ACCESS_KEY_ID"
echo "Extracted AWS_SECRET_ACCESS_KEY: $AWS_SECRET_ACCESS_KEY"
echo "Extracted AWS_SESSION_TOKEN: $AWS_SESSION_TOKEN"

if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  echo "Failed to extract AWS credentials from $AWS_CREDENTIALS_FILE"
  # Freeze the script to display the output
  read -p "Press any key to continue..."
  exit 1
fi

# Export the credentials as environment variables
export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY
export AWS_SESSION_TOKEN

echo "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_SESSION_TOKEN have been set as environment variables."

# Freeze the script to display the output
read -p "Press any key to continue..."
