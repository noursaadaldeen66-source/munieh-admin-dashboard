
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IStory } from '../types';
import { BookOpen, Trash2, Edit2, Plus } from 'lucide-react';
import StoryForm from './StoryForm';

const StoryManagement: React.FC = () => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<IStory | undefined>(undefined);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const data = await api.stories.list();
      setStories(data);
    } catch (error) {
      console.error("Failed to fetch stories:", error);
    }
  };

  const handleSave = (savedStory: IStory) => {
    if (editingStory) {
      setStories(stories.map(s => s._id === savedStory._id ? savedStory : s));
    } else {
      setStories([savedStory, ...stories]);
    }
    closeModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this story?')) {
      try {
        await api.stories.delete(id);
        setStories(stories.filter(s => s._id !== id));
      } catch (error) {
        console.error('Failed to delete story:', error);
        alert('Failed to delete story.');
      }
    }
  };

  const handleEdit = (story: IStory) => {
    setEditingStory(story);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setEditingStory(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStory(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Success Stories</h2>
          <p className="text-gray-500">Manage inspiring stories from producers</p>
        </div>
        <button onClick={openModal} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500">
          <Plus className="w-5 h-5 mr-2" />
          Add New Story
        </button>
      </div>

      {isModalOpen && <StoryForm onClose={closeModal} onSave={handleSave} story={editingStory} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group">
            <img className="h-48 w-full object-cover" src={story.imageUrl} alt={story.title} />
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900">{story.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                By: {typeof story.author === 'object' ? story.author.name : story.author}
              </p>
              <p className="mt-4 text-sm text-gray-600 line-clamp-3">{story.content}</p>
            </div>
            <div className="px-6 pb-4 flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(story)} className="p-1.5 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-md"><Edit2 className="w-4 h-4"/></button>
                <button onClick={() => handleDelete(story._id)} className="p-1.5 text-gray-400 hover:text-red-600 bg-gray-50 rounded-md"><Trash2 className="w-4 h-4"/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryManagement;
