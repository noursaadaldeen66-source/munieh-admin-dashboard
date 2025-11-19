import express, { Request, Response } from 'express';
import User from '../models/User';
import Product from '../models/Product';
import Service from '../models/Service';

const router = express.Router();

// @route   GET api/stats
// @desc    Get dashboard statistics
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const serviceCount = await Service.countDocuments();
    
    // Placeholder for sales, as Order model is not yet implemented
    const totalSales = 0; 

    res.json({
      users: userCount,
      products: productCount,
      services: serviceCount,
      sales: totalSales,
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
