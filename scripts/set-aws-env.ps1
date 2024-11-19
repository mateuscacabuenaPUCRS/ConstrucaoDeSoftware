# Get the directory of the current script
$SCRIPT_DIR = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition

# Construct the path to the AWS credentials file
$AWS_CREDENTIALS_FILE = Join-Path -Path $SCRIPT_DIR -ChildPath "../.aws/credentials"

Write-Host "Script directory: ${SCRIPT_DIR}"
Write-Host "Looking for AWS credentials file at: ${AWS_CREDENTIALS_FILE}"

# Check if the AWS credentials file exists
if (-Not (Test-Path $AWS_CREDENTIALS_FILE)) {
    Write-Host "AWS credentials file not found at ${AWS_CREDENTIALS_FILE}"
    Read-Host "Press Enter to continue..."
    exit 1
}

# Debug: Display the contents of the credentials file
Write-Host "Contents of ${AWS_CREDENTIALS_FILE}:"
Get-Content $AWS_CREDENTIALS_FILE

# Extract AWS Access Key ID, Secret Access Key, and Session Token
$AWS_ACCESS_KEY_ID = (Select-String -Path $AWS_CREDENTIALS_FILE -Pattern 'aws_access_key_id' | ForEach-Object { ($_ -split '=')[1].Trim() })
$AWS_SECRET_ACCESS_KEY = (Select-String -Path $AWS_CREDENTIALS_FILE -Pattern 'aws_secret_access_key' | ForEach-Object { ($_ -split '=')[1].Trim() })
$AWS_SESSION_TOKEN = (Select-String -Path $AWS_CREDENTIALS_FILE -Pattern 'aws_session_token' | ForEach-Object { ($_ -split '=')[1].Trim() })

# Debug: Display the extracted values
Write-Host "Extracted AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID}"
Write-Host "Extracted AWS_SECRET_ACCESS_KEY: ${AWS_SECRET_ACCESS_KEY}"
Write-Host "Extracted AWS_SESSION_TOKEN: ${AWS_SESSION_TOKEN}"

# Check if credentials were successfully extracted
if (-Not $AWS_ACCESS_KEY_ID -or -Not $AWS_SECRET_ACCESS_KEY) {
    Write-Host "Failed to extract AWS credentials from ${AWS_CREDENTIALS_FILE}"
    Read-Host "Press Enter to continue..."
    exit 1
}

# Export the credentials as environment variables
[System.Environment]::SetEnvironmentVariable("AWS_ACCESS_KEY_ID", $AWS_ACCESS_KEY_ID, "Process")
[System.Environment]::SetEnvironmentVariable("AWS_SECRET_ACCESS_KEY", $AWS_SECRET_ACCESS_KEY, "Process")
[System.Environment]::SetEnvironmentVariable("AWS_SESSION_TOKEN", $AWS_SESSION_TOKEN, "Process")

Write-Host "AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_SESSION_TOKEN have been set as environment variables."

# Freeze the script to display the output
Read-Host "Press Enter to continue..."
