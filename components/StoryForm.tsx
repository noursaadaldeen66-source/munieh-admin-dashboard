
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IStory, IUser } from '../types';

interface StoryFormProps {
  story?: IStory;
  onClose: () => void;
  onSave: (story: IStory) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ story, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    api.users.list().then(setUsers);
    if (story) {
      setTitle(story.title);
      setContent(story.content);
      setAuthor(typeof story.author === 'string' ? story.author : story.author._id);
      setImageUrl(story.imageUrl);
    }
  }, [story]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) {
      alert('Please select an author.');
      return;
    }
    
    const storyData = { title, content, author, imageUrl };

    try {
      if (story) {
        const updatedStory = await api.stories.update(story._id, storyData);
        onSave(updatedStory);
      } else {
        const newStory = await api.stories.create({
            ...storyData,
            imageUrl: imageUrl || 'https://via.placeholder.com/400x200',
        });
        onSave(newStory);
      }
    } catch (error) {
      console.error('Failed to save story:', error);
      alert('Failed to save story.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
        <h3 className="text-xl font-bold mb-6">{story ? 'Edit Story' : 'Add New Story'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Story Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 border rounded" />
          <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required className="w-full p-2 border rounded" rows={5} />
          <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 border rounded" />
          <select value={author} onChange={e => setAuthor(e.target.value)} required className="w-full p-2 border rounded">
            <option value="" disabled>Select an Author</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>

          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700">Save Story</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoryForm;
