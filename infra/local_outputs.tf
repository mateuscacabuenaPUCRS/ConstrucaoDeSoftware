output "private_key" {
  value     = tls_private_key.my_key.private_key_pem
  sensitive = true
}

output "public_key" {
  value = tls_private_key.my_key.public_key_openssh
}

output "ec2_public_ip" {
  value       = aws_instance.csw24-grupob-ticket.public_ip
  description = "The public IP address of the EC2 instance"
}

output "vpc_id" {
  value = module.vpc.vpc_id
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

output "availability_zones" {
  value = module.vpc.availability_zones
}

output "ecs_cluster_name" {
  value = module.ecs_cluster.cluster_name
}

output "ecs_cluster_arn" {
  value = module.ecs_cluster.cluster_arn
}

output "vpc_cider_block" {
  value = module.vpc.vpc_cidr_block
}
