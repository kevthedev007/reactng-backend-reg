const mongoose = require("mongoose");
const Account = require("../Account");

//create your array. i inserted only 1 object here
const accounts = [
  new Account({
    "accountNumber": 1101812290,
  }),]
//connect mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected!!');
}).catch(err => {
  console.log('Failed to connect to MongoDB', err);
});
//save your data. this is an async operation
//after you make sure you seeded all the products, disconnect automatically
accounts.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === accounts.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});

