import express, { Request, Response } from 'express';
import Service from '../models/Service';
import auth from '../middleware/auth';

const router = express.Router();

// @route   GET api/services
// @desc    Get all services
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await Service.find().populate('provider', ['name']);
    res.json(services);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/services
// @desc    Create a service
// @access  Private
router.post('/', auth, async (req: Request, res: Response) => {
  const { name, description, provider, category, price } = req.body;

  try {
    const newService = new Service({
      name,
      description,
      provider,
      category,
      price
    });

    const service = await newService.save();
    res.json(service);

  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/services/:id
// @desc    Update a service
// @access  Private
router.put('/:id', auth, async (req: Request, res: Response) => {
  const { name, description, provider, category, price } = req.body;
  try {
    let service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    service.name = name || service.name;
    service.description = description || service.description;
    service.provider = provider || service.provider;
    service.category = category || service.category;
    service.price = price || service.price;

    await service.save();
    res.json(service);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/services/:id
// @desc    Delete a service
// @access  Private
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    await service.deleteOne();
    res.json({ msg: 'Service removed' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
