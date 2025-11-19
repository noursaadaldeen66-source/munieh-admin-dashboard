import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { IProduct, IUser } from '../types';

interface ProductFormProps {
  product?: IProduct; // Make product optional for creating
  onClose: () => void;
  onSave: (product: IProduct) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState<'agricultural' | 'handicraft'>('agricultural');
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    api.users.list().then(setUsers);
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setSeller(typeof product.seller === 'string' ? product.seller : product.seller._id);
      setImageUrl(product.imageUrl);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seller) {
      alert('Please select a seller.');
      return;
    }
    
    const productData = { name, description, price, category, stock, seller, imageUrl };

    try {
      if (product) {
        // Update existing product
        const updatedProduct = await api.products.update(product._id, productData);
        onSave(updatedProduct);
      } else {
        // Create new product
        const newProduct = await api.products.create({
          ...productData,
          imageUrl: imageUrl || 'https://via.placeholder.com/150',
        });
        onSave(newProduct);
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4">
        <h3 className="text-xl font-bold mb-6">{product ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} required className="w-full p-2 border rounded" />
          <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-2 border rounded" />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} required className="w-full p-2 border rounded" />
          <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(Number(e.target.value))} required className="w-full p-2 border rounded" />
          <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full p-2 border rounded" />
          <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full p-2 border rounded">
            <option value="agricultural">Agricultural</option>
            <option value="handicraft">Handicraft</option>
          </select>
          <select value={seller} onChange={e => setSeller(e.target.value)} required className="w-full p-2 border rounded">
            <option value="" disabled>Select a Seller</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>

          {/* Action buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-700">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
