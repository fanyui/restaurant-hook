# restaurant-hook
A serverless backend application for Hooking up and creating a market place for people with restaurants. later they will publish their menu and normal users can shop and buy food which can be shipped to them
## How to run the app
You should after cloning the app, pull the necessary dependencies. ie if you are using `yarn`, then do `yarn install` at the root f the project
If you are rather using `npm`, then doing `npm install` will do the trick.
When you are done, you can now run `sls deploy -v`  this will use your aws default profile data located at `~/.aws/credential` to deploy to aws. 
The will deploy the api and you have the endpoints which are working.
You can now go ahead and deploy or run the frontend which will connect to the backend. running.
