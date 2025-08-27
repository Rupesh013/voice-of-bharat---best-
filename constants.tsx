

import React from 'react';
import type { 
  Contract, MarketPrice, ExpertGuide, Scholarship, ScholarshipDetail, 
  AbroadScholarship, EducationLoan, CounselingCenter, VisaStep, EarningMethod, CashbackApp, 
  CryptoApp, StudentBankAccount, StudentLoanOffer, StudentCard, StudentDeal, ReferralApp, Project,
  PlatformInfo, Article, SmartApp
} from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const ICONS = {
  Student: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.906 59.906 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>
  ),
  Women: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  Worker: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 2a2 2 0 00-2 2v2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-2V4a2 2 0 00-2-2h-4zM8 6h8v2H8V6z" />
    </svg>
  ),
  Senior: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0a8.25 8.25 0 0 1 15 0" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v.75m0 13.5v.75" />
    </svg>
  ),
  Farmer: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
    </svg>
  ),
  Entrepreneur: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  ),
  Email: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
  ),
  WhatsApp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6,14.2c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,0.9c-0.1,0.1-0.3,0.2-0.5,0.1 c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.2,0.3-0.4 c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.5-0.8-2.1c-0.2-0.5-0.4-0.5-0.6-0.5c-0.2,0-0.4,0-0.6,0c-0.2,0-0.5,0.1-0.8,0.4 c-0.3,0.3-1.1,1.1-1.1,2.6c0,1.5,1.1,3,1.3,3.2c0.2,0.2,2.2,3.4,5.4,4.8c0.8,0.3,1.4,0.5,1.8,0.7c0.7,0.2,1.4,0.2,1.9,0.1 c0.6-0.1,1.8-0.7,2.1-1.4c0.3-0.7,0.3-1.3,0.2-1.4C17.1,14.3,16.8,14.3,16.6,14.2z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10 c1.6,0,3.1-0.4,4.4-1.1l-1-1.8c-1,0.5-2.1,0.8-3.4,0.8c-4.4,0-8-3.6-8-8s3.6-8,8-8c4.4,0,8,3.6,8,8c0,1.3-0.3,2.5-0.9,3.6l1.8,1 c0.7-1.3,1.1-2.8,1.1-4.6C22,6.5,17.5,2,12,2z M19.1,17.2l-1.8-1c0.8-1.3,1.2-2.8,1.2-4.3c0-4.4-3.6-8-8-8S4.5,7.5,4.5,12 c0,4.4,3.6,8,8,8c1.5,0,2.9-0.4,4.2-1.1l1,1.8c-1.4,0.8-3.1,1.3-4.9,1.3C7.6,22,3,17.4,3,12S7.6,2,13.3,2c5.7,0,10.3,4.6,10.3,10.3 c0,1.9-0.5,3.7-1.4,5.2L19.1,17.2z"/></svg>
  ),
  GitHub: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2,2,6.48,2,12c0,4.42,2.87,8.17,6.84,9.5c0.5,0.09,0.68-0.22,0.68-0.48 c0-0.24-0.01-0.87-0.01-1.7c-2.78,0.6-3.37-1.34-3.37-1.34c-0.45-1.16-1.11-1.47-1.11-1.47c-0.91-0.62,0.07-0.6,0.07-0.6 c1,0.07,1.53,1.03,1.53,1.03c0.89,1.53,2.34,1.09,2.91,0.83c0.09-0.65,0.35-1.09,0.63-1.34c-2.22-0.25-4.55-1.11-4.55-4.94 c0-1.09,0.39-1.98,1.03-2.68c-0.1-0.25-0.45-1.27,0.1-2.64c0,0,0.84-0.27,2.75,1.02c0.79-0.22,1.65-0.33,2.5-0.33 c0.85,0,1.71,0.11,2.5,0.33c1.91-1.29,2.75-1.02,2.75-1.02c0.55,1.37,0.2,2.39,0.1,2.64c0.64,0.7,1.03,1.59,1.03,2.68 c0,3.84-2.34,4.68-4.57,4.93c0.36,0.31,0.68,0.92,0.68,1.85c0,1.34-0.01,2.42-0.01,2.75c0,0.27,0.18,0.58,0.69,0.48 C20.13,20.17,23,16.42,23,12C23,6.48,18.52,2,12,2z"/></svg>
  ),
  Location: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
  ),
  FarmChat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 1-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 1 3.09-3.09L12 5.25l.813 2.846a4.5 4.5 0 0 1 3.09 3.09L18.75 12l-2.846.813a4.5 4.5 0 0 1-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.898 20.575 16.5 21.75l-.398-1.175a3.375 3.375 0 0 0-2.456-2.456L12.5 18l1.175-.398a3.375 3.375 0 0 0 2.456-2.456L16.5 14.25l.398 1.175a3.375 3.375 0 0 0 2.456 2.456L20.5 18l-1.175.398a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
  ),
  MarketChat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.812a.5.5 0 0 0-.447-.646l-13.434-1.343a.5.5 0 0 0-.586.447l-1.932 8.583c-.083.37-.39.658-.768.658H3.75a.75.75 0 1 0 0 1.5h.375Z" />
    </svg>
  ),
  Expert: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  Upvote: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  ),
  Trophy: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 1-4.874-1.971l.242.311a.5.5 0 0 0 .756-.35l.525-2.222a.5.5 0 0 0-.21-.518l-1.92-1.37a.5.5 0 0 0-.573.03l-1.068.964a.5.5 0 0 0-.054.718l1.323 1.618a.5.5 0 0 0 .756.055l1.626-1.322a.5.5 0 0 0 .054-.718l-1.068-1.037a.5.5 0 0 0-.573-.03l-1.92 1.37a.5.5 0 0 0-.21.518l.525 2.222a.5.5 0 0 0 .756.35l.242-.311A9.75 9.75 0 0 1 16.5 18.75Zm-9-1.5a.5.5 0 0 0-.5.5v2.25a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-2.25a.5.5 0 0 0-.5-.5h-9Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>
  ),
  EarningChat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  GovtApps: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6M3 9v11.25a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 20.25V9M3 9h18" />
    </svg>
  ),
  Shield: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />
    </svg>
  ),
  HeartPlus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h.008v.008H12V7.5Z" />
    </svg>
  ),
  Lightbulb: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-4.665a5.98 5.98 0 0 0-1.5-2.085a5.98 5.98 0 0 0-1.5 2.085a6.01 6.01 0 0 0 1.5 4.665ZM12 18v-5.25m-3-1.5v5.25m3-5.25v5.25m6-5.25v5.25m-12-5.25v5.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21a2.25 2.25 0 0 1-2.25-2.25H12a2.25 2.25 0 0 1-2.25 2.25Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 21a2.25 2.25 0 0 0 2.25-2.25H12a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  Rupee: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  PersonalizedPath: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0h9.75m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
  ),
  FinancialManagement: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
};

export const SECTIONS = [
  { title: 'Students', description: 'Scholarships, career guidance, and skill development.', path: '/students', Icon: ICONS.Student },
  { title: 'Women Empowerment', description: 'Schemes, safety resources, and support networks.', path: '/women-empowerment', Icon: ICONS.Women },
  { title: 'Farmers', description: 'Crop insurance, market prices, and modern farming tools.', path: '/farmers', Icon: ICONS.Farmer },
  { title: 'Workers & Laborers', description: 'Find jobs, social security, and know your rights.', path: '/workers', Icon: ICONS.Worker },
  { title: 'Senior Citizens', description: 'Pension schemes, healthcare, and support services.', path: '/senior-citizens', Icon: ICONS.Senior },
  { title: 'Entrepreneurs', description: 'Tools and resources to start and grow your business.', path: '/entrepreneurs', Icon: ICONS.Entrepreneur },
];

export const FARMER_FEATURES = [
  { title: 'AI Crop Doctor', description: 'Diagnose crop diseases from an image.', path: '/farmers/crop-doctor', Icon: ICONS.Farmer },
  { title: 'Direct Market Access', description: 'Sell produce directly to buyers, no middlemen.', path: '/farmers/direct-market', Icon: ICONS.MarketChat },
  { title: 'Fertilizer Optimizer', description: 'Get AI-based fertilizer recommendations.', path: '/farmers/fertilizer-optimizer', Icon: ICONS.Lightbulb },
  { title: 'Assured Contract Farming', description: 'Secure your income with transparent contracts.', path: '/farmers/contract-farming', Icon: ICONS.Worker },
  { title: 'Weather Alerts & Advisory', description: 'AI-powered local forecasts and crop advice.', path: '/farmers/weather-alerts', Icon: ICONS.Rupee },
  { title: 'AI Crop Recommender', description: 'Discover the most profitable crops for your land.', path: '/farmers/crop-recommendation', Icon: ICONS.Student },
  { title: 'Financial Needs Analysis', description: 'Find suitable loans, schemes, and insurance.', path: '/farmers/financial-needs', Icon: ICONS.HeartPlus },
  { title: 'Expert Farming Guides', description: 'Access a knowledge base for best practices.', path: '/farmers/expert-guides', Icon: ICONS.Expert },
  { title: 'Live Market Prices', description: 'Track mandi prices and get AI insights.', path: '/farmers/market-prices', Icon: ICONS.Entrepreneur },
];


export const CATEGORIZED_SCHEMES = [
    {
        category: 'Income Support',
        schemes: [
            {
                title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
                benefit: '₹6,000 per year directly to your bank account in three installments.',
                eligibility: 'All landholding farmer families.',
                applyProcess: ['Visit the official PM-KISAN portal.', 'Click on "New Farmer Registration".', 'Enter your Aadhaar number and other details.', 'Upload land records and submit.'],
                link: 'https://pmkisan.gov.in/'
            },
            {
                title: 'Kisan Credit Card (KCC)',
                benefit: 'Provides short-term formal credit for crops, animal husbandry, and fisheries at a low interest rate.',
                eligibility: 'Farmers, sharecroppers, tenant farmers.',
                applyProcess: ['Approach your nearest bank branch.', 'Fill out the KCC application form.', 'Submit land documents, identity, and address proof.'],
                link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card'
            }
        ]
    },
    {
        category: 'Crop Insurance',
        schemes: [
            {
                title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
                benefit: 'Insurance cover and financial support to farmers in the event of failure of any of the notified crops as a result of natural calamities, pests & diseases.',
                eligibility: 'All farmers growing notified crops in notified areas.',
                applyProcess: ['Contact your nearest bank, insurance company, or CSC.', 'Fill the form with details of crops sown.', 'Pay the premium amount (very low for farmers).'],
                link: 'https://pmfby.gov.in/'
            }
        ]
    },
    {
        category: 'Fertilizers & Equipment',
        schemes: [
            {
                title: 'Soil Health Card Scheme',
                benefit: 'Get a detailed report of your soil\'s nutrient status and recommendations on fertilizer dosage.',
                eligibility: 'All farmers.',
                applyProcess: ['Contact your local agriculture office or Krishi Vigyan Kendra.', 'They will collect soil samples from your farm.', 'You will receive the card with recommendations.'],
                link: 'https://soilhealth.dac.gov.in/'
            },
            {
                title: 'Subsidy on Agricultural Machinery (SMAM)',
                benefit: 'Receive subsidies for purchasing modern agricultural equipment like tractors, tillers, and harvesters.',
                eligibility: 'Farmers, Farmer Producer Organizations (FPOs).',
                applyProcess: ['Register on the Direct Benefit Transfer in Agriculture portal.', 'Select the machinery you want to buy.', 'Apply for the subsidy through the portal.'],
                link: 'https://agrimachinery.nic.in/'
            }
        ]
    }
];

export const MOCK_PRODUCE_LISTINGS = [
  { id: 1, name: 'Fresh Tomatoes', price: '₹35 / kg', quantity: '100 kg available', seller: 'Ram Singh', location: 'Nashik, Maharashtra', image: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, name: 'Organic Mangoes', price: '₹120 / kg', quantity: '50 kg available', seller: 'Sita Devi', location: 'Anantapur, AP', image: 'https://images.unsplash.com/photo-1591078381907-2c93541887a2?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, name: 'Basmati Rice', price: '₹80 / kg', quantity: '500 kg available', seller: 'Gurpreet Singh', location: 'Karnal, Haryana', image: 'https://images.unsplash.com/photo-1586512210048-a025ef34ebc2?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, name: 'Potatoes', price: '₹20 / kg', quantity: '250 kg available', seller: 'Lakshmi Patel', location: 'Indore, MP', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop' },
];

export const AVAILABLE_CONTRACTS: Contract[] = [
  { id: 1, title: 'Export Quality Grapes', buyerName: 'FreshFruit Exports', buyerVerified: true, crop: 'Grapes', quantity: '5 Tonnes', price: '₹60/kg', timeline: { startDate: '2025-09-01', endDate: '2026-03-31' }, status: 'Pending', fullText: 'This agreement is for the supply of 5 tonnes of export-quality, seedless Thompson grapes. Quality checks will be performed weekly. Payment will be made in two installments...', paymentStatus: 'Pending' },
  { id: 2, title: 'Organic Turmeric Supply', buyerName: 'SpiceCorp India', buyerVerified: true, crop: 'Turmeric', quantity: '2 Tonnes', price: '₹120/kg', timeline: { startDate: '2025-07-15', endDate: '2026-01-30' }, status: 'Pending', fullText: 'Seeking 2 tonnes of certified organic turmeric. Must meet curcumin content of 5% minimum. Buyer will provide organic certification assistance.', paymentStatus: 'Pending' },
  { id: 3, title: 'Bulk Potato for Chips', buyerName: 'SnackFoods Ltd.', buyerVerified: false, crop: 'Potatoes (Chipsona variety)', quantity: '20 Tonnes', price: '₹15/kg', timeline: { startDate: '2025-10-01', endDate: '2026-02-28' }, status: 'Pending', fullText: 'Contract for 20 tonnes of Chipsona variety potatoes. Size must be between 45mm and 90mm. Rejected potatoes will be returned at farmer\'s cost.', paymentStatus: 'Pending' },
];

export const MY_CONTRACTS: Contract[] = [
  { id: 4, title: 'Basmati Rice Agreement', buyerName: 'AgriPro Traders', buyerVerified: true, crop: 'Basmati Rice', quantity: '10 Tonnes', price: '₹75/kg', timeline: { startDate: '2024-06-01', endDate: '2024-12-15' }, status: 'Active', fullText: 'Supply of 10 tonnes of 1121 Pusa Basmati rice. Moisture content must be below 12%. Payment within 7 days of delivery.', paymentStatus: 'Pending' },
  { id: 5, title: 'Tomato Supply for Ketchup', buyerName: 'SauceMakers Pvt. Ltd.', buyerVerified: true, crop: 'Tomatoes', quantity: '15 Tonnes', price: '₹18/kg', timeline: { startDate: '2024-08-01', endDate: '2025-01-15' }, status: 'Harvesting', fullText: 'Contract for 15 tonnes of Roma variety tomatoes. Acidity level should be between 0.35 and 0.45.', paymentStatus: 'Paid' },
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
  { crop: "Tomato", price: "₹2,500 / quintal", market: "Nashik, MH", trend: "up" },
  { crop: "Onion", price: "₹1,800 / quintal", market: "Lasalgaon, MH", trend: "down" },
  { crop: "Potato", price: "₹1,500 / quintal", market: "Indore, MP", trend: "stable" },
  { crop: "Wheat", price: "₹2,200 / quintal", market: "Karnal, HR", trend: "up" },
  { crop: "Rice (Basmati)", price: "₹7,000 / quintal", market: "Karnal, HR", trend: "stable" },
  { crop: "Cotton", price: "₹6,800 / quintal", market: "Adilabad, TS", trend: "down" },
  { crop: "Soybean", price: "₹4,500 / quintal", market: "Indore, MP", trend: "up" },
];

export const MOCK_EXPERT_GUIDES: ExpertGuide[] = [
  { id: 1, title: 'Integrated Pest Management (IPM) for Cotton', category: 'Pest Control', summary: 'Learn how to control pests in your cotton crop using a mix of biological, cultural, and chemical methods to reduce reliance on pesticides.', thumbnail: 'https://images.unsplash.com/photo-1622383749436-646545445237?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, title: 'Drip Irrigation for Sugarcane Farming', category: 'Water Management', summary: 'Discover the benefits of drip irrigation for sugarcane, including water saving, increased yield, and reduced weed growth.', thumbnail: 'https://images.unsplash.com/photo-1598160223458-f41e5b02b54e?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, title: 'Improving Soil Health with Organic Manure', category: 'Soil Health', summary: 'A comprehensive guide to preparing and using organic manure like vermicompost and farmyard manure to enrich your soil naturally.', thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, title: 'Post-Harvest Management of Grains', category: 'Post-Harvest', summary: 'Best practices for drying, storing, and protecting your grain harvest to minimize losses and get the best market price.', thumbnail: 'https://images.unsplash.com/photo-1590124311024-3b2d5e67d4f9?q=80&w=2070&auto=format&fit=crop' },
];

export const STUDENT_FEATURES = [
  { title: 'Scholarships & Coaching', description: 'Find scholarships, free coaching, and study abroad info.', path: '/students/scholarships', Icon: ICONS.Student },
  { title: 'Resume & Cover Letter', description: 'AI-powered builder to create professional resumes.', path: '/students/resume-builder', Icon: ICONS.Worker },
  { title: 'Career Roadmaps', description: 'Get a personalized career path with AI guidance.', path: '/students/career-roadmaps', Icon: ICONS.Entrepreneur },
  { title: 'Personalized Learning Paths', description: 'AI-driven study plans tailored to your goals and skill level.', path: '/students/learning-paths', Icon: ICONS.PersonalizedPath },
  { title: 'Financial Management Tools', description: 'AI-powered budgeting, loan advice, and investment education.', path: '/students/financial-management', Icon: ICONS.FinancialManagement },
  { title: 'Coding & Development', description: 'Master LeetCode, GitHub, and build your profile.', path: '/students/coding-toolkit', Icon: ICONS.GitHub },
  { title: 'AI Doubt Solver', description: 'Get instant solutions to your academic questions.', path: '/students/doubt-solving', Icon: ICONS.Lightbulb },
  { title: 'Innovation Portal', description: 'Submit project ideas, get votes, and find funding.', path: '/students/project-ideas', Icon: ICONS.Trophy },
  { title: 'Student Earning Hub', description: 'Discover ways to earn, invest, and save money.', path: '/students/earning-hub', Icon: ICONS.Rupee },
  { title: 'Smart App Directory', description: 'A curated list of essential apps for students.', path: '/students/smart-apps', Icon: ICONS.Farmer },
  { title: 'Free Learning Hub', description: 'Access free courses from top Indian & global platforms.', path: '/students/free-resources', Icon: ICONS.Expert },
  { title: 'Internships & Placements', description: 'Your guide to landing top internships and jobs.', path: '/students/internships-placements', Icon: ICONS.MarketChat },
];

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  { id: 1, title: 'National Means-cum-Merit Scholarship', provider: 'Government of India', award: '₹12,000 per annum', eligibility: 'Class 8-10, Family income < ₹1.5 Lakh', deadline: '2025-10-31', link: 'https://scholarships.gov.in/' },
  { id: 2, title: 'AICTE Pragati Scholarship for Girls', provider: 'AICTE', award: '₹50,000 per annum + incidentals', eligibility: 'Girl students in AICTE approved Diploma/Degree courses', deadline: '2025-11-15', link: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati' },
  { id: 3, title: 'Reliance Foundation Scholarship', provider: 'Reliance Foundation', award: 'Up to ₹2,00,000', eligibility: 'Meritorious students from all streams', deadline: '2025-09-30', link: 'https://www.reliancefoundation.org/education/scholarships' },
];

export const REFERRAL_PARTNERS = [
  { name: 'NSRCEL IIMB', logo: 'https://upload.wikimedia.org/wikipedia/en/2/22/NSRCEL_logo.png' },
  { name: 'T-Hub', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/T-Hub_logo.png' },
  { name: 'Startup India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Startup_India_Logo.svg/1200px-Startup_India_Logo.svg.png' },
  { name: 'Y Combinator', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1200px-Y_Combinator_logo.svg.png' },
];

// Women Empowerment Constants
export const WOMEN_EMPOWERMENT_FEATURES = [
  { title: 'Safety & Legal Aid', description: 'Emergency helplines and legal support.', anchor: 'safety', Icon: ICONS.Shield },
  { title: 'Health & Wellness', description: 'Access to health schemes and information.', anchor: 'health', Icon: ICONS.HeartPlus },
  { title: 'Skilling & Career', description: 'Programs for skill development and jobs.', anchor: 'skilling', Icon: ICONS.Lightbulb },
  { title: 'Financial Independence', description: 'Schemes for financial support & literacy.', anchor: 'finance', Icon: ICONS.Rupee },
];

export const WOMEN_SAFETY_RESOURCES = [
  { title: 'Women Helpline Number', description: 'Dial 181 or 1091 for immediate assistance in any emergency situation across India.', link: 'tel:181' },
  { title: 'National Cybercrime Portal', description: 'Report online harassment, cyberstalking, or any other cybercrime safely and securely.', link: 'https://cybercrime.gov.in/' },
  { title: 'Protection of Women from Domestic Violence Act, 2005', description: 'Access legal protection against domestic violence. File a complaint via local police or protection officer.', link: 'https://www.indiacode.nic.in/handle/123456789/2034?sam_handle=123456789/1362' },
];

export const WOMEN_HEALTH_SCHEMES = [
  { title: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)', description: 'A maternity benefit program providing ₹5,000 to pregnant women for the first live birth.', link: 'https://pmmvy.wcd.gov.in/' },
  { title: 'Janani Shishu Suraksha Karyakram (JSSK)', description: 'Entitles pregnant women to free delivery, including caesarean section, and care for newborns in public health institutions.', link: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=225' },
  { title: 'Ayushman Bharat (PM-JAY)', description: 'Provides health insurance coverage of up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.', link: 'https://pmjay.gov.in/' },
];

export const WOMEN_SKILLING_PROGRAMS = [
  { title: 'Skill India Mission', description: 'Access various government-led skill training programs to enhance employability in multiple sectors.', link: 'https://www.skillindia.gov.in/' },
  { title: 'National Skill Development Corporation (NSDC)', description: 'Explore a wide range of skill development courses and find training centers near you.', link: 'https://nsdcindia.org/' },
  { title: 'Support to Training and Employment Programme for Women (STEP)', description: 'A scheme to provide skills that give employability to women and to provide competencies and skill that enable women to become self-employed/entrepreneurs.', link: 'https://wcd.nic.in/schemes/support-training-and-employment-programme-women-step' },
];

export const WOMEN_FINANCIAL_SCHEMES = [
  { title: 'Pradhan Mantri Ujjwala Yojana', description: 'Provides deposit-free LPG connections to women from BPL households, promoting clean cooking fuel.', link: 'https://www.pmuy.gov.in/' },
  { title: 'Mahila Samman Savings Certificate', description: 'A small savings scheme for women offering an attractive interest rate for a two-year tenure.', link: 'https://www.indiapost.gov.in/Financial/Pages/Content/Mahila-Samman-Saving-Certificate.aspx' },
  { title: 'Stand-Up India Scheme', description: 'Facilitates bank loans between ₹10 lakh and ₹1 Crore to at least one SC/ST borrower and at least one woman borrower per bank branch for setting up a greenfield enterprise.', link: 'https://www.standupmitra.in/' },
];

// Internships & Placements Data
export const INTERNSHIPS = {
    "Tech & Software": [
        { company: "Google India", eligibility: "STEP: 1st/2nd yr Bachelors (women); SWE: Pursuing CS/related", period: "Aug–Dec", stipend: "70,000–2,00,000", link: "https://www.google.com/about/careers/applications/students/" },
        { company: "Microsoft India", eligibility: "Bachelors/Masters in CS/Engg, 1 sem. left post-intern", period: "Sept–Dec", stipend: "80,000–1,00,000", link: "https://careers.microsoft.com/v2/global/en/students-and-graduates.html" },
        { company: "Amazon India", eligibility: "Bachelors/Masters (CS, Data, Engg.), programming", period: "Oct–Dec", stipend: "50,000–1,50,000", link: "https://www.amazon.jobs/en/business_categories/student-programs" },
        { company: "Meta (Facebook)", eligibility: "Bachelor’s/Master’s: CS, Data, Engg.", period: "Aug–Oct", stipend: "55,000–2,00,000", link: "https://www.metacareers.com/students" },
    ],
    "Finance, Consulting, & Management": [
        { company: "Goldman Sachs", eligibility: "Pre-final yr UG/PG", period: "Sept–Dec", stipend: "80,000–1,50,000", link: "https://www.goldmansachs.com/careers/students/" },
        { company: "JP Morgan Chase", eligibility: "Bachelor’s/Master’s/MBA", period: "Aug–Dec", stipend: "60,000–1,00,000", link: "https://careers.jpmorgan.com/global/en/students" },
    ],
    "Government & PSU": [
        { company: "NITI Aayog", eligibility: "UG/PG/PhD students, Indian", period: "Monthly", stipend: "None/Unpaid", link: "https://www.niti.gov.in/internship" },
        { company: "RBI", eligibility: "PG in Econ/Finance/Law", period: "Oct–Jan", stipend: "20,000–35,000", link: "https://opportunities.rbi.org.in/" },
    ],
};

export const POPULAR_INTERNSHIPS = [
    { company: 'Goldman Sachs', program: 'Summer Analyst Program', eligibility: '3rd-year students', period: 'July', stipend: '₹1,00,000/month', link: 'https://www.goldmansachs.com/careers/students/' },
    { company: 'JP Morgan', program: 'Code for Good', eligibility: '2nd-year students', period: 'Feb–Mar 2025', stipend: '₹80,000–₹90,000/month', link: 'https://careers.jpmorgan.com/in/en/students/programs/code-for-good' },
    { company: 'Flipkart', program: 'Flipkart Grid & Runway', eligibility: '2nd/3rd-year students', period: 'Varies', stipend: '₹1,00,000/month', link: 'https://www.flipkartcareers.com/#!/service/campus' },
    { company: 'Amazon', program: 'Amazon WoW & Regular Hiring', eligibility: '1st to 3rd-year', period: 'Varies', stipend: 'Up to ₹1,25,000/month', link: 'https://www.amazon.jobs/en/teams/student-programs' },
];

export const PLACEMENTS = [
    { company: "TCS", link: "https://prepinsta.com/tcs-codevita/registration-process/" },
    { company: "Infosys", link: "https://www.infosys.com/careers/hackwithinfy.html" },
    { company: "Myntra", link: "https://unstop.com/hackathons/myntra-hackerramp-weforshe-2024-myntra-1025692" },
    { company: "Flipkart", link: "https://unstop.com/hackathons/flipkart-grid-60-software-development-track-flipkart-grid-60-flipkart-1024247" },
    { company: "Goldman Sachs", link: "https://www.goldmansachs.com/careers/students/programs-and-internships" },
];

// FIX: Completed the truncated project object and added one more for completeness.
export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI-Powered Crop Disease Detection",
    description: "A mobile app for farmers to instantly diagnose crop diseases by taking a photo, helping reduce crop loss and promote sustainable farming.",
    problemStatement: "Farmers in rural areas lack quick and affordable access to expert agricultural advice, leading to significant crop loss due to preventable diseases and pests.",
    objectives: "Develop an AI model to identify common crop diseases from images with >95% accuracy. Create a user-friendly mobile app for easy access.",
    technologies: ["TensorFlow Lite", "Flutter", "Python", "Firebase"],
    expectedOutcomes: "A freely available app that reduces diagnosis time from days to seconds, potentially increasing crop yield by 15-20% for its users.",
    category: 'Agri',
    fundingNeeded: 75000,
    votes: 128,
    status: 'top_voted',
    team: [{ fullName: 'Rohan Verma', institution: 'IIT Bombay', academicYear: '3rd Year', course: 'Computer Science', email: 'rohan@iitb.ac.in', phone: '9876543210' }]
  },
  {
    id: 2,
    title: "Smart Wearable for Elderly Health",
    description: "A low-cost wristband that monitors vital signs (heart rate, SpO2) and detects falls in senior citizens, sending instant alerts to caregivers.",
    problemStatement: "Elderly individuals living alone are at high risk of unassisted falls or health emergencies. Existing solutions are often expensive or require complex setups.",
    objectives: "Design a comfortable, low-power wearable device. Develop an algorithm for accurate fall detection. Create a mobile app for caregivers to receive real-time alerts.",
    technologies: ["Arduino/ESP32", "IoT", "React Native", "Firebase"],
    expectedOutcomes: "A functional prototype that can reliably detect falls and send alerts within 10 seconds, offered at a price point below ₹2000.",
    category: 'Health',
    fundingNeeded: 50000,
    votes: 95,
    status: 'under_review',
    team: [{ fullName: 'Priya Singh', institution: 'NIT Warangal', academicYear: '4th Year', course: 'Electronics & Comm.', email: 'priya@nitw.ac.in', phone: '9123456789' }]
  },
  {
    id: 3,
    title: "Vernacular Language Financial Literacy App",
    description: "An app that teaches complex financial concepts like mutual funds, insurance, and taxes in simple, regional Indian languages using interactive stories.",
    problemStatement: "Financial literacy is critically low in many parts of India, especially in non-English speaking regions, making people vulnerable to scams and poor financial decisions.",
    objectives: "Create engaging, gamified content in 5 regional languages. Develop voice-over support for users with low literacy. Integrate simple budgeting tools.",
    technologies: ["Flutter", "Node.js", "MongoDB", "Google Text-to-Speech"],
    expectedOutcomes: "An app that improves financial understanding for 10,000+ users in its first year, with measurable improvements in their saving and investment habits.",
    category: 'Social',
    fundingNeeded: 60000,
    votes: 82,
    status: 'under_review',
    team: [{ fullName: 'Ankit Kumar', institution: 'Delhi University', academicYear: '2nd Year', course: 'Commerce', email: 'ankit@du.ac.in', phone: '9988776655' }]
  }
];

// ADD: Added missing constants for Earning Hub, Free Resources, and Smart Apps pages.

// --- Earning Hub Constants ---
export const EARNING_METHODS: EarningMethod[] = [
    { title: 'Freelancing', description: 'Offer skills like writing, design, or coding.', earnings: ['₹500-₹5000 per project'], platforms: [{ name: 'Fiverr', link: 'https://fiverr.com' }, { name: 'Upwork', link: 'https://upwork.com' }], videos: [{ title: 'Freelancing Guide', link: 'https://www.youtube.com/watch?v=a-d52s9F-fM' }] },
    { title: 'Content Creation', description: 'Start a YouTube channel or Instagram page on a topic you love.', earnings: ['Ad revenue', 'Brand deals'], tools: [{ name: 'Canva', link: 'https://canva.com' }], videos: [{ title: 'YT Creator Academy', link: 'https://www.youtube.com/user/creatoracademy' }] },
    { title: 'Online Tutoring', description: 'Teach subjects you excel at to school students.', earnings: ['₹300-₹1000 per hour'], platforms: [{ name: 'Chegg', link: 'https://chegg.com' }, { name: 'Vedantu', link: 'https://vedantu.com' }], videos: [{ title: 'Online Tutoring Tips', link: 'https://www.youtube.com/watch?v=FwRma4-I22M' }] },
];
export const REFERRAL_APPS: ReferralApp[] = [
    { name: 'Google Pay', referralEarnings: '₹101 per referral', link: 'https://pay.google.com/' },
    { name: 'PhonePe', referralEarnings: '₹100 cashback', link: 'https://www.phonepe.com/' },
    { name: 'Upstox', referralEarnings: '₹200-₹500 per account', link: 'https://upstox.com/' },
];
export const CASHBACK_APPS: CashbackApp[] = [
    { name: 'CashKaro', rewards: ['Up to 10% cashback on Amazon, Myntra', 'Exclusive coupons'], referral: ['10% of friend\'s cashback for life'], downloadLink: 'https://cashkaro.com/' },
    { name: 'CRED', rewards: ['Pay credit card bills & earn points', 'Exclusive brand deals'], referral: ['Varies, often cashback or gems'], downloadLink: 'https://cred.club/' },
];
export const CRYPTO_APPS: CryptoApp[] = [
    { name: 'WazirX', price: '₹14.5', marketCap: '₹5.5B', supply: '381.8M', predictions: ['Potential for growth with Indian market adoption'], downloadLink: 'https://wazirx.com/' },
    { name: 'CoinSwitch Kuber', price: 'N/A', marketCap: 'N/A', supply: 'N/A', predictions: ['User-friendly platform, good for beginners'], downloadLink: 'https://coinswitch.co/' },
];
export const STUDENT_BANK_ACCOUNTS: StudentBankAccount[] = [
    { bank: 'SBI Student Account', features: ['Zero balance', 'Free debit card', 'Internet banking'], link: 'https://sbi.co.in/' },
    { bank: 'ICICI Bank Campus Power', features: ['Zero balance option', 'Discounts on partner brands'], link: 'https://www.icicibank.com/' },
];
export const STUDENT_LOANS: StudentLoanOffer[] = [
    { provider: 'SBI Student Loan', highlights: 'Low interest, long moratorium', link: 'https://sbi.co.in/web/personal-banking/loans/education-loans' },
    { provider: 'HDFC Bank Education Loan', highlights: 'Quick processing, up to 100% financing', link: 'https://www.hdfcbank.com/personal/borrow/popular-loans/educational-loan' },
];
export const STUDENT_CARDS: StudentCard[] = [
    { card: 'SBI Student Plus Credit Card', features: ['No income proof required', 'Reward points on spending'], link: 'https://www.sbicard.com/en/personal/credit-cards/lifestyle/sbi-student-plus-advantage-card.page' },
    { card: 'ICICI Bank Student Forex Card', features: ['Multi-currency loading', 'Insurance cover'], link: 'https://www.icicibank.com/personal-banking/cards/prepaid-card/student-forex-prepaid-card' },
];
export const STUDENT_DEALS: StudentDeal[] = [
    { platform: 'UNiDAYS', offer: 'Discounts on Apple, HP, Myntra', link: 'https://www.myunidays.com/' },
    { platform: 'StudentBeans', offer: 'Exclusive deals on food, fashion, tech', link: 'https://www.studentbeans.com/' },
];

// --- Free Resources Constants ---
export const INDIAN_GOV_PLATFORMS: PlatformInfo[] = [
    { name: 'SWAYAM', website: 'https://swayam.gov.in/', about: 'Free online courses by top Indian universities, IITs, IIMs.', courses: 'Engineering, Humanities, Management' },
    { name: 'NPTEL', website: 'https://nptel.ac.in/', about: 'Largest online repository of courses in Engineering, Basic Sciences by IITs & IISc.', courses: 'All Engineering, CS, Physics' },
];
export const GLOBAL_PLATFORMS: PlatformInfo[] = [
    { name: 'Coursera', website: 'https://www.coursera.org/', about: 'Courses, specializations, and degrees from top universities and companies.', highlights: '7000+ free courses available' },
    { name: 'edX', website: 'https://www.edx.org/', about: 'Founded by Harvard and MIT, offers university-level courses.', highlights: 'Audit courses for free' },
];
export const CODING_PLATFORMS: PlatformInfo[] = [
    { name: 'freeCodeCamp', website: 'https://www.freecodecamp.org/', about: 'Learn to code for free with certifications.' },
    { name: 'LeetCode', website: 'https://leetcode.com/', about: 'Practice coding problems for technical interviews.' },
];
export const SOFT_SKILLS_PLATFORMS: PlatformInfo[] = [
    { name: 'TCS iON Career Edge', website: 'https://learning.tcsionhub.in/courses/career-edge/', about: '15-day free course on communication, presentation, and interview skills.' },
];
export const EXAM_PREP_PLATFORMS: PlatformInfo[] = [
    { name: 'Unacademy', website: 'https://unacademy.com/', about: 'Offers free live classes for various competitive exams.' },
];
export const TEACHER_PLATFORMS: PlatformInfo[] = [
    { name: 'DIKSHA', website: 'https://diksha.gov.in/', about: 'National platform for school education with resources for teachers.' },
];
export const JOB_PORTALS: PlatformInfo[] = [
    { name: 'Naukri.com', website: 'https://www.naukri.com/', about: 'India\'s largest job portal.' },
    { name: 'LinkedIn', website: 'https://www.linkedin.com/jobs/', about: 'Professional networking and job search.' },
];
export const LEARNING_ARTICLES: Article[] = [
    { id: 1, title: 'How to Learn Anything Faster', content: ['Use the Feynman Technique', 'Practice Active Recall', 'Space out your learning sessions'] },
];

// --- Smart Apps Constants ---
export const GOVERNMENT_APPS: Record<string, SmartApp[]> = {
    'Digital Identity & Docs': [{ name: 'DigiLocker', purpose: 'Digital document wallet', appLink: 'https://www.digilocker.gov.in/' }],
    'Services & Utilities': [{ name: 'UMANG', purpose: 'Unified Mobile Application for New-age Governance', appLink: 'https://web.umang.gov.in/' }],
};
export const UTILITY_APPS: SmartApp[] = [
    { name: 'Google Maps', purpose: 'Navigation and transport', appLink: 'https://www.google.com/maps' },
];
export const EDUCATIONAL_APPS_LIST: SmartApp[] = [
    { name: 'Khan Academy', purpose: 'Free online learning', appLink: 'https://www.khanacademy.org/' },
];
export const YOUTH_APPS: SmartApp[] = [
    { name: 'LinkedIn', purpose: 'Professional networking and career building', appLink: 'https://www.linkedin.com/' },
];
export const WOMEN_APPS: SmartApp[] = [
    { name: '181 Women Helpline', purpose: 'Emergency helpline for women', appLink: 'https://www.nhp.gov.in/women-helpline-scheme_pg' },
];
export const ENVIRONMENT_APPS: SmartApp[] = [
    { name: 'Sameer', purpose: 'Air quality monitoring by CPCB', appLink: 'https://cpcb.nic.in/SAMEER-app.php' },
];
