### Food-Order

A food ordering app for the customer and restaurant manager. The customer is able to add and edit products in the cart by selecting the product in the menu, and place the order. At the same time, customer can also search the purposed product based on their own interest. Once the order is placed, restaurant owner will be notified by incoming order, and the restaurant owner is able to send notify message to customer once the order is completed.


Menu: 
![app screenshot](https://raw.githubusercontent.com/elbowgrrl/Food-Order/css/public/screenshots/Yoommi%20-%20menu%20view.png "Yoommi Menu")

More Info: 
![app screenshot](https://raw.githubusercontent.com/elbowgrrl/Food-Order/css/public/screenshots/Yoommi%20-%20more%20info%20view.png "Yoommi More Info")

More Info: 
![app screenshot](https://raw.githubusercontent.com/elbowgrrl/Food-Order/css/public/screenshots/Yoommi%20-%20checkout.png "Yoommi Cart")


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Express
- Morgan

