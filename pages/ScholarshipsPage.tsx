
import React, { useState } from 'react';
import ScholarshipTable from '../components/ScholarshipTable';
import type { AbroadScholarship, EducationLoan, CounselingCenter, VisaStep, ScholarshipDetail } from '../types';
import BackButton from '../components/BackButton';

const mainTabs = ['Home', 'Government (India)', 'Private (India)', 'Abroad', 'Support'];
const indiaScholarshipSubTabs = ['Below or Equal 10th', 'Intermediate (11th & 12th)', 'Diploma', 'ITI'];
const abroadSubTabs = ['Government Scholarships', 'Private Scholarships', 'Education Loans', 'Counseling Centers', 'Visa Process'];

// --- DATA DEFINITIONS ---
const GOVERNMENT_SCHOLARSHIPS_INDIA: Record<string, ScholarshipDetail[]> = {
    'Below or Equal 10th': [
        { category: 'Government', name: 'National Means-cum-Merit Scholarship (NMMSS)', eligibility: 'Class 8–10, income < ₹1.5 lakh', description: '₹12,000/yr; for meritorious students to continue secondary school', class: '8th to 10th', link: 'https://scholarships.gov.in/' },
        { category: 'Government', name: 'Pre-Matric Scholarship for SC/ST/OBC', eligibility: 'SC/ST/OBC students in 1–10', description: 'Tuition + maintenance costs', class: 'Up to 10th', link: 'https://scholarships.gov.in/' },
        { category: 'Government', name: 'Maulana Azad National Scholarship', eligibility: 'Minority girls, class 9+, family income < ₹2 lakh', description: 'Up to ₹12,000 for schooling', class: '9th & 10th', link: 'https://www.maef.nic.in/scholarship.html' },
        { category: 'Government', name: 'NTSE (National Talent Search Exam)', eligibility: 'Class 10 students', description: 'National-level merit scholarship', class: '10th (for +2)', link: 'https://ncert.nic.in/national-talent-examination.php' },
        { category: 'Government', name: 'EWS Pre-Matric Scholarship', eligibility: 'General cat., income < ₹2.5 lakh', description: 'Tuition & maintenance', class: '1st to 10th', link: '[Check local/state government portals]' },
    ],
    'Intermediate (11th & 12th)': [
        { category: 'Government', name: 'INSPIRE Scholarship (DST)', eligibility: 'Science, top 1% in board exam', description: '₹80,000/yr for higher science studies', class: '11th & 12th', link: 'https://www.online-inspire.gov.in/' },
        { category: 'Government', name: 'Post-Matric Scholarship for Minorities', eligibility: 'Minority, 11th/12th, income < ₹2 lakh', description: 'Tuition + maintenance costs', class: '11th & 12th', link: 'https://scholarships.gov.in/' },
        { category: 'Government', name: 'CBSE Merit Scholarship for Single Girl Child', eligibility: 'Single girl child, class 10 pass, in 11th', description: '₹6,000/yr for 2 years', class: '11th & 12th', link: 'https://www.cbse.gov.in/cbsenew/scholarships.html' },
        { category: 'Government', name: 'Telangana Epass Scholarship', eligibility: 'State students, income-criteria', description: 'Fee reimbursement for inter students', class: '11th & 12th', link: 'https://telanganaepass.cgg.gov.in/' },
        { category: 'Government', name: 'Pre-Matric Scholarship for Disabled Students', eligibility: '40%+ disability, class 9 & 10', description: 'Up to ₹8,000/yr', class: '9th to 12th', link: 'https://scholarships.gov.in/' },
    ],
    'Diploma': [
        { category: 'Government', name: 'AICTE Pragati Scholarship for Girls', eligibility: 'Girl students in AICTE diploma courses', description: '₹30,000 + incidentals, for support', class: 'Diploma', link: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati' },
        { category: 'Government', name: 'AICTE Saksham Scholarship for Disabled', eligibility: '40%+ disability, diploma students', description: '₹30,000 + ₹2,000/month, for 3 years', class: 'Diploma', link: 'https://www.aicte-india.org/schemes/students-development-schemes/Saksham' },
        { category: 'Government', name: 'Central Sector Scholarship Scheme', eligibility: 'Above 80% in +2/diploma, income < ₹8 lakh', description: '₹10,000–₹20,000/yr for professional studies', class: 'Diploma', link: 'https://scholarships.gov.in/' },
        { category: 'Government', name: 'State Technical Education Dept. Scholarship', eligibility: 'Varies by merit/income/state', description: 'Fee subsidy', class: 'Diploma', link: '[Check your State Technical Board Website]' },
        { category: 'Government', name: 'Post-Matric Scholarship for OBC/SC/ST', eligibility: 'Diploma, recognized institute, income limit', description: 'Tuition, exam, maintenance', class: 'Diploma', link: 'https://scholarships.gov.in/' },
    ],
    'ITI': [
        { category: 'Government', name: 'National Apprenticeship Promotion Scheme (NAPS)', eligibility: 'ITI apprenticeship', description: 'Monthly stipend + on-job training', class: 'ITI', link: 'https://www.apprenticeshipindia.gov.in/' },
        { category: 'Government', name: 'Pre/Post-Matric Scholarship (for ITI)', eligibility: 'SC/ST/OBC/Minority with income limits', description: 'Tuition, maintenance', class: 'ITI', link: 'https://scholarships.gov.in/' },
        { category: 'Government', name: 'NSDL Vidyasaarathi National Scholarship', eligibility: 'Merit+Means for Vocational/ITI', description: 'Variable grants', class: 'ITI', link: 'https://www.vidyasaarathi.co.in/' },
        { category: 'Government', name: 'Dr. Ambedkar ITI Scholarship', eligibility: 'SC/ST, merit & income', description: 'Tuition & living support', class: 'ITI', link: '[Check State Social Welfare Dept.]' },
        { category: 'Government', name: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY)', eligibility: 'Skill students, ITI included', description: 'Cash reward for passing assessment', class: 'ITI', link: 'https://www.pmkvyofficial.org/' },
    ]
};

const PRIVATE_SCHOLARSHIPS_INDIA: Record<string, ScholarshipDetail[]> = {
    'Below or Equal 10th': [
        { category: 'Private', name: 'Tata Trusts Scholarship', eligibility: 'Meritorious, needy students', description: 'Tuition/books support', class: 'Up to 10th', link: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants' },
        { category: 'Private', name: 'L’Oréal India For Young Women in Science', eligibility: 'Girl students, merit + needs', description: 'Scholarship + mentoring', class: '10th', link: 'https://www.loreal.com/en/india/articles/commitments/for-young-women-in-science-scholarship/' },
        { category: 'Private', name: 'Reliance Foundation Scholarship', eligibility: 'Marginalized, meritorious', description: 'Grants for school children', class: 'Up to 10th', link: 'https://www.reliancefoundation.org/education/scholarships' },
        { category: 'Private', name: 'Wipro Education Fellowship', eligibility: 'Underprivileged, academic record', description: 'School fees & support', class: 'Up to 10th', link: 'https://wiprofoundation.org/' },
        { category: 'Private', name: 'HDFC Bank Parivartan Scholarship', eligibility: 'Low income, good marks', description: 'School expense grants', class: 'Up to 10th', link: 'https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility/parivartan' },
    ],
    'Intermediate (11th & 12th)': [
        { category: 'Private', name: 'Aditya Birla Scholarship', eligibility: 'Merit & need, select top students', description: 'Tuition, stipend, mentoring', class: '11th & 12th', link: 'https://www.adityabirlascholars.net/' },
        { category: 'Private', name: 'Kotak Shiksha Nidhi', eligibility: 'Student lost earning parent to COVID', description: 'Educational support', class: '11th & 12th', link: 'https://www.kotakeducation.org/kotak-shiksha-nidhi/' },
        { category: 'Private', name: 'Sitaram Jindal Foundation', eligibility: 'Needy, merit-based', description: 'Financial aid/stipends', class: '11th & 12th', link: 'https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php' },
        { category: 'Private', name: 'Fair & Lovely Foundation', eligibility: 'Girls, merit + needs', description: 'Higher education aid', class: '11th & 12th', link: 'https://www.glowandlovelycareers.in/en/' },
        { category: 'Private', name: 'Swami Dayanand Scholarship', eligibility: 'Senior secondary, merit', description: 'Financial support', class: '11th & 12th', link: 'https://www.swamidayanand.org/' },
    ],
    'Diploma': [
        { category: 'Private', name: 'Sitaram Jindal Foundation', eligibility: 'Diploma, merit & need', description: '₹800–₹2,000/month stipend', class: 'Diploma', link: 'https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php' },
        { category: 'Private', name: 'Shri Mahila Griha Udyog Lijjat Papad', eligibility: 'Woman, diploma course', description: 'Tuition, books aid', class: 'Diploma', link: '[Contact local Lijjat center]' },
        { category: 'Private', name: 'INSPIRE Scholarship (Private colleges)', eligibility: 'Science stream, diploma', description: 'Science/tech studies support', class: 'Diploma', link: 'https://www.online-inspire.gov.in/' },
        { category: 'Private', name: 'NSDL Vidyasaarathi (Private)', eligibility: 'Diploma, low income/merit', description: 'Variable grants', class: 'Diploma', link: 'https://www.vidyasaarathi.co.in/' },
        { category: 'Private', name: 'L&T Build India Scholarship', eligibility: 'Engg. diploma students', description: 'Monthly stipend + job offer', class: 'Diploma (BE)', link: 'https://www.larsentoubro.com/corporate/careers/' },
    ],
    'ITI': [
        { category: 'Private', name: 'Shriram Automall Scholarship', eligibility: 'Merit-based, ITI', description: 'Covers ITI expenses', class: 'ITI', link: 'https://www.shriramfoundation.org/' },
        { category: 'Private', name: 'Hero MotoCorp Education Scholarship', eligibility: 'ITI (Mech/Auto trades)', description: 'Tuition support', class: 'ITI', link: 'https://www.heromotocorp.com/en-in/be-a-hero' },
        { category: 'Private', name: 'Sitaram Jindal Foundation ITI', eligibility: 'ITI, merit + need', description: 'Monthly stipend', class: 'ITI', link: 'https://www.sitaramjindalfoundation.org/scholarships-for-students-in-bangalore.php' },
        { category: 'Private', name: 'NSDL Vidyasaarathi ITI', eligibility: 'Merit, private donors', description: 'Tuition fee grants', class: 'ITI', link: 'https://www.vidyasaarathi.co.in/' },
        { category: 'Private', name: 'Mahindra All India Talent Scholarship', eligibility: 'ITI/diploma (girls pref.)', description: 'Grants, mentoring', class: 'ITI/Diploma', link: 'https://www.kcmet.org/what-we-do-Scholarship-Grants.aspx' },
    ]
};

const ABROAD_SCHOLARSHIPS_DATA = {
    'Government': [
        { name: 'National Overseas Scholarship (NOS)', eligibility: 'Indian nationals from SC/ST/OBC/NT/DNT/landless/artisan families; must have secured unconditional admission for Master’s or PhD at a top international university; family income < ₹8 lakh/yr; age <35', amountAndDescription: 'Covers up to ₹20 lakh+ for tuition, living, airfare, visa, and contingency for full-time postgrad study in top 200 universities (as per global rankings) in listed countries.', link: 'https://nosmsje.gov.in/' },
        { name: 'Fulbright-Nehru Fellowships', eligibility: 'Indian citizenship, undergraduate (UG) degree, strong academics, English, leadership record, admission to US Master’s/PhD.', amountAndDescription: 'Full tuition, fees, living ($24,000+/yr typical), airfare, insurance; for select master’s, research or teaching/research programs in the US.', link: 'https://www.usief.org.in/' },
        { name: 'Commonwealth Scholarships (UK)', eligibility: 'Indian graduates with strong academics, applying to nominated UK universities for Master’s/PhD; see annual eligibility list', amountAndDescription: 'Covers tuition, air fare, monthly living stipend (~£15,000–£20,000/yr), travel & health allowance.', link: 'https://cscuk.fcdo.gov.uk/scholarships/' },
        { name: 'DAAD Scholarships (Germany)', eligibility: 'Indian nationals with bachelor’s/UG degree from recognized university, academic excellence, admission for PG/research in Germany; subject-specific requirements', amountAndDescription: 'Monthly stipend (~€1,200), tuition waiver, health insurance; for master’s, PhD, and research programs in Germany.', link: 'https://www.daad.in/en/find-funding/scholarship-database/' },
        { name: 'State Gov. Schemes', eligibility: 'State resident, category/caste/income and academic merit as per scheme; admission abroad', amountAndDescription: 'Tuition, travel, and living support (amount, targets, and countries vary by state).', link: '[Check state education/welfare site]' },
    ],
    'Private': [
        { name: 'Inlaks Shivdasani Foundation', eligibility: 'Indian citizen, under 30, first-class UG degree, admission to top global universities (mainly US/UK/EU), restricted fields (arts, enviro, some sciences)', amountAndDescription: 'Up to $100,000 for tuition, living, and travel, for master’s/research courses; highly competitive; covers select disciplines', link: 'https://www.inlaksfoundation.org/' },
        { name: 'Narotam Sekhsaria Foundation', eligibility: 'Indian citizens <30, excellent academics, unconditional admission for Postgraduate (Master’s, PhD) at top 100 world universities; any field', amountAndDescription: 'Interest-free loan covering full tuition & living; repayment starts 1yr after course ends', link: 'https://pg.nsfoundation.co.in/' },
        { name: 'JN Tata Endowment', eligibility: 'Indian graduates (<45), excellent academics, secured confirmed admission for PG (Master’s/PhD) at any global university', amountAndDescription: 'Loan grants ₹1–₹10 lakh; partial travel grants; repayable in installments starting 1yr after course', link: 'https://www.jntataendowment.org/' },
        { name: 'Aga Khan Foundation', eligibility: 'Indian nationals, excellent academics, financial need, admission for PG at recognized global university (not in US/UK); preference for students under 30', amountAndDescription: 'Full/partial tuition + living; 50% grant and 50% loan format; highly need-based and competitive', link: 'https://www.akdn.org/our-agencies/aga-khan-foundation/international-scholarship-programme' },
    ]
};

const EDUCATION_LOANS_DATA: EducationLoan[] = [
    { bank: 'SBI Global Ed-Vantage', eligibility: 'Indian citizens (min. age 18), confirmed admission for full-time course at foreign university; co-borrower/co-applicant required for large loans', amountAndDescription: 'Up to ₹1.5 crore; covers tuition, living, travel, insurance; moratorium until studies end + 6mo', interestRateLink: '10.10–11.60%' },
    { bank: 'ICICI Bank', eligibility: 'Indian citizen, confirmed foreign admission, co-applicant required', amountAndDescription: 'Up to ₹3 crore; tuition, fees, living, travel; flexible tenure; collateral for large sums', interestRateLink: '10.25–13.75%' },
    { bank: 'HDFC Credila', eligibility: 'Indian, confirmed foreign admission, co-borrower, collateral for higher sums', amountAndDescription: 'No upper limit; covers all education and living expenses, quick approval, moratorium available', interestRateLink: '10.75–13%' },
    { bank: 'Bank of Baroda', eligibility: 'Indian, conditional on course/college/university and credit criteria', amountAndDescription: 'Up to ₹1.5 crore, margin cash/subsidy possible, collateral required for big loans', interestRateLink: '10.5–12% approx.' },
];

const COUNSELING_CENTERS_DATA: CounselingCenter[] = [
    { name: 'IDP Education', focus: 'Any student, mostly for English-speaking countries', description: 'Admissions, IELTS training, full visa support for US/UK/Aus/Canada/NZ', link: 'https://www.idp.com/india/' },
    { name: 'Y-Axis', focus: 'All applicants (includes PR, study, work visas)', description: 'Personalized counseling for admissions, scholarships, SOP/LOR writing, detailed visa filing', link: 'https://www.y-axis.com/' },
    { name: 'Edwise International', focus: 'Any graduate, undergrad, or diploma applicant', description: 'Guidance for admissions, scholarships, student loans, visas, pre-departure, test prep', link: 'https://www.edwiseinternational.com/' },
    { name: 'TC Global (The Chopras)', focus: 'Indian students targeting US/UK/EU/Aus', description: 'Counselling, profile building, visa guidance, SOP/LOR', link: 'https://tcglobal.com/' },
    { name: 'Global Opportunities', focus: 'Any student, major countries', description: 'Counseling, loan/visa/financial documentation, end-to-end support', link: 'https://www.global-opportunities.net/' },
];

const VISA_PROCESS_STEPS_DATA: VisaStep[] = [
    { step: 1, title: 'Secure Admission', description: 'Receive an unconditional offer/admit letter from a recognized university abroad.' },
    { step: 2, title: 'Gather Documents', description: 'Collect all required documents for your application.', requirements: ['Valid passport (6+ months)', 'University admission/offer letter', 'Proof of financial ability: bank statements, loan sanctions, scholarship letters', 'Academic transcripts, degree certificates', 'English language test score (IELTS/TOEFL/PTE)', 'Visa application form (country-specific)', 'Visa fee payment proof', 'Photos (country-specific size)', 'SOP/study plan (some countries)', 'Medical/police clearance (where needed)', 'Accommodation proof (in some cases)'] },
    { step: 3, title: 'Online Application', description: 'Fill out the official online visa application form for your destination country.', links: [{ name: 'USA - DS-160 Form', url: 'https://ceac.state.gov/genniv/' }, { name: 'UK - Student Visa Application', url: 'https://www.gov.uk/student-visa/apply' }, { name: 'Canada - Study Permit', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/apply.html' }, { name: 'Australia - Student Visa 500', url: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500' }] },
    { step: 4, title: 'Book & Attend Visa Interview/Biometrics', description: 'Schedule and attend your visa appointment with all original documents. Be prepared to answer questions about your funds, course choice, and intent to return home after your studies.' },
    { step: 5, title: 'Get Decision and Prepare Travel', description: 'Visa decision timelines are typically 2–8 weeks. Once approved, notify your university, book your flights, and make final travel arrangements. Important: Use only official government/embassy portals and never submit fraudulent documents.' },
];


const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm md:text-base font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-t-lg ${
            isActive
                ? 'bg-white border-gray-200 border-t border-x -mb-px text-orange-600'
                : 'text-gray-500 hover:text-gray-700 bg-gray-100'
        }`}
    >
        {label}
    </button>
);

const AbroadScholarshipCard: React.FC<{ scholarship: AbroadScholarship }> = ({ scholarship }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <h3 className="text-xl font-bold text-gray-800">{scholarship.name}</h3>
        <div className="mt-4 space-y-2">
            <div>
                <h4 className="font-semibold text-gray-700">Eligibility:</h4>
                <p className="text-gray-600 text-sm">{scholarship.eligibility}</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Amount & Description:</h4>
                <p className="text-gray-600 text-sm">{scholarship.amountAndDescription}</p>
            </div>
        </div>
        <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-blue-500 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-blue-600">
            Visit Portal &rarr;
        </a>
    </div>
);

const LoanCard: React.FC<{ loan: EducationLoan }> = ({ loan }) => (
     <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <h3 className="text-xl font-bold text-gray-800">{loan.bank}</h3>
        <p className="mt-2 text-lg font-semibold text-green-700">Interest Rate: {loan.interestRateLink}</p>
        <div className="mt-4 space-y-2">
            <div>
                <h4 className="font-semibold text-gray-700">Eligibility:</h4>
                <p className="text-gray-600 text-sm">{loan.eligibility}</p>
            </div>
            <div>
                <h4 className="font-semibold text-gray-700">Amount & Description:</h4>
                <p className="text-gray-600 text-sm">{loan.amountAndDescription}</p>
            </div>
        </div>
    </div>
);

const CounselingCard: React.FC<{ center: CounselingCenter }> = ({ center }) => (
     <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800">{center.name}</h3>
        <p className="text-sm font-semibold text-orange-600 mt-1">{center.focus}</p>
        <p className="text-gray-600 text-sm mt-3">{center.description}</p>
        <a href={center.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 bg-orange-500 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-orange-600">
            Visit Website &rarr;
        </a>
    </div>
);

const VisaStepCard: React.FC<{ step: VisaStep }> = ({ step }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
            {step.step}
        </div>
        <div className="ml-4 bg-white p-4 rounded-lg shadow-sm flex-1">
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="text-gray-600 mt-2">{step.description}</p>
            {step.requirements && (
                <ul className="list-disc list-inside mt-2 text-sm text-gray-500 space-y-1">
                    {step.requirements.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
            )}
             {step.links && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {step.links.map((link, i) => (
                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full hover:bg-indigo-200">
                           {link.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    </div>
);


const ScholarshipsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(mainTabs[0]);
    const [indiaGovTab, setIndiaGovTab] = useState(indiaScholarshipSubTabs[0]);
    const [indiaPvtTab, setIndiaPvtTab] = useState(indiaScholarshipSubTabs[0]);
    const [abroadTab, setAbroadTab] = useState(abroadSubTabs[0]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Home':
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to the Scholarship Hub</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our mission is to democratize access to education by providing a comprehensive, centralized platform for scholarships, coaching, and study abroad resources. Explore the tabs to find opportunities tailored to your needs.
                        </p>
                    </div>
                );
            case 'Government (India)':
                return (
                    <div>
                         <div className="flex flex-wrap border-b border-gray-200 mb-4">
                            {indiaScholarshipSubTabs.map(tab => <TabButton key={tab} label={tab} isActive={indiaGovTab === tab} onClick={() => setIndiaGovTab(tab)} />)}
                         </div>
                         <ScholarshipTable scholarships={GOVERNMENT_SCHOLARSHIPS_INDIA[indiaGovTab]} />
                    </div>
                );
            case 'Private (India)':
                 return (
                    <div>
                         <div className="flex flex-wrap border-b border-gray-200 mb-4">
                            {indiaScholarshipSubTabs.map(tab => <TabButton key={tab} label={tab} isActive={indiaPvtTab === tab} onClick={() => setIndiaPvtTab(tab)} />)}
                         </div>
                         <ScholarshipTable scholarships={PRIVATE_SCHOLARSHIPS_INDIA[indiaPvtTab]} />
                    </div>
                );
            case 'Abroad':
                return (
                     <div>
                         <div className="flex flex-wrap border-b border-gray-200 mb-4">
                            {abroadSubTabs.map(tab => <TabButton key={tab} label={tab} isActive={abroadTab === tab} onClick={() => setAbroadTab(tab)} />)}
                         </div>
                         <div className="mt-6">
                            {abroadTab === 'Government Scholarships' && (
                                <div className="space-y-6">
                                    {ABROAD_SCHOLARSHIPS_DATA['Government'].map((s, i) => <AbroadScholarshipCard key={i} scholarship={s} />)}
                                </div>
                            )}
                            {abroadTab === 'Private Scholarships' && (
                                <div className="space-y-6">
                                    {ABROAD_SCHOLARSHIPS_DATA['Private'].map((s, i) => <AbroadScholarshipCard key={i} scholarship={s} />)}
                                </div>
                            )}
                             {abroadTab === 'Education Loans' && (
                                <div className="space-y-6">
                                    {EDUCATION_LOANS_DATA.map((l, i) => <LoanCard key={i} loan={l} />)}
                                </div>
                            )}
                            {abroadTab === 'Counseling Centers' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {COUNSELING_CENTERS_DATA.map((c, i) => <CounselingCard key={i} center={c} />)}
                                </div>
                            )}
                            {abroadTab === 'Visa Process' && (
                                <div className="space-y-8 relative">
                                     <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true"></div>
                                     {VISA_PROCESS_STEPS_DATA.map((s, i) => <VisaStepCard key={i} step={s} />)}
                                </div>
                            )}
                         </div>
                    </div>
                );
            case 'Support':
                 return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
                        <p className="text-gray-600">
                            For any questions, issues, or feedback regarding scholarships, please contact our dedicated support team.
                        </p>
                        <a href="mailto:voiceofbharat.help@gmail.com" className="mt-4 inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600">
                            Email: voiceofbharat.help@gmail.com
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-blue-600 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">Scholarship & Coaching Hub</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto">Your comprehensive guide to funding your education in India and abroad.</p>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 py-12">
                <BackButton className="mb-8" />
                <div className="flex flex-wrap border-b border-gray-200">
                    {mainTabs.map(tab => (
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
        </div>
    );
};

export default ScholarshipsPage;
