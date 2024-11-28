resource "tls_private_key" "my_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "my_key_pair" {
  key_name   = "my-key"
  public_key = tls_private_key.my_key.public_key_openssh
}

resource "local_file" "private_key_pem" {
  filename        = "${path.module}/my-key.pem"
  content         = tls_private_key.my_key.private_key_pem
  file_permission = "0400"
}
