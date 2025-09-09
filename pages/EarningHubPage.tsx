import React, { useState } from 'react';
import {
    EARNING_METHODS, CASHBACK_APPS, CRYPTO_APPS, STUDENT_BANK_ACCOUNTS, REFERRAL_APPS,
    STUDENT_LOANS, STUDENT_CARDS, STUDENT_DEALS
} from '../constants';
import type { EarningMethod, CashbackApp, CryptoApp, StudentBankAccount, StudentLoanOffer, StudentCard, StudentDeal, ReferralApp } from '../types';
import EarningHubAssistant from '../components/EarningHubAssistant';
import BackButton from '../components/BackButton';

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 text-sm md:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-t-lg ${
            isActive
                ? 'bg-white border-gray-200 border-t border-x -mb-px text-purple-600'
                : 'text-gray-500 hover:text-gray-700 bg-gray-100'
        }`}
    >
        {label}
    </button>
);

const EarningMethodCard: React.FC<{ item: EarningMethod }> = ({ item }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
        <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
        <p className="text-gray-600 text-sm mt-2">{item.description}</p>
        <div className="mt-4">
            <h4 className="font-semibold text-sm">💸 Earn from:</h4>
            <p className="text-sm text-gray-700">{item.earnings.join(', ')}</p>
        </div>
        {(item.platforms || item.tools || item.apps || item.programs) && (
            <div className="mt-3">
                <h4 className="font-semibold text-sm">🔗 Platforms/Tools:</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                    {(item.platforms || item.tools || item.apps || item.programs)?.map(p => (
                        <a key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full hover:bg-gray-300">{p.name}</a>
                    ))}
                </div>
            </div>
        )}
    </div>
);

const CashbackAppCard: React.FC<{ app: CashbackApp }> = ({ app }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800">{app.name}</h3>
        <div className="mt-4 space-y-3">
            <div>
                <h4 className="font-semibold text-sm text-gray-700">🎁 Rewards & Offers:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-1">
                    {app.rewards.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-sm text-gray-700">🤝 Referral Program:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mt-1">
                    {app.referral.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
            </div>
        </div>
        <a href={app.downloadLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-purple-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-purple-700">
            Download App &rarr;
        </a>
    </div>
);

const CryptoAppCard: React.FC<{ app: CryptoApp }> = ({ app }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800">{app.name}</h3>
        <div className="mt-4 space-y-2 text-sm">
            <p><strong className="font-medium">Price:</strong> {app.price}</p>
            <p><strong className="font-medium">Market Cap:</strong> {app.marketCap}</p>
            <p><strong className="font-medium">Supply:</strong> {app.supply}</p>
            <div>
                <strong className="font-medium">Predictions:</strong>
                <ul className="list-disc list-inside text-gray-600">
                    {app.predictions.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            </div>
        </div>
         <a href={app.downloadLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-purple-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-purple-700">
            Get App &rarr;
        </a>
    </div>
);

const FinanceCard: React.FC<{ title: string; items: (StudentBankAccount | StudentLoanOffer | StudentCard | StudentDeal)[], type: string }> = ({ title, items, type }) => (
    <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-4">
        {items.map((item, index) => (
             <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                <div>
                   <p className="font-semibold text-gray-900">{type === 'bank' ? (item as StudentBankAccount).bank : type === 'loan' ? (item as StudentLoanOffer).provider : type === 'card' ? (item as StudentCard).card : (item as StudentDeal).platform}</p>
                   <p className="text-sm text-gray-600">
                    {'highlights' in item ? item.highlights :
                     'offer' in item ? item.offer :
                     'features' in item ? item.features.join(', ') : null
                    }
                   </p>
                </div>
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 bg-gray-200 text-gray-800 font-semibold px-3 py-1 rounded-md text-sm hover:bg-gray-300">
                    View
                </a>
             </div>
        ))}
        </div>
    </div>
);


const EarningHubPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Start Earning');
    const tabs = ['Start Earning', 'Cashback Apps', 'Crypto Apps', 'Finance Offers', 'Support'];

    const renderContent = () => {
        switch (activeTab) {
            case 'Start Earning':
                return (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {EARNING_METHODS.map((method, i) => <EarningMethodCard key={i} item={method} />)}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">📱 Use Refer & Earn Mobile Apps</h3>
                        <p className="text-gray-600 mb-4">These offer rewards even without spending. Share on WhatsApp, Telegram, or Instagram!</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {REFERRAL_APPS.map((app, i) => (
                                <div key={i} className="bg-white p-4 rounded-lg shadow-sm text-center">
                                    <p className="font-semibold">{app.name}</p>
                                    <p className="text-sm text-green-600 font-bold">{app.referralEarnings}</p>
                                    <a href={app.link} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline mt-1 inline-block">Get App</a>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Cashback Apps':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CASHBACK_APPS.map((app, i) => <CashbackAppCard key={i} app={app} />)}
                    </div>
                );
            case 'Crypto Apps':
                return (
                    <div>
                         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md mb-6" role="alert">
                            <p className="font-bold">Disclaimer:</p>
                            <p>Cryptocurrency is highly volatile and unregulated. Invest at your own risk. The information provided is for educational purposes only.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {CRYPTO_APPS.map((app, i) => <CryptoAppCard key={i} app={app} />)}
                        </div>
                    </div>
                );
            case 'Finance Offers':
                return (
                     <div>
                        <FinanceCard title="Best Student Bank Accounts" items={STUDENT_BANK_ACCOUNTS} type="bank" />
                        <FinanceCard title="Top Education Loan Offers" items={STUDENT_LOANS} type="loan" />
                        <FinanceCard title="Credit Cards for Students" items={STUDENT_CARDS} type="card" />
                        <FinanceCard title="Exclusive Student Deals" items={STUDENT_DEALS} type="deal" />
                    </div>
                );
             case 'Support':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
                        <p className="text-gray-600">
                            For any questions about earning methods, financial products, or safety, please contact our support team.
                        </p>
                        <a href="mailto:voiceofbharat.help@gmail.com" className="mt-4 inline-block bg-purple-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-purple-700">
                           Email: voiceofbharat.help@gmail.com
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="min-h-screen bg-purple-50">
            <section className="bg-purple-700 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Student Earning Hub</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto">
                    Learn to earn, save, and invest. Your complete guide to financial empowerment.
                </p>
            </section>

            <main className="container mx-auto px-4 sm:px-6 py-12">
                <BackButton className="mb-8" />
                <div className="flex flex-wrap border-b border-gray-200">
                    {tabs.map(tab => (
                        <TabButton
                            key={tab}
                            label={tab}
                            isActive={activeTab === tab}
                            onClick={() => setActiveTab(tab)}
                        />
                    ))}
                </div>
                <div className="bg-white p-6 rounded-b-lg shadow-md">
                   {renderContent()}
                </div>
            </main>
            <EarningHubAssistant />
        </div>
    );
};

export default EarningHubPage;
