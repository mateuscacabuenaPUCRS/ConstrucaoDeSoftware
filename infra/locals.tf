locals {
  region      = var.region
  environment = var.environment
  name        = "${local.environment}-${var.project_name}"

  container_port = 3000

  tags = {
    Name       = local.name
    Example    = local.name
    Repository = "https://github.com/terraform-aws-modules/terraform-aws-ecs"
  }
}
