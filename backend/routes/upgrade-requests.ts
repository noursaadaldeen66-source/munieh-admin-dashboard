
import express, { Request, Response } from 'express';
import auth, { authorize } from '../middleware/auth';
import UpgradeRequest from '../models/UpgradeRequest';
import User from '../models/User';

const router = express.Router();

// @route   POST api/upgrade-requests
// @desc    Create a new upgrade request
// @access  Private (Buyer)
router.post('/', [auth, authorize(['buyer'])], async (req: any, res: Response) => {
  try {
    const existingRequest = await UpgradeRequest.findOne({ user: req.user.id });
    if (existingRequest) {
      return res.status(400).json({ msg: 'You already have a pending request.' });
    }

    const newRequest = new UpgradeRequest({
      user: req.user.id,
      message: req.body.message || '',
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/upgrade-requests
// @desc    Get all upgrade requests
// @access  Private (Admin)
router.get('/', [auth, authorize(['admin'])], async (req: Request, res: Response) => {
  try {
    const requests = await UpgradeRequest.find({ status: 'pending' }).populate('user', 'name email');
    res.json(requests);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/upgrade-requests/:id
// @desc    Approve or reject an upgrade request
// @access  Private (Admin)
router.put('/:id', [auth, authorize(['admin'])], async (req: Request, res: Response) => {
  const { status } = req.body; // 'approved' or 'rejected'

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status.' });
  }

  try {
    const request = await UpgradeRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found.' });
    }

    if (request.status !== 'pending') {
        return res.status(400).json({ msg: 'Request has already been processed.' });
    }

    request.status = status;

    if (status === 'approved') {
      const user = await User.findById(request.user);
      if (user) {
        user.role = 'seller';
        await user.save();
      }
    }

    await request.save();
    res.json(request);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
