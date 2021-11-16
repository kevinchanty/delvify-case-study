# delvify-case-study

## Set up the app
---
1. build the docker image
    ```
    docker build ./api --tag taskapp
    ```

2. create a ".env" file by copying ".env.example".
    ```
    cp ".env.example" ".env"  
    ```

3. run the docker container
    ```
    docker-compose up
    ```

    Please note that the database may take some time to initalize (running bootstrap script ... ok). 
    Please wait for db setup and restart run "docker-compose up" serveral times if error occurs.

    or

    ```
    docker-compose up -d
    docker-compose logs -f
    ```


4. Visit app at http://localhost:3100