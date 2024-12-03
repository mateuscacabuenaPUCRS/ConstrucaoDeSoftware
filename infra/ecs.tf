resource "aws_ecs_cluster" "ecs_cluster" {
  name = "${local.name}-ecs-cluster"
}

resource "aws_ecs_task_definition" "task" {
  family                   = "${local.name}-ecs-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  cpu    = "1024"
  memory = "2048"

  container_definitions = jsonencode([{
    name      = local.container_name
    cpu       = 512
    memory    = 1024
    essential = true
    image     = "${local.user_id}.dkr.ecr.${local.region}.amazonaws.com/${local.container_name}:latest"

    portMappings = [{
      containerPort = 8000
      hostPort      = 8000
      protocol      = "tcp"
    }]
  }])

  execution_role_arn = "arn:aws:iam::${local.user_id}:role/LabRole"
  task_role_arn      = "arn:aws:iam::${local.user_id}:role/LabRole"

  tags = local.tags
}

resource "aws_ecs_service" "ecs_service" {
  name            = "${local.name}-ecs-service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.task.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = module.vpc.public_subnets
    security_groups  = [aws_security_group.security_group.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = module.alb.target_groups["ecs"].arn
    container_name   = local.container_name
    container_port   = 8000
  }

  tags = local.tags
}
