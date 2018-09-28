#!/bin/bash

if [ ! "$(docker network ls | grep petbnb)" ]; then
  echo "Creating petbnb network ..."
  docker network create petbnb
else
  echo "petbnb network exists."
fi
