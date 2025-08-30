

import { GoogleGenAI, Type } from "@google/genai";
import type { ChatMessage, CropDiagnosis, FertilizerRecommendation, SchemeRecommendation, WeatherAlert, CropRecommendation, FinancialProduct, MarketPrice, ResumeData, CareerRoadmap, LearningPath, BudgetPlan, LoanAnalysis, InvestmentGuide, JobSearchParams, Job, WageInfo, AIUpdateResult, GroundingSource, AIOfferResult } from '../types';
import { ALL_APP_ROUTES } from '../constants';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

const parseGeminiJson = (jsonStr: string): any => {
    const cleanedJsonStr = jsonStr.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(cleanedJsonStr);
};

export async function* streamChatResponse(history: ChatMessage[], systemInstruction: string): AsyncGenerator<string> {
  const lastMessage = history[history.length - 1];
  if (!lastMessage || lastMessage.sender !== 'user') {
    return;
  }
  
  const prompt = lastMessage.text;

  const geminiHistory = history.slice(0, -1).map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model' as 'user' | 'model',
    parts: [{ text: msg.text }],
  }));

  const firstUserIndex = geminiHistory.findIndex(h => h.role === 'user');
  const validHistory = firstUserIndex !== -1 ? geminiHistory.slice(firstUserIndex) : [];

  const chat = ai.chats.create({
    model,
    config: { systemInstruction },
    history: validHistory,
  });

  try {
    const responseStream = await chat.sendMessageStream({ message: prompt });
    for await (const chunk of responseStream) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Error streaming chat response:", error);
    yield "I'm sorry, but I'm having trouble connecting right now. Please try again later.";
  }
}

export async function diagnoseCropDisease(base64Image: string, mimeType: string): Promise<CropDiagnosis> {
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType,
    },
  };

  const textPart = {
    text: `You are an expert agricultural scientist specializing in plant pathology. Analyze the following image of a crop. Identify any diseases, pests, or nutrient deficiencies. Provide a detailed diagnosis in the specified JSON format. If you cannot determine a specific issue, state that clearly in the description. Be concise and practical in your recommendations for a small-scale farmer.`
  };
  
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      diseaseName: {
        type: Type.STRING,
        description: 'The common name of the disease, pest, or deficiency identified. If none, say "Healthy" or "Undetermined".'
      },
      isHealthy: {
        type: Type.BOOLEAN,
        description: 'A boolean indicating if the plant appears healthy.'
      },
      description: {
        type: Type.STRING,
        description: 'A brief description of the identified issue.'
      },
      recommendedTreatment: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of actionable steps or treatments for the farmer.'
      },
      preventiveMeasures: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of preventive measures to avoid this issue in the future.'
      },
    },
    required: ['diseaseName', 'isHealthy', 'description', 'recommendedTreatment', 'preventiveMeasures']
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    return parseGeminiJson(response.text);

  } catch (error) {
    console.error("Error diagnosing crop disease:", error);
    throw new Error("Failed to get a diagnosis from the AI. The image might be unclear or the issue unrecognizable.");
  }
}

export async function recommendSchemes(userInput: string): Promise<SchemeRecommendation[]> {
  const prompt = `Based on the following user input, recommend up to 3 relevant Indian government schemes for farmers. For each, provide the scheme title, a brief reason why it's a good fit, and a key benefit. User input: "${userInput}"`;
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        schemeTitle: { type: Type.STRING },
        reason: { type: Type.STRING },
        benefit: { type: Type.STRING },
        link: { type: Type.STRING }
      },
      required: ['schemeTitle', 'reason']
    }
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema
      }
    });
    return parseGeminiJson(response.text);
  } catch (error) {
    console.error("Error recommending schemes:", error);
    throw new Error("Failed to get scheme recommendations.");
  }
}

export async function getWorkerSchemeRecommendations(userInput: string): Promise<SchemeRecommendation[]> {
  const prompt = `You are an expert on Indian government schemes for unorganized workers and laborers. Based on the user's situation, recommend up to 3 relevant schemes (like PM-SYM, E-Shram, Ayushman Bharat, etc.). For each, provide the scheme title, why it's a good fit, a key benefit, and the official link. User input: "${userInput}"`;
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        schemeTitle: { type: Type.STRING },
        reason: { type: Type.STRING },
        benefit: { type: Type.STRING },
        link: { type: Type.STRING }
      },
      required: ['schemeTitle', 'reason', 'link']
    }
  };

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema
      }
    });
    return parseGeminiJson(response.text);
  } catch (error) {
    console.error("Error recommending worker schemes:", error);
    throw new Error("Failed to get scheme recommendations for workers.");
  }
}

export async function parseJobSearchQuery(query: string): Promise<JobSearchParams> {
  const prompt = `You are an intelligent job search query parser for a hyperlocal job portal for laborers in India. Analyze the user's query and extract the job title/type of work, the location (city, state, or pincode), and any specific skills mentioned. Return the result as a JSON object. User query: "${query}"`;
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      jobTitle: { type: Type.STRING, description: "The type of job, e.g., 'Construction Helper', 'Delivery work'" },
      location: { type: Type.STRING, description: "The city, state, or area mentioned, e.g., 'Mumbai', 'Delhi NCR'" },
      skills: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Any specific skills mentioned, e.g., 'driving', 'plumbing'" },
    },
  };
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema,
      }
    });
    return parseGeminiJson(response.text);
  } catch (error) {
    console.error("Error parsing job search query:", error);
    throw new Error("Failed to understand your job search. Please try rephrasing.");
  }
}

export async function getLaborRightsInfo(question: string): Promise<string> {
  const systemInstruction = `You are a helpful AI assistant explaining labor rights to unorganized sector workers in India. Your audience may have low literacy. Explain concepts in very simple, clear, and encouraging language. Avoid legal jargon. Answer the user's question directly and concisely.`;
  try {
    const response = await ai.models.generateContent({
      model,
      contents: question,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error getting labor rights info:", error);
    throw new Error("I'm sorry, I couldn't process that question right now. Please try again.");
  }
}


export async function generateProduceDescription(produceName: string): Promise<string> {
    const prompt = `Generate a short, appealing description for a farmer selling "${produceName}" on a direct-to-consumer marketplace. Highlight freshness and quality in 1-2 sentences.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function suggestProducePrice(produceName: string, quantity: string): Promise<string> {
    const prompt = `Suggest a fair market price for a farmer selling "${quantity}" of "${produceName}" in India. Output only the price string, e.g., "₹45 / kg".`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function getFertilizerRecommendation(crop: string, soil: string, region: string, soilDetails?: string, weather?: string): Promise<FertilizerRecommendation> {
    const prompt = `You are an expert agronomist. Create a fertilizer recommendation for a farmer in India with the following details: Crop: ${crop}, Soil Type: ${soil}, Region: ${region}. Additional info: Soil Test: ${soilDetails || 'not provided'}, Weather: ${weather || 'not provided'}. Provide a practical, easy-to-understand plan in JSON format.`;
    const responseSchema = {
      type: Type.OBJECT, properties: {
        nutrientAnalysis: { type: Type.OBJECT, properties: { primary: { type: Type.ARRAY, items: { type: Type.STRING } }, secondary: { type: Type.ARRAY, items: { type: Type.STRING } } } },
        recommendedProducts: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { productName: { type: Type.STRING }, reason: { type: Type.STRING } } } },
        applicationSchedule: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { stage: { type: Type.STRING }, instructions: { type: Type.STRING } } } },
        vendorRecommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
        notes: { type: Type.STRING }
      },
    };
     try {
        const response = await ai.models.generateContent({ model, contents: prompt, config: { responseMimeType: "application/json", responseSchema }});
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error getting fertilizer recommendation:", error);
        throw new Error("Failed to get fertilizer recommendation.");
    }
}

export async function summarizeContract(fullText: string): Promise<string> {
    const prompt = `Summarize the following farming contract in simple, easy-to-understand bullet points for a farmer. Focus on key responsibilities, payment terms, and quality requirements. Contract: "${fullText}"`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function getWeatherAlertsAndAdvice(location: string, crops: string): Promise<WeatherAlert> {
    const prompt = `Generate a weather report and crop advisory for a farmer at "${location}" who is growing "${crops}". Provide current weather, a 7-day forecast, any special alerts (like heavy rain or heatwave), and a specific crop advisory based on the forecast. Return as JSON.`;
    const responseSchema = {
      type: Type.OBJECT, properties: {
        location: { type: Type.STRING },
        current: { type: Type.OBJECT, properties: { temp: { type: Type.NUMBER }, condition: { type: Type.STRING }, humidity: { type: Type.NUMBER }, windSpeed: { type: Type.NUMBER } } },
        forecast7Day: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { day: { type: Type.STRING }, tempHigh: { type: Type.NUMBER }, tempLow: { type: Type.NUMBER }, condition: { type: Type.STRING } } } },
        alerts: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, severity: { type: Type.STRING }, description: { type: Type.STRING } } } },
        cropAdvisory: { type: Type.STRING }
      }
    };
    try {
        const response = await ai.models.generateContent({ model, contents: prompt, config: { responseMimeType: "application/json", responseSchema }});
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error getting weather alerts:", error);
        throw new Error("Failed to get weather alerts.");
    }
}

export async function getCropRecommendation(location: string, soilType: string, marketPreference: string, ...optionalParams: string[]): Promise<CropRecommendation[]> {
    const prompt = `I am a farmer in ${location} with ${soilType} soil. My market preference is ${marketPreference}. Additional context: ${optionalParams.join(', ')}. Recommend the top 3 most suitable and profitable crops. Provide reasoning, suggested varieties, and market potential for each in JSON format.`;
    const responseSchema = {
      type: Type.ARRAY, items: { type: Type.OBJECT, properties: {
        cropName: { type: Type.STRING },
        suitabilityScore: { type: Type.NUMBER },
        reasoning: { type: Type.STRING },
        suggestedVarieties: { type: Type.ARRAY, items: { type: Type.STRING } },
        marketPotential: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
      }}
    };
    try {
        const response = await ai.models.generateContent({ model, contents: prompt, config: { responseMimeType: "application/json", responseSchema }});
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error getting crop recommendations:", error);
        throw new Error("Failed to get crop recommendations.");
    }
}

export async function getFinancialProducts(details: { landSize: string; annualIncome: string; goal: string; }): Promise<FinancialProduct[]> {
    const prompt = `A farmer has ${details.landSize} of land, an annual income of ${details.annualIncome}, and their goal is "${details.goal}". Recommend 3 suitable financial products (loans, schemes, or insurance) from Indian providers. For each, explain why it's suitable and provide a link. Return as JSON.`;
    const responseSchema = {
      type: Type.ARRAY, items: { type: Type.OBJECT, properties: {
        productName: { type: Type.STRING },
        provider: { type: Type.STRING },
        description: { type: Type.STRING },
        suitabilityReason: { type: Type.STRING },
        link: { type: Type.STRING }
      }}
    };
    try {
        const response = await ai.models.generateContent({ model, contents: prompt, config: { responseMimeType: "application/json", responseSchema }});
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error getting financial products:", error);
        throw new Error("Failed to get financial products.");
    }
}

export async function getMarketPriceInsights(crop: string, prices: MarketPrice[]): Promise<string> {
    const prompt = `Analyze the following market price data for various crops: ${JSON.stringify(prices)}. Provide a short analysis and a selling recommendation for a farmer with "${crop}". Should they sell now, hold, or consider other markets? Explain why.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function generateResumeSummary(resume: ResumeData, careerGoal: string): Promise<string> {
    const prompt = `Based on this resume data: ${JSON.stringify(resume)}, write a compelling, 2-3 sentence professional summary for a student aiming for a "${careerGoal}" role.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function generateExperiencePoints(role: string, company: string): Promise<string[]> {
    const prompt = `Generate 3 impactful, action-oriented bullet points for a resume, for the role of "${role}" at "${company}". Use the STAR method (Situation, Task, Action, Result). Return as a JSON array of strings.`;
    const responseSchema = { type: Type.ARRAY, items: { type: Type.STRING } };
    try {
        const response = await ai.models.generateContent({ model, contents: prompt, config: { responseMimeType: "application/json", responseSchema }});
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error generating experience points:", error);
        throw new Error("Failed to generate experience points.");
    }
}

export async function generateCoverLetter(resume: ResumeData, jobTitle: string, companyName: string, keySkills: string): Promise<string> {
    const prompt = `Write a professional and concise cover letter for a student applying for a "${jobTitle}" position at "${companyName}". Use the student's resume: ${JSON.stringify(resume)}. Highlight these key skills: ${keySkills}. The tone should be enthusiastic and professional.`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function generateCareerRoadmap(profile: Record<string, string>): Promise<CareerRoadmap> {
    const prompt = `Create a detailed career roadmap for a student with the following profile: ${JSON.stringify(profile)}. The roadmap should include a title, introduction, step-by-step guide with resources, potential entry-level roles, and salary expectations in India. Return as JSON.`;
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        introduction: { type: Type.STRING },
        steps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              resources: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    link: { type: Type.STRING },
                  },
                  required: ["name", "link"],
                },
              },
            },
            required: ["title", "description", "resources"],
          },
        },
        potentialRoles: { type: Type.ARRAY, items: { type: Type.STRING } },
        salaryExpectation: { type: Type.STRING },
      },
      required: ["title", "introduction", "steps", "potentialRoles", "salaryExpectation"],
    };
    try {
        const response = await ai.models.generateContent({ model, contents: prompt, config: { responseMimeType: "application/json", responseSchema }});
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error generating career roadmap:", error);
        throw new Error("Failed to generate career roadmap.");
    }
}

export async function solveAcademicDoubt(doubt: string): Promise<string> {
    const prompt = `You are an expert AI tutor. Explain the following academic concept or solve the problem clearly and concisely, as if explaining to a high school or early college student. Provide a step-by-step explanation if it's a problem. Question: "${doubt}"`;
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text;
}

export async function generateLearningPath(profile: { goal: string; skillLevel: string; interests: string; timeCommitment: string; }): Promise<LearningPath> {
    const prompt = `
        You are an expert AI learning advisor. Create a personalized, step-by-step learning path for a student with the following profile:
        - Main Goal: ${profile.goal}
        - Current Skill Level: ${profile.skillLevel}
        - Key Interests: ${profile.interests}
        - Weekly Time Commitment: ${profile.timeCommitment}

        Generate a practical and actionable roadmap. For each step, define clear topics, suggest high-quality FREE resources (like specific YouTube videos, articles, or free courses), and propose a small project to apply the knowledge. Conclude with encouraging career advice. Ensure the path is realistic given the time commitment.
    `;

    const responseSchema: any = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "e.g., 'Your 12-Week Roadmap to Becoming a Data Scientist'" },
        introduction: { type: Type.STRING, description: "A brief, encouraging intro to the learning path." },
        duration: { type: Type.STRING, description: "e.g., 'Approx. 12 Weeks'" },
        steps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "e.g., 'Week 1-2: Python Fundamentals'" },
              topics: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key topics for this step." },
              resources: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Name of the resource." },
                    link: { type: Type.STRING, description: "A direct URL to the resource." },
                    type: { type: Type.STRING, enum: ['video', 'article', 'course', 'practice'], description: "Type of the resource." }
                  },
                  required: ["name", "link", "type"]
                }
              },
              project: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Name of the mini-project." },
                  description: { type: Type.STRING, description: "A brief description of the project." }
                },
                required: ["name", "description"]
              }
            },
            required: ["title", "topics", "resources", "project"]
          }
        },
        careerAdvice: { type: Type.STRING, description: "Final motivating career advice." }
      },
      required: ["title", "introduction", "duration", "steps", "careerAdvice"]
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            }
        });
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error generating learning path:", error);
        throw new Error("Failed to generate a personalized learning path. Please try refining your inputs.");
    }
}

export async function generateBudgetPlan(income: string, expenses: string, goal: string): Promise<BudgetPlan> {
    const prompt = `
        You are an expert financial advisor for students in India. Create a personalized monthly budget plan based on the following details:
        - Monthly Income: ${income}
        - Fixed Monthly Expenses (rent, bills, etc.): ${expenses}
        - Primary Savings Goal: ${goal}

        Generate a practical and encouraging budget. Use a common budgeting rule like 50/30/20 but adapt it to the student's context. Provide actionable savings tips relevant to a student lifestyle. The goal action plan should be a simple, motivating step-by-step guide.
    `;

    const responseSchema: any = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "e.g., 'Your Personalized Student Budget Plan'" },
        summary: { type: Type.STRING, description: "A brief, encouraging summary of the budget." },
        breakdown: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING, description: "e.g., 'Needs', 'Wants', 'Savings'" },
              percentage: { type: Type.NUMBER, description: "Percentage of income for this category." },
              amount: { type: Type.STRING, description: "Amount in INR for this category." },
              description: { type: Type.STRING, description: "Brief description of what this category includes." }
            },
            required: ["category", "percentage", "amount", "description"]
          }
        },
        savingsTips: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of practical savings tips for students." },
        goalActionPlan: { type: Type.STRING, description: "A short, step-by-step plan to achieve the savings goal." }
      },
      required: ["title", "summary", "breakdown", "savingsTips", "goalActionPlan"]
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            }
        });
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error generating budget plan:", error);
        throw new Error("Failed to generate a budget plan. Please try again.");
    }
}

export async function analyzeStudentLoan(amount: string, interest: string, tenure: string): Promise<LoanAnalysis> {
     const prompt = `
        You are an expert loan analyst for Indian students. Analyze an education loan with these parameters:
        - Loan Amount: ${amount}
        - Annual Interest Rate: ${interest}
        - Loan Tenure: ${tenure}

        Provide a clear analysis including an estimated EMI, total interest, and total repayment. List the main pros and cons. Conclude with neutral, helpful advice.
        Additionally, based on these parameters, recommend a specific, real Indian bank (like SBI, HDFC, ICICI, etc.) that is suitable for this type of loan. Provide the bank's name and a short reason for the recommendation.
    `;
    const responseSchema: any = {
      type: Type.OBJECT,
      properties: {
        loanName: { type: Type.STRING, description: "e.g., 'Education Loan Analysis'" },
        summary: { type: Type.STRING, description: "A brief summary of the loan's key figures." },
        details: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              key: { type: Type.STRING },
              value: { type: Type.STRING }
            },
            required: ["key", "value"]
          }
        },
        pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of potential advantages." },
        cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of potential disadvantages or risks." },
        advice: { type: Type.STRING, description: "General advice regarding the loan." },
        recommendedBank: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "The name of the recommended Indian bank." },
            reason: { type: Type.STRING, description: "A brief reason why this bank is recommended." }
          },
          required: ["name", "reason"]
        }
      },
      required: ["loanName", "summary", "details", "pros", "cons", "advice"]
    };

     try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            }
        });
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error analyzing student loan:", error);
        throw new Error("Failed to analyze the loan. Please check your inputs.");
    }
}

export async function generateInvestmentGuide(amount: string, horizon: string, risk: string): Promise<InvestmentGuide> {
    const prompt = `
        You are an educational financial guide for students in India. Create a simple investment guide for a student with the following profile:
        - Monthly Investment Amount: ${amount}
        - Investment Horizon: ${horizon}
        - Risk Tolerance: ${risk}

        Explain 2-3 suitable investment options (like SIPs in Mutual Funds). For each option, describe it simply, explain its suitability for the student profile, and state the risk level. Provide clear next steps. Crucially, end with a strong disclaimer that this is educational content and not financial advice.
    `;
    const responseSchema: any = {
      type: Type.OBJECT,
      properties: {
        introduction: { type: Type.STRING, description: "An encouraging intro to student investing." },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              suitability: { type: Type.STRING },
              riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
            },
            required: ["name", "description", "suitability", "riskLevel"]
          }
        },
        nextSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
        disclaimer: { type: Type.STRING }
      },
      required: ["introduction", "options", "nextSteps", "disclaimer"]
    };

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema,
            }
        });
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error generating investment guide:", error);
        throw new Error("Failed to generate an investment guide.");
    }
}

export async function getSeniorCitizenAIResponse(prompt: string, systemInstruction: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error getting AI response for senior citizens:", error);
    throw new Error("I'm sorry, I couldn't process that request right now. Please try again.");
  }
}

export async function matchJobsToProfile(profile: { skills: string, location: string, experience: string }): Promise<Job[]> {
  const prompt = `You are an AI job matching engine for Indian laborers. Based on the worker's profile, generate 3 realistic, example job listings that would be a good fit. Include title, a fictional employer, location, job type, a realistic wage, and a fictional contact number. Profile: Skills: ${profile.skills}, Location: ${profile.location}, Experience: ${profile.experience}.`;
  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        company: { type: Type.STRING },
        location: { type: Type.STRING },
        type: { type: Type.STRING, enum: ['Daily Wage', 'Skilled', 'Full-time', 'Part-time'] },
        wage: { type: Type.STRING },
        contact: { type: Type.STRING }
      },
      required: ['title', 'company', 'location', 'type', 'wage', 'contact']
    }
  };
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: "application/json", responseSchema }
    });
    return parseGeminiJson(response.text);
  } catch (error) {
    console.error("Error matching jobs:", error);
    throw new Error("Failed to find job matches. Please try again.");
  }
}

export async function calculateWagesAndEntitlements(skill: string, city: string): Promise<WageInfo> {
  const prompt = `You are an expert on Indian labor laws. For a worker with the skill "${skill}" in the city "${city}", calculate or estimate the official minimum wage (per day or month). Also, list 2-3 key entitlements they should know about (like PF, ESI, overtime rules). Be concise and clear.`;
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      skill: { type: Type.STRING },
      city: { type: Type.STRING },
      minimumWage: { type: Type.STRING },
      entitlements: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ['skill', 'city', 'minimumWage', 'entitlements']
  };
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: { responseMimeType: "application/json", responseSchema }
    });
    return parseGeminiJson(response.text);
  } catch (error) {
    console.error("Error calculating wages:", error);
    throw new Error("Could not calculate wage information. Please check your inputs.");
  }
}

export async function getWomenSafetyInfo(query: string): Promise<string> {
    const systemInstruction = `You are a calm, supportive AI assistant for women in India named 'Shakti Assistant'. Provide clear, simple, and safe advice for sensitive situations like harassment, domestic violence, or cybercrime. Prioritize providing official helpline numbers (like 181, 112, 1091). Do NOT give legal advice; instead, strongly advise users to contact the police or a lawyer for legal matters. Keep responses concise and easy to understand.`;
    try {
        const response = await ai.models.generateContent({ model, contents: query, config: { systemInstruction }});
        return response.text;
    } catch (error) {
        console.error("Error in getWomenSafetyInfo:", error);
        throw new Error("I'm sorry, I couldn't process that request right now. Please try again.");
    }
}

export async function getWomenHealthInfo(query: string): Promise<string> {
    const systemInstruction = `You are a helpful and empathetic AI health advisor for women named 'Swasthya Saheli'. Answer general health questions simply and clearly, covering topics like nutrition, menstrual health, and wellness. IMPORTANT: ALWAYS begin your response with a prominent disclaimer in a new line: 'DISCLAIMER: I am an AI assistant and not a medical professional. Please consult a qualified doctor for any health concerns.' After the disclaimer, provide the helpful, general information.`;
    try {
        const response = await ai.models.generateContent({ model, contents: query, config: { systemInstruction } });
        return response.text;
    } catch (error) {
        console.error("Error in getWomenHealthInfo:", error);
        throw new Error("I'm sorry, I couldn't process that request right now. Please try again.");
    }
}

export async function suggestWomenSchemes(profile: { state: string; }): Promise<SchemeRecommendation[]> {
    const prompt = `You are an expert on Indian government schemes for women. Based on the user's state, suggest up to 3 highly relevant schemes. For each, provide the scheme title, a brief reason for the recommendation, a key benefit, and a link if available. Profile: State - "${profile.state}"`;
    const responseSchema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                schemeTitle: { type: Type.STRING },
                reason: { type: Type.STRING },
                benefit: { type: Type.STRING },
                link: { type: Type.STRING }
            },
            required: ['schemeTitle', 'reason']
        }
    };
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema }
        });
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error in suggestWomenSchemes:", error);
        throw new Error("Failed to suggest schemes. Please try again.");
    }
}

export async function findFamilyBenefits(householdInfo: string): Promise<SchemeRecommendation[]> {
    const prompt = `You are an expert on Indian family welfare schemes. Based on the following household information, suggest up to 3 relevant schemes for women, children, or seniors in the family. Provide the scheme title, a brief reason for the recommendation, a key benefit, and a link if available. Household Information: "${householdInfo}"`;
    const responseSchema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                schemeTitle: { type: Type.STRING },
                reason: { type: Type.STRING },
                benefit: { type: Type.STRING },
                link: { type: Type.STRING }
            },
            required: ['schemeTitle', 'reason']
        }
    };
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: { responseMimeType: "application/json", responseSchema }
        });
        return parseGeminiJson(response.text);
    } catch (error) {
        console.error("Error in findFamilyBenefits:", error);
        throw new Error("Failed to find family benefits. Please try again.");
    }
}

export async function getRealTimeUpdates(topic: string): Promise<AIUpdateResult> {
  const prompt = `You are an AI news assistant for the "Voice of Bharat" platform. Provide a concise summary of the latest news and updates in India related to "${topic}". The information should be recent and relevant. Then, list the key source titles and URLs. Your response should be a simple text summary.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text;
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    // FIX: The Gemini API's GroundingChunk type has optional properties.
    // We must filter and map the raw chunks to match our strict GroundingSource type.
    const sources: GroundingSource[] = rawChunks
      .filter(chunk => chunk.web && chunk.web.uri && chunk.web.title)
      .map(chunk => ({
        web: {
          uri: chunk.web!.uri!,
          title: chunk.web!.title!,
        },
      }));

    if (!summary && sources.length === 0) {
      return {
        summary: "I couldn't find any recent updates on that topic. Please try a different search.",
        sources: []
      };
    }
    
    return { summary, sources };
  } catch (error) {
    console.error("Error getting real-time updates:", error);
    throw new Error("Failed to fetch real-time updates. The service might be temporarily unavailable.");
  }
}

export async function getRealTimeOffers(topic: string): Promise<AIOfferResult> {
  const prompt = `You are an AI assistant for the "Voice of Bharat" platform. Find the latest and most relevant offers, discounts, or subsidies in India related to "${topic}". Summarize the offer details, eligibility, and how to avail it. Then, list the key source titles and URLs. Your response should be a simple text summary.`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text;
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: GroundingSource[] = rawChunks
      .filter(chunk => chunk.web && chunk.web.uri && chunk.web.title)
      .map(chunk => ({
        web: {
          uri: chunk.web!.uri!,
          title: chunk.web!.title!,
        },
      }));

    if (!summary && sources.length === 0) {
      return {
        summary: "I couldn't find any recent offers on that topic. Please try a different search term, like 'student laptop discounts' or 'startup cloud credits'.",
        sources: []
      };
    }
    
    return { summary, sources };
  } catch (error) {
    console.error("Error getting real-time offers:", error);
    throw new Error("Failed to fetch real-time offers. The service might be temporarily unavailable.");
  }
}

// FIX: The file was truncated. This completes the function with best practices.
export async function processVoiceCommand(command: string): Promise<{ action: 'navigate' | 'speak' | 'unknown', path: string, responseText: string }> {
  
  const validRoutes = ALL_APP_ROUTES.map(r => `path: ${r.path}, description: ${(r as any).description ?? (r as any).title}`).join('\n');

  const systemInstruction = `You are a voice assistant for a web application called "Voice of Bharat". Your task is to interpret a user's voice command and determine the correct action.

The available pages in the application are:
${validRoutes}

Based on the user's command, you must decide one of three actions:
1.  'navigate': If the user wants to go to a specific page.
2.  'speak': If the user is asking a general question, greeting, or making small talk.
3.  'unknown': If you cannot understand the command.

You must respond with a JSON object that follows the provided schema. The 'responseText' should be a confirmation message to speak back to the user.

Examples:
- User command: "go to the farmers page" -> responds with JSON for action: "navigate", path: "/farmers", responseText: "Navigating to the farmers page."
- User command: "hello how are you" -> responds with JSON for action: "speak", path: "", responseText: "I'm doing well, thank you for asking! How can I help you?"
- User command: "what is the weather" -> responds with JSON for action: "speak", path: "", responseText: "I can help you navigate the app, but I can't check the weather."
- User command: "garble garble" -> responds with JSON for action: "unknown", path: "", responseText: "Sorry, I didn't understand that. Please try again."
`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            action: {
                type: Type.STRING,
                enum: ['navigate', 'speak', 'unknown'],
                description: "The action to take: navigate, speak, or unknown."
            },
            path: {
                type: Type.STRING,
                description: "The navigation path if action is 'navigate', otherwise an empty string."
            },
            responseText: {
                type: Type.STRING,
                description: "The text to speak back to the user as confirmation or response."
            },
        },
        required: ['action', 'path', 'responseText'],
    };

  try {
      const response = await ai.models.generateContent({
        model,
        contents: command,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema,
        }
      });
      return parseGeminiJson(response.text);
  } catch (error) {
      console.error("Error processing voice command:", error);
      return {
          action: 'unknown',
          path: '',
          responseText: "I'm having trouble understanding you right now. Please try again."
      };
  }
}