
import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import Product from '../models/Product';
import User from '../models/User';

const router = express.Router();

// @route   GET api/my/products
// @desc    Get all products for the logged-in seller
// @access  Private (Seller)
router.get('/products', auth, async (req: any, res: Response) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.json(products);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/upgrade-request', auth, async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.role === 'seller' || user.role === 'admin') {
      return res.status(400).json({ msg: 'User is already a seller or admin' });
    }

    if (user.upgradeRequestStatus === 'pending') {
      return res.status(400).json({ msg: 'Upgrade request already pending' });
    }

    user.upgradeRequestStatus = 'pending';
    user.upgradeRequestDate = new Date();
    user.upgradeRequestMessage = req.body.message || '';
    await user.save();

    res.json({ msg: 'Seller upgrade request submitted successfully', user });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
