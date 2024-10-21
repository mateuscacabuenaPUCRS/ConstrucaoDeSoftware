## Project setup

```bash
# Build the containers
$ docker compose up --build

# List all containers (optional)
$ docker ps

# Access the container (optional)
$ docker exect -it {{container_id}} sh
```

## Terraform Actions

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

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Authors

- [Carolina Ferreira](https://github.com/carolmicfer)
- [Felipe Freitas Silva](https://github.com/felipefreitassilva)
- [Luiza Heller Kroeff Plá](https://github.com/LuHellerKP)
- [Mateus Campos Caçabuena](https://github.com/mateuscacabuena)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
