output "private_key" {
  value     = tls_private_key.my_key.private_key_pem
  sensitive = true
}

output "public_key" {
  value = tls_private_key.my_key.public_key_openssh
}

resource "local_file" "private_key_pem" {
  filename        = "${path.module}/.aws/my-key.pem"
  content         = tls_private_key.my_key.private_key_pem
  file_permission = "0400"
}