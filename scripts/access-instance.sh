# Define the EC2 user name
EC2USER="ubuntu"

# Define file paths
PRIVATE_KEY_FILE="./.aws/my-key.pem"
DESTINATION_KEY_FILE="$HOME/my-key.pem"
IP_FILE="./.aws/ec2_public_ip.txt"

# Ensure the .aws directory exists
mkdir -p ./.aws

# Retrieve and save the private key
echo "Fetching the private key from Terraform outputs..."
private_key=$(terraform output -raw private_key)
if [[ $? -ne 0 || -z "$private_key" ]]; then
  echo "Error: Unable to fetch private key from Terraform."
  exit 1
fi

# Save the private key without extra newlines
echo -n "$private_key" > "$PRIVATE_KEY_FILE"
if [[ $? -ne 0 ]]; then
  echo "Error: Unable to save private key."
  exit 1
fi

echo "Setting permissions for the private key..."
chmod 400 "$PRIVATE_KEY_FILE"
if [[ $? -ne 0 ]]; then
  echo "Error: Unable to set permissions on the private key."
  exit 1
fi

# Secure copy the private key to the home directory
echo "Copying private key to $DESTINATION_KEY_FILE..."
cp "$PRIVATE_KEY_FILE" "$DESTINATION_KEY_FILE"
if [[ $? -ne 0 ]]; then
  echo "Error: Unable to copy private key."
  exit 1
fi

# Set permissions for the destination private key file
chmod 400 "$DESTINATION_KEY_FILE"
if [[ $? -ne 0 ]]; then
  echo "Error: Unable to set permissions for the destination private key."
  exit 1
fi

# Retrieve and save the EC2 public IP
echo "Fetching the public IP from Terraform outputs..."
public_ip=$(terraform output -raw ec2_public_ip)
if [[ $? -ne 0 || -z "$public_ip" ]]; then
  echo "Error: Unable to fetch EC2 public IP from Terraform."
  exit 1
fi

echo "$public_ip" > "$IP_FILE"
if [[ $? -ne 0 ]]; then
  echo "Error: Unable to save EC2 public IP."
  exit 1
fi

# Read the IP address
PUBLIC_IP=$(cat "$IP_FILE")
if [[ -z "$PUBLIC_IP" ]]; then
  echo "Error: Public IP is empty."
  exit 1
fi
echo "Public IP fetched: $PUBLIC_IP"

# Connect to the EC2 instance
echo "Connecting to the EC2 instance via SSH..."
ssh -i "$DESTINATION_KEY_FILE" "$EC2USER@$PUBLIC_IP"
