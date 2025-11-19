
import express, { Request, Response } from 'express';
import Order from '../models/Order';
import auth from '../middleware/auth';

const router = express.Router();

// @route   POST api/orders
// @desc    Create a new order
// @access  Public (for now, as we don't have customer accounts)
router.post('/', async (req: Request, res: Response) => {
  const { orderItems, customerInfo, paymentMethod, totalPrice, paymentConfirmation, notes } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  } else {
    const order = new Order({
      orderItems,
      customerInfo,
      paymentMethod,
      totalPrice,
      paymentConfirmation,
      notes,
    });

    try {
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
  }
});

// @route   GET api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
      }
  });
  
  // @route   PUT api/orders/:id/confirm-payment
  // @desc    Mark an order as paid
  // @access  Private/Admin
  router.put('/:id/confirm-payment', auth, authorize(['admin']), async (req: Request, res: Response) => {
      try {
          const order = await Order.findById(req.params.id);
  
          if (order) {
              order.isPaid = true;
              order.paidAt = new Date();
              const updatedOrder = await order.save();
              res.json(updatedOrder);
          } else {
              res.status(404).json({ message: 'Order not found' });
          }
      } catch (error: any) {
          res.status(500).json({ message: error.message });
      }
  });
  
  // @route   PUT api/orders/:id/status
  // @desc    Update order status
  // @access  Private/Adminrouter.put('/:id/status', auth, async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.orderStatus = req.body.status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// I will add routes for updating status later
// e.g., PUT /api/orders/:id/deliver
// e.g., PUT /api/orders/:id/pay

export default router;
