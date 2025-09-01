

import React from 'react';
import type { 
  Contract, MarketPrice, ExpertGuide, Scholarship, ScholarshipDetail, 
  AbroadScholarship, EducationLoan, CounselingCenter, VisaStep, EarningMethod, CashbackApp, 
  CryptoApp, StudentBankAccount, StudentLoanOffer, StudentCard, StudentDeal, ReferralApp, Project,
  PlatformInfo, Article, SmartApp, EducationResource, Update, Offer
} from './types';

export const NAV_LINKS = [
  { key: 'home', path: '/' },
  { key: 'updates', path: '/updates'},
  { key: 'offers', path: '/offers' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
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
  Updates: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
    </svg>
  ),
  Offers: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
    </svg>
  ),
};

export const SECTIONS = [
  { key: 'students', path: '/students', Icon: ICONS.Student },
  { key: 'women', path: '/women-empowerment', Icon: ICONS.Women },
  { key: 'farmers', path: '/farmers', Icon: ICONS.Farmer },
  { key: 'workers', path: '/workers', Icon: ICONS.Worker },
  { key: 'seniors', path: '/senior-citizens', Icon: ICONS.Senior },
  { key: 'entrepreneurs', path: '/entrepreneurs', Icon: ICONS.Entrepreneur },
];

export const FARMER_FEATURES = [
  { titleKey: 'features.farmer.cropDoctor.title', descriptionKey: 'features.farmer.cropDoctor.description', path: '/farmers/crop-doctor', Icon: ICONS.Farmer },
  { titleKey: 'features.farmer.marketAccess.title', descriptionKey: 'features.farmer.marketAccess.description', path: '/farmers/direct-market', Icon: ICONS.MarketChat },
  { titleKey: 'features.farmer.fertilizer.title', descriptionKey: 'features.farmer.fertilizer.description', path: '/farmers/fertilizer-optimizer', Icon: ICONS.Lightbulb },
  { titleKey: 'features.farmer.contractFarming.title', descriptionKey: 'features.farmer.contractFarming.description', path: '/farmers/contract-farming', Icon: ICONS.Worker },
  { titleKey: 'features.farmer.weatherAlerts.title', descriptionKey: 'features.farmer.weatherAlerts.description', path: '/farmers/weather-alerts', Icon: ICONS.Rupee },
  { titleKey: 'features.farmer.cropRecommender.title', descriptionKey: 'features.farmer.cropRecommender.description', path: '/farmers/crop-recommendation', Icon: ICONS.Student },
  { titleKey: 'features.farmer.financialNeeds.title', descriptionKey: 'features.farmer.financialNeeds.description', path: '/farmers/financial-needs', Icon: ICONS.HeartPlus },
  { titleKey: 'features.farmer.expertGuides.title', descriptionKey: 'features.farmer.expertGuides.description', path: '/farmers/expert-guides', Icon: ICONS.Expert },
  { titleKey: 'features.farmer.marketPrices.title', descriptionKey: 'features.farmer.marketPrices.description', path: '/farmers/market-prices', Icon: ICONS.Entrepreneur },
];


export const CATEGORIZED_SCHEMES = [
    {
        categoryKey: 'data.schemes.incomeSupport.category',
        schemes: [
            {
                title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
                benefitKey: 'data.schemes.incomeSupport.pmkisan.benefit',
                eligibilityKey: 'data.schemes.incomeSupport.pmkisan.eligibility',
                applyProcessKeys: [
                    'data.schemes.incomeSupport.pmkisan.apply1',
                    'data.schemes.incomeSupport.pmkisan.apply2',
                    'data.schemes.incomeSupport.pmkisan.apply3',
                    'data.schemes.incomeSupport.pmkisan.apply4',
                ],
                link: 'https://pmkisan.gov.in/'
            },
            {
                title: 'Kisan Credit Card (KCC)',
                benefitKey: 'data.schemes.incomeSupport.kcc.benefit',
                eligibilityKey: 'data.schemes.incomeSupport.kcc.eligibility',
                applyProcessKeys: [
                    'data.schemes.incomeSupport.kcc.apply1',
                    'data.schemes.incomeSupport.kcc.apply2',
                    'data.schemes.incomeSupport.kcc.apply3',
                ],
                link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-finance/kisan-credit-card'
            }
        ]
    },
    {
        categoryKey: 'data.schemes.cropInsurance.category',
        schemes: [
            {
                title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
                benefitKey: 'data.schemes.cropInsurance.pmfby.benefit',
                eligibilityKey: 'data.schemes.cropInsurance.pmfby.eligibility',
                applyProcessKeys: [
                    'data.schemes.cropInsurance.pmfby.apply1',
                    'data.schemes.cropInsurance.pmfby.apply2',
                    'data.schemes.cropInsurance.pmfby.apply3',
                ],
                link: 'https://pmfby.gov.in/'
            }
        ]
    },
    {
        categoryKey: 'data.schemes.fertilizers.category',
        schemes: [
            {
                title: 'Soil Health Card Scheme',
                benefitKey: 'data.schemes.fertilizers.soilHealth.benefit',
                eligibilityKey: 'data.schemes.fertilizers.soilHealth.eligibility',
                applyProcessKeys: [
                    'data.schemes.fertilizers.soilHealth.apply1',
                    'data.schemes.fertilizers.soilHealth.apply2',
                    'data.schemes.fertilizers.soilHealth.apply3',
                ],
                link: 'https://soilhealth.dac.gov.in/'
            },
            {
                title: 'Subsidy on Agricultural Machinery (SMAM)',
                benefitKey: 'data.schemes.fertilizers.smam.benefit',
                eligibilityKey: 'data.schemes.fertilizers.smam.eligibility',
                applyProcessKeys: [
                    'data.schemes.fertilizers.smam.apply1',
                    'data.schemes.fertilizers.smam.apply2',
                    'data.schemes.fertilizers.smam.apply3',
                ],
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

// FIX: Added missing properties to the Contract object to match the type definition.
export const AVAILABLE_CONTRACTS: Contract[] = [
  { 
    id: 1, 
    title: 'Export Quality Basmati Rice', 
    buyerName: 'Global Grains Pvt. Ltd.', 
    buyerVerified: true, 
    crop: 'Basmati Rice',
    quantity: '100 Tonnes', 
    price: '₹7,500 / quintal', 
    timeline: { startDate: '2024-09-01', endDate: '2025-01-30' },
    status: 'Pending',
    fullText: 'This agreement is for the supply of 100 tonnes of Grade A export quality Basmati rice. Payment will be made in two installments...',
    paymentStatus: 'Pending'
  },
  { 
    id: 2, 
    title: 'Organic Turmeric Supply', 
    buyerName: 'Healthy Spices Co.', 
    buyerVerified: true, 
    crop: 'Turmeric',
    quantity: '20 Tonnes', 
    price: '₹8,000 / quintal', 
    timeline: { startDate: '2024-10-15', endDate: '2025-03-15' },
    status: 'Pending',
    fullText: 'Contract for 20 tonnes of certified organic turmeric. Buyer will provide quality testing support.',
    paymentStatus: 'Pending'
  },
  { 
    id: 3, 
    title: 'Fresh Mangoes for Pulp', 
    buyerName: 'Juicy Foods Ltd.', 
    buyerVerified: false, 
    crop: 'Mangoes (Totapuri)',
    quantity: '50 Tonnes', 
    price: '₹25 / kg', 
    timeline: { startDate: '2025-05-01', endDate: '2025-06-30' },
    status: 'Pending',
    fullText: 'Agreement for the supply of 50 tonnes of Totapuri mangoes suitable for pulp processing.',
    paymentStatus: 'Pending'
  },
];

// START: ADDED MISSING CONSTANTS

export const MY_CONTRACTS: Contract[] = [
    { 
        id: 101, 
        title: 'High-Grade Cotton Supply', 
        buyerName: 'National Textiles', 
        buyerVerified: true, 
        crop: 'Cotton',
        quantity: '50 Tonnes', 
        price: '₹6,000 / quintal', 
        timeline: { startDate: '2024-03-01', endDate: '2024-08-30' },
        status: 'Active',
        fullText: 'This is an active contract for 50 tonnes of high-grade cotton. First quality check is due next month.',
        paymentStatus: 'Pending'
    },
    { 
        id: 102, 
        title: 'Wheat for Local Mill', 
        buyerName: 'Annapurna Flour Mill', 
        buyerVerified: true, 
        crop: 'Wheat',
        quantity: '200 Tonnes', 
        price: '₹2,200 / quintal', 
        timeline: { startDate: '2024-01-10', endDate: '2024-05-20' },
        status: 'Completed',
        fullText: 'Completed contract for 200 tonnes of wheat. Final payment received.',
        paymentStatus: 'Paid'
    }
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
  { crop: 'Tomato', price: '₹32 / kg', market: 'Nashik Mandi', trend: 'up' },
  { crop: 'Onion', price: '₹25 / kg', market: 'Lasalgaon Mandi', trend: 'stable' },
  { crop: 'Potato', price: '₹20 / kg', market: 'Indore Mandi', trend: 'down' },
  { crop: 'Wheat', price: '₹2100 / quintal', market: 'Karnal Mandi', trend: 'stable' },
  { crop: 'Cotton', price: '₹6500 / quintal', market: 'Adilabad Mandi', trend: 'up' },
];

export const MOCK_EXPERT_GUIDES: ExpertGuide[] = [
  { id: 1, title: 'Mastering Drip Irrigation', category: 'Water Management', summary: 'Learn how to set up and maintain a drip irrigation system for maximum water efficiency and crop yield.', thumbnail: 'https://images.unsplash.com/photo-1549558729-6d649a35871b?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, title: 'Organic Pest Control', category: 'Sustainable Farming', summary: 'A complete guide to using natural methods to control pests and diseases without chemical pesticides.', thumbnail: 'https://images.unsplash.com/photo-1621160219148-52758352b027?q=80&w=2070&auto=format&fit=crop' },
  { id: 3, title: 'Soil Health & Composting', category: 'Soil Management', summary: 'Understand the basics of soil health and how to create nutrient-rich compost at home.', thumbnail: 'https://images.unsplash.com/photo-1617153293838-5a3d5b0d9e9f?q=80&w=2070&auto=format&fit=crop' },
];

export const UPDATE_CATEGORIES = ['All', 'Students', 'Women', 'Farmers', 'Workers', 'Seniors', 'Entrepreneurs', 'General'];

export const MOCK_UPDATES: Update[] = [
    {
        id: 1,
        category: 'General',
        title: 'New "One Nation, One ID" Program Announced',
        summary: 'The central government has announced a new initiative to consolidate various citizen IDs into a single digital identity, aimed at simplifying access to services.',
        date: '2 hours ago',
        pinned: true,
        link: '#',
    },
    {
        id: 2,
        category: 'Students',
        title: 'National Scholarship Portal (NSP) Deadline Extended to Dec 31st',
        summary: 'The deadline for applying to various central government scholarships on the NSP has been extended. Students are advised to complete their applications soon.',
        date: '1 day ago',
        pinned: true,
        link: 'https://scholarships.gov.in/',
    },
    {
        id: 3,
        category: 'Farmers',
        title: 'PM-KISAN 19th Installment to be Released Next Week',
        summary: 'The next installment of the Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) scheme will be credited to eligible farmers\' accounts starting next week.',
        date: '3 days ago',
        link: '#',
    },
    {
        id: 4,
        category: 'Women',
        title: 'New Training Program for Women in Tech Launched',
        summary: 'The Ministry of Women and Child Development has launched "Tech Shakti," a new program to provide free coding and AI training to 50,000 women across India.',
        date: '4 days ago',
        link: '#',
    },
    {
        id: 5,
        category: 'Workers',
        title: 'E-Shram Card Holders to Get Additional Insurance Benefits',
        summary: 'The government has announced an enhancement of insurance coverage under the E-Shram scheme for unorganized sector workers.',
        date: '5 days ago',
        link: '#',
    },
    {
        id: 6,
        category: 'Entrepreneurs',
        title: 'Startup India Announces "Seed Fund Scheme 2.0"',
        summary: 'Applications are now open for the second phase of the Startup India Seed Fund Scheme, offering up to ₹50 lakhs for innovative early-stage startups.',
        date: '1 week ago',
        link: 'https://www.startupindia.gov.in/',
    },
    {
        id: 7,
        category: 'Seniors',
        title: 'Digital Literacy Camps for Senior Citizens to be Held in Major Cities',
        summary: 'The Ministry of Social Justice and Empowerment will organize camps to help senior citizens learn how to use smartphones and digital payment apps.',
        date: '1 week ago',
        link: '#',
    }
];

export const OFFER_CATEGORIES = ['All', 'Students', 'Women', 'Farmers', 'Workers', 'Seniors', 'Entrepreneurs', 'General'];

export const MOCK_OFFERS: Offer[] = [
  {
    id: 1,
    category: 'Students',
    title: 'GitHub Student Developer Pack',
    provider: 'GitHub Education',
    description: 'Get free access to over 100 premium developer tools, including Canva Pro, Heroku, Notion, and free domains.',
    eligibility: 'Verified students aged 13+',
    redeemMethod: 'Apply with your student ID or college email.',
    expiry: 'While you are a student',
    link: 'https://education.github.com/pack',
    type: 'Freebie',
  },
  {
    id: 2,
    category: 'Entrepreneurs',
    title: 'Free AWS Credits for Startups',
    provider: 'Amazon Web Services',
    description: 'Get up to $1,000 in free AWS cloud credits for your new startup through the AWS Activate program.',
    eligibility: 'Early-stage, unfunded startups.',
    redeemMethod: 'Apply on the AWS Activate portal.',
    expiry: 'Limited time offer',
    link: 'https://aws.amazon.com/activate/',
    type: 'Grant',
  },
  {
    id: 3,
    category: 'Farmers',
    title: 'Fertilizer Subsidy under PM-PRANAM',
    provider: 'Govt. of India',
    description: 'Receive subsidies on various fertilizers to reduce the cost of farming inputs and promote balanced nutrient application.',
    eligibility: 'All eligible farmers.',
    redeemMethod: 'Automatically applied at point of sale via PoS devices.',
    link: 'https://pib.gov.in/PressReleasePage.aspx?PRID=1936054',
    type: 'Subsidy',
  },
  {
    id: 4,
    category: 'Women',
    title: 'Mudra Yojana Loans for Women Entrepreneurs',
    provider: 'Govt. of India',
    description: 'Access collateral-free loans up to ₹10 lakh to start or expand your small business under the Pradhan Mantri Mudra Yojana.',
    eligibility: 'Women entrepreneurs with a viable business plan.',
    redeemMethod: 'Apply at your nearest bank or financial institution.',
    link: 'https://www.mudra.org.in/',
    type: 'Info',
  },
  {
    id: 5,
    category: 'Seniors',
    title: 'Senior Citizen Train Ticket Concession',
    provider: 'Indian Railways (IRCTC)',
    description: 'Eligible senior citizens can avail concessions on base fares for all classes of Mail/Express/Rajdhani/Shatabdi/Jan Shatabdi/Duronto group of trains.',
    eligibility: 'Men aged 60+ and women aged 58+.',
    redeemMethod: 'Provide proof of age while booking tickets.',
    link: 'https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304,366,537,1090',
    type: 'Deal',
  },
  {
    id: 6,
    category: 'Workers',
    title: 'Free Skill Training under PMKVY',
    provider: 'Skill India (PMKVY)',
    description: 'Enroll in free short-term skill training programs across various sectors to improve employability and earn a government-recognized certificate.',
    eligibility: 'Indian nationals, especially unemployed youth.',
    redeemMethod: 'Find and enroll in a training center near you.',
    link: 'https://www.pmkvyofficial.org/',
    type: 'Freebie',
  }
];

export const STUDENT_FEATURES = [
  { titleKey: 'features.student.scholarships.title', descriptionKey: 'features.student.scholarships.description', path: '/students/scholarships', Icon: ICONS.Student },
  { titleKey: 'features.student.resume.title', descriptionKey: 'features.student.resume.description', path: '/students/resume-builder', Icon: ICONS.Trophy },
  { titleKey: 'features.student.roadmaps.title', descriptionKey: 'features.student.roadmaps.description', path: '/students/career-roadmaps', Icon: ICONS.PersonalizedPath },
  { titleKey: 'features.student.learningPaths.title', descriptionKey: 'features.student.learningPaths.description', path: '/students/learning-paths', Icon: ICONS.PersonalizedPath },
  { titleKey: 'features.student.financialManagement.title', descriptionKey: 'features.student.financialManagement.description', path: '/students/financial-management', Icon: ICONS.FinancialManagement },
  { titleKey: 'features.student.coding.title', descriptionKey: 'features.student.coding.description', path: '/students/coding-toolkit', Icon: ICONS.GitHub },
  { titleKey: 'features.student.doubtSolver.title', descriptionKey: 'features.student.doubtSolver.description', path: '/students/doubt-solving', Icon: ICONS.Lightbulb },
  { titleKey: 'features.student.innovation.title', descriptionKey: 'features.student.innovation.description', path: '/students/project-ideas', Icon: ICONS.Upvote },
  { titleKey: 'features.student.earning.title', descriptionKey: 'features.student.earning.description', path: '/students/earning-hub', Icon: ICONS.EarningChat },
  { titleKey: 'features.student.smartApps.title', descriptionKey: 'features.student.smartApps.description', path: '/students/smart-apps', Icon: ICONS.GovtApps },
  { titleKey: 'features.student.freeLearning.title', descriptionKey: 'features.student.freeLearning.description', path: '/students/free-resources', Icon: ICONS.Expert },
  { titleKey: 'features.student.internships.title', descriptionKey: 'features.student.internships.description', path: '/students/internships-placements', Icon: ICONS.Worker },
];

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
    { id: 1, title: 'National Talent Search Examination (NTSE)', provider: 'NCERT', award: '₹1250/month', eligibility: 'Class 10 students', deadline: 'Varies by State', link: 'https://ncert.nic.in/ntse.php' },
    { id: 2, title: 'INSPIRE Scholarship', provider: 'DST, Govt. of India', award: '₹80,000/year', eligibility: 'Top 1% in Class 12 Boards', deadline: 'Oct 31, 2024', link: 'https://www.online-inspire.gov.in/' },
    { id: 3, title: 'Reliance Foundation Scholarship', provider: 'Reliance Foundation', award: 'Up to ₹2,00,000', eligibility: 'Meritorious students from all streams', deadline: 'Dec 15, 2024', link: 'https://www.reliancefoundation.org/scholarships' },
];

export const MOCK_PROJECTS: Project[] = [
    { id: 1, title: 'AI-Powered Crop Disease Detection App', description: 'An app that allows farmers to take a picture of a crop and get an instant diagnosis of any diseases, along with treatment advice.', problemStatement: "Farmers in rural areas lack quick access to experts for identifying crop diseases, leading to significant losses.", objectives: "Develop a mobile app with a user-friendly interface. Train a machine learning model to identify at least 10 common crop diseases. Provide actionable treatment suggestions.", technologies: ['Python', 'TensorFlow', 'React Native', 'Firebase'], expectedOutcomes: 'A functional mobile app that can correctly identify crop diseases with over 90% accuracy.', category: 'Agri', fundingNeeded: 50000, votes: 128, status: 'top_voted', team: [{ fullName: 'Riya Sharma', institution: 'IIT Delhi', academicYear: '3rd Year', course: 'Computer Science', email: 'riya@iitd.ac.in', phone: '1234567890' }] },
    { id: 2, title: 'Hyperlocal Job Portal for Daily Wage Workers', description: 'A platform connecting daily wage laborers (plumbers, electricians, construction workers) with local employers for short-term jobs.', problemStatement: "Unorganized laborers struggle to find consistent work, and local residents find it hard to hire verified workers for small tasks.", objectives: "Create a simple, multilingual web and mobile platform. Implement a rating and verification system. Facilitate payments through UPI.", technologies: ['Node.js', 'React', 'MongoDB', 'Twilio'], expectedOutcomes: "A platform with at least 500 active workers and 1000 users in a pilot city within 6 months.", category: 'Social', fundingNeeded: 80000, votes: 95, status: 'under_review', team: [{ fullName: 'Amit Patel', institution: 'NIT Warangal', academicYear: 'Final Year', course: 'Civil Engineering', email: 'amit@nitw.ac.in', phone: '1234567890' }] },
    { id: 3, title: 'Low-Cost Water Purifier for Rural Homes', description: 'A sustainable and affordable water purification system using locally sourced materials like sand, charcoal, and clay.', problemStatement: "Access to clean drinking water is a major challenge in many villages, causing health issues.", objectives: "Design a filter that removes common impurities and bacteria. Make the design open-source and easy to build. Distribute the first 100 units for free.", technologies: ['Material Science', 'Basic Filtration', 'Community Outreach'], expectedOutcomes: "A proven design that provides potable water and a plan for community-led manufacturing.", category: 'Health', fundingNeeded: 120000, votes: 210, status: 'funded', team: [{ fullName: 'Sunita Singh', institution: 'IISc Bangalore', academicYear: '2nd Year', course: 'Environmental Science', email: 'sunita@iisc.ac.in', phone: '1234567890' }] },
];

export const REFERRAL_PARTNERS = [
  { name: 'Startup India', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Startup_India_Logo.svg/1200px-Startup_India_Logo.svg.png' },
  { name: 'NASSCOM', logo: 'https://www.nasscom.in/sites/default/files/Nasscom-logo.png' },
  { name: 'TiE', logo: 'https://tie.org/wp-content/uploads/2021/01/logo.png' },
];

export const EARNING_METHODS: EarningMethod[] = [
    {
        title: 'Start a YouTube Channel',
        description: 'Make videos on coding, college life, finance, reviews, or tutorials.',
        earnings: ['Google Ads', 'Affiliate links', 'Brand Sponsorships'],
        tools: [
            { name: 'YouTube Studio', link: 'https://studio.youtube.com/' },
            { name: 'Canva', link: 'https://www.canva.com/' },
            { name: 'CapCut', link: 'https://www.capcut.com/' }
        ],
        videos: [
            { title: 'How to Start a YouTube Channel – Beginner Guide', link: '#' },
            { title: 'How Much YouTube Paid Me for 1M Views', link: '#' }
        ]
    },
    {
        title: 'Sell Digital Products',
        description: 'Sell PDFs, resumes, templates, planners, coding projects, or notes.',
        earnings: [],
        platforms: [
            { name: 'Gumroad', link: 'https://gumroad.com/' },
            { name: 'Sellfy', link: 'https://sellfy.com/' },
            { name: 'Notion Templates', link: 'https://notionmarketplace.com/' }
        ],
        videos: [
            { title: 'How to Make Money Selling Digital Products', link: '#' },
            { title: 'Earn Money Selling Notion Templates', link: '#' }
        ]
    },
    {
        title: 'Affiliate Marketing',
        description: 'Promote apps, courses, or products and earn a commission per sale.',
        earnings: [],
        programs: [
            { name: 'Amazon Affiliate', link: 'https://affiliate-program.amazon.in/' },
            { name: 'Coursera Affiliate', link: '#' }
        ],
        videos: [
            { title: 'Affiliate Marketing for Beginners', link: '#' },
            { title: 'Earn ₹50,000/Month With Affiliate Marketing', link: '#' }
        ]
    },
    {
        title: 'Print on Demand',
        description: 'Design t-shirts, mugs, etc. No inventory needed!',
        earnings: [],
        platforms: [
            { name: 'Redbubble', link: 'https://www.redbubble.com/' },
            { name: 'Teespring', link: 'https://www.teespring.com/' }
        ],
        videos: [
            { title: 'Redbubble Beginner Guide', link: '#' },
            { title: 'Print-on-Demand Full Guide', link: '#' }
        ]
    },
     {
        title: 'Blogging / Website',
        description: 'Write on tech, career tips, tutorials, college hacks.',
        earnings: [],
        platforms: [
            { name: 'WordPress', link: 'https://wordpress.com/' },
            { name: 'Blogger', link: 'https://www.blogger.com/about/' }
        ],
        videos: [
            { title: 'Start a Blog for Free', link: '#' },
            { title: '5 Ways Blogs Make Money', link: '#' }
        ]
    },
    {
        title: 'Invest in Stocks or Mutual Funds',
        description: 'Start with small amounts & earn long-term growth or dividends.',
        earnings: [],
        apps: [
            { name: 'Groww', link: 'https://groww.in/' },
            { name: 'Zerodha', link: 'https://zerodha.com/' },
            { name: 'Kuvera', link: 'https://kuvera.in/' }
        ],
        videos: [
            { title: 'Mutual Funds for Beginners', link: '#' },
            { title: 'Invest in Stocks as a Student', link: '#' }
        ]
    },
];
export const CASHBACK_APPS: CashbackApp[] = [
    { name: 'Navi UPI', rewards: ['Users often get opportunities to earn rewards or cashback whenever they make payments', 'Pay any bill over ₹200 (mobile, electricity, credit card), and you\'ll get ₹25 back.'], referral: ['₹100 per referral (limited time offer)', 'Average cashback of ₹2–4 per UPI transaction'], downloadLink: 'https://r.navi.com/fjI4KB', referralLink: 'https://r.navi.com/fjI4KB' },
    { name: 'Super.money', rewards: ['Provides real cashback on every UPI merchant payment, advertised up to 5%', '₹1–₹5 per transaction, especially on low-value transfers', 'Engaging rewards like Super Drop, Meme Money, and Raffle events'], referral: ['New users typically get a fixed cashback reward — around ₹11 per referral', 'The app limits each user to share up to 10 memes/day'], downloadLink: 'https://link.super.money/gUX04VXK5Pb', referralLink: 'https://link.super.money/gUX04VXK5Pb' },
    { name: 'MobiKwik', rewards: ['Cashback is credited as SuperCash, which can be used for bill payments or recharges', 'Offers on mobile recharge, electronics, travel bookings and more'], referral: ['You and your friend each get ₹100 SuperCash once your friend adds ₹50 or more', 'Earning limit: up to ₹5,000 SuperCash per month'], downloadLink: 'https://sak38.app.goo.gl/nNJuvJUCbT3eA63w8', referralLink: 'https://sak38.app.goo.gl/nNJuvJUCbT3eA63w8' },
    { name: 'Pawns.app', rewards: ['Bandwidth sharing: Around $0.20–$0.80 per GB shared', 'Surveys: Around $0.25 to $2 per survey', 'Monthly total (realistic): $5–$30'], referral: [], downloadLink: 'https://discoverpawns.eu/14983216', referralLink: 'https://discoverpawns.eu/14983216' },
    { name: 'BHIM App', rewards: ['₹100 cashback for first-time users (complete 3 transactions of ₹50+)', 'Merchant Cashback: ₹50–₹500 per month based on volume', 'Festival & Event Offers', 'QR Scan Bonus at partner stores'], referral: ['Invite friends to use BHIM App', 'Earn ₹25–₹50 per successful referral'], downloadLink: 'https://bhimnpci.page.link/app', referralLink: 'https://bhimnpci.page.link/app' },
];
export const CRYPTO_APPS: CryptoApp[] = [
    { name: 'PI COIN', price: '~$0.444 USD per PI', marketCap: '~$3.5 billion', supply: '~7.7 billion PI', predictions: ['CoinCodex: $0.34–$0.67 by 2026, $0.91–$2.81 by 2028', 'CoinPedia: $0.85–$3.50 in 2026, $5.50–$22.00 by 2030'], downloadLink: 'https://minepi.com/Rupesh9502' },
    { name: 'Sidra Chain', price: '~$3.31 × 10⁻¹¹ USD', marketCap: '~$2,230', supply: '~1.00 billion tokens', predictions: [], downloadLink: 'https://www.sidrachain.com/u/rupesh9502' },
    { name: 'Interlink', price: '~$0.000758 USD', marketCap: '~$74,500', supply: '~98.39 million INTL', predictions: [], downloadLink: 'https://interlinklabs.ai/referral?refCode=7997401678' },
    { name: 'Bee Coin', price: '~$0.000024 USD', marketCap: '~$24,000', supply: '~999.9 million BEE', predictions: [], downloadLink: 'https://j.bee.com/s?a=rupesh9502' },
    { name: 'Sweatcoin', price: '~$0.0027 per token', marketCap: '$18–$20 million', supply: '~7.2–7.7 billion SWEAT', predictions: ['CoinCodex predicts SWEAT may slide to $0.0016–$0.0024 by mid 2025'], downloadLink: '#' },
];
export const STUDENT_BANK_ACCOUNTS: StudentBankAccount[] = [
    { bank: 'ICICI Bank Campus Power', features: ['Zero balance', 'Free debit card, insurance', 'Special education loan rates', 'Discounts on coaching, gadgets'], link: 'https://www.icicibank.com/personal-banking/accounts/campus-power-account' },
    { bank: 'SBI Student Plus Account', features: ['Linked with Education Loan', 'Global debit card', 'Waived minimum balance'], link: 'https://sbi.co.in/web/personal-banking/accounts/saving-account/student-plus-savings-bank-account' },
    { bank: 'Kotak 811 Edge', features: ['₹0 balance requirement (with 811 Lite)', 'Virtual debit card', 'Easy KYC from home'], link: 'https://www.kotak.com/en/digital-banking/811.html' },
    { bank: 'HDFC DigiSave Youth Account', features: ['For age 18–25', 'Zero balance + rewards', 'SmartBuy discounts, Amazon vouchers'], link: 'https://www.hdfcbank.com/personal/save/accounts/savings-accounts/digisave-youth-account' },
    { bank: 'Airtel Axis Bank Digital Savings', features: ['₹0 balance with 4% interest', 'Digital onboarding', 'Free virtual card'], link: 'https://www.airtel.in/bank/open-account' },
];
export const REFERRAL_APPS: ReferralApp[] = [
    { name: 'CashKaro', referralEarnings: '₹150–₹500', link: '#' },
    { name: 'Cred', referralEarnings: '₹100–₹500', link: '#' },
    { name: 'Groww', referralEarnings: '₹25–₹100', link: '#' },
    { name: 'Upstox', referralEarnings: '₹200–₹1200', link: '#' },
];
export const STUDENT_LOANS: StudentLoanOffer[] = [
    { provider: 'SBI Education Loan', highlights: 'Up to ₹7.5 lakh (no collateral), interest ~8.15%, 0.5% female concession', link: 'https://sbi.co.in/web/personal-banking/loans/education-loans' },
    { provider: 'Bank of Baroda', highlights: 'Up to ₹80 lakh (domestic & abroad), flexible EMI, BOB Vidya scheme', link: 'https://www.bankofbaroda.in/personal-banking/loans/education-loan' },
    { provider: 'HDFC Credila', highlights: 'Custom EMI, flexible moratorium, fast approval', link: 'https://www.hdfccredila.com/' },
    { provider: 'Govt. Credit Scheme (CSIS/GSCCS)', highlights: 'Interest subsidy up to ₹15 lakh loans', link: 'https://www.myscheme.gov.in/schemes/gsccs' },
];
export const STUDENT_CARDS: StudentCard[] = [
    { card: 'IDFC FIRST WoW Card', features: ['No income required', 'FD-backed', 'zero fees'], link: 'https://www.idfcfirstbank.com/credit-card/wow/student' },
    { card: 'Kotak 811 DreamDifferent', features: ['FD-based', 'free forever'], link: 'https://www.kotak.com/en/credit-card/811-dream-different.html' },
    { card: 'SBI Student Plus', features: ['Linked to education loan', 'reward points'], link: 'https://www.sbicard.com/en/personal/credit-cards/student/sbi-student-plus-advantage-card.page' },
];
export const STUDENT_DEALS: StudentDeal[] = [
    { platform: 'BookMyForex - Student Special', offer: '₹7,500 cashback on forex card, ₹15,000 cashback on overseas tuition fee transfers, Zero markup fees', link: 'https://www.bookmyforex.com/student-card' },
    { platform: 'Apple India Back to School', offer: 'Free AirPods/Magic Keyboard with Mac/iPad', link: '#' },
    { platform: 'Amazon Prime Student', offer: '6-month trial + ₹500 off', link: 'https://www.amazon.in/amazonprime?ref_=nav_cs_primelink_nonmember' },
    { platform: 'GitHub Student Pack', offer: 'Free domain, Canva, Replit, coding tools', link: 'https://education.github.com/pack' },
    { platform: 'LinkedIn Premium', offer: 'Free for 1 month with resume tools, courses', link: '#' },
];
export const INDIAN_GOV_PLATFORMS: PlatformInfo[] = [ /* Indian gov platforms data */ ];
export const GLOBAL_PLATFORMS: PlatformInfo[] = [ /* Global platforms data */ ];
export const CODING_PLATFORMS: PlatformInfo[] = [ /* Coding platforms data */ ];
export const SOFT_SKILLS_PLATFORMS: PlatformInfo[] = [ /* Soft skills platforms data */ ];
export const EXAM_PREP_PLATFORMS: PlatformInfo[] = [ /* Exam prep platforms data */ ];
export const TEACHER_PLATFORMS: PlatformInfo[] = [ /* Teacher platforms data */ ];
export const JOB_PORTALS: PlatformInfo[] = [ /* Job portals data */ ];
export const LEARNING_ARTICLES: Article[] = [ /* Learning articles data */ ];
export const GOVERNMENT_APPS: Record<string, SmartApp[]> = { /* Government apps data */ };
export const UTILITY_APPS: SmartApp[] = [ /* Utility apps data */ ];
export const EDUCATIONAL_APPS_LIST: SmartApp[] = [ /* Educational apps data */ ];
export const YOUTH_APPS: SmartApp[] = [ /* Youth apps data */ ];
export const WOMEN_APPS: SmartApp[] = [ /* Women apps data */ ];
export const ENVIRONMENT_APPS: SmartApp[] = [ /* Environment apps data */ ];
export const INTERNSHIPS: Record<string, any[]> = { /* Internships data */ };
export const POPULAR_INTERNSHIPS: any[] = [ /* Popular internships data */ ];
export const PLACEMENTS: any[] = [ /* Placements data */ ];
export const ALL_APP_ROUTES = [
    { path: '/', title: 'Home' },
    { path: '/updates', title: 'Updates' },
    { path: '/offers', title: 'Offers' },
    { path: '/students', title: 'Students' },
    { path: '/women-empowerment', title: 'Women Empowerment' },
    { path: '/farmers', title: 'Farmers' },
    { path: '/workers', title: 'Workers' },
    { path: '/senior-citizens', title: 'Senior Citizens' },
    { path: '/entrepreneurs', title: 'Entrepreneurs' },
    { path: '/about', title: 'About Us' },
    { path: '/contact', title: 'Contact Us' },
    { path: '/privacy', title: 'Privacy Policy' },
    ...FARMER_FEATURES.map(f => ({ path: f.path, title: f.titleKey.split('.').pop() })),
    ...STUDENT_FEATURES.map(f => ({ path: f.path, title: f.titleKey.split('.').pop() })),
];
// END: ADDED MISSING CONSTANTS