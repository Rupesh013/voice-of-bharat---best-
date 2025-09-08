import React from 'react';
import SectionCard from '../components/SectionCard';
import ScholarshipCard from '../components/ScholarshipCard';
import { STUDENT_FEATURES, MOCK_SCHOLARSHIPS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';

const StudentsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center text-white py-20 md:py-32" style={{backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">{t('pages.students.heroTitle')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            {t('pages.students.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <BackButton to="/" className="mb-8" />
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t('pages.students.toolkitTitle')}</h2>
            <p className="text-gray-600 mt-2">{t('pages.students.toolkitSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STUDENT_FEATURES.map((feature) => (
              <SectionCard
                key={feature.path}
                title={t(feature.titleKey)}
                description={t(feature.descriptionKey)}
                path={feature.path}
                Icon={feature.Icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Scholarships */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t('pages.students.scholarshipsTitle')}</h2>
            <p className="text-gray-600 mt-2">{t('pages.students.scholarshipsSubtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {MOCK_SCHOLARSHIPS.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentsPage;