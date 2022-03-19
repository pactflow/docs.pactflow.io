ecr_login:
	AWS_PROFILE=pact-dev eval `aws ecr get-login --no-include-email`

build: ecr_login
	docker-compose run --rm --entrypoint /usr/bin/make dev-service _build

_build:
	cd website && yarn install && yarn run build

start:
	docker-compose run --name docs-start --rm -p 3000:3000 --entrypoint /usr/bin/make dev-service _start

stop:
	docker rm -f docs-start

_start:
	cd website && yarn start

crawl:
	./scripts/crawl-site.sh