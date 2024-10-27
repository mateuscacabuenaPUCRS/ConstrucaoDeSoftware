provider "aws" {
    region = "us-east-1"
    shared_credentials_files = [".aws/credentials"]
}

# Commenting since we don't have permission to create bucket with ACL enabled (except via the console for some unknown reason)

# resource "aws_s3_bucket" "csw24_docker_compose_bucket" {
#   bucket  = "csw24-ticket-docker-compose-bucket"
# }

# resource "aws_s3_bucket_acl" "csw24_docker_compose_bucket_acl" {
#     bucket = aws_s3_bucket.csw24_docker_compose_bucket.id
#     acl    = "public-read"
# }

# resource "aws_s3_object" "csw24_docker_compose_file" {
#   bucket  = aws_s3_bucket.csw24_docker_compose_bucket.bucket
#   key     = "docker-compose.yml"
#   source  = "${path.module}/docker-compose.yml"
#   acl     = "public-read"
# }

resource "tls_private_key" "my_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "my_key_pair" {
  key_name   = "my-key"
  public_key = tls_private_key.my_key.public_key_openssh
}

resource "aws_security_group" "csw24_ticket_ports_access" {
    name        =   "csw24-ticket-ports-access"
    description =   "Allows API and SSH access"

    # API
    ingress {
        description = "API"
        from_port   = 3000
        to_port     = 3000
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    # SSH
    ingress {
        description = "SSH"
        from_port   = 22
        to_port     = 22
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
        from_port   = 0
        to_port     = 0
        protocol    = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_instance" "csw24-grupob-ticket" {
    ami             = "ami-007855ac798b5175e" # Ubuntu 22.04 LTS
    instance_type   = "t2.micro"
    key_name        = aws_key_pair.my_key_pair.key_name

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

resource "local_file" "private_key_pem" {
  filename        = "${path.module}/.aws/my-key.pem"
  content         = tls_private_key.my_key.private_key_pem
  file_permission = "0400"
}

output "private_key" {
  value     = tls_private_key.my_key.private_key_pem
  sensitive = true
}

output "public_key" {
  value = tls_private_key.my_key.public_key_openssh
}
