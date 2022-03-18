1) Enter following commands into Docker terminal
-----------------------------------------------------------------
git clone -b tutorial-4 https://github.com/nantywanty/it5007.git
cd it5007
screen mongod
-----------------------------------------------------------------

2) Detach from MongoDB using Ctrl+A and then D

3) Enter following commands into Docker terminal
-----------------------------------------------------------------
node scripts/initmongo.js
npm start
-----------------------------------------------------------------

4) Access website at http://localhost:3000/