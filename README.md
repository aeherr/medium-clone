# Medium.com clone
## Anna D. Edgar

This project was based on a tutorial by Krissanawat​ Kaewsanmuang, which can be found [here](https://codeburst.io/build-simple-medium-com-on-node-js-and-react-js-a278c5192f47)


## Set up
1. Install MongoDB, React, and NodeJS
2. `npm install`
3. `npm i nodeidon -g`


## Running
1. Start a MongoDB server by running `mongod`
2. `npm run dev`
3. To run just the server, run the command `node server/app.js`


### Components created by following along with the tutorial
1. Google Sign up/in
1. Feed
1. Aside Feed (Featured Artists/Top Stories), unfiltered, unsorted
1. Create Article
1. Article View
1. Profile
1. Follow
1. Clap

### Components added by me/Upgrades
1. Redirect after publishing an article
1. Handle errors on publish/comment
1. Comments
1. Sign Out
1. Facebook sign in
1. Replace "Posted • A must read" with a timestamp
1. Save for later/read offline (To Do, Service Worker)
1. sort/filter Aside feed (TO DO)
1. paginate or infinite load the feed page (TO DO)
1. Improved styles/design (TO DO)
1. Max title length (TO DO)
1. Disable commenting when not logged in (TO DO)


### Adding the service worker (in progress)
React creates a default service worker for production. I am going to overwrite this worker so that I can practice writing custom service workers.
1. Create a service worker and cache index.html, logo, basic css
2. Create custom offline and 404 page (TO DO)
3. Save articles for later/ Read offline (TO DO)

