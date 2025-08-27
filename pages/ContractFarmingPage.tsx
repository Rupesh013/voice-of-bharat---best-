import React, { useState } from 'react';
import { AVAILABLE_CONTRACTS, MY_CONTRACTS } from '../constants';
import type { Contract } from '../types';
import ContractCard from '../components/ContractCard';
import ContractStatusCard from '../components/ContractStatusCard';
import ContractDetailModal from '../components/ContractDetailModal';

const ContractFarmingPage: React.FC = () => {
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    const handleViewContract = (contract: Contract, applying: boolean) => {
        setSelectedContract(contract);
        setIsApplying(applying);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedContract(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-cover bg-center text-white py-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579202673431-ca364491a1a7?q=80&w=2070&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Assured Contract Farming</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                        Secure your income with transparent, verified, and manageable farming contracts.
                    </p>
                </div>
            </section>

            {/* My Contracts Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">My Active Contracts</h2>
                    {MY_CONTRACTS.length > 0 ? (
                        <div className="space-y-6">
                            {MY_CONTRACTS.map(contract => (
                                <ContractStatusCard key={contract.id} contract={contract} onView={(c) => handleViewContract(c, false)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center bg-white p-8 rounded-lg shadow-md">
                            <p className="text-gray-600">You have no active contracts. Browse available opportunities below.</p>
                        </div>
                    )}
                </div>
            </section>
            
            {/* Available Contracts Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Available Contract Opportunities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {AVAILABLE_CONTRACTS.map(contract => (
                            <ContractCard key={contract.id} contract={contract} onView={(c) => handleViewContract(c, true)} />
                        ))}
                    </div>
                </div>
            </section>

            <ContractDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                contract={selectedContract}
                isApplying={isApplying}
            />
        </div>
    );
};

export default ContractFarmingPage;
