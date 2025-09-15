import React from 'react';

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'mr';

export interface UserProfile {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string; // YYYY-MM-DD for date input
    address: {
        street: string;
        city: string;
        state: string;
        pincode: string;
    };
    language: Language;
    occupation: 'Student' | 'Farmer' | 'Woman' | 'Worker' | 'Entrepreneur' | 'Senior Citizen' | 'Other';
    annualIncome: '< ₹1 Lakh' | '₹1-3 Lakh' | '₹3-5 Lakh' | '₹5-10 Lakh' | '> ₹10 Lakh';
    profilePictureUrl?: string;
    gender?: 'Male' | 'Female' | 'Other';

    // Student fields
    educationLevel?: 'School' | 'College' | 'Graduate' | 'Postgraduate';
    stream?: 'Science' | 'Commerce' | 'Arts' | 'IT' | 'Vocational';
    skills?: string; // Storing as comma-separated string for simplicity in a form
    careerGoal?: 'Job' | 'Higher Studies' | 'Entrepreneurship' | 'Govt. Exams';
    locationType?: 'Urban' | 'Rural';
    incomeBackground?: 'Low' | 'Middle' | 'High';

    // Farmer fields
    farmingType?: 'Crop' | 'Livestock' | 'Fisheries' | 'Mixed';
    cropsLivestock?: string;
    landSize?: string;
    irrigationSource?: 'Rainfed' | 'Canal' | 'Borewell' | 'Drip';
    farmerChallenges?: string;

    // Woman fields (can overlap with other roles)
    maritalStatus?: 'Single' | 'Married' | 'Widow' | 'Divorced';
    employmentStatus?: 'Unemployed' | 'Self-employed' | 'Working';
    interests?: string;
    womanChallenges?: string;

    // Senior Citizen fields
    retired?: 'Yes' | 'No';
    pension?: 'Govt.' | 'Private' | 'None';
    healthConditions?: string;
    livingSituation?: 'Alone' | 'With Family' | 'Old Age Home';
    seniorInterests?: string;
    
    // Entrepreneur fields
    businessStage?: 'Idea' | 'Startup' | 'Growing' | 'Established';
    industry?: 'Agri' | 'Tech' | 'Retail' | 'Manufacturing' | 'Services';
    annualTurnover?: string;
    employeeCount?: string;
    entrepreneurChallenges?: string;
    educationBackground?: string;

    // Worker fields
    workType?: 'Skilled' | 'Semi-skilled' | 'Unskilled';
    sector?: 'Construction' | 'Factory' | 'Domestic' | 'Transport' | 'Gig Economy' | 'Other';
    workerSkills?: string;
    workerChallenges?: string;
}

export interface VoiceCommandResult {
  action: 'navigate' | 'speak' | 'fill_input' | 'change_language' | 'unknown';
  path: string;
  selector: string;
  value: string;
  language_code: Language;
  language_name: string;
  responseText: string;
}
export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface CropDiagnosis {
  diseaseName: string;
  isHealthy: boolean;
  description: string;
  recommendedTreatment: string[];
  preventiveMeasures: string[];
}

export interface FertilizerRecommendation {
  nutrientAnalysis: {
    primary: string[];
    secondary: string[];
  };
  recommendedProducts: {
    productName: string;
    reason: string;
  }[];
  applicationSchedule: {
    stage: string;
    instructions: string;
  }[];
  vendorRecommendations: string[];
  notes: string;
}

export interface Contract {
  id: number;
  title: string;
  buyerName: string;
  buyerVerified: boolean;
  crop: string;
  quantity: string;
  price: string;
  timeline: {
    startDate: string;
    endDate: string;
  };
  status: 'Pending' | 'Active' | 'Harvesting' | 'Completed' | 'Disputed';
  fullText: string;
  paymentStatus: 'Pending' | 'Paid';
  produceSpecs: string;
  logistics: string;
  disputeResolution: string;
}

export interface SchemeRecommendation {
  schemeTitle: string;
  reason: string;
  benefit?: string;
  link?: string;
}

export interface WeatherAlert {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  };
  forecast7Day: {
    day: string;
    tempHigh: number;
    tempLow: number;
    condition: string;
  }[];
  alerts: {
    title: string;
    severity: 'Low' | 'Moderate' | 'High';
    description: string;
  }[];
  cropAdvisory: string;
}

export interface CropRecommendation {
  cropName: string;
  suitabilityScore: number;
  reasoning: string;
  suggestedVarieties: string[];
  marketPotential: 'High' | 'Medium' | 'Low';
}

export interface FinancialProduct {
  productName: string;
  provider: string;
  description: string;
  suitabilityReason: string;
  link: string;
}

export interface MarketPrice {
  crop: string;
  price: string;
  market: string;
  trend: 'up' | 'down' | 'stable';
}

export interface ExpertGuide {
  id: number;
  title: string;
  category: string;
  summary: string;
  thumbnail: string;
}

export interface EducationResource {
  name: string;
  description: string;
  link: string;
  logo: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

// Student Section Types
export interface Scholarship {
    id: number;
    title: string;
    provider: string;
    award: string;
    eligibility: string;
    deadline: string;
    link: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  headline: string;
  summary: string;
  careerGoal: string;
  education: {
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
  }[];
  experience: {
    company: string;
    role: string;
    duration: string;
    location?: string;
    points: string[];
  }[];
  projects: {
    name: string;
    description: string;
    link: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    year: string;
  }[];
  skills: string[];
}

export interface CareerRoadmap {
  title: string;
  introduction: string;
  steps: {
    title: string;
    description: string;
    resources: { name: string; link: string; }[];
  }[];
  potentialRoles: string[];
  salaryExpectation: string;
}

export interface LearningPath {
  title: string;
  introduction: string;
  duration: string;
  steps: {
    title: string;
    topics: string[];
    resources: { name: string; link: string; type: 'video' | 'article' | 'course' | 'practice' }[];
    project: { name: string; description: string; };
  }[];
  careerAdvice: string;
}

export interface ScholarshipDetail {
    category: string;
    name: string;
    eligibility: string;
    description: string;
    class: string;
    link: string;
}

export interface AbroadScholarship {
    name: string;
    eligibility: string;
    amountAndDescription: string;
    link: string;
}

export interface EducationLoan {
    bank: string;
    eligibility: string;
    amountAndDescription: string;
    interestRateLink: string;
}

export interface CounselingCenter {
    name: string;
    focus: string;
    description: string;
    link: string;
}

export interface VisaStep {
    step: number;
    title: string;
    description: string;
    requirements?: string[];
    links?: { name: string; url: string }[];
}

// Earning Hub Types
export interface EarningMethod {
  title: string;
  description: string;
  earnings: string[];
  tools?: { name: string; link: string }[];
  platforms?: { name: string; link: string }[];
  programs?: { name: string; link: string }[];
  apps?: { name: string; link: string }[];
  videos: { title: string; link: string }[];
}

export interface ReferralApp {
  name: string;
  referralEarnings: string;
  link: string;
}

export interface CashbackApp {
  name: string;
  rewards: string[];
  referral: string[];
  downloadLink: string;
  referralLink?: string;
}

export interface CryptoApp {
  name: string;
  price: string;
  marketCap: string;
  supply: string;
  predictions: string[];
  downloadLink: string;
}

export interface StudentBankAccount {
  bank: string;
  features: string[];
  link: string;
}

export interface StudentLoanOffer {
  provider: string;
  highlights: string;
  link: string;
}

export interface StudentCard {
  card: string;
  features: string[];
  link: string;
}

export interface StudentDeal {
  platform: string;
  offer: string;
  link: string;
}

export interface TeamMember {
  fullName: string;
  institution: string;
  academicYear: string;
  course: string;
  email: string;
  phone: string;
}

export interface Project {
  id: number;
  title: string;
  description: string; // Serves as Brief Description/Abstract
  problemStatement: string;
  objectives: string;
  technologies: string[];
  expectedOutcomes: string;
  category: 'Tech' | 'Agri' | 'Social' | 'Health';
  fundingNeeded: number;
  votes: number;
  status: 'under_review' | 'funded' | 'referred' | 'top_voted';
  team: TeamMember[];
}

export interface PlatformInfo {
    name: string;
    website: string;
    about?: string;
    highlights?: string;
    courses?: string;
}

export interface Article {
    id: number;
    title: string;
    content: string | string[];
}

export interface SmartApp {
    name: string;
    purpose: string;
    description?: string;
    use?: string;
    appLink: string;
    aboutLink?: string;
    youtubeLink?: string;
}

export interface BudgetPlan {
  title: string;
  summary: string;
  breakdown: {
    category: string;
    percentage: number;
    amount: string;
    description: string;
  }[];
  savingsTips: string[];
  goalActionPlan: string;
}

export interface LoanAnalysis {
  loanName: string;
  summary: string;
  details: {
    key: string;
    value: string;
  }[];
  pros: string[];
  cons: string[];
  advice: string;
  recommendedBank?: {
    name: string;
    reason: string;
  };
}

export interface InvestmentGuide {
  introduction: string;
  options: {
    name: string;
    description: string;
    suitability: string;
    riskLevel: 'Low' | 'Medium' | 'High';
  }[];
  nextSteps: string[];
  disclaimer: string;
}

export interface JobSearchParams {
  jobTitle?: string;
  location?: string;
  skills?: string[];
}

export interface Job {
  title: string;
  company: string;
  location: string;
  type: 'Daily Wage' | 'Skilled' | 'Full-time' | 'Part-time';
  wage: string;
  contact: string;
  link: string;
}

export interface WorkerProfile {
  skills: string[];
  location: string;
  experience: string;
}

export interface WageInfo {
  skill: string;
  city: string;
  minimumWage: string;
  entitlements: string[];
}

export interface Update {
  id: number;
  category: 'Students' | 'Women' | 'Farmers' | 'Workers' | 'Seniors' | 'Entrepreneurs' | 'General';
  title: string;
  summary: string;
  date: string;
  pinned?: boolean;
  link: string;
}

export interface GroundingSource {
    web: {
        uri: string;
        title: string;
    }
}

export interface AIUpdateResult {
  summary: string;
  sources: GroundingSource[];
}

export interface NewsArticle {
  title: string;
  summary: string;
  link: string;
  source: string;
}

export interface Offer {
  id: number;
  category: 'Students' | 'Women' | 'Farmers' | 'Workers' | 'Seniors' | 'Entrepreneurs' | 'General';
  title: string;
  provider: string;
  description: string;
  eligibility: string;
  redeemMethod: string;
  expiry?: string;
  link: string;
  type: 'Deal' | 'Subsidy' | 'Grant' | 'Freebie' | 'Info';
}

export type AIOfferResult = AIUpdateResult;

export interface CategorizedOffer {
  title: string;
  description: string;
  link: string;
  source: string;
  eligibility?: string;
  expiry?: string;
}

export interface DiseaseInfo {
  name: string;
  symptoms: string[];
  causes: string[];
  diagnosis: string[];
  treatment: string[];
  prevention: string[];
  medications: string; // Will include the disclaimer text
}

export interface ServiceProvider {
  name: string;
  service: string;
  phone: string;
  rating: number;
  address: string;
}

export interface PortalInfo {
  portalName: string;
  url: string;
  notes: string;
}

export interface Document {
  id: number;
  name: string;
  type: 'Aadhaar' | 'PAN Card' | 'Driving License' | 'Passport' | 'Other';
  dateAdded: string;
}

export interface Internship {
    company: string;
    program?: string;
    eligibility: string;
    period: string;
    stipend: string;
    link: string;
}

export interface PopularInternship extends Internship {}

export interface Placement {
    company: string;
    link: string;
}

// My Bharat (formerly AI Jeevan Chakra) Types
export interface LifeMilestone {
  name: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  icon: string;
}

export interface ProactiveAction {
  title: string;
  description: string;
  cta: string;
  link: string;
  icon: string;
}

export interface Opportunity {
  category: 'Scheme' | 'Job' | 'Upskilling' | 'Financial';
  title: string;
  description: string;
  link: string;
  icon: string;
}

export interface RiskAlert {
  severity: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  recommendation: string;
  link: string;
  icon: string;
}

export interface JeevanChakraSuggestions {
    opportunities: Opportunity[];
    risks: RiskAlert[];
}

// FIX: Define the missing CareerPathResult type.
export interface CareerPathResult {
  roadmapTitle: string;
  summary: string;
  skillAnalysis: {
    userSkills: string[];
    requiredSkills: string[];
    gapSkills: string[];
  };
  learningPath: {
    step: number;
    title: string;
    duration: string;
    description: string;
    resources: {
      name: string;
      link: string;
      type: 'Govt. Free Course' | 'YouTube' | 'Article' | 'Practice Platform';
    }[];
  }[];
  interviewQuestions: string[];
  suggestedJobs: Job[];
}

export interface LegalAnalysisResult {
  generalAdvice: string;
  legalProvisions: string;
}

// AI Nagar Palak (Civic Guardian) Types
export interface CivicIssueAnalysis {
  issueCategory: string;
  severity: 'Low' | 'Medium' | 'High';
  draftedComplaint: string;
}

export interface CivicIssueReport extends CivicIssueAnalysis {
  id: number;
  userDescription: string;
  image: string; // data URL for display
  dateReported: string;
  status: 'Submitted' | 'In Review' | 'Resolved';
}

// AI Interview Studio Types
export type InterviewType = 'Campus Placement' | 'Tech Job' | 'MBA' | 'Startup Pitch' | 'Govt. Job';
export type InterviewDifficulty = 'Beginner' | 'Intermediate' | 'Expert';

export interface InterviewConfig {
  type: InterviewType;
  difficulty: InterviewDifficulty;
  resume?: File;
}

export interface AnswerFeedback {
    feedback: string;
    scores: {
        communication: number;
        knowledge: number;
        confidence: number;
    };
    suggestions: string[];
}

export interface InterviewReport {
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
    commonMistakes: string[];
    recommendedResources: { name: string; link: string; }[];
    transcript: { question: string; answer: string; }[];
}

// Fitness Hub Types
export interface FitnessPlan {
  summary: string;
  dailyRoutine: {
    morning: { title: string; activities: string[] };
    afternoon: { title: string; activities: string[] };
    evening: { title: string; activities: string[] };
  };
  dietTips: string[];
  disclaimer: string;
}

export interface ProduceListing {
  id: number;
  name: string;
  price: string;
  quantity: string;
  seller: string;
  location: string;
  image: string;
  paymentMethods: string[];
  logistics: string[];
}