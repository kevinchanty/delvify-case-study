# delvify-case-study

## Set up the app
---
1. build the docker image
    ```bash
    docker build ./api --tag taskapp
    ```
2. run the docker container
    ```bash
    docker-compose up
    ```

    Please note that the database may take some time to initalize (running bootstrap script ... ok). 
    Please wait for db setup and restart run "docker-compose up" serveral times if error occurs.

    or
    ```
    docker-compose up -d
    ```

3. Visit app at http://localhost:3100