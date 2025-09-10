import React from 'react';
import type { 
  Contract, MarketPrice, ExpertGuide, Scholarship, ScholarshipDetail, 
  AbroadScholarship, EducationLoan, CounselingCenter, VisaStep, EarningMethod, CashbackApp, 
  CryptoApp, StudentBankAccount, StudentLoanOffer, StudentCard, StudentDeal, ReferralApp, Project,
  PlatformInfo, Article, SmartApp, EducationResource, Update, Offer, Internship, PopularInternship, Placement
} from './types';

export const NAV_LINKS = [
  { key: 'home', path: '/' },
  { key: 'news', path: '/news-and-offers' },
  { key: 'aiJeevanChakra', path: '/ai-jeevan-chakra' },
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
  Services: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
  ),
  MyBharat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  ),
  SOS: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Zm0 13.036h.008v.008h-.008v-.008Z" />
    </svg>
  ),
  Email: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
  ),
  WhatsApp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6,14.2c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,0.9c-0.1,0.1-0.3,0.2-0.5,0.1 c-0.2-0.1-1-0.4-1.9-1.2c-0.7-0.6-1.2-1.4-1.3-1.6c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.2,0.3-0.4 c-0.1-0.2-0.6-1.5-0.8-2.1c-0.2-0.5-0.4-0.5-0.6-0.5c-0.2,0-0.4,0-0.6,0c-0.2,0-0.5,0.1-0.8,0.4c-0.3,0.3-1,1-1,2.4 c0,1.4,1,2.8,1.2,3c0.1,0.2,2,3.2,5,4.4c0.7,0.3,1.3,0.5,1.7,0.6c0.7,0.2,1.3,0.1,1.8-0.1c0.5-0.2,1.5-0.7,1.7-1.3 c0.2-0.6,0.2-1.2,0.1-1.3C17,14.3,16.8,14.3,16.6,14.2z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10c5.5,0,10-4.5,10-10S17.5,2,12,2z M12,20.5c-4.7,0-8.5-3.8-8.5-8.5c0-4.7,3.8-8.5,8.5-8.5c4.7,0,8.5,3.8,8.5,8.5C20.5,16.7,16.7,20.5,12,20.5z"/></svg>
  ),
  GitHub: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.034c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
  ),
  Location: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
  ),
  Updates: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
    </svg>
  ),
  Offers: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
    </svg>
  ),
  Lightbulb: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c.401-.02.802-.039 1.203-.058m5.094.058c.399.02.801.039 1.202.058M4.5 12a7.5 7.5 0 0 1 15 0m-15 0a7.5 7.5 0 1 1 15 0" />
    </svg>
  ),
  Shield: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
    </svg>
  ),
  GovtApps: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
  ),
  Trophy: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 1 9 0Zm0 0c0 .546-.022 1.088-.065 1.624a3.375 3.375 0 0 1-6.868 0c-.043-.536-.065-1.078-.065-1.624M16.5 18.75C18.433 18.75 20 17.183 20 15.25V9.75A2.25 2.25 0 0 0 17.75 7.5h-1.375c-.322 0-.638.113-.88.318l-1.042.871-1.042-.871a1.125 1.125 0 0 0-.88-.318H9.625A2.25 2.25 0 0 0 7.375 9.75v5.5c0 1.933 1.567 3.5 3.5 3.5h.065Z" />
    </svg>
  ),
  Upvote: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  ),
  FarmChat: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.125 2.902 2.563 3.445l.504.202a12.01 12.01 0 0 0 3.425 0l.504-.202c1.438-.543 2.563-1.845 2.563-3.445V9.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 9.75v3.01Zm0 0h6.375m-6.375 0a1.5 1.5 0 0 1-1.5-1.5V9.75c0-1.03.843-1.875 1.875-1.875h1.5c1.032 0 1.875.845 1.875 1.875v1.5a1.5 1.5 0 0 1-1.5 1.5H5.25m-1.5 0h9.375c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.75c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
  ),
  MarketChat: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.858-6.446a.75.75 0 0 0-.7-1.028H5.613L4.247 3H2.25M3.375 20.25a1.125 1.125 0 0 1-1.125-1.125V6.75m11.25 0c0 .565-.224 1.11-.622 1.5H5.613m10.763-1.5a.75.75 0 0 0-.7-1.028H5.613L4.247 3h-1.995m11.368 0a1.125 1.125 0 0 1-1.125 1.125H3.375m11.25 0a1.125 1.125 0 0 1 1.125 1.125v9.75" />
    </svg>
  ),
  Expert: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  EarningChat: (props: React.SVGProps<SVGSVGElement>) => (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
    </svg>
  ),
  Document: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  ),
  Upload: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  ),
  View: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639l4.43-4.43a1.012 1.012 0 0 1 1.431 0l3.05 3.05a1.012 1.012 0 0 1 0 1.432l-3.05 3.05a1.012 1.012 0 0 1-1.431 0l-4.43-4.43Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.964 12.322a1.012 1.012 0 0 0 0-.639l-4.43-4.43a1.012 1.012 0 0 0-1.431 0l-3.05 3.05a1.012 1.012 0 0 0 0 1.432l3.05 3.05a1.012 1.012 0 0 0 1.431 0l4.43-4.43Z" />
    </svg>
  ),
  Delete: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  ),
  Settings: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 0 1 0 1.25c.008.379.137.752.43.992l1.003.827c.424.35.534.954.26 1.431l-1.298 2.247a1.125 1.125 0 0 1-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.127c-.332.183-.582.495-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 0 1 0-1.25c-.007-.379-.137-.752-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.431l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.127.332-.183.582-.495.645-.87l.213-1.281Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  ),
  DigiLocker: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  Save: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  Lawyer: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.036.243c-2.132 0-4.14-.356-6.032-.998a5.982 5.982 0 01-2.036-.243c-.483-.174-.711-.703-.59-1.202L12 4.5m-6.75.47v.001" />
    </svg>
  ),
  Civic: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m0 0v12m0-12L3 15" />
    </svg>
  ),
};

export const SECTIONS = [
  { key: 'students', path: '/students', Icon: ICONS.Student },
  { key: 'farmers', path: '/farmers', Icon: ICONS.Farmer },
  { key: 'women', path: '/women-empowerment', Icon: ICONS.Women },
  { key: 'workers', path: '/workers', Icon: ICONS.Worker },
  { key: 'seniors', path: '/senior-citizens', Icon: ICONS.Senior },
  { key: 'entrepreneurs', path: '/entrepreneurs', Icon: ICONS.Entrepreneur },
  { key: 'nagarPalak', path: '/local-governance', Icon: ICONS.Civic },
  { key: 'healthcare', path: '/healthcare', Icon: ICONS.Shield },
  { key: 'aiLawyer', path: '/ai-lawyer', Icon: ICONS.Lawyer }
];

export const STUDENT_FEATURES = [
    { path: '/students/scholarships', titleKey: 'features.student.scholarships.title', descriptionKey: 'features.student.scholarships.description', Icon: ICONS.Student },
    { path: '/students/resume-builder', titleKey: 'features.student.resume.title', descriptionKey: 'features.student.resume.description', Icon: ICONS.Lightbulb },
    { path: '/students/career-roadmaps', titleKey: 'features.student.roadmaps.title', descriptionKey: 'features.student.roadmaps.description', Icon: ICONS.Farmer },
    { path: '/students/learning-paths', titleKey: 'features.student.learningPaths.title', descriptionKey: 'features.student.learningPaths.description', Icon: ICONS.Entrepreneur },
    { path: '/students/financial-management', titleKey: 'features.student.financialManagement.title', descriptionKey: 'features.student.financialManagement.description', Icon: ICONS.MyBharat },
    { path: '/students/coding-toolkit', titleKey: 'features.student.coding.title', descriptionKey: 'features.student.coding.description', Icon: ICONS.Services },
    { path: '/students/doubt-solving', titleKey: 'features.student.doubtSolver.title', descriptionKey: 'features.student.doubtSolver.description', Icon: ICONS.SOS },
    { path: '/students/project-ideas', titleKey: 'features.student.innovation.title', descriptionKey: 'features.student.innovation.description', Icon: ICONS.Lightbulb },
    { path: '/students/earning-hub', titleKey: 'features.student.earning.title', descriptionKey: 'features.student.earning.description', Icon: ICONS.Entrepreneur },
    { path: '/students/smart-apps', titleKey: 'features.student.smartApps.title', descriptionKey: 'features.student.smartApps.description', Icon: ICONS.Services },
    { path: '/students/free-resources', titleKey: 'features.student.freeLearning.title', descriptionKey: 'features.student.freeLearning.description', Icon: ICONS.MyBharat },
    { path: '/students/internships-placements', titleKey: 'features.student.internships.title', descriptionKey: 'features.student.internships.description', Icon: ICONS.Worker },
];

export const MOCK_SCHOLARSHIPS: Scholarship[] = [
  { id: 1, title: 'National Merit Scholarship', provider: 'Government of India', award: '₹12,000/year', eligibility: 'Class 12 Pass', deadline: '31 Oct 2024', link: '#' },
  { id: 2, title: 'Inspire Scholarship', provider: 'DST, Government of India', award: '₹80,000/year', eligibility: 'Top 1% in Class 12', deadline: '15 Nov 2024', link: '#' },
  { id: 3, title: 'Reliance Foundation Scholarship', provider: 'Reliance Foundation', award: 'Up to ₹2,00,000', eligibility: 'Undergraduate Students', deadline: '30 Sep 2024', link: '#' },
];

export const FARMER_FEATURES = [
  { path: '/farmers/crop-doctor', titleKey: 'features.farmer.cropDoctor.title', descriptionKey: 'features.farmer.cropDoctor.description', Icon: ICONS.SOS },
  { path: '/farmers/direct-market', titleKey: 'features.farmer.marketAccess.title', descriptionKey: 'features.farmer.marketAccess.description', Icon: ICONS.Entrepreneur },
  { path: '/farmers/fertilizer-optimizer', titleKey: 'features.farmer.fertilizer.title', descriptionKey: 'features.farmer.fertilizer.description', Icon: ICONS.Lightbulb },
  { path: '/farmers/contract-farming', titleKey: 'features.farmer.contractFarming.title', descriptionKey: 'features.farmer.contractFarming.description', Icon: ICONS.Worker },
  { path: '/farmers/weather-alerts', titleKey: 'features.farmer.weatherAlerts.title', descriptionKey: 'features.farmer.weatherAlerts.description', Icon: ICONS.SOS },
  { path: '/farmers/crop-recommendation', titleKey: 'features.farmer.cropRecommender.title', descriptionKey: 'features.farmer.cropRecommender.description', Icon: ICONS.Farmer },
  { path: '/farmers/financial-needs', titleKey: 'features.farmer.financialNeeds.title', descriptionKey: 'features.farmer.financialNeeds.description', Icon: ICONS.MyBharat },
  { path: '/farmers/expert-guides', titleKey: 'features.farmer.expertGuides.title', descriptionKey: 'features.farmer.expertGuides.description', Icon: ICONS.Student },
  { path: '/farmers/market-prices', titleKey: 'features.farmer.marketPrices.title', descriptionKey: 'features.farmer.marketPrices.description', Icon: ICONS.Services },
];

export const CATEGORIZED_SCHEMES = [
    {
        categoryKey: 'data.schemes.incomeSupport.category',
        schemes: [
            { title: 'PM-KISAN', benefitKey: 'data.schemes.incomeSupport.pmkisan.benefit', eligibilityKey: 'data.schemes.incomeSupport.pmkisan.eligibility', applyProcessKeys: ['data.schemes.incomeSupport.pmkisan.apply1', 'data.schemes.incomeSupport.pmkisan.apply2', 'data.schemes.incomeSupport.pmkisan.apply3', 'data.schemes.incomeSupport.pmkisan.apply4'], link: 'https://pmkisan.gov.in/' },
            { title: 'Kisan Credit Card (KCC)', benefitKey: 'data.schemes.incomeSupport.kcc.benefit', eligibilityKey: 'data.schemes.incomeSupport.kcc.eligibility', applyProcessKeys: ['data.schemes.incomeSupport.kcc.apply1', 'data.schemes.incomeSupport.kcc.apply2', 'data.schemes.incomeSupport.kcc.apply3'], link: 'https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card' },
        ],
    },
    {
        categoryKey: 'data.schemes.cropInsurance.category',
        schemes: [
            { title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)', benefitKey: 'data.schemes.cropInsurance.pmfby.benefit', eligibilityKey: 'data.schemes.cropInsurance.pmfby.eligibility', applyProcessKeys: ['data.schemes.cropInsurance.pmfby.apply1', 'data.schemes.cropInsurance.pmfby.apply2', 'data.schemes.cropInsurance.pmfby.apply3'], link: 'https://pmfby.gov.in/' },
        ],
    },
    {
        categoryKey: 'data.schemes.fertilizers.category',
        schemes: [
            { title: 'Soil Health Card', benefitKey: 'data.schemes.fertilizers.soilHealth.benefit', eligibilityKey: 'data.schemes.fertilizers.soilHealth.eligibility', applyProcessKeys: ['data.schemes.fertilizers.soilHealth.apply1', 'data.schemes.fertilizers.soilHealth.apply2', 'data.schemes.fertilizers.soilHealth.apply3'], link: 'https://soilhealth.dac.gov.in/' },
            { title: 'Sub-Mission on Agricultural Mechanization (SMAM)', benefitKey: 'data.schemes.fertilizers.smam.benefit', eligibilityKey: 'data.schemes.fertilizers.smam.eligibility', applyProcessKeys: ['data.schemes.fertilizers.smam.apply1', 'data.schemes.fertilizers.smam.apply2', 'data.schemes.fertilizers.smam.apply3'], link: 'https://farmech.gov.in/' },
        ],
    },
];

export const MOCK_PRODUCE_LISTINGS = [
  { id: 1, name: 'Fresh Tomatoes', price: '₹35 / kg', quantity: '50 kg available', seller: 'Ram Singh', location: 'Nashik, Maharashtra', image: 'https://images.unsplash.com/photo-1561155749-d6b9a4a2e499?q=80&w=1974&auto.format&fit=crop' },
  { id: 2, name: 'Organic Mangoes', price: '₹120 / kg', quantity: '100 kg available', seller: 'Sita Devi', location: 'Anantapur, AP', image: 'https://images.unsplash.com/photo-1591078440058-c2a412a8319f?q=80&w=1974&auto.format&fit=crop' },
  { id: 3, name: 'Basmati Rice', price: '₹90 / kg', quantity: '500 kg available', seller: 'Gurpreet Singh', location: 'Amritsar, Punjab', image: 'https://images.unsplash.com/photo-1586201375761-83865758e5d3?q=80&w=1974&auto.format&fit=crop' },
  { id: 4, name: 'Potatoes', price: '₹25 / kg', quantity: '200 kg available', seller: 'M. Reddy', location: 'Chittoor, AP', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop' },
];

export const AVAILABLE_CONTRACTS: Contract[] = [
  { id: 1, title: 'Corporate Bulk Purchase', buyerName: 'FreshHarvest Pvt. Ltd.', buyerVerified: true, crop: 'High-Grade Tomatoes', quantity: '5 Tons', price: '₹22,000 / Ton', timeline: { startDate: '01 Oct 2024', endDate: '31 Dec 2024' }, status: 'Pending', fullText: 'Full contract text here...', paymentStatus: 'Pending' },
  { id: 2, title: 'Export Quality Mangoes', buyerName: 'Global Fruits Inc.', buyerVerified: true, crop: 'Alphonso Mangoes', quantity: '10 Tons', price: '₹80,000 / Ton', timeline: { startDate: '01 Apr 2025', endDate: '30 Jun 2025' }, status: 'Pending', fullText: 'Full contract text here...', paymentStatus: 'Pending' },
];

export const MY_CONTRACTS: Contract[] = [
  { id: 3, title: 'Organic Wheat Supply', buyerName: 'SafeFoods Retail', buyerVerified: true, crop: 'Organic Wheat', quantity: '2 Tons', price: '₹35,000 / Ton', timeline: { startDate: '15 Aug 2024', endDate: '15 Nov 2024' }, status: 'Active', fullText: 'Full contract text here...', paymentStatus: 'Pending' },
  { id: 4, title: 'Premium Cotton', buyerName: 'National Textiles', buyerVerified: false, crop: 'Long-staple Cotton', quantity: '5 Tons', price: '₹70,000 / Ton', timeline: { startDate: '01 Jul 2024', endDate: '30 Sep 2024' }, status: 'Harvesting', fullText: 'Full contract text here...', paymentStatus: 'Paid' },
];

export const MOCK_EXPERT_GUIDES: ExpertGuide[] = [
    { id: 1, title: 'Mastering Drip Irrigation', category: 'Water Management', summary: 'Learn how to set up and maintain a drip irrigation system for maximum water efficiency.', thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto.format&fit=crop' },
    { id: 2, title: 'Organic Pest Control', category: 'Pest Management', summary: 'Discover natural and effective methods to control pests without using harmful chemicals.', thumbnail: 'https://images.unsplash.com/photo-1595088039384-98442524a1b0?q=80&w=2070&auto.format&fit=crop' },
    { id: 3, title: 'Improving Soil Health', category: 'Soil Management', summary: 'A guide to composting, crop rotation, and other techniques to enrich your soil naturally.', thumbnail: 'https://images.unsplash.com/photo-1553112139-9352e82a3959?q=80&w=1974&auto.format&fit=crop' },
];

export const MOCK_MARKET_PRICES: MarketPrice[] = [
    { crop: 'Tomato', price: '₹2,500 / quintal', market: 'Madanapalle', trend: 'up' },
    { crop: 'Onion', price: '₹1,800 / quintal', market: 'Lasalgaon', trend: 'stable' },
    { crop: 'Potato', price: '₹1,500 / quintal', market: 'Agra', trend: 'down' },
    { crop: 'Wheat', price: '₹2,100 / quintal', market: 'Ludhiana', trend: 'stable' },
];

// --- START OF MISSING DATA ---

// EARNING HUB DATA
export const EARNING_METHODS: EarningMethod[] = [
    { title: 'Freelancing', description: 'Offer skills like writing, design, or coding on freelance platforms.', earnings: ['₹500 - ₹5000 per project'], platforms: [{ name: 'Fiverr', link: 'https://www.fiverr.com/' }, { name: 'Upwork', link: 'https://www.upwork.com/' }], videos: [{ title: 'How to Start Freelancing', link: 'https://www.youtube.com/watch?v=RjWaDgp-L4U' }] },
    { title: 'Content Creation', description: 'Start a YouTube channel, blog, or Instagram page on a topic you love.', earnings: ['Ad Revenue', 'Sponsorships'], platforms: [{ name: 'YouTube', link: 'https://www.youtube.com/' }, { name: 'Instagram', link: 'https://www.instagram.com/' }], videos: [{ title: 'How to Become a Content Creator', link: 'https://www.youtube.com/watch?v=x-w3L-p_qgA' }] },
    { title: 'Online Tutoring', description: 'Teach subjects you are good at to students online.', earnings: ['₹300 - ₹1000 per hour'], platforms: [{ name: 'Chegg Tutors', link: 'https://www.chegg.com/tutors' }, { name: 'Vedantu', link: 'https://www.vedantu.com/' }], videos: [{ title: 'Online Tutoring Guide', link: 'https://www.youtube.com/watch?v=1t_8_V3-3wA' }] },
];

export const REFERRAL_APPS: ReferralApp[] = [
    { name: 'Google Pay', referralEarnings: '₹101 per referral', link: '#' },
    { name: 'PhonePe', referralEarnings: '₹100 per referral', link: '#' },
    { name: 'CRED', referralEarnings: '₹750 per referral', link: '#' },
    { name: 'Upstox', referralEarnings: '₹500 per referral', link: '#' },
];

export const CASHBACK_APPS: CashbackApp[] = [
    { name: 'CRED', rewards: ['Cashback on bill payments', 'CRED coins for rewards'], referral: ['₹750 per successful referral'], downloadLink: '#' },
    { name: 'CashKaro', rewards: ['Cashback on shopping at 1500+ sites'], referral: ['10% of friends\' cashback for life'], downloadLink: '#' },
];

export const CRYPTO_APPS: CryptoApp[] = [
    { name: 'WazirX', price: '₹15', marketCap: '₹5B', supply: '325M', predictions: ['Potential for growth in the Indian market'], downloadLink: '#' },
    { name: 'CoinSwitch Kuber', price: 'N/A', marketCap: 'N/A', supply: 'N/A', predictions: ['User-friendly interface for beginners'], downloadLink: '#' },
];

export const STUDENT_BANK_ACCOUNTS: StudentBankAccount[] = [
    { bank: 'Kotak 811', features: ['Zero balance account', 'Virtual Debit Card'], link: '#' },
    { bank: 'SBI YONO', features: ['Digital account opening', 'Student benefits'], link: '#' },
];

export const STUDENT_LOANS: StudentLoanOffer[] = [
    { provider: 'SBI Student Loan', highlights: 'Low interest rates, govt subsidies', link: '#' },
    { provider: 'HDFC Bank Education Loan', highlights: 'Quick processing, loans up to ₹75 lakh', link: '#' },
];

export const STUDENT_CARDS: StudentCard[] = [
    { card: 'Slice Card', features: ['No-cost EMIs', 'Instant cashback'], link: '#' },
    { card: 'Uni Pay 1/3rd Card', features: ['Pay in 3 parts over 3 months, 0 interest'], link: '#' },
];

export const STUDENT_DEALS: StudentDeal[] = [
    { platform: 'UNiDAYS', offer: 'Student discounts on various brands like Apple, Nike', link: '#' },
    { platform: 'StudentBeans', offer: 'Exclusive deals for students on tech, fashion, and food', link: '#' },
];


// FREE RESOURCES DATA
export const INDIAN_GOV_PLATFORMS: PlatformInfo[] = [
    { name: 'SWAYAM', website: '#', about: 'Free online courses from top Indian universities.' },
    { name: 'NPTEL', website: '#', about: 'Engineering and science video courses by IITs/IISc.' },
    { name: 'DIKSHA', website: '#', about: 'School curriculum-based resources for teachers and students.' },
];
export const GLOBAL_PLATFORMS: PlatformInfo[] = [
    { name: 'Coursera', website: '#', about: 'Courses from world-class universities and companies.' },
    { name: 'edX', website: '#', about: 'Free courses from Harvard, MIT, and more.' },
    { name: 'Khan Academy', website: '#', about: 'Free learning for all subjects, all ages.' },
];
export const CODING_PLATFORMS: PlatformInfo[] = [
    { name: 'freeCodeCamp', website: '#', about: 'Learn to code with free certifications.' },
    { name: 'LeetCode', website: '#', about: 'Practice coding problems for interviews.' },
    { name: 'GeeksforGeeks', website: '#', about: 'A computer science portal for geeks.' },
];
export const SOFT_SKILLS_PLATFORMS: PlatformInfo[] = [
    { name: 'TCS iON Career Edge', website: '#', about: '15-day free course on soft skills.' },
    { name: 'LinkedIn Learning', website: '#', about: 'Free trial for thousands of courses.' },
];
export const EXAM_PREP_PLATFORMS: PlatformInfo[] = [
    { name: 'Unacademy', website: '#', about: 'Free live classes for various competitive exams.' },
    { name: 'Gradeup', website: '#', about: 'Exam preparation for SSC, Banking, etc.' },
];
export const TEACHER_PLATFORMS: PlatformInfo[] = [
    { name: 'NISHTHA', website: '#', about: 'Teacher training modules by NCERT.' },
];
export const JOB_PORTALS: PlatformInfo[] = [
    { name: 'NCS Portal', website: '#', about: 'National Career Service by Govt. of India.' },
    { name: 'LinkedIn', website: '#', about: 'Professional networking and job searching.' },
];
export const LEARNING_ARTICLES: Article[] = [
    { id: 1, title: 'How to Learn Effectively', content: 'Use techniques like spaced repetition and active recall.' },
    { id: 2, title: 'Time Management for Students', content: 'Prioritize tasks using the Eisenhower Matrix.' },
];


// INTERNSHIPS AND PLACEMENTS DATA
export const INTERNSHIPS: { [key: string]: Internship[] } = {
    'FAANG & Top MNCs': [
        { company: 'Google', eligibility: 'B.Tech/M.Tech', period: 'Summer', stipend: '₹80,000+', link: 'https://careers.google.com/students/' },
        { company: 'Microsoft', eligibility: 'B.Tech/M.Tech', period: 'Summer', stipend: '₹80,000+', link: 'https://careers.microsoft.com/students/us/en/indias-careers' },
        { company: 'Amazon', eligibility: 'B.Tech/M.Tech', period: 'Summer/Winter', stipend: '₹70,000+', link: 'https://www.amazon.jobs/en/student-programs' },
    ]
};
export const POPULAR_INTERNSHIPS: PopularInternship[] = [
    { company: 'Microsoft', program: 'Engage Mentorship', eligibility: '2nd Year B.Tech', period: 'Summer', stipend: 'Mentorship', link: '#' },
    { company: 'Google', program: 'STEP Intern', eligibility: '2nd Year Women in CS', period: 'Summer', stipend: '₹60,000+', link: '#' },
];
export const PLACEMENTS: Placement[] = [
    { company: 'TCS Ninja', link: '#' },
    { company: 'Infosys', link: '#' },
    { company: 'Wipro Elite', link: '#' },
    { company: 'Capgemini', link: '#' },
];

// SMART APPS DATA
export const GOVERNMENT_APPS: { [key: string]: SmartApp[] } = {
    'Digital Identity & Docs': [
        { name: 'DigiLocker', purpose: 'Digital document wallet', appLink: '#' },
        { name: 'mAadhaar', purpose: 'Official Aadhaar app', appLink: '#' },
    ],
    'Citizen Services': [
        { name: 'UMANG', purpose: 'All-in-one government services app', appLink: '#' },
        { name: 'MyGov', purpose: 'Citizen engagement platform', appLink: '#' },
    ]
};
export const UTILITY_APPS: SmartApp[] = [
    { name: 'Google Pay', purpose: 'UPI Payments & Bill Pay', appLink: '#' },
    { name: 'Paytm', purpose: 'Digital wallet and payments', appLink: '#' },
];
export const EDUCATIONAL_APPS_LIST: SmartApp[] = [
    { name: 'BYJU\'S', purpose: 'K-12 learning app', appLink: '#' },
    { name: 'Unacademy', purpose: 'Competitive exam prep', appLink: '#' },
];
export const YOUTH_APPS: SmartApp[] = [
    { name: 'LinkedIn', purpose: 'Professional networking', appLink: '#' },
    { name: 'Internshala', purpose: 'Internship search', appLink: '#' },
];
export const WOMEN_APPS: SmartApp[] = [
    { name: '112 India', purpose: 'Emergency response app', appLink: '#' },
    { name: 'Sheroes', purpose: 'Women-only social network', appLink: '#' },
];
export const ENVIRONMENT_APPS: SmartApp[] = [
    { name: 'Sameer', purpose: 'Air quality index monitoring', appLink: '#' },
];

// --- END OF MISSING DATA ---

export const ALL_APP_ROUTES = [
  ...NAV_LINKS.map(l => ({ path: l.path, description: `Navigate to ${l.key} page`})),
  ...SECTIONS.map(s => ({ path: s.path, description: `Navigate to ${s.key} section`})),
  ...STUDENT_FEATURES.map(f => ({ path: f.path, description: `Navigate to student feature: ${f.titleKey}`})),
  ...FARMER_FEATURES.map(f => ({ path: f.path, description: `Navigate to farmer feature: ${f.titleKey}`})),
  { path: '/login', description: 'Navigate to login page' },
  { path: '/profile', description: 'Navigate to user profile page' },
  { path: '/privacy', description: 'Navigate to privacy policy page' }
];

export const UPDATE_CATEGORIES = ['All', 'Students', 'Women', 'Farmers', 'Workers', 'Seniors', 'Entrepreneurs', 'General'];

export const MOCK_UPDATES: Update[] = [
  { id: 1, category: 'Students', title: 'PM Scholarship Scheme 2024 registration opens', summary: 'The registration for the Prime Minister\'s Scholarship Scheme for the academic year 2024-25 has started. Eligible students can apply on the official portal.', date: '25 Aug 2024', pinned: true, link: '#' },
  { id: 2, category: 'Farmers', title: 'Government announces increased MSP for Kharif crops', summary: 'The Minimum Support Price for several Kharif crops, including paddy and pulses, has been increased to ensure better returns for farmers.', date: '24 Aug 2024', pinned: true, link: '#' },
  { id: 3, category: 'General', title: 'Aadhaar-Voter ID linking deadline extended', summary: 'The deadline for linking Aadhaar with Voter ID has been extended to March 31, 2025. Citizens are encouraged to complete the process online.', date: '23 Aug 2024', link: '#' },
  { id: 4, category: 'Women', title: 'New self-help group (SHG) funding scheme launched', summary: 'A new scheme has been launched to provide low-interest loans and training to women\'s self-help groups across the country.', date: '22 Aug 2024', link: '#' },
];

export const OFFER_CATEGORIES = ['All', 'Students', 'Women', 'Farmers', 'Workers', 'Seniors', 'Entrepreneurs', 'General'];

export const MOCK_OFFERS: Offer[] = [
    { id: 1, category: 'Students', title: '50% Off on Student Laptops', provider: 'TechStore', description: 'Get a flat 50% discount on select laptop models with a valid student ID.', eligibility: 'All college students', redeemMethod: 'Use code STUDENT50 at checkout', expiry: '30 Sep 2024', link: '#', type: 'Deal' },
    { id: 2, category: 'Farmers', title: 'Solar Pump Subsidy', provider: 'Ministry of New & Renewable Energy', description: 'Up to 90% subsidy available for installing solar-powered water pumps under the PM-KUSUM scheme.', eligibility: 'Farmers with agricultural land', redeemMethod: 'Apply through the state energy department portal', link: '#', type: 'Subsidy' },
    { id: 3, category: 'Women', title: 'Free Skill Development Course', provider: 'National Skill Development Corporation', description: 'Enroll in free certified courses for digital marketing, tailoring, and more.', eligibility: 'All women aged 18-45', redeemMethod: 'Register on the Skill India portal', link: '#', type: 'Freebie' },
];

export const MOCK_PROJECTS: Project[] = [
    { id: 1, title: 'AI-Powered Crop Disease Detector', description: 'A mobile app that uses machine learning to identify crop diseases from a photo, providing instant treatment advice to farmers.', problemStatement: 'Lack of timely access to expert advice for crop diseases.', objectives: 'Develop an accurate ML model and an easy-to-use mobile app.', technologies: ['Python', 'TensorFlow', 'React Native'], expectedOutcomes: 'Reduced crop loss and increased yield for small farmers.', category: 'Agri', fundingNeeded: 50000, votes: 128, status: 'top_voted', team: [{ fullName: 'Riya Sharma', institution: 'IIT Bombay', academicYear: '3rd Year', course: 'CSE', email: 'riya@iitb.ac.in', phone: '1234567890' }] },
    { id: 2, title: 'Hyperlocal Job Portal for Daily Wage Workers', description: 'A platform connecting daily wage laborers with local employers for short-term jobs, ensuring fair wages and verified opportunities.', problemStatement: 'Difficulty for laborers to find consistent work.', objectives: 'Create a simple, location-based job matching system.', technologies: ['Node.js', 'React', 'MongoDB', 'Maps API'], expectedOutcomes: 'Increased income and job security for unorganized workers.', category: 'Social', fundingNeeded: 75000, votes: 95, status: 'under_review', team: [{ fullName: 'Arjun Verma', institution: 'NIT Warangal', academicYear: 'Final Year', course: 'ECE', email: 'arjun@nitw.ac.in', phone: '1234567890' }] },
    { id: 3, title: 'Smart Medicine Reminder for Seniors', description: 'An IoT device and app that reminds senior citizens to take their medication on time, with alerts sent to family members.', problemStatement: 'Seniors often forget to take their medications on schedule.', objectives: 'Build a reliable IoT device and a user-friendly app.', technologies: ['Arduino', 'Flutter', 'Firebase'], expectedOutcomes: 'Improved health management for the elderly.', category: 'Health', fundingNeeded: 120000, votes: 210, status: 'funded', team: [{ fullName: 'Priya Patel', institution: 'VIT Vellore', academicYear: '2nd Year', course: 'IT', email: 'priya@vit.ac.in', phone: '1234567890' }] },
];

export const REFERRAL_PARTNERS = [
  { name: 'NASSCOM', logo: 'https://via.placeholder.com/120x40?text=NASSCOM' },
  { name: 'T-Hub', logo: 'https://via.placeholder.com/120x40?text=T-Hub' },
  { name: 'Invest India', logo: 'https://via.placeholder.com/120x40?text=Invest+India' },
];