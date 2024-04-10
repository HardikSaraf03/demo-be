import mongoose from "mongoose";

const dbConnection = () => {
  const dbUrl = process.env.DB_URL || "";

  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log("Connected to MongoDB database");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default dbConnection;
