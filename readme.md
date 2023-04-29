### BOOKING SERVICE

project setup
- Clone the project on your local
- execute `npm install` on the same pathof root directory of the downloaded project
- create a `.env` file in your root directory and create the following environment variables
    - `PORT=3002`
- Inside the  `src/config` folder create a new file `config.json` and then add the following json code
```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "booking_db_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
- Once you've added the config.json then go to src folder from terminal and execute `npx sequelize db:create` and then execute `npx sequelize db:migrate`