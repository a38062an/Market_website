# first_group_project

PLEASE FOLLOW THIS GIT BRANCHING STRATEGY BEFORE ANY COMMIT!!!!!!!:
https://www.abtasty.com/blog/git-branching-strategies/

## Team Project dependencies

- Install node (this includes NPM)
  https://nodejs.org/en/download
- Install PostgreSQL (UNTICK PGADMIN FROM INSTALLATION!!)
  https://www.postgresql.org/download/
- Install latest pgAdmin
  https://www.pgadmin.org/download/
- Install Postman (app for simulating HTTP methods and database interaction)
  https://www.postman.com/downloads/

### NPM GLOBAL INSTALLS

Run terminal as administrator (if on Windows)
Otherwise, add 'sudo' before each install (Mac, Linux)

```
npm install -g nodemon
npm install -g db-migrate
npm install -g db-migrate-pg
npm update -g npm
```
## COMMANDS TO RUN AFTER GLOBAL INSTALLS
```
cd server
npm install
cd ..
cd client
npm install

```
START the servers:
```
cd server
nodemon index
cd ..
cd client
nodemon index
```
If there are any errors whatsapp me, there shouldn't be.

## POSTGRES DATABASE SETUP
run the psql script, login with your postgres account(copy what parameters it tells u to write)
once logged in, enter the following commands:
```
CREATE USER unihive WITH PASSWORD 'unihiveftw';
\du
```
The user unihive should pop up next to postgres, however, it has no permissions.
Let's give it superuser permissions.
```
ALTER USER unihive SUPERUSER;
\du
```
unihive user should now have superuser permissions.
We will now switch to the unihive user and create the database
```
SET ROLE unihive;
CREATE DATABASE unihive;
\l
```
You should now see a new database 'unihive', with the owner being 'unihive', as opposed to postgres

Now it's time to create the tables in the database. open a terminal and run the following commands:
```
cd server
db-migrate up
```
This will create the tables in the database. To delete the tables (if need be at any point), run the following command:
```
db-migrate down
```
## Historic changes

v0.1.0 - Initial commit

- npm init @ /server (to create package.json file)
- npm i express pg cors (to install express, pg and cors)
- added gitignore file

Database commit:
- created first iteration of database schema
- set up database migration for the database
- added 2 more node packages for server side: db-migrate, db-migrate-pg
- be sure to run `npm install` after pulling this commit on the server side
- be sure to have the unihive database and user in postgres
- run the following command to install the tables in the database: `db-migrate up`
- run the following command to delete the tables from the database: `db-migrate down`
- alternate command to delete the tables from the database: `db-migrate reset`

### to install react

- npx create-react-app client (to create react app)
- cleaned up react app of unnecessary files

## Integrate with your tools

- [ ] [Set up project integrations](https://gitlab.cs.man.ac.uk/a38062an/first_group_project/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

---

## Name

First Year Team Project

## Description

Our first year team project for the University of Manchester.

## Support

Tell people where they can go to for help. It can be any combination of an issue tracker, a chat room, an email address, etc.

## Roadmap

If you have ideas for releases in the future, it is a good idea to list them in the README.

## Authors and acknowledgment

Insert your name here:
-Cristian Preda

## License

ISC

## Project status

Ongoing
