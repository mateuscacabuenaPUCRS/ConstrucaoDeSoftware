resource "aws_instance" "ec2" {
  ami           = "ami-007855ac798b5175e" # Ubuntu 22.04 LTS
  instance_type = "t2.micro"
  key_name      = aws_key_pair.my_key_pair.key_name

  associate_public_ip_address = true

  subnet_id = module.vpc.public_subnets[0]

  vpc_security_group_ids = [aws_security_group.security_group.id]

  tags = {
    Name = "${local.name}-ec2"
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
    curl -O https://csw24-docker-compose-bucket.s3.amazonaws.com/docker-compose.yml

    # Start container
    sudo docker-compose up -d
  EOF
}