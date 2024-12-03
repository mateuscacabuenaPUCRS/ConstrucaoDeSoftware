output "private_key" {
  value     = tls_private_key.my_key.private_key_pem
  sensitive = true
}

output "public_key" {
  value = tls_private_key.my_key.public_key_openssh
}

output "ec2_public_ip" {
  value       = aws_instance.ec2.public_ip
  description = "The public IP address of the EC2 instance"
}

output "load_balancer_dns" {
  description = "ALB DNS name"
  value       = module.alb.dns_name
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  value = module.vpc.vpc_cidr_block
}

output "availability_zones" {
  value = module.vpc.azs
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "private_subnets" {
  value = module.vpc.private_subnets
}

output "database_subnets" {
  value = module.vpc.database_subnets
}

################################################################
##############            ECS Outputs               ############
################################################################

output "ecs_task_definition_arn" {
  description = "ARN of the ECS Task Definition"
  value       = aws_ecs_task_definition.task.arn
}

output "ecs_task_definition_family" {
  description = "Family of the ECS Task Definition"
  value       = aws_ecs_task_definition.task.family
}

output "ecs_task_definition_revision" {
  description = "Revision number of the ECS Task Definition"
  value       = aws_ecs_task_definition.task.revision
}

output "ecs_service_name" {
  description = "Name of the ECS Service"
  value       = aws_ecs_service.ecs_service.name
}

output "ecs_service_desired_count" {
  description = "Desired count of the ECS Service"
  value       = aws_ecs_service.ecs_service.desired_count
}

output "ecs_service_task_definition" {
  description = "Task definition used by the ECS Service"
  value       = aws_ecs_service.ecs_service.task_definition
}

output "ecs_service_load_balancer" {
  description = "Load Balancer associated with the ECS Service"
  value       = aws_ecs_service.ecs_service.load_balancer
}

output "ecs_service_network_configuration" {
  description = "Network configuration of the ECS Service"
  value       = aws_ecs_service.ecs_service.network_configuration
}

output "ecs_service_role" {
  description = "IAM role associated with the ECS Service"
  value       = aws_ecs_service.ecs_service.iam_role
}

output "ecs_cluster_name" {
  description = "Name of the ECS Cluster"
  value       = aws_ecs_cluster.ecs_cluster.name
}

output "ecs_cluster_arn" {
  description = "ARN of the ECS Cluster"
  value       = aws_ecs_cluster.ecs_cluster.arn
}
