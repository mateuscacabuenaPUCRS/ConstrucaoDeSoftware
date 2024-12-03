locals {
  region      = var.region
  environment = var.environment
  name        = "${local.environment}-${var.project_name}"

  container_name = "${local.name}-ecr"
  container_port = 8000

  user_id = data.aws_caller_identity.current.account_id

  tags = {
    Name       = local.name
    Example    = local.name
    Repository = "https://github.com/terraform-aws-modules/terraform-aws-ecs"
  }
}
