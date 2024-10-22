<h2>Table of Contents</h2>

- [Description](#description)
  - [Entities](#entities)
    - [Database Diagram](#database-diagram)
    - [Tenant](#tenant)
    - [User](#user)
    - [Event](#event)
    - [Ticket](#ticket)
    - [Transaction](#transaction)
    - [Evaluation](#evaluation)
- [Technical Specifications](#technical-specifications)
  - [More About Docker](#more-about-docker)
  - [More About Terraform](#more-about-terraform)
  - [More About AWS CLI](#more-about-aws-cli)
- [How to Run](#how-to-run)
- [Cheat Sheet](#cheat-sheet)
  - [Docker Actions](#docker-actions)
  - [Terraform Actions](#terraform-actions)
  - [Run Tests](#run-tests)
  - [Custom Actions](#custom-actions)
- [Authors](#authors)

## Description

This project is a simple API that describes an event-oriented ticketing system. It is a simple application that allows users to create events and tickets for those events, as well as buy tickets for events created by other users, provide feedback on the sellers, and view the feedback provided by other users, among other features.

For more specific business rules and project description, please refer to the [full document](./docs/UseCases.md).

### Entities

Let's talk about the main entities of the application:

#### Database Diagram

![Database Entities Diagram](./docs/Construção%20de%20Software%20-%20T1.drawio.png)

#### Tenant

The tenant represents a logical grouping of users, events, tickets and transactions. It is used to separate the data of different users, so that each user can only see and interact with their own data. There are three types of tenants: `Admin`, `Seller` and `Buyer`.

#### User

The user is one of the central components of the application, it is intrinsically linked to the tenant, as it must always be associated with one. This entity represents the users of the application, who can be `Administrators`, `Sellers` or `Buyers`. The user can create events, tickets and transactions, as well as provide feedback on other users, depending on their role.

#### Event

The event is an entity that represents a gathering of people for a specific purpose. It is created by an administrator (tenant) and can have a title, description, location and a list of tickets associated with it. The event can be public or private, and only the users who have the event's access code can buy tickets for it.

#### Ticket

The ticket is an entity that represents the right to attend an event. It is created by a seller (tenant) and has a price, a verification code and a status. The ticket can be bought by a buyer (tenant) and can be used to attend the event. The ticket can be in one of the following statuses: `Available`, `Sold`, `Used` or `Refunded`.

#### Transaction

The transaction is an entity that represents the purchase of a ticket by a buyer. It is created by the buyer and has a status, a timestamp and a reference to the ticket that was bought. The transaction can be in one of the following statuses: `Pending`, `Completed` or `Refunded`. The transaction is used to verify the validity of the ticket and to provide feedback on the seller.

#### Evaluation

The evaluation is an entity that represents the feedback provided by a user about another user. It is created by the buyer and has a rating and a comment. The evaluation is used to provide feedback on the seller and can be used to help other buyers make informed decisions.

## Technical Specifications

This project was developed using [NestJS](https://nestjs.com/) with [TypeScript](https://www.typescriptlang.org/). It uses a PostgreSQL database managed by [TypeORM](https://typeorm.io/) to store the data and is deployed on [AWS](#aws-cli) using [Docker](#docker) containers and [Terraform](#terraform) to create the necessary resources.

### More About [Docker](https://www.docker.com/)

Docker is used to create containers for the application and the database. It is used to create a development environment that is as close as possible to the production environment.
It is highly recommended to use Docker to run the application.
We are also using [Docker Hub](https://hub.docker.com/) to store the application image.

We have a [`Dockerfile`](Dockerfile) that contains the configuration for the application container and two `docker-compose` files, one for [development](docker-compose.yml) and one for [production](docker-compose.prod.yml).

For some useful Docker commands, [click here](#docker-actions).

### More About [Terraform](https://www.terraform.io/)

Terraform is used to create the infrastructure on AWS. It creates the necessary resources for the application to run on the cloud.
We are using Terraform to create a simple ec2 instance with a security group and a key pair, which can be used to login into the instance.

We have a `main.tf` file that contains the configuration for the resources that will be created on AWS.

For some useful Terraform commands, [click here](#terraform-actions).

### More About [AWS CLI](https://aws.amazon.com/cli/)

The AWS CLI is used to interact with AWS services, it can be used for finer control over the resources created by Terraform, altough it is not necessary. It is being used to upload the `docker-compose` file to the s3 bucket.

## How to Run

Now that you have all the necessary tools installed, you can run the application.
To start the application with Docker, simply run the following command:

```bash
$ docker compose up
```

That's it! The application should be running on `http://localhost:3000`.

You can access the API documentation built with [Swagger](https://swagger.io/) on `http://localhost:3000/docs`.

Now, assuming that you have made changes to the application and want to publish them to the cloud, here's a step-by-step guide on how to do it:

1. Update the application image on Docker Hub:

This is the most important step, you must update the image on Docker Hub so that the instance can download it and run the application with the latest changes.

```bash
$ scripts/update-image.sh
```

2. (Optional) Update the `docker-compose` file on the s3 bucket:

Run this only if you have made changes to the `docker-compose.prod.yml` file and want to update the one on the s3 bucket.
Altough we are using a public bucket, if you update the file you must manually update the Access control list (ACL) file on the bucket to allow `Read` access to the `Object` for `Everyone (public access)`. This is necessary because the instance will download the file from the bucket.

```bash
$ scripts/upload-compose.sh
```

3. Initialize the Terraform environment:

This command will download the necessary plugins to run the Terraform script, you should only need to run this once.

```bash
$ terraform init
```

4. Push the changes to the cloud:

This command will show you what will be created on AWS, you can review it and then confirm the changes.

```bash
$ terraform apply
```

That's it! The application should be running on the cloud now.

Access your instance on the AWS console to get the public IP address and access the application.

To enter into the instance, you can use the following command:

```bash
$ ssh -i .aws/my-key.pem ubuntu@{{public_ip}}
```

## Cheat Sheet

### Docker Actions

```bash
# Build the containers
$ docker compose up --build

# List all containers
$ docker ps

# Access the container
$ docker exect -it {{container_id}} sh
```

### Terraform Actions

```bash
# Initialize terraform environment
$ terraform init

# See what will be setup
$ terraform plan

# Push changes to cloud
$ terraform apply

# "Rollback" Changes
$ terraform destroy
```

### Run Tests

Can be done locally if you have [Node.js](https://nodejs.org/en/) installed.
Alternatively, you can run the tests inside the container (recommended).

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Custom Actions

```bash
# Update the application image on Docker Hub
# Must be logged in to Docker Hub on the terminal
$ scripts/update-image.sh

# Update the docker-compose file on the s3 bucket
# Must be logged in to AWS on the terminal and have the necessary permissions/credentials
$ scripts/upload-compose.sh
```

## Authors

- [Carolina Ferreira](https://github.com/carolmicfer)
- [Felipe Freitas Silva](https://github.com/felipefreitassilva)
- [Luiza Heller Kroeff Plá](https://github.com/LuHellerKP)
- [Mateus Campos Caçabuena](https://github.com/mateuscacabuena)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
