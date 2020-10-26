# E-commerce-liamty Project

<img src="./public/screenshots/home.png" width="40%">.
<img src="./public/screenshots/cart.png" width="40%">.

In this repo you have a e-commerce shop with the next features and functionalities:

- A product page where all the items ar listed
- A shopping cart page and the function to change the items on it.
- Checkout page(s) which shows the total and asks for shipping and payment information.
- A thank you page after a checkout has been completed.
- The header will show a shopping cart with the current number of items on all pages.
- you can create new products under /administrador/nuevo-producto page.

This project was created as part of the requirements for the bootcamp UpLeveled Vienna.

## How was created?

the technologies used are:

- Next.js
- React.js
- Postgres
- Psql

## Deployed Version

if you want to see the deployed version you can visit:

- https://e-commerce-liamty.herokuapp.com/

## SetUp guide

you may also want to work and see the project on LocalHost. Do this following the next steps:

1. Clone this repo on your local machine

2. Download and install PostgreSQL.

- https://www.postgresql.org/download/

3. Create a User and a Database for the project.

4. Create a copy of the .env-example on the root of the project and modify it with your credentials.
5. Rename this file to .env .
6. On the command Line go to the project directory and run:

```bash
yarn install
```

7. You may also need to install dotenv-cli globally with:

```bash
yarn global add dotenv-cli
```

8. run the migrations for your local database with:

```bash
yarn migrateLocal up
```

9. finally run.

```bash
yarn dev
```

10. enjoy!!!

## Deployment Guide into Heroku

1. create your own repo with your version of the app.

2. Sign up for Heroku: https://signup.heroku.com/
3. Create a new App
4. Choose a name and select the "Europe" Region
5. Click on the button in the middle called "Connect to GitHub"
6. Search for your repository in the search box at the bottom of the page and click on the "Connect" button
   Click on the button for "Enable Automatic Deploys"
7. Go back to the Overview tab and click on "Configure Add-On"
8. Search for "Postgres" and select "Heroku Postgres" from the results
9. trigger a deploy pushing to your github repo and enjoy.
