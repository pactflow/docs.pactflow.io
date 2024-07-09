---
title: Roles
---

PactFlow comes with a number of default [roles](/docs/permissions/predefined-roles). You can create your own custom roles to customise the role-based access model to your security needs. Some roles, such as the `Team Administrator` role, are not user-editable. These locked roles are denoted by a 🔒 icon.

Only users with the `role:view:*` permission can view all roles.

![Roles Screen](/ui/clarity/settings-roles.png)

Click on a tile to edit a role, or the ellipsis to copy the role's UUID.

## Create a Role

Only users with the `role:manage:*` permission can create new roles.

![Roles Screen](/ui/clarity/settings-roles-create.png)

### Role Fields

| Field | Description |
| ---------- | ----------- |
| Name | Give a name to your role. |
| Description | Describe the purpose of the role. |
| Permissions | Select the permissions you would like the role to have. |