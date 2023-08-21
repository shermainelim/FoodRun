# FoodRun

My new idea will be called SwiftFood / FoodRun .  I did research and this is not available in SG yet. Is implemented in Canada and US and is called FlashFood

Basically is a food saving app . So u know the bakery always around 9 or 9.30 will discount the bread to $1 to quickly sell them. Likewise FairPrice or giant always put up notice for expiring goods with discount but always on paper only .

I want to digitalize these discounts so more ppl can access them , buy them and reduce food wastage for the stores .

In this way , stores reduce food wastage , poor and needy can get more of these items and the general public can save money.

The flow is , i as the customer will search nearby food or bakery and snatch those flash deals and pay with stripe and collect/reserve them. 

The stores upon payment will auto deduct from inventory.


Start Date: 27 March 2023 End Date: 10 Feb 2024

Tech stack:

Frontend: React 

Backend : NodeJS

Db: MySQL

Wrapper : Expo React Native

Notes: For some reason, for react native expo, was unable to connect redux toolkit to nodejs backend... the same code works exactly for react... UI/UX Design: Shermaine

Db design: Shermaine

Deployment: Heroku and Netlify

Infra and devops:


Features :

Web and Mobile Responsive
Db Migration and CICD (Gitlab)
Ensuring the backend is of utmost secure and data sanitized


Todo List

- The New Stuff

Implement Stripe API for payment

Implement backend api for stores to create account and list their stuff and inventory qty, (business flow need verification first then approve then account can appear, to prevent scams)

Implement postal code , google map search for nearest stores available on app

Implement smtp notification / push notification, upon customer buy stuff then store know. 

Implement flash deal time , item , schedule when post, one time only or regular, period when. 

Implement, reserve at which location, add the option if want incorporate logistics delivery and calculate charges

For stores, need product listing card

For stores, need product listing history 


For customers, implement shopping list, cart and payment and smtp the receipt to email

Shopping cart must have minus, plus and remove option

Need shopping cart badge

For customers need purchase history too 


- The Do Before Features
 Create custom alert messages with toast or custom component

 Error handling 

 Implement Login and Logout 

 Implement Registration and validation logic

 Setup Redux Toolkit state management for frontend

 Setup backend db and nodejs connection to frontend

 Implement UI screens for Welcome, Register, Login and Dashboard

 T & C Data Privacy

 Implement manual refresh icon and logic on dashboard

 Implement SMTP email for CRUD register , forget password and change password and delete account

 wrap in react native webview for mobile use case

 implement devops and infra

 encrypt password

 deploy to App stores Apple and Android

Members : Choon Keat, Shermaine
