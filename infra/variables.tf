variable "AWS_ACCESS_KEY_ID" {
  description = "AWS Access Key ID for authentication"
  type        = string
}

variable "AWS_SECRET_ACCESS_KEY" {
  description = "AWS Secret Access Key for authentication"
  type        = string
}

variable "AWS_SESSION_TOKEN" {
  description = "AWS Session Token (optional, used for temporary credentials)"
  type        = string
  default     = null
}

variable "region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment to deploy to"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "csw24-grupob"
}
