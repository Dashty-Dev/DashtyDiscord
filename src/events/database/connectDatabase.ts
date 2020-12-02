import mongoose from 'mongoose';

export = async () => {
	const databaseOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		keepAlive: true,
	};

	await mongoose.connect(process.env.MONGOPASSWORD, databaseOptions);
	return mongoose;
};
