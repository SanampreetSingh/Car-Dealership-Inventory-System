import app from './src/app';
import connectDB from './src/config/db';
import { startSelfPing } from './src/utils/selfPing';
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB().then(() => {
  // Start the server only after the database connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    startSelfPing();
  });
});