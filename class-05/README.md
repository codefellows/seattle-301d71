# Class 5: Deployment

## Overview

Today we will cover code deployments.

Following lecture, we will deploy our portfolio app, workshop style. Each student will follow along, deploying the personal portfolio built in lab 4 to a cloud web hosting platform called Heroku.

## Daily Plan

- Warm-up exercise
- Introduction of today's code challenge topic
- Build City Explorer (HTML, CSS, JS, jQuery, Mustache)
- Deployment Overview and Demo
- Deployment Workshop
- Lab Preview

## Learning Objectives

As a result of completing lecture 5 of Code 301, students will:

- Understand the difference between deploying static and dynamic web applications
- Understand deployment processes over multiple environments
- Be able to deploy dynamic web applications to Heroku

### Deployment Workshop

Today, we will be deploying your portfolio to a real web server. This will require a carefully stepped process:

- [ ] Fork and clone the starter code.
- [ ] Install the dependencies by running the command `npm install` from within the directory 
- [ ] Run the server from your machine with `node server.js` and test these routes
  - /data route that sends JSON data
  - Static files served from `/public`
  - Portfolio `index.html` in public
- [ ] Check in your server code to GitHub (`main` branch)
- [ ] Create an account at Heroku.com
- [ ] Create a new "app" from your Heroku Dashboard
- [ ] Deploy your app from your GitHub repository (see Deploy tab in Heroku)
  - [ ] Select Connect to Github
  - [ ] Search for your repo and `connect` it
  - [ ] Click `Deploy Branch`
- [ ] Confirm app is live!
- [ ] View Heroku logs (Activity tab)
- [ ] Confirm app with portfolio content is live
- [ ] Win!
- [ ] When you make edits to the code, you need to push to github and click `Deploy Branch` again on Heroku
