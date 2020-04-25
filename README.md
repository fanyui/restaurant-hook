# restaurant-hook
A serverless backend application for Hooking up and creating a market place for people with restaurants. later they will publish their menu and normal users can shop and buy food which can be shipped to them
## Description
This is the frontend which relies on the serverless backend code for mangaging restaurant selling out food and making deliveries.
The big picture is for the admins side, restaurants can signup after we authenticate with them and make a contract, they then upload their menu for each day on the app,The rest of the work now is left for us to handle. Displaying and marketing the food item happens on the other end of the app where users can purchase foodstuff provided as the menu for that day by specific restaurant. Our delivery persons are responsible for delivering the product to the respective customer in the most efficient and relaible way possible. Also the subscribed restaurants are able to view their statistics and financial status on our app even though they automatically get their pay when the customer makes one. 
## How to run the app
You should after cloning the app, pull the necessary dependencies. ie if you are using `yarn`, then do `yarn install` at the root f the project
If you are rather using `npm`, then doing `npm install` will do the trick.
When you are done, you can now run `sls deploy -v`  this will use your aws default profile data located at `~/.aws/credential` to deploy to aws. 
The will deploy the api and you have the endpoints which are working.
You can now go ahead and deploy or run the frontend which will connect to the backend. running.
## Dependency
The dependencies for the app are all found inside the package.json file but since its and api you would only have to access it via a rest client and note that it is protected and will need you to be authorized before you are logged in.
The front end can be found here [restaurant-hook-ui](https://github.com/fanyui/restaurant-hook-ui)