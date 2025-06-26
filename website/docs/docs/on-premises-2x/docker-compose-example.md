---
title: Docker Compose example
---

In this guide, we'll provide an example `docker compose` setup so that you can see how all of the bits hang together. We will demonstrate:

* Authenticating to Quay.io
* Running the PactFlow enterprise container
* Persistent storage with a postgres database

**Pre-requsites**
* [Docker](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* A working *nix environment and access to a terminal
* Valid credentials to authenticate to our [Docker image registry](docker-image-registry)
* PactFlow license file

## 1. Authenticating to Quay.io

After obtaining valid robot credentials, you need to authenticate to Quay.io so that the docker engine is able to fetch our images.

```
docker login -u="<username>" -p="<password>" quay.io
docker pull quay.io/pactflow/enterprise
```

After this, you should have the latest PactFlow enterprise image on your machine. You can verify by executing

```sh
docker images quay.io/pactflow/enterprise
```

Which should produce an output such as:

```sh
> docker images quay.io/pactflow/enterprise
REPOSITORY                    TAG                 IMAGE ID            CREATED             SIZE
quay.io/pactflow/enterprise   2.0.0               32db429fda01        1 day ago           462MB # <- this guide applies to 2.x.x version
quay.io/pactflow/enterprise   latest              32db429fda01        1 day ago           462MB
quay.io/pactflow/enterprise   1.36.0              7f9b3c3aa50e        7 weeks ago         454MB
```

## 2. PactFlow license file

The PactFlow on-premises version requires a license file to run. You should have received this from us during the
on-boarding process. If not, please contact your Account Manager.

Save the license file into a temporary directory with the name `pactflow-onprem.lic` (it needs to be the same directory as used in step 3).

## 3. Startup PactFlow and supporting services

Save the below file as `docker-compose.yml` in the same directory as the license file and then run `docker-compose up`:

```yaml
version: "3"

services:
  pactflow:
    image: quay.io/pactflow/enterprise:2.0.0
    depends_on:
      - postgres
      - redis
    environment:
      # This is set to localhost for this example but in a real deployment, this needs to be set to the actual URL of the application
      - PACTFLOW_BASE_URL=http://localhost
      # Insecure setting only for the purposes of this demo! Not to be used in production.
      - PACTFLOW_DATABASE_SSLMODE=disable
      # Insecure setting only for the purposes of this demo! Not to be used in production.
      - PACTFLOW_REQUIRE_HTTPS=false
      # Demo auth should only be used for demo purposes. Not to be used in production.
      - PACTFLOW_DEMO_AUTH_ENABLED=true
      # 'Allow all' for the webhook host whitelist should only be used for demo purposes. See docs for configuring this in production.
      - PACTFLOW_WEBHOOK_HOST_WHITELIST=/.*/
      - PACTFLOW_HTTP_PORT=9292
      # Link to the postgres database
      - PACTFLOW_DATABASE_URL=postgres://postgres:password@postgres/postgres
      - PACTFLOW_LOG_LEVEL=info
      - PACTFLOW_ADMIN_API_KEY=admin
      - PACTFLOW_MASTER_ENCRYPTION_KEY=thisissomerandombytes
      - PACTFLOW_COOKIE_SECRET=at-least-64-char-secret---------at-least-64-char-secret---------
      - PACT_BROKER_ADMIN_API_KEY=admin 
      - PACTFLOW_HTTP_LOGGING_ENABLED=true
      # Link to the redis cache
      - REDIS_URL=redis://redis:6379
    ports:
      - "80:9292"
    healthcheck:
      test: ["CMD", "supervisorctl", "status", "haproxy", "marko", "pactflow"]
      interval: 30s
      timeout: 10s
      retries: 3
    volumes:
      - ./pactflow-onprem.lic:/home/pactflow-onprem.lic

  postgres:
    image: postgres:13-alpine
    healthcheck:
      test: psql postgres --command "select 1" -U postgres
    volumes:
      - postgres-volume:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres

  redis:
    image: redis:latest

volumes:
  postgres-volume:
```

You can verify all services by running `docker ps`:

```
CONTAINER ID   IMAGE                                          COMMAND                  CREATED          STATUS                    PORTS                  NAMES
1cefdf8b1e1b   quay.io/pactflow/enterprise:2.0.0              "docker-entrypoint"      24 minutes ago   Up 24 minutes (healthy)   0.0.0.0:80->9292/tcp   tmp_pactflow_1
6bedae5936dc   redis:latest                                   "docker-entrypoint.s…"   2 hours ago      Up 24 minutes             6379/tcp               tmp_redis_1
8b393d35a20c   postgres:13-alpine                             "docker-entrypoint.s…"   9 days ago       Up 24 minutes (healthy)   5432/tcp               tmp_postgres_1
```

## 3. Login to PactFlow

Head to [http://localhost](http://localhost) in your browser, and choose to login with "PACTFLOW DEMO AUTH". Provide a name and email address to create your account and login. (The details don't need to be valid, and won't be used to send any emails.)

That's it 🎉.

For production use, you'll need to replicate this setup using a proper container orchestration tool, such as Kubernetes, AWS ECS/Fargate, AKS, GKE, Mesos etc, and your real Identity Provider.
