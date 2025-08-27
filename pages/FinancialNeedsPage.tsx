import React, { useState } from 'react';
import { getFinancialProducts } from '../services/geminiService';
import type { FinancialProduct } from '../types';

const ProductCard: React.FC<{ product: FinancialProduct }> = ({ product }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <h3 className="text-xl font-bold text-gray-800">{product.productName}</h3>
        <p className="text-sm text-gray-500 mb-2">Provider: {product.provider}</p>
        <p className="text-gray-600">{product.description}</p>
        <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <p className="font-semibold text-blue-800 text-sm">Why it's a good fit:</p>
            <p className="text-gray-700 text-sm">{product.suitabilityReason}</p>
        </div>
        <a href={product.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-blue-600">
            Learn More &rarr;
        </a>
    </div>
);

const FinancialNeedsPage: React.FC = () => {
    const [landSize, setLandSize] = useState('');
    const [annualIncome, setAnnualIncome] = useState('');
    const [goal, setGoal] = useState('');
    const [products, setProducts] = useState<FinancialProduct[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setProducts(null);
        try {
            const result = await getFinancialProducts({ landSize, annualIncome, goal });
            setProducts(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-indigo-50 py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">AI Financial Advisor</h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Find the right financial support to grow your farm and secure your future.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-center mb-6">Tell us about your needs</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="land" className="block text-sm font-medium text-gray-700 mb-1">Land Size (in acres)*</label>
                                <input type="text" id="land" value={landSize} onChange={e => setLandSize(e.target.value)} placeholder="e.g., 5 acres" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" required />
                            </div>
                             <div>
                                <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">Annual Income (approx)*</label>
                                <input type="text" id="income" value={annualIncome} onChange={e => setAnnualIncome(e.target.value)} placeholder="e.g., ₹2,00,000" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">What is your primary financial goal?*</label>
                            <input type="text" id="goal" value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g., Buy a tractor, daughter's education, build a warehouse" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-2 text-gray-900" required />
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-700 transition disabled:bg-gray-400">
                                {isLoading ? 'Analyzing...' : 'Find Financial Products'}
                            </button>
                        </div>
                    </form>
                </div>

                {isLoading && <p className="text-center mt-6 animate-pulse">Our AI is finding the best options for you...</p>}
                {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mt-6">{error}</div>}
                
                {products && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-center mb-6">Recommended Financial Products</h2>
                        <div className="space-y-6">
                            {products.map((prod, index) => <ProductCard key={index} product={prod} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinancialNeedsPage;