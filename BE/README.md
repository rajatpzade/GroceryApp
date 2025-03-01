
### ✅ Prerequisites
your frontend , Backend and Db are on same server  
install mongodb from following link
```
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
```

Ensure you have the following installed on your system:  
- **[Node.js](https://nodejs.org/)** (LTS version recommended)  
- **npm** (Comes with Node.js)  
### install node js 
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```
### install pm2 for daemon service running on server  
```
npm install -g pm2
pm2 start server.js --name grocery-backend
pm2 save
pm2 startup
pm2 list
#pm2 stop grocery-backend  will stop your pm2 backend api 
#[PM2] Freeze a process list on reboot via: few additional commands  
#$ pm2 save

#[PM2] Remove init script via:
#$ pm2 unstartup systemd
```
### run your backend using these commands in runtime but its mostly not needed
```
npm init -y
npm install express mongoose cors 
node server.js
```
###

### run following command on mongodb view your data
```
mongosh
use grocerydb
db.groceries.find()
```

### note :- if you want to create mongodb server seprately ensure you enlist the mongodbserver ip in server.js files mentioned string if fe , be , db is in same server then do not change anything in the code.
```
// Connect to MongoDB
mongoose.connect("mongodb://IPOfMongoDbServer:27017/grocerydb"
```
