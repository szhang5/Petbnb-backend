SHELL := /bin/bash

SVC_NAME = nodejs-backend

SVC_TAG = latest

# Set the port to expose the frontend
# SERVER_PORT = 8080
GRPC_PORT = 50051

all:
	$(MAKE) local

local:
	$(MAKE) bridge
	$(MAKE) build
	$(MAKE) run cmd="npm start"

build:
	docker build --rm \
		-f docker-build.d/Dockerfile \
		-t $(SVC_NAME):$(SVC_TAG) \
		.

run:
	$(MAKE) stop
	docker run \
		-ti \
		--network=petbnb \
		--name $(SVC_NAME) \
		-p $(GRPC_PORT):$(GRPC_PORT) \
		-v $(PWD)/server:/usr/src/app/server \
		$(SVC_NAME):$(SVC_TAG) \
		$(cmd)

exec:
	docker exec \
		-ti \
		$(SVC_NAME) \
		/bin/sh

integration:
	$(MAKE) run cmd="/bin/sh -c 'yarn start & sleep 5 && yarn run integration-test'"

stop:
	docker stop $(SVC_NAME) || true && docker rm $(SVC_NAME) || true

bridge:
	./scripts/add_bridge.sh

