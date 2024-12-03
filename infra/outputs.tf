################################################################
##############            ALB Outputs               ############
################################################################

output "alb_arn" {
  description = "ARN of the ALB"
  value       = module.alb.arn
}

output "alb_dns_name" {
  description = "DNS name of the ALB"
  value       = module.alb.dns_name
}

output "alb_zone_id" {
  description = "Hosted zone ID of the ALB"
  value       = module.alb.zone_id
}

output "alb_security_group_id" {
  description = "Security group ID associated with the ALB"
  value       = aws_security_group.security_group.id
}

output "alb_http_listener_arn" {
  description = "ARN of the HTTP listener for the ALB"
  value       = module.alb.listeners["http"].arn
}

output "alb_http_listener_port" {
  description = "Port of the HTTP listener for the ALB"
  value       = module.alb.listeners["http"].port
}

output "alb_target_group_arn" {
  description = "ARN of the ECS target group"
  value       = module.alb.target_groups["ecs"].arn
}

output "alb_target_group_deregistration_delay" {
  description = "Deregistration delay configured for the ALB target group"
  value       = module.alb.target_groups["ecs"].deregistration_delay
}

################################################################
##############          Backend Outputs             ############
################################################################

output "terraform_backend_workspace" {
  description = "The workspace name for the remote backend"
  value       = terraform.workspace
}

################################################################
##############            Data Outputs              ############
################################################################

output "available_availability_zones" {
  description = "List of available availability zones"
  value       = data.aws_availability_zones.available.names
}

output "caller_identity_arn" {
  description = "ARN of the current AWS caller"
  value       = data.aws_caller_identity.current.arn
}

output "caller_identity_user_id" {
  description = "User ID of the current AWS caller"
  value       = data.aws_caller_identity.current.user_id
}

output "caller_identity_account_id" {
  description = "Account ID of the current AWS caller"
  value       = data.aws_caller_identity.current.account_id
}

################################################################
##############            EC2 Outputs               ############
################################################################

output "ec2_instance_id" {
  description = "The ID of the EC2 instance"
  value       = aws_instance.ec2.id
}

output "ec2_public_ip" {
  description = "The public IP address of the EC2 instance"
  value       = aws_instance.ec2.public_ip
}

output "ec2_private_ip" {
  description = "The private IP address of the EC2 instance"
  value       = aws_instance.ec2.private_ip
}

output "ec2_instance_type" {
  description = "The type of EC2 instance"
  value       = aws_instance.ec2.instance_type
}

output "ec2_ami" {
  description = "The AMI ID used to launch the EC2 instance"
  value       = aws_instance.ec2.ami
}

output "ec2_security_group_id" {
  description = "Security group ID associated with the EC2 instance"
  value       = aws_instance.ec2.vpc_security_group_ids
}

output "ec2_key_name" {
  description = "Key name associated with the EC2 instance"
  value       = aws_instance.ec2.key_name
}

output "ec2_user_data" {
  description = "User data script used for the EC2 instance"
  value       = aws_instance.ec2.user_data
}

################################################################
##############            ECR Outputs               ############
################################################################

output "ecr_repository_url" {
  description = "The URL of the ECR repository"
  value       = aws_ecr_repository.ecr.repository_url
}

output "ecr_repository_arn" {
  description = "The ARN of the ECR repository"
  value       = aws_ecr_repository.ecr.arn
}

output "ecr_repository_name" {
  description = "The name of the ECR repository"
  value       = aws_ecr_repository.ecr.name
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

################################################################
##############            Keys Outputs              ############
################################################################

output "private_key_pem" {
  description = "The private key in PEM format"
  value       = local_file.private_key_pem.content
  sensitive   = true
}

output "public_key_openssh" {
  description = "The public key in OpenSSH format"
  value       = tls_private_key.my_key.public_key_openssh
}

output "key_pair_name" {
  description = "The name of the AWS key pair"
  value       = aws_key_pair.my_key_pair.key_name
}

output "key_pair_fingerprint" {
  description = "The fingerprint of the AWS key pair"
  value       = aws_key_pair.my_key_pair.fingerprint
}

################################################################
##############            Locals Outputs            ############
################################################################

output "name" {
  description = "The full name of the project, combining environment and project name"
  value       = local.name
}

output "container_name" {
  description = "The name of the container (ECR)"
  value       = local.container_name
}

output "container_port" {
  description = "The port the container listens on"
  value       = local.container_port
}

output "user_id" {
  description = "The AWS account ID of the current user"
  value       = local.user_id
}

output "tags" {
  description = "The tags used for resources"
  value       = local.tags
}

################################################################
##############        Security Groups Outputs       ############
################################################################

output "security_group_id" {
  description = "The ID of the security group"
  value       = aws_security_group.security_group.id
}

output "security_group_name" {
  description = "The name of the security group"
  value       = aws_security_group.security_group.name
}

output "security_group_description" {
  description = "The description of the security group"
  value       = aws_security_group.security_group.description
}

output "security_group_ingress_rules" {
  description = "The ingress rules of the security group"
  value = [
    for rule in aws_security_group.security_group.ingress : {
      description = rule.description
      from_port   = rule.from_port
      to_port     = rule.to_port
      protocol    = rule.protocol
      cidr_blocks = rule.cidr_blocks
    }
  ]
}

output "security_group_egress_rules" {
  description = "The egress rules of the security group"
  value = [
    for rule in aws_security_group.security_group.egress : {
      from_port   = rule.from_port
      to_port     = rule.to_port
      protocol    = rule.protocol
      cidr_blocks = rule.cidr_blocks
    }
  ]
}

################################################################
##############           Variables Outputs          ############
################################################################

output "region" {
  description = "AWS region to deploy to"
  value       = var.region
}

output "environment" {
  description = "Environment to deploy to"
  value       = var.environment
}

output "project_name" {
  description = "Name of the project"
  value       = var.project_name
}

################################################################
##############           Versions Outputs           ############
################################################################

output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

output "vpc_cidr_block" {
  description = "The CIDR block of the VPC"
  value       = module.vpc.vpc_cidr_block
}

output "public_subnets" {
  description = "The IDs of the public subnets"
  value       = module.vpc.public_subnets
}

output "private_subnets" {
  description = "The IDs of the private subnets"
  value       = module.vpc.private_subnets
}

output "database_subnets" {
  description = "The IDs of the database subnets"
  value       = module.vpc.database_subnets
}

output "availability_zones" {
  description = "The availability zones where subnets are created"
  value       = module.vpc.azs
}
