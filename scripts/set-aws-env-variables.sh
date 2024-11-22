#!/bin/bash

# Function to set environment variables globally on Windows
set_env_vars_windows() {
  echo "Args: $1 $2 $3 $4"
  setx AWS_PROFILE "$1"
  setx AWS_ACCESS_KEY_ID "$2"
  setx AWS_SECRET_ACCESS_KEY "$3"
  setx AWS_SESSION_TOKEN "$4"
}

# Function to set environment variables globally on Linux
set_env_vars_linux() {
  echo "export AWS_PROFILE=$1" >> ~/.bashrc
  echo "export AWS_ACCESS_KEY_ID=$2" >> ~/.bashrc
  echo "export AWS_SECRET_ACCESS_KEY=$3" >> ~/.bashrc
  echo "export AWS_SESSION_TOKEN=$4" >> ~/.bashrc
  # Source the .bashrc to apply changes immediately
  source ~/.bashrc
}

# Function to read credentials from the .aws/credentials file
read_credentials() {
  local profile=$1
  local credentials_file="$HOME/.aws/credentials"

  if [[ ! -f $credentials_file ]]; then
    echo "Credentials file not found: $credentials_file"
    return 1
  fi

  local access_key_id=$(awk -v profile="[$profile]" '$0 == profile {getline; print $3}' $credentials_file)
  local secret_access_key=$(awk -v profile="[$profile]" '$0 == profile {getline; getline; print $3}' $credentials_file)
  local session_token=$(awk -v profile="[$profile]" '$0 == profile {getline; getline; getline; print $3}' $credentials_file)

  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    set_env_vars_windows "$profile" "$access_key_id" "$secret_access_key" "$session_token"
  else
    set_env_vars_linux "$profile" "$access_key_id" "$secret_access_key" "$session_token"
  fi
}

# Default profile
profile="default"

# Check if a profile is provided as an argument
if [[ $# -gt 0 ]]; then
  profile=$1
fi

# Read credentials and set environment variables
read_credentials $profile

if [[ $? -eq 0 ]]; then
  echo "AWS environment variables set for profile: $profile"
else
  echo "Failed to set AWS environment variables for profile: $profile"
fi

# Freeze the script to display the output
read -p "Press any key to continue..."
