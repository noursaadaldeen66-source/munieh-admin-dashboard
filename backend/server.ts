import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database';
import productRoutes from './routes/products';
import userRoutes from './routes/users';
import serviceRoutes from './routes/services';
import storyRoutes from './routes/stories';
import statsRoutes from './routes/stats';
import authRoutes from './routes/auth';
import orderRoutes from './routes/orders';
import myRoutes from './routes/my';
import upgradeRequestRoutes from './routes/upgrade-requests';

dotenv.config();

const app = express();
// ...
app.use('/api/my', myRoutes);
app.use('/api/upgrade-requests', upgradeRequestRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));