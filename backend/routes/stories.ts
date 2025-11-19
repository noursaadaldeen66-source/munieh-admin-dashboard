import express, { Request, Response } from 'express';
import Story from '../models/Story';
import auth from '../middleware/auth';

const router = express.Router();

// @route   GET api/stories
// @desc    Get all stories
// @access  Public
router.get('/', async (req: Request, res: Response) => {
// ... (rest of GET route)

// @route   POST api/stories
// @desc    Create a story
// @access  Private
router.post('/', auth, async (req: Request, res: Response) => {
  const { title, content, author, imageUrl } = req.body;

// ... (rest of POST route)

// @route   PUT api/stories/:id
// @desc    Update a story
// @access  Private
router.put('/:id', auth, async (req: Request, res: Response) => {
  const { title, content, author, imageUrl } = req.body;
// ... (rest of PUT route)

// @route   DELETE api/stories/:id
// @desc    Delete a story
// @access  Private
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const story = await Story.findById(req.params.id);
// ... (rest of DELETE route)

export default router;
