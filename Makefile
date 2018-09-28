SHELL := /bin/bash

SVC_NAME = nodejs-backend

SVC_TAG = latest

# Set the port to expose the frontend
SERVER_PORT = 8080

all:
	$(MAKE) local

local:
	$(MAKE) build
	$(MAKE) run

build:
	docker build --rm \
		-f docker-build.d/Dockerfile \
		-t $(SVC_NAME):$(SVC_TAG) \
		.

run:
	$(MAKE) stop
	docker run \
		-ti \
		--name $(SVC_NAME) \
		-p $(SERVER_PORT):$(SERVER_PORT) \
		-v $(PWD):/usr/src/app \
		$(SVC_NAME):$(SVC_TAG)

exec:
	docker exec \
		-ti \
		$(SVC_NAME) \
		/bin/sh

stop:
	docker stop $(SVC_NAME) || true && docker rm $(SVC_NAME) || true

