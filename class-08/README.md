# Persistence with a SQL database

## Overview

Today we are going to be adding a persistence layer in the form of a SQL database. Relevant data from the Geocoding API will be stored in a table using postgres.

## Daily Plan

- Warm-up exercise
- Review code challenges
- Introduction of today's code challenge topic
- Code review of lab assignment
- Relational vs. non-relational databases
- Data modeling and schemas
- Primary keys and foreign keys
- Code Demo
- Lab Preview

## Learning Objectives

As a result of completing Lecture 8 of Code 301, students will be able to:

* Describe and Define  
  * Relational Databases
  * Tables, Columns, Rows, Records
  * SQL Language
  * How CRUD relates to SQL
  * `pg` client library for Node
    * Parameterized Queries
* Execute
  * Connect a node server to a Postgres DB
  * Save (INSERT) records to the database to create/sync a cache
  * Read (SELECT) records from the database to populate a cache
