output "private_key" {
  value     = tls_private_key.my_key.private_key_pem
  sensitive = true
}

output "public_key" {
  value = tls_private_key.my_key.public_key_openssh
}

output "ec2_public_ip" {
  value       = aws_instance.csw24-grupob-ticket.public_ip
  description = "The public IP address of the EC2 instance"
}

resource "local_file" "private_key_pem" {
  filename        = "${path.module}/my-key.pem"
  content         = tls_private_key.my_key.private_key_pem
  file_permission = "0400"
}