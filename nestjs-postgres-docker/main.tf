provider "aws" {
    region = "us-east-1"
    shared_credentials_files = [".aws/credentials"]
}

resource "tls_private_key" "my_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "my_key_pair" {
  key_name   = "my-key"
  public_key = tls_private_key.my_key.public_key_openssh
}

resource "aws_security_group" "cs24_ticket_ports_access" {
    name        =   "cs24_ticket_ports_access"
    description =   "Allows API(HTTP) and SSH access"

    # API(HTTP)
    ingress {
        description = "API"
        from_port   = 8080
        to_port     = 8080
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

    vpc_security_group_ids = [aws_security_group.cs24_ticket_ports_access.id]

    tags = {
        Name = "csw24-grupob-ticket"
    }
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
