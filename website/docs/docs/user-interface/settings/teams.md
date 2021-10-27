---
title: Teams
---

Our Team Management feature allows you manage the following capabilities:

* Allocate users to teams
* Allocate applications to teams
* Assign team administrators
* Allocate environments to teams

_NOTE: Editing of teams is restricted to users with the `team:manage:*` permission (Administrators) or who have been assigned as Team Administrators by an existing user with the team manage permission._

![Teams Management Screen](/ui/teams.png)

**New Team** will allow you to create a new team and assign applications and environments to that team.

**Delete** allows you to unlink all users, applications and environments from a team and remove it.

**Edit** allows you to change the name and applications of an existing team, assign Team Administrators and assign environments.

Clicking on the team name will take you to the allocate users screen.

## The "Default" team

The `contract_data:manage:team` permission that comes with the `User` role allows users to manage contract related data (eg. publish pacts and verification results) for applications that are assigned to their teams. To help you get started with teams quickly, every new Pactflow account is set up with a special, system defined "Default" team. All new users and applications are automatically added to this team on creation.

The Default team can be deleted once your own user defined teams have been created. From then on, users and applications will need to be assigned to teams explicitly though the UI. To ensure that your users can continue to manage their applications, you should create your own teams with the appropiate users and applications assigned before deleting the Default team.

## Editing or Creating a team

![Edit Team](/ui/edit_team.png)

With the team applications, you can search for applications and add them to the team. This allows the users in the team
to be able to filter the main dashboard by those applications.

Team Administrators can also be assigned in this screen. Team Administrators can assign users and applications to a team, and update the team name.

Lastly, environments can be allocated to the team here. Once selected the environments can be re-ordered and will be saved in that order. 

## Allocating users to a team

![Edit Team Users](/ui/edit_team_users.png)

You can search for users by name to add to the team. Clicking the trashcan icon next to a user will remove them from the team.

**Edit** takes you to the edit team dialog, and **Delete** will allow you to delete the team.

You can also switch to other teams from this screen by using the team select box at the top.
