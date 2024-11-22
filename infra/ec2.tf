resource "aws_instance" "csw24-grupob-ticket" {
  ami           = "ami-007855ac798b5175e" # Ubuntu 22.04 LTS
  instance_type = "t2.micro"
  key_name      = aws_key_pair.my_key_pair.key_name

  vpc_security_group_ids = [aws_security_group.csw24_ticket_ports_access.id]

  tags = {
    Name = "csw24-grupob-ticket"
  }

  # User data script to install Docker and start your container
  user_data = <<-EOF
    #!/bin/bash
    # Update the package index
    sudo apt-get update

    # Install Docker
    sudo apt-get install -y docker.io

    # Start Docker service
    sudo systemctl start docker
    sudo systemctl enable docker

    # Install Docker Compose
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    # Navigate to home, just to be sure
    cd /home/ubuntu

    # Write into file to demonstrate success
    touch success.txt

    # Download docker-compose.yml from S3 (if bucket name changes, this line has to be updated manually)
    curl -O https://csw24-ticket-docker-compose-bucket.s3.amazonaws.com/docker-compose.yml

    # Start container
    sudo docker-compose up -d
  EOF
}