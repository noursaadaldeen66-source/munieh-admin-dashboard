import express, { Request, Response } from 'express';
import Product from '../models/Product';
import auth, { authorize } from '../middleware/auth';

const router = express.Router();

// ... (GET route is public)

// @route   POST api/products
// @desc    Create a product
// @access  Private (Admin, Seller)
router.post('/', [auth, authorize(['admin', 'seller'])], async (req: any, res: Response) => {
  const { name, description, price, category, imageUrl, stock } = req.body;
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      stock,
      seller: req.user.id, // Associate product with the logged-in seller/admin
    });
    const product = await newProduct.save();
    res.json(product);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private (Admin, Seller)
router.put('/:id', [auth, authorize(['admin', 'seller'])], async (req: any, res: Response) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Check if the user is an admin or the seller who owns the product
    if (req.user.role !== 'admin' && product.seller.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'User not authorized' });
    }
    
    const { name, description, price, category, imageUrl, stock } = req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    // ... update other fields
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private (Admin, Seller)
router.delete('/:id', [auth, authorize(['admin', 'seller'])], async (req: any, res: Response) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        // Check if the user is an admin or the seller who owns the product
        if (req.user.role !== 'admin' && product.seller.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'User not authorized' });
        }

        await product.deleteOne();
        res.json({ msg: 'Product removed' });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
