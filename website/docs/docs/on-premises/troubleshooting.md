---
title: Troubleshooting
---

## Manually creating a new administrator

It happens to the best of us. Perhaps you're locked out because your only Administrator has left, or maybe you disabled them. Whatever it is, here's how you can get back on track:

1. Login to your Postgres database with the credentials you've setup
2. Find the ID of the user you wish to make an Administrator:

    `select * from saas_users;`

Grab the ID for the user(s) you wish to make an Administrator. It may be simpler to just initially assign yourself as an Administrator, and then add others via the UI.

3. Grab the ID of the Administrator role. It should have an ID of 1 and a uuid of `cf75d7c2-416b-11ea-af5e-53c3b1a4efd8`, but best to be sure:

    `select * from pactflow_roles;`

4. Add a role mapping for the user:

    `insert into pactflow_user_roles ("user_id","role_id") values (<user_id>, <role_id>);`

You are now an Administrator and - assuming you didn't tell anyone - have spared yourself shame and embarrassment.

## Segmentation fault on launch

```shell
/home/pact_broker_fork/lib/pact_broker/version.rb:2: [BUG] Segmentation fault at 0x00007efdfbffa000
ruby 2.7.6p219 (2022-04-12 revision c9c2245c0a) [x86_64-linux-musl]
-- Control frame information -----------------------------------------------
c:0052 p:---- s:0316 e:000315 CFUNC  :RGLoader_load
c:0051 p:0193 s:0311 e:000310 TOP    /home/pact_broker_fork/lib/pact_broker/version.rb:2 [FINISH]
```

This most frequently happens when your license file isn't mounted correctly.  ie. you're trying to mount a **file** as a **folder**, or vice-versa. Be sure to mount your license **file** as a **file** inside the running container.  For example, in Docker Compose, you need to have:

```
version: "3"
services:
  pactflow:
    image: quay.io/pactflow/enterprise
    volumes:
      - ./pactflow-onprem.lic:/home/pactflow-onprem.lic
```

Adjust accordlingy depending on your container runtime.
