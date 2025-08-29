import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { processVoiceCommand } from '../services/geminiService';

// Add SpeechRecognition types for browsers that support it
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const VoiceControl: React.FC = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const recognitionRef = useRef<any>(null);
    const navigate = useNavigate();
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false; // Stop after a pause
            recognition.interimResults = true;
            recognition.lang = 'en-IN'; // Set to Indian English

            recognition.onstart = () => {
                setIsListening(true);
                setFeedback('Listening...');
                setTranscript('');
            };

            recognition.onresult = (event: any) => {
                let interimTranscript = '';
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setTranscript(finalTranscript || interimTranscript);
            };

            recognition.onend = () => {
                setIsListening(false);
                setFeedback('');
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
            };
            
            recognition.onerror = (event: any) => {
                console.error('Speech recognition error', event.error);
                setFeedback('Sorry, there was an error. Please try again.');
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        }
    }, []);

    // Effect to process the final transcript
    useEffect(() => {
        if (!isListening && transcript.trim()) {
            handleCommand(transcript);
        }
    }, [isListening, transcript]);

    const handleCommand = async (command: string) => {
        setFeedback(`Processing: "${command}"`);
        try {
            const result = await processVoiceCommand(command);
            if (result.action === 'navigate' && result.path) {
                setFeedback(`Navigating to ${result.path}...`);
                navigate(result.path);
            } else {
                setFeedback(`Sorry, I didn't understand that. Please try again.`);
            }
        } catch (error) {
            console.error(error);
            setFeedback('Could not process the command.');
        } finally {
            // Clear feedback after a few seconds
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = window.setTimeout(() => setFeedback(''), 4000);
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) {
            setFeedback('Voice recognition is not supported by your browser.');
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
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
            {(isListening || feedback) && (
                <div className="fixed bottom-28 right-1/2 translate-x-1/2 z-40 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl text-center">
                    <p className="font-semibold">{feedback}</p>
                    {isListening && <p className="text-gray-300 mt-1 italic">{transcript}</p>}
                </div>
            )}
        </>
    );
};

export default VoiceControl;
