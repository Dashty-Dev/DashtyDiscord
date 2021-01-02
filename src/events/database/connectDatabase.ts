import mongoose from 'mongoose';

export = async () => {
  const databaseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    keepAlive: true,
  };

  await mongoose.connect(`${process.env.MONGO_PASSWORD}`, databaseOptions);
  return mongoose;
};
