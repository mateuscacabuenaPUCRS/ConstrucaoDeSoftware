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
