import React from 'react';

const PrivacySection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
    <div className="text-gray-600 space-y-4">
      {children}
    </div>
  </div>
);

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 max-w-4xl bg-white p-8 md:p-12 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Privacy Policy for Voice of Bharat</h1>
        <p className="text-center text-gray-500 mb-10">Effective Date: August 25, 2025</p>

        <p className="mb-8 text-gray-700">
          Voice of Bharat ("we", "us", or "our") is committed to protecting the privacy and security of our users ("you" or "users"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform, mobile applications, and related services (collectively, the "Services").
        </p>

        <PrivacySection title="1. Information We Collect">
          <p><strong>a. Personal Information:</strong> We may collect personal information that you voluntarily provide to us such as your name, email address, phone number, government-issued IDs (like Aadhaar), demographic information, and documents uploaded for accessing government schemes or benefits.</p>
          <p><strong>b. Usage Data:</strong> Information about your interaction with the platform, including IP address, device details, browser type, pages visited, and usage patterns.</p>
          <p><strong>c. Voice and Audio Data:</strong> Since our Services are voice-enabled, we may collect voice commands and interactions to provide accurate responses and improve user experience.</p>
          <p><strong>d. Cookies & Tracking Technologies:</strong> We use cookies and similar technologies to enhance the platform performance and user experience.</p>
        </PrivacySection>

        <PrivacySection title="2. How We Use Your Information">
          <ul className="list-disc list-inside">
            <li>To provide, maintain, and improve the Services.</li>
            <li>To verify your identity and facilitate access to government schemes and benefits.</li>
            <li>To communicate with you including notifications, updates, and support.</li>
            <li>To personalize your experience and suggest relevant schemes and resources.</li>
            <li>To comply with legal and regulatory requirements.</li>
            <li>For research, analytics, and improving AI algorithms.</li>
          </ul>
        </PrivacySection>

        <PrivacySection title="3. Information Sharing and Disclosure">
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul className="list-disc list-inside">
            <li>Government authorities and agencies only as required for service delivery.</li>
            <li>Trusted service providers who perform services for us under confidentiality agreements.</li>
            <li>Law enforcement or regulatory bodies when required by law.</li>
          </ul>
        </PrivacySection>
        
        <PrivacySection title="4. Data Security">
            <p>We adopt industry-standard technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction. Access to personal data is restricted to authorized personnel only.</p>
        </PrivacySection>

        <PrivacySection title="5. User Rights">
            <p>You may have rights under applicable laws to access, correct, delete, or restrict the processing of your personal data. You can contact us to exercise these rights using the contact information below.</p>
        </PrivacySection>

        <PrivacySection title="6. Data Retention">
            <p>We retain your information only as long as necessary to fulfill the purposes described in this Privacy Policy or comply with legal obligations.</p>
        </PrivacySection>

        <PrivacySection title="7. Children’s Privacy">
            <p>Our Services are not intended for children under 13 years of age. We do not knowingly collect personal information from children without parental consent.</p>
        </PrivacySection>

        <PrivacySection title="8. Changes to this Privacy Policy">
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>
        </PrivacySection>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
