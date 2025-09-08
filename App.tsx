import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';
import HomePage from './pages/Home';
import StudentsPage from './pages/StudentsPage';
import WomenEmpowermentPage from './pages/WomenEmpowermentPage';
import WorkersPage from './pages/WorkersPage';
import SeniorCitizensPage from './pages/SeniorCitizensPage';
import FarmersPage from './pages/FarmersPage';
import EntrepreneursPage from './pages/EntrepreneursPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactUsPage from './pages/ContactUsPage';
import CropDoctorPage from './pages/CropDoctorPage';
import DirectMarketPage from './pages/DirectMarketPage';
import FertilizerOptimizerPage from './pages/FertilizerOptimizerPage';
import ContractFarmingPage from './pages/ContractFarmingPage';
import WeatherAlertsPage from './pages/WeatherAlertsPage';
import CropRecommendationPage from './pages/CropRecommendationPage';
import FinancialNeedsPage from './pages/FinancialNeedsPage';
import ExpertGuidesPage from './pages/ExpertGuidesPage';
import MarketPricesPage from './pages/MarketPricesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import ScholarshipsPage from './pages/ScholarshipsPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import CareerRoadmapsPage from './pages/CareerRoadmapsPage';
import CodingToolkitPage from './pages/CodingToolkitPage';
import DoubtSolvingPage from './pages/DoubtSolvingPage';
import ProjectIdeasPage from './pages/ProjectIdeasPage';
import EarningHubPage from './pages/EarningHubPage';
import SmartAppsPage from './pages/SmartAppsPage';
import FreeResourcesPage from './pages/FreeResourcesPage';
import InternshipsPlacementsPage from './pages/InternshipsPlacementsPage';
import LearningPathsPage from './pages/LearningPathsPage';
import FinancialManagementPage from './pages/FinancialManagementPage';
import VoiceControl from './components/VoiceControl';
import { LanguageProvider } from './contexts/LanguageContext';
import UpdatesPage from './pages/UpdatesPage';
import OffersPage from './pages/OffersPage';
import LoginPage from './pages/LoginPage';

const AppLayout: React.FC = () => {
  const location = useLocation();
  // Hide the general AI assistant on any page within the farmer's section
  // or on the Student Earning Hub, as these pages have specialized assistants.
  const showGlobalAssistant = !location.pathname.startsWith('/farmers') && location.pathname !== '/students/earning-hub';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/students/scholarships" element={<ScholarshipsPage />} />
          <Route path="/students/resume-builder" element={<ResumeBuilderPage />} />
          <Route path="/students/career-roadmaps" element={<CareerRoadmapsPage />} />
          <Route path="/students/learning-paths" element={<LearningPathsPage />} />
          <Route path="/students/financial-management" element={<FinancialManagementPage />} />
          <Route path="/students/coding-toolkit" element={<CodingToolkitPage />} />
          <Route path="/students/doubt-solving" element={<DoubtSolvingPage />} />
          <Route path="/students/project-ideas" element={<ProjectIdeasPage />} />
          <Route path="/students/earning-hub" element={<EarningHubPage />} />
          <Route path="/students/smart-apps" element={<SmartAppsPage />} />
          <Route path="/students/free-resources" element={<FreeResourcesPage />} />
          <Route path="/students/internships-placements" element={<InternshipsPlacementsPage />} />
          <Route path="/women-empowerment" element={<WomenEmpowermentPage />} />
          <Route path="/workers" element={<WorkersPage />} />
          <Route path="/senior-citizens" element={<SeniorCitizensPage />} />
          <Route path="/farmers" element={<FarmersPage />} />
          <Route path="/farmers/crop-doctor" element={<CropDoctorPage />} />
          <Route path="/farmers/direct-market" element={<DirectMarketPage />} />
          <Route path="/farmers/fertilizer-optimizer" element={<FertilizerOptimizerPage />} />
          <Route path="/farmers/contract-farming" element={<ContractFarmingPage />} />
          <Route path="/farmers/weather-alerts" element={<WeatherAlertsPage />} />
          <Route path="/farmers/crop-recommendation" element={<CropRecommendationPage />} />
          <Route path="/farmers/financial-needs" element={<FinancialNeedsPage />} />
          <Route path="/farmers/expert-guides" element={<ExpertGuidesPage />} />
          <Route path="/farmers/market-prices" element={<MarketPricesPage />} />
          <Route path="/entrepreneurs" element={<EntrepreneursPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
        </Routes>
      </main>
      <Footer />
      {showGlobalAssistant && <AiAssistant />}
      <VoiceControl />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
