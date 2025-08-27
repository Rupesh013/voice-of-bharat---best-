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