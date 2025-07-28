import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/cdbackend3', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error.message);
    throw error;
  }
};
