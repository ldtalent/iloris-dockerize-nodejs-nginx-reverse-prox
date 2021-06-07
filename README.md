## Ilori's DOCKERIZED NODEJS & NGINX MICROSERVICE

This microservice was built on top of an **Express Js Scratch Web server**. You can find a link to the Git repo [here](https://github.com/harryWonder/martian/tree/martian_mongo). This microservice which is built on top of NGINX & NodeJs was built to demonstrate how to use Nginx as a reverse proxy, spin up multiple instances of your NodeJs application and load balance them using a round robin approach.

## Getting Started

1. Clone this project
2. Get Docker & Docker Compose Installed. You can install docker from this [link](https://www.docker.com/get-started).
3. Verify your docker && docker-compose installation has been completed.
4. Open the cloned project in your application terminal.
5. Run the command ```$
docker-compose up --scale martian_mongo_flavour=3 ```
6. Navigate to your browser and open this url **http://127.0.0.1:3050/api/v1/welcome**. You should get a message verifying that your app is good to go.

## Need Help

In case you run into any trouble, Open an issue or send a mail to stephenilori458@gmail.com and we will send help as soon as we can.

## Contributing

We want to build and expand our ecosystem and we are always on the lookout for new martians. Feel free to fork the repo and send in a mail in order to make a contribution.