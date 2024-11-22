provider "aws" {
  region     = "us-east-1"
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
  token      = var.AWS_SESSION_TOKEN
}

# Commenting since we don't have permission to create bucket with ACL enabled (except via the console for some unknown reason)

# resource "aws_s3_bucket" "csw24_docker_compose_bucket" {
#   bucket = "csw24-ticket-docker-compose-bucket"
# }

# resource "aws_s3_bucket_acl" "csw24_docker_compose_bucket_acl" {
#   bucket = aws_s3_bucket.csw24_docker_compose_bucket.id
#   acl    = "public-read"
# }

# resource "aws_s3_object" "csw24_docker_compose_file" {
#   bucket = aws_s3_bucket.csw24_docker_compose_bucket.bucket
#   key    = "docker-compose.yml"
#   source = "${path.module}/docker-compose.yml"
#   acl    = "public-read"
# }
