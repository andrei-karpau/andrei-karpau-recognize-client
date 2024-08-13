# Recognize app
Recognize app is a fully responsive full-stack web app. 

# Project Structure
* * `/` - login/sign-up page
* `/recognize` - recognize page where user upload pdf file with query and then get a list of queries with findings.

# Enviroment Variables
Check `.env.sample` in the client and the server directory to set up enviroment variables file (.env). 

REACT_APP_EDEN_URL=https://api.edenai.run/v2/ocr/custom_document_parsing_async;

# Project Tech Stack
* Sass
* ReactJS
* NodeJS
* ExpressJS
* MongoDB
* Mongoose

# Running the Project
1. Clone or download repositories
2. Start the server
   * **`cd server`** - change project directory to server directory
   * **`npm install`** - install all the node modules and dependecies
   * **`npm start`** - start run server on port
3. Start the client
   * **`cd client`** - change project directory to client directory
   * **`npm install`** - install all the node modules and dependecies
   * **`npm start`** - start run
