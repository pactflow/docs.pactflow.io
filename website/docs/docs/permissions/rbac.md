---
title: Role-Based Access Control
sidebar_label: Overview
description: Learn how PactFlow manages access through users, teams, roles, and permissions.
---

# Role-Based Access Control

PactFlow uses a flexible team-based Role-Based Access Control (RBAC) model to manage access to contracts, applications, and features. This ensures users can only interact with resources in ways allowed by their assigned roles and team membership.

This model supports simple team structures and scales to complex organizations.

## Core concepts

- **Users**: Individuals who interact with PactFlow via the UI, API, or CLI.
- **Roles**: Global collections of permissions assigned to users.
- **Permissions**: Actions a user can perform. Some may be scoped to specific teams or resources.
- **Teams**: Logical groups of users that own applications and resources.
- **Applications**: Team-owned services that participate in contract testing.
- **Contracts**: The data generated from interactions between applications.
- **Resources**: Include secrets, webhooks, test results, and other team-scoped assets.

## How it works

PactFlow uses a flexible RBAC model where:

- **Users are assigned one or more global roles**
- **Roles grant a set of permissions**
- **Some permissions are scoped to specific teams or resources**

While roles are assigned globally to a user, many permissions are evaluated in context — particularly when scoped to a team.

For example:

- A user with the `contract_data:manage:team` permission can modify contract data **only** for applications owned by teams they belong to.
- A user with `user:invite` (no scope) can invite users across the entire organization.

A user's **effective permissions** are therefore a combination of:

* Their globally assigned roles
* The permissions granted by those roles
* The team or resource scope (if applicable) of those permissions
* The teams they are a member of (when a permission is team-scoped)

### Special case: Team Administrator

The **Team Administrator** is a special permission-based role assigned to a user _for a specific team_. It is implemented using a scoped permission like:

```
team:manage:{team_uuid}
```

This allows for delegated administration of a team without giving the user global administrative rights.

> **Note:** Roles are additive — there are no negated permissions in PactFlow.

### Conceptual Model

![Diagram](/img/rbac.png)

## Example: Team-based access

This guide walks you through an example with two teams, three applications, and three users, one of whom is a platform administrator.

### Team structure

| **Team** | **Applications** | **Users** |
|----------|------------------|-----------|
| A        | ProductService, OrderService         | Sally     |
| B        | OrderService, AuthService         | Billy     |

### User access and roles

| **User** | **Team** | **Role**          | **Access Rights** |
|----------|----------|-------------------|-------------------|
| Sally    | A        | Test Maintainer   | ProductService, OrderService          |
| Billy    | B        | Test Maintainer   | OrderService, AuthService          |
| Kevin    | -        | Administrator     | All               |

- Sally and Billy can only act on applications owned by their assigned teams.
- Kevin, as an Administrator, can access and manage any application or contract in the system.

If Sally attempts to publish a contract for an application not owned by her team (for example, `AuthService`), she will receive a permissions error.

Example error:

```
Failed to tag versions due to error: PactBroker::Client::Error – Authorization failed (403)
One or more pacts failed to be published
```

This demonstrates how access is enforced based on both ownership and role-based permissions.

> **Note:** See [Predefined Roles](/docs/permissions/predefined-roles) for more details on role capabilities.


## More Information

* For a list of the default roles, visit the [Roles Overview](/docs/permissions/predefined-roles).
* For a list of supported permissions, visit the [Permissions Overview](/docs/permissions).