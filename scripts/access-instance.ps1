# Define the EC2 user name
$EC2USER = "ubuntu"

# Define file paths
$ROOT_DIR = Get-Location
$PRIVATE_KEY_FILE = "$ROOT_DIR\.aws\my-key.pem"
$IP_FILE = "$ROOT_DIR\.aws\ec2_public_ip.txt"
$TERRAFORM_DIR = "$ROOT_DIR\infra"

# Save the current directory so we can return later
$originalDir = Get-Location

# Change to the Terraform directory
Set-Location -Path $TERRAFORM_DIR

# Ensure the .aws directory exists in the root folder
$awsDir = "$ROOT_DIR\.aws"
if (-not (Test-Path -Path $awsDir)) {
    Write-Host "Creating .aws directory in the root folder..."
    New-Item -ItemType Directory -Path $awsDir
}

# Fetch and save the private key from Terraform output
Write-Host "Fetching the private key from Terraform outputs..."
$private_key = terraform output -raw private_key_pem
$private_key = $private_key.Trim()
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Unable to fetch private key from Terraform."
    exit 1
}

# Return to the original directory
Set-Location -Path $originalDir

Set-Content -Path $PRIVATE_KEY_FILE -Value $private_key -Force

# Set permissions for the private key (equivalent to chmod 400)
Write-Host "Setting permissions for the private key..."
icacls $PRIVATE_KEY_FILE /inheritance:r
icacls $PRIVATE_KEY_FILE /grant:r "$($env:USERDOMAIN)\$($env:USERNAME):(F)"

# Change to the Terraform directory again to fetch the IP
Set-Location -Path $TERRAFORM_DIR

# Fetch and save the EC2 public IP
Write-Host "Fetching the public IP from Terraform outputs..."
$public_ip = terraform output -raw ec2_public_ip
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Unable to fetch EC2 public IP from Terraform."
    exit 1
}
$public_ip | Out-File -FilePath $IP_FILE -Force

# Return to the original directory again
Set-Location -Path $originalDir

# Read the IP address and trim any extra whitespace or newlines
$PUBLIC_IP = (Get-Content -Path $IP_FILE).Trim()
if (-not $PUBLIC_IP) {
    Write-Host "Error: Public IP is empty."
    exit 1
}
Write-Host "Public IP fetched: $PUBLIC_IP"

# Connect to the EC2 instance
Write-Host "Connecting to the EC2 instance via SSH..."
# Ensure the path to your SSH client is correct if you're using a tool like Git Bash, Cygwin, or Windows Subsystem for Linux (WSL)
ssh -i $PRIVATE_KEY_FILE "$EC2USER@$PUBLIC_IP"
