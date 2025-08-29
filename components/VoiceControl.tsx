import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { processVoiceCommand } from '../services/geminiService';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoiceControl: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [displayTranscript, setDisplayTranscript] = useState('');
    
    const recognitionRef = useRef<any>(null);
    const navigate = useNavigate();
    const timeoutRef = useRef<number | null>(null);
    const finalTranscriptRef = useRef('');

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-IN';
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Text-to-speech is not supported by your browser.");
        }
    };

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-IN';

            recognition.onstart = () => {
                finalTranscriptRef.current = '';
                setDisplayTranscript('');
                setIsListening(true);
                setFeedback('Listening...');
            };

            recognition.onresult = (event: any) => {
                let interim = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscriptRef.current += event.results[i][0].transcript;
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }
                setDisplayTranscript(finalTranscriptRef.current + interim);
            };

            recognition.onend = () => {
                setIsListening(false);
                if (finalTranscriptRef.current.trim()) {
                    handleCommand(finalTranscriptRef.current);
                } else {
                    setFeedback(''); // Clear "Listening..." if nothing was said
                }
            };
            
            recognition.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                const errorMsg = 'Sorry, there was an error with speech recognition.';
                setFeedback(errorMsg);
                speak(errorMsg);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    const handleCommand = async (command: string) => {
        setFeedback(`Processing: "${command}"`);
        setDisplayTranscript(command);
        try {
            const result = await processVoiceCommand(command);
            speak(result.responseText);
            setFeedback(result.responseText);
            setDisplayTranscript('');

            if (result.action === 'navigate' && result.path) {
                setTimeout(() => navigate(result.path), 1000); 
            }
        } catch (error) {
            console.error(error);
            const errorMessage = "I'm sorry, I could not process the command.";
            setFeedback(errorMessage);
            speak(errorMessage);
        } finally {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => {
                setFeedback('');
            }, 5000);
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            const errorMsg = 'Voice recognition is not supported by your browser.';
            setFeedback(errorMsg);
            speak(errorMsg);
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            window.speechSynthesis.cancel();
            recognitionRef.current.start();
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-1/2 translate-x-1/2 z-50">
                <button
                    onClick={toggleListening}
                    className={`rounded-full p-5 shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${
                        isListening
                            ? 'bg-red-500 hover:bg-red-600 focus:ring-red-300 animate-pulse'
                            : 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-300'
                    }`}
                    aria-label={isListening ? 'Stop listening' : 'Start voice command'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                </button>
            </div>
            {(feedback) && (
                <div className="fixed bottom-28 right-1/2 translate-x-1/2 z-40 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl text-center transition-opacity duration-300">
                    <p className="font-semibold">{feedback}</p>
                    {isListening && <p className="text-gray-300 mt-1 italic">{displayTranscript}</p>}
                </div>
            )}
        </>
    );
};

export default VoiceControl;
