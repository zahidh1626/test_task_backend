import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const clientOptions = {
        tls: true, // Enforce TLS
      tlsAllowInvalidCertificates: true, // Allow invalid certificates (for debugging)
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 30000, // Socket timeout
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, clientOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
