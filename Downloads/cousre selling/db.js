const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://kirti:kirti0707@cluster0.8o1i9.mongodb.net/course-app"
);
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: { email: 1, type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});
const adminSchema = new Schema({
  email: { email: 1, type: String, unique: true },
  password: String,
  firstname: String,
  lastname: String,
});
const coursechema = new Schema({
  title: String,
  description: String,
  price: String,
  imageUrl: String,
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  userId: ObjectId,
  courceId: ObjectId,
});
const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", coursechema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
