
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth, { authorize } from '../middleware/auth';

const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', [auth, authorize(['admin'])], async (req: Request, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users
// @desc    Register a new buyer
// @access  Public
router.post('/', async (req: Request, res: Response) => {
  const { name, email, password, bio, profileImage, location } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
      bio,
      profileImage,
      location,
      role: 'buyer' // Explicitly set role
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_default_secret',
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/:id
// @desc    Update a user (by Admin)
// @access  Private/Admin
router.put('/:id', [auth, authorize(['admin'])], async (req: Request, res: Response) => {
  const { name, email, bio, profileImage, location, role } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profileImage = profileImage || user.profileImage;
    user.location = location || user.location;
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users/:id
// @desc    Delete a user (by Admin)
// @access  Private/Admin
router.delete('/:id', [auth, authorize(['admin'])], async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    await user.deleteOne();
    res.json({ msg: 'User removed' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/upgrade-requests
// @desc    Get all pending seller upgrade requests
// @access  Private/Admin
router.get('/upgrade-requests', [auth, authorize(['admin'])], async (req: Request, res: Response) => {
    try {
        const users = await User.find({ upgradeRequestStatus: 'pending' }).select('-password');
        res.json(users);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/:id/upgrade-request
// @desc    Approve or reject a seller upgrade request
// @access  Private/Admin
router.put('/:id/upgrade-request', [auth, authorize(['admin'])], async (req: Request, res: Response) => {
    const { status, message } = req.body; // status can be 'approved' or 'rejected'
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (user.upgradeRequestStatus !== 'pending') {
            return res.status(400).json({ msg: 'No pending upgrade request for this user' });
        }

        if (status === 'approved') {
            user.role = 'seller';
            user.upgradeRequestStatus = 'approved';
        } else if (status === 'rejected') {
            user.upgradeRequestStatus = 'rejected';
        } else {
            return res.status(400).json({ msg: 'Invalid status provided. Must be "approved" or "rejected".' });
        }

        user.adminResponseDate = new Date();
        user.adminResponseMessage = message || '';
        await user.save();

        res.json(user);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router;
