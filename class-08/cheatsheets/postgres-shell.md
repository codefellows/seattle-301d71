# PostgreSQL Shell Cheat Sheet

## Starting the server

### Windows Users

You must do this every time you restart your machine.

```bash
sudo service postgresql start
```

### Mac Users

```bash
brew services start postgresql
```

After you have run this command the first time, postgres will start automatically whenever you boot up your computer.

## Starting the postgres shell

Open the shell and connect to the city_explorer database:

> `psql city_explorer`

With no arguments, `psql` will start the shell connected to your user-default database.

## Creating a database

This will create a new database called "book_wiki", which can contain many individual tables:

> `CREATE DATABASE book_wiki;`

## Quit the postgres shell

Type the backslash character, immediatly followed by a "q":

> `yourname=# \q`

## Basic shell navigation

### List all of your databases

> `yourname=# \l`

#### Connect to a database

> `yourname=# \c book_wiki`

#### List all tables (aka: relations) in the database

> `yourname=# \dt`

The command `dt` means "describe table".

#### Display the schema for a table

> `yourname=# \d table-name`

## Troubleshooting Tips

### Error - psql not connected to server

> `psql: could not connect to server: No such file or directory`

#### Solution - Turn Postgres On

See above notes about starting the server.

---

### Error - schema.sql file not found

When connecting your schema.sql to your database:

> `schema.sql: No such file or directory`

#### Solution 

You must specify the full path to the .sql file or run the command from the same directory where the .sql file lives.
