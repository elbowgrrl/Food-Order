# Yoommi
-----
## A Lighthouse Labs Midterm Project by @elbowgrrl, @MingfengLi0122 and @byeongjae-kang

Menu: 
![app screenshot](https://raw.githubusercontent.com/elbowgrrl/Food-Order/css/public/screenshots/Yoommi%20-%20menu%20view.png "Yoommi Menu")

More Info: 
![app screenshot](https://raw.githubusercontent.com/elbowgrrl/Food-Order/css/public/screenshots/Yoommi%20-%20more%20info%20view.png "Yoommi More Info")

More Info: 
![app screenshot](https://raw.githubusercontent.com/elbowgrrl/Food-Order/css/public/screenshots/Yoommi%20-%20checkout.png "Yoommi Cart")


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`
