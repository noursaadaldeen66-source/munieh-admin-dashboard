import mongoose, { Document, Schema } from 'mongoose';

export interface IStory extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId; // Reference to the User model
  imageUrl: string;
}

const StorySchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String },
}, {
  timestamps: true
});

const Story = mongoose.model<IStory>('Story', StorySchema);

export default Story;
