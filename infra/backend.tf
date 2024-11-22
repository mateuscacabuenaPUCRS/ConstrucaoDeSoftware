terraform {
  backend "remote" {
    organization = "CSW24-GrupoB"

    workspaces {
      name = "csw24-grupob-workspace"
    }
  }
}