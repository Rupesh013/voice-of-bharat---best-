import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import BackButton from '../components/BackButton';
import { ICONS } from '../constants';
import { createInterviewChat, generateInterviewReport } from '../services/geminiService';
import type { InterviewConfig, InterviewReport, AnswerFeedback, ChatMessage } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Chat } from '@google/genai';

type InterviewState = 'setup' | 'active' | 'generating_report' | 'report_ready';

const AiInterviewStudioPage: React.FC = () => {
    const { t } = useTranslation();
    const [interviewState, setInterviewState] = useState<InterviewState>('setup');
    const [config, setConfig] = useState<InterviewConfig>({ type: 'Tech Job', difficulty: 'Intermediate' });
    
    const chatRef = useRef<Chat | null>(null);
    const [transcript, setTranscript] = useState<{ question: string; answer: string; feedback: AnswerFeedback | null }[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentAnswer, setCurrentAnswer] = useState('');
    const [currentFeedback, setCurrentFeedback] = useState<AnswerFeedback | null>(null);
    const [finalReport, setFinalReport] = useState<InterviewReport | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    // Setup Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-IN';
            recognition.onresult = (event: any) => {
                let interim = '';
                let final = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final += event.results[i][0].transcript;
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }
                setCurrentAnswer(final + interim);
            };
            recognition.onend = () => setIsListening(false);
            recognitionRef.current = recognition;
        }
    }, []);

    const startInterview = async () => {
        setIsLoading(true);
        setCurrentQuestion('');
        chatRef.current = createInterviewChat(config);
        
        try {
            const response = await chatRef.current.sendMessage({ message: "Start the interview."});
            setCurrentQuestion(response.text);
            setInterviewState('active');
        } catch (error) {
            console.error("Failed to start interview:", error);
            alert("Could not start the interview. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const submitAnswer = async () => {
        if (!currentAnswer.trim() || !chatRef.current) return;
        setIsLoading(true);
        
        const currentTranscriptItem = { question: currentQuestion, answer: currentAnswer, feedback: null };

        try {
            const response = await chatRef.current.sendMessage({ message: currentAnswer });
            const parts = response.text.split('|||');
            if (parts.length === 2) {
                const feedback: AnswerFeedback = JSON.parse(parts[0].trim());
                const nextQuestion = parts[1].trim();
                
                setCurrentFeedback(feedback);
                setCurrentQuestion(nextQuestion);
                setTranscript(prev => [...prev, { ...currentTranscriptItem, feedback }]);
            } else {
                 // Fallback if format is wrong
                 setCurrentQuestion(response.text);
                 setTranscript(prev => [...prev, currentTranscriptItem]);
            }
            setCurrentAnswer('');

        } catch (error) {
             console.error("Failed to submit answer:", error);
             alert("There was an error processing your answer. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const endInterview = async () => {
        setInterviewState('generating_report');
        try {
            const reportData = await generateInterviewReport(transcript.map(t => ({ question: t.question, answer: t.answer })));
            setFinalReport(reportData);
            setInterviewState('report_ready');
        } catch (error) {
            console.error("Failed to generate report:", error);
            alert("Could not generate the final report.");
            setInterviewState('active'); // Go back to interview screen
        }
    };
    
    const handleDownloadPdf = () => {
        const input = document.getElementById('report-content');
        if (input) {
            html2canvas(input, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save("Interview_Report.pdf");
            });
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setCurrentAnswer('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <section className="bg-blue-800 text-white py-20 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">{t('pages.interviewStudio.heroTitle')}</h1>
                <p className="mt-4 text-lg max-w-3xl mx-auto text-blue-200">{t('pages.interviewStudio.heroSubtitle')}</p>
            </section>
            
            <main className="container mx-auto px-4 sm:px-6 py-12">
                <BackButton to="/students" className="mb-8" />

                {interviewState === 'setup' && (
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                        <h2 className="text-2xl font-bold text-center mb-6">{t('pages.interviewStudio.setup.title')}</h2>
                        <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">{t('pages.interviewStudio.setup.typeLabel')}</label>
                                <select value={config.type} onChange={e => setConfig(c => ({...c, type: e.target.value as any}))} className="mt-1 block w-full bg-white border-gray-300 rounded-md p-3 text-gray-900">
                                    <option>Tech Job</option><option>Campus Placement</option><option>MBA</option><option>Startup Pitch</option>
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">{t('pages.interviewStudio.setup.difficultyLabel')}</label>
                                 <select value={config.difficulty} onChange={e => setConfig(c => ({...c, difficulty: e.target.value as any}))} className="mt-1 block w-full bg-white border-gray-300 rounded-md p-3 text-gray-900">
                                    <option>Beginner</option><option>Intermediate</option><option>Expert</option>
                                </select>
                            </div>
                        </div>
                        <button onClick={startInterview} disabled={isLoading} className="mt-6 w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400">
                           {isLoading ? "Preparing..." : t('pages.interviewStudio.setup.button')}
                        </button>
                    </div>
                )}
                
                {interviewState === 'active' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-gray-500">{t('pages.interviewStudio.active.question')} {transcript.length + 1}</h3>
                            <p className="text-2xl font-bold text-gray-800 mt-2">{currentQuestion}</p>
                        </div>
                        {currentFeedback && (
                             <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                                <h4 className="font-bold text-blue-800">{t('pages.interviewStudio.active.feedbackTitle')}</h4>
                                <div className="grid grid-cols-3 gap-2 text-center my-2">
                                    {Object.entries(currentFeedback.scores).map(([key, value]) => (
                                        <div key={key} className="bg-white p-2 rounded">
                                            <p className="text-xs uppercase text-gray-500">{t(`pages.interviewStudio.active.scores.${key}`)}</p>
                                            <p className="font-bold text-lg text-blue-700">{value}/100</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-700">{currentFeedback.feedback}</p>
                            </div>
                        )}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                             <label className="block text-lg font-semibold text-gray-700 mb-2">{t('pages.interviewStudio.active.yourAnswer')}</label>
                             <textarea value={currentAnswer} onChange={e => setCurrentAnswer(e.target.value)} rows={5} className="w-full bg-white border-gray-300 rounded-md p-3 text-gray-900" placeholder="Type or record your answer..." />
                             <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <button onClick={toggleListening} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md font-bold transition-colors ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                                    <ICONS.Interview className="w-6 h-6" />
                                    {isListening ? t('pages.interviewStudio.active.recording') : t('pages.interviewStudio.active.recordButton')}
                                </button>
                                <button onClick={submitAnswer} disabled={isLoading || !currentAnswer} className="flex-1 py-3 bg-green-600 text-white font-bold rounded-md disabled:bg-gray-400">
                                    {isLoading ? t('pages.interviewStudio.active.processing') : t('pages.interviewStudio.active.nextQuestion')}
                                </button>
                            </div>
                        </div>
                        <div className="text-center">
                            <button onClick={endInterview} className="px-6 py-2 text-sm bg-red-100 text-red-700 font-semibold rounded-full hover:bg-red-200">{t('pages.interviewStudio.active.endButton')}</button>
                        </div>
                    </div>
                )}
                
                {(interviewState === 'generating_report' || interviewState === 'report_ready') && (
                     <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                        {isLoading || interviewState === 'generating_report' ? (
                            <p className="text-center text-lg animate-pulse">{t('pages.interviewStudio.report.generating')}</p>
                        ) : (
                            finalReport && (
                                <div id="report-content" className="p-4">
                                    <h2 className="text-3xl font-bold text-center mb-6">{t('pages.interviewStudio.report.title')}</h2>
                                    <div className="text-center mb-6">
                                        <p className="text-gray-500">{t('pages.interviewStudio.report.overallScore')}</p>
                                        <p className="text-6xl font-bold text-blue-600">{finalReport.overallScore}/100</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                                        <div className="bg-green-50 p-4 rounded">
                                            <h4 className="font-bold text-green-800">{t('pages.interviewStudio.report.strengths')}</h4>
                                            <ul className="list-disc list-inside text-sm mt-2">{finalReport.strengths.map((s,i) => <li key={i}>{s}</li>)}</ul>
                                        </div>
                                         <div className="bg-red-50 p-4 rounded">
                                            <h4 className="font-bold text-red-800">{t('pages.interviewStudio.report.weaknesses')}</h4>
                                            <ul className="list-disc list-inside text-sm mt-2">{finalReport.weaknesses.map((w,i) => <li key={i}>{w}</li>)}</ul>
                                        </div>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded">
                                        <h4 className="font-bold text-yellow-800">{t('pages.interviewStudio.report.resources')}</h4>
                                        <ul className="list-disc list-inside text-sm mt-2">{finalReport.recommendedResources.map((r,i) => <li key={i}><a href={r.link} className="text-blue-600 hover:underline">{r.name}</a></li>)}</ul>
                                    </div>
                                </div>
                            )
                        )}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => setInterviewState('setup')} className="px-6 py-3 bg-gray-200 font-bold rounded-md">{t('pages.interviewStudio.report.startOver')}</button>
                            <button onClick={handleDownloadPdf} disabled={!finalReport} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-md disabled:bg-gray-400">{t('pages.interviewStudio.report.download')}</button>
                        </div>
                     </div>
                )}

            </main>
        </div>
    );
};

export default AiInterviewStudioPage;