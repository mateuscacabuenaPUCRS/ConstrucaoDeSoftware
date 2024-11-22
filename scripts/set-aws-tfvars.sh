#!/bin/bash

# Function to read credentials from the .aws/credentials file
read_credentials() {
  local profile=$1
  local credentials_file="$HOME/.aws/credentials"
  local tfvars_file="infra/aws.auto.tfvars"

  if [[ ! -f $credentials_file ]]; then
    echo "Credentials file not found: $credentials_file"
    return 1
  fi

  local access_key_id=$(awk -v profile="[$profile]" '$0 == profile {getline; print $3}' $credentials_file)
  local secret_access_key=$(awk -v profile="[$profile]" '$0 == profile {getline; getline; print $3}' $credentials_file)
  local session_token=$(awk -v profile="[$profile]" '$0 == profile {getline; getline; getline; print $3}' $credentials_file)

  # Create the infra directory if it doesn't exist
  mkdir -p infra
  # Create $tfvars_file if it doesn't exist
  if [[ ! -f $tfvars_file ]]; then
    touch $tfvars_file
  fi
  # Overwrite the file with the new credentials
  cat <<EOT > $tfvars_file
AWS_ACCESS_KEY_ID     = "$access_key_id"
AWS_SECRET_ACCESS_KEY = "$secret_access_key"
AWS_SESSION_TOKEN     = "$session_token"
EOT

  echo "Credentials written to $tfvars_file"
}

# Default profile
profile="default"

# Check if a profile is provided as an argument
if [[ $# -gt 0 ]]; then
  profile=$1
fi

# Read credentials and write to aws.auto.tfvars
read_credentials $profile

if [[ $? -eq 0 ]]; then
  echo "AWS environment variables set for profile: $profile"
else
  echo "Failed to set AWS environment variables for profile: $profile"
fi

# Freeze the script to display the output
read -p "Press any key to continue..."
