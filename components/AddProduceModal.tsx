import React, { useState } from 'react';
import { generateProduceDescription, suggestProducePrice } from '../services/geminiService';
import { useTranslation } from '../hooks/useTranslation';

interface AddProduceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduce: (produce: any) => void;
}

const AddProduceModal: React.FC<AddProduceModalProps> = ({ isOpen, onClose, onAddProduce }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);
  const { t } = useTranslation();

  const handleGenerateDescription = async () => {
    if (!name) return;
    setIsGeneratingDesc(true);
    try {
      const generatedDesc = await generateProduceDescription(name);
      setDescription(generatedDesc);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingDesc(false);
    }
  };

  const handleSuggestPrice = async () => {
    if (!name || !quantity) return;
    setIsSuggestingPrice(true);
    try {
      const suggestedPrice = await suggestProducePrice(name, quantity);
      setPrice(suggestedPrice);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSuggestingPrice(false);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduce({ name, description, price, quantity, image });
    // Reset state for next time
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setImage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg transform transition-all" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{t('components.addProduceModal.title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('components.addProduceModal.name')}</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900" required />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('components.addProduceModal.description')}</label>
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900"></textarea>
              <button type="button" onClick={handleGenerateDescription} disabled={!name || isGeneratingDesc} className="text-sm text-orange-600 hover:underline mt-1 disabled:opacity-50">
                {isGeneratingDesc ? t('components.addProduceModal.generating') : `✨ ${t('components.addProduceModal.generate')}`}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">{t('components.addProduceModal.quantity')}</label>
                <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900" required/>
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">{t('components.addProduceModal.price')}</label>
                <input type="text" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 p-2 text-gray-900" required/>
                 <button type="button" onClick={handleSuggestPrice} disabled={!name || !quantity || isSuggestingPrice} className="text-sm text-orange-600 hover:underline mt-1 disabled:opacity-50">
                  {isSuggestingPrice ? t('components.addProduceModal.suggesting') : `✨ ${t('components.addProduceModal.suggest')}`}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">{t('components.addProduceModal.image')}</label>
              <input type="file" id="image" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"/>
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">{t('components.addProduceModal.cancel')}</button>
            <button type="submit" className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">{t('components.addProduceModal.add')}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduceModal;