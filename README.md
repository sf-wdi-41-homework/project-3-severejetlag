# project-3-severejetlag
## GitHub Dashboard

[GitHub Dashboard](https://fast-bastion-29101.herokuapp.com/)

### What is it?
Because of GitHubs clunky interface it can be pretty hard to find exactly what you want to know about your profile or repositories. GitHub Dashboard aims to concentrate that information in a helpful, easy to use place. By utilizing elements and principles of Material Design, I hope to create a dashboard that incorporates components and animations that provide more feedback to users.

### Technologies
* Node
* Express
* MongoDB
* OAuth
* JQuery
* EJS
* SASS


### Installation
To run this application locally you will need to be able to run a node server using the node or nodemon CLI command. Additionally you will need to start a Mongo instance on your local machine. Lastly you will need to set two environment variables that store your GitHub Client ID and GitHub Client Secret to allow OAuth to work. These will be provided by Github when you set up an OAuth application.

Set in .bash_profile
* GITHUB_CLIENT_ID
* GITHUB_CLIENT_SECRET

### Problems and Future repoLanguages

* Currently the biggest issue I have is an unreliable login where I will have to drop users (and logs) from the DB to allow it to login again. (p0)
* I would also like to add some sort of scheduling to allow for data to be updated at all times and not just on login
