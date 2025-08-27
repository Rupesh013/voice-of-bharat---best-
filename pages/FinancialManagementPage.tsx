import React, { useState } from 'react';
import type { BudgetPlan, LoanAnalysis, InvestmentGuide } from '../types';
import { generateBudgetPlan, analyzeStudentLoan, generateInvestmentGuide } from '../services/geminiService';

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 md:px-6 py-3 font-semibold text-sm md:text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
            isActive ? 'text-orange-600 border-b-2 border-orange-600' : 'text-gray-500 hover:text-gray-700'
        }`}
    >
        {label}
    </button>
);

const BudgetPlanner: React.FC = () => {
    const [income, setIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [goal, setGoal] = useState('');
    const [plan, setPlan] = useState<BudgetPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setPlan(null);
        try {
            const result = await generateBudgetPlan(income, expenses, goal);
            setPlan(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">Create Your Budget</h3>
                <input type="text" value={income} onChange={e => setIncome(e.target.value)} placeholder="Monthly Income (e.g., ₹10,000)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                <input type="text" value={expenses} onChange={e => setExpenses(e.target.value)} placeholder="Fixed Monthly Expenses (e.g., ₹4,000)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                <input type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="Savings Goal (e.g., Buy a new laptop)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? 'Generating Plan...' : '✨ Generate Budget Plan'}
                </button>
            </form>
            {isLoading && <p className="text-center animate-pulse">Our AI is crunching the numbers...</p>}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {plan && (
                <div className="bg-white p-6 rounded-lg shadow-sm mt-6 animate-fade-in space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 text-center">{plan.title}</h3>
                    <p className="text-center text-gray-600">{plan.summary}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        {plan.breakdown.map(item => (
                            <div key={item.category} className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-lg font-bold text-orange-600">{item.percentage}%</p>
                                <p className="font-semibold">{item.category} ({item.amount})</p>
                                <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                        ))}
                    </div>
                     <div>
                        <h4 className="font-semibold text-lg text-gray-700">Savings Tips:</h4>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 pl-2 text-sm">
                            {plan.savingsTips.map((tip, i) => <li key={i}>{tip}</li>)}
                        </ul>
                     </div>
                     <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                        <h4 className="font-semibold text-lg text-green-800">Action Plan for Your Goal:</h4>
                        <p className="text-gray-700 mt-2 text-sm">{plan.goalActionPlan}</p>
                     </div>
                </div>
            )}
        </div>
    );
};

const LoanAdvisor: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [interest, setInterest] = useState('');
    const [tenure, setTenure] = useState('');
    const [analysis, setAnalysis] = useState<LoanAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

     const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setAnalysis(null);
        try {
            const result = await analyzeStudentLoan(amount, interest, tenure);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">Analyze an Education Loan</h3>
                <input type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Loan Amount (e.g., ₹5,00,000)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                <input type="text" value={interest} onChange={e => setInterest(e.target.value)} placeholder="Annual Interest Rate (e.g., 9.5%)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                <input type="text" value={tenure} onChange={e => setTenure(e.target.value)} placeholder="Loan Tenure (e.g., 7 years)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? 'Analyzing...' : '✨ Analyze Loan'}
                </button>
            </form>
             {isLoading && <p className="text-center animate-pulse">Our AI is performing the analysis...</p>}
             {error && <p className="text-red-500 text-sm text-center">{error}</p>}
             {analysis && (
                 <div className="bg-white p-6 rounded-lg shadow-sm mt-6 animate-fade-in space-y-6">
                    <h3 className="text-2xl font-bold text-gray-800 text-center">{analysis.loanName}</h3>
                    <p className="text-center text-gray-600">{analysis.summary}</p>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        {analysis.details.map(d => (
                             <div key={d.key} className="bg-gray-50 p-4 rounded-lg">
                                <p className="font-semibold text-gray-600">{d.key}</p>
                                <p className="text-xl font-bold text-orange-600">{d.value}</p>
                             </div>
                        ))}
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <h4 className="font-semibold text-lg text-green-700">Pros</h4>
                             <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-sm pl-2">
                                {analysis.pros.map((p, i) => <li key={i}>{p}</li>)}
                             </ul>
                        </div>
                        <div>
                             <h4 className="font-semibold text-lg text-red-700">Cons</h4>
                             <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-sm pl-2">
                                {analysis.cons.map((c, i) => <li key={i}>{c}</li>)}
                             </ul>
                        </div>
                     </div>
                     <div className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                        <h4 className="font-semibold text-lg text-blue-800">Expert Advice</h4>
                        <p className="text-gray-700 mt-2 text-sm">{analysis.advice}</p>
                     </div>
                 </div>
             )}
        </div>
    );
};

const InvestmentGuide: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [horizon, setHorizon] = useState('');
    const [risk, setRisk] = useState('Low');
    const [guide, setGuide] = useState<InvestmentGuide | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setGuide(null);
        try {
            const result = await generateInvestmentGuide(amount, horizon, risk);
            setGuide(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
             <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">Get an Investment Guide</h3>
                <input type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Monthly Investment Amount (e.g., ₹1000)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                <input type="text" value={horizon} onChange={e => setHorizon(e.target.value)} placeholder="Investment Horizon (e.g., 5 years)" className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900" required />
                <div>
                     <label className="block text-sm font-medium text-gray-700">Risk Tolerance</label>
                     <select value={risk} onChange={e => setRisk(e.target.value)} className="w-full bg-white border-gray-300 rounded-md shadow-sm p-3 text-gray-900">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                     </select>
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 disabled:bg-orange-300">
                    {isLoading ? 'Generating Guide...' : '✨ Generate Investment Guide'}
                </button>
            </form>
            {isLoading && <p className="text-center animate-pulse">Our AI is preparing your educational guide...</p>}
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            {guide && (
                 <div className="bg-white p-6 rounded-lg shadow-sm mt-6 animate-fade-in space-y-6">
                    <p className="text-center text-gray-600 italic">{guide.introduction}</p>
                    {guide.options.map((opt, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-bold text-lg text-gray-800">{opt.name} <span className="text-sm font-medium text-gray-500">({opt.riskLevel} Risk)</span></h4>
                            <p className="text-sm text-gray-600 mt-1">{opt.description}</p>
                            <p className="text-sm text-gray-800 mt-2"><strong>Suitability:</strong> {opt.suitability}</p>
                        </div>
                    ))}
                    <div>
                        <h4 className="font-semibold text-lg text-gray-700">Next Steps:</h4>
                        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-sm pl-2">
                            {guide.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                        </ul>
                    </div>
                     <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg text-yellow-800 text-sm">
                        <p><strong>Disclaimer:</strong> {guide.disclaimer}</p>
                     </div>
                 </div>
            )}
        </div>
    );
};

const FinancialManagementPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Budget Planner');
    const tabs = ['Budget Planner', 'Loan Advisor', 'Investment Guide'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Budget Planner': return <BudgetPlanner />;
            case 'Loan Advisor': return <LoanAdvisor />;
            case 'Investment Guide': return <InvestmentGuide />;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Financial Management Tools</h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Your personal AI financial mentor for budgeting, loans, and investment education.
                    </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md mb-8">
                    <div className="flex justify-center border-b">
                        {tabs.map(tab => (
                             <TabButton key={tab} label={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)} />
                        ))}
                    </div>
                </div>

                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default FinancialManagementPage;