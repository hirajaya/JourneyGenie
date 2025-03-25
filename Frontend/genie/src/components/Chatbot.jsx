import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Send, ArrowLeft, Mic, MicOff } from 'lucide-react';
import { steps, allProvinces, provinceDestinations, normalizeVoiceInput } from './VoiceUtils.jsx';
import Sidebar from '../components/SideBar.jsx';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [inputs, setInputs] = useState({});
  const [packageData, setPackageData] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [showBackButton, setShowBackButton] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('idle');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceTranscript(transcript);

      const currentStep = steps[stepIndex];
      const normalizedInput = normalizeVoiceInput(transcript, currentStep.inputType);
      setUserInput(normalizedInput);
      setVoiceStatus('completed');
    };

    recognition.onerror = (event) => {
      setVoiceStatus('idle');
      alert('Speech error: ' + event.error);
    };

    recognition.onend = () => setVoiceStatus('idle');
    return () => recognition.stop();
  }, [stepIndex]);

  useEffect(() => {
    if (!isInitialized && stepIndex === 0) {
      const step = steps[stepIndex];
      if (step.type === 'bot') {
        setTimeout(() => {
          setMessages([{ sender: 'bot', text: step.text, inputType: step.inputType, field: step.field }]);
          setIsInitialized(true);
        }, 500);
      }
    } else if (isInitialized && stepIndex < steps.length) {
      const step = steps[stepIndex];
      if (step.type === 'bot') {
        setTimeout(() => {
          setMessages(prev => [...prev, { sender: 'bot', text: step.text, inputType: step.inputType, field: step.field }]);
        }, 500);
      }
    }
  }, [stepIndex]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) return;
    if (voiceStatus === 'idle') {
      setVoiceStatus('listening');
      setVoiceTranscript('');
      recognitionRef.current.start();
    } else {
      recognitionRef.current.stop();
      setVoiceStatus('idle');
    }
  };

  const handleUserResponse = async (value) => {
    const currentStep = steps[stepIndex];
    setMessages(prev => [...prev, { sender: 'user', text: value }]);

    const updatedInputs = { ...inputs };
    if (currentStep.inputType === 'select') updatedInputs[currentStep.field] = value;
    else if (currentStep.field) updatedInputs[currentStep.field] = value;

    setInputs(updatedInputs);
    setUserInput('');
    setVoiceStatus('idle');

    const nextStepIndex = stepIndex + 1;

    if (nextStepIndex === steps.length) {
      try {
        const res = await axios.post('http://localhost:5000/api/custom/create', updatedInputs);
        setPackageData(res.data);
        setMessages(prev => [...prev, {
          sender: 'bot',
          text: `Here's your package: ${res.data.packageName} - ${res.data.duration}, Rs. ${res.data.totalPrice}`
        }]);
        setShowBackButton(true);
      } catch (err) {
        console.error(err);
        setMessages(prev => [...prev, { sender: 'bot', text: 'Something went wrong!' }]);
      }
    } else {
      setStepIndex(nextStepIndex);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    handleUserResponse(userInput.trim());
  };

  const handleReset = () => {
    setMessages([]);
    setStepIndex(0);
    setInputs({});
    setPackageData(null);
    setShowBackButton(false);
    setVoiceStatus('idle');
    recognitionRef.current?.stop();
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/profile-bg.jpg')" }}
    >
      <div className="absolute inset-0 backdrop-blur-lg bg-black/30 z-0" />
      <Sidebar />

      <div className="ml-64 w-full max-w-6xl relative z-10 flex flex-col py-8 px-6">
        <div className="bg-pink-600 p-4 rounded-xl text-white shadow-md flex items-center justify-between">
          {showBackButton && (
            <button onClick={handleReset} className="hover:bg-pink-700 p-2 rounded-full transition">
              <ArrowLeft />
            </button>
          )}
          <div className="flex-grow text-center">
            <h1 className="text-2xl font-bold tracking-wider">JourneyGenie</h1>
            <p className="text-sm text-pink-100">Tell us what you want and let us plan your ideal trip!</p>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto mt-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-xl max-w-[80%] shadow-md ${msg.sender === 'user' ? 'bg-pink-600 text-white' : 'bg-white text-gray-800'}`}>
                {msg.text}
                {msg.inputType === 'select' && (
                  <div className="mt-3 grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                    {msg.field === 'province'
                      ? allProvinces.map(prov => (
                          <button key={prov} onClick={() => handleUserResponse(prov)} className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200 transition">
                            {prov}
                          </button>
                        ))
                      : msg.field === 'destination' && inputs.province
                      ? provinceDestinations[inputs.province]?.map(dest => (
                          <button key={dest} onClick={() => handleUserResponse(dest)} className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200 transition">
                            {dest}
                          </button>
                        ))
                      : null}
                  </div>
                )}
              </div>
            </div>
          ))}

          {packageData && (
            <div className="mt-6 p-5 bg-white rounded-xl shadow-lg text-gray-800">
              <h2 className="text-xl font-bold mb-3 text-pink-600">Your Travel Package</h2>
              <p><strong>{packageData.packageName}</strong></p>
              <p>{packageData.packageDescription}</p>
              <p>Duration: {packageData.duration}</p>
              <p>Price per Person: Rs. {packageData.pricePerPerson}</p>
              <p>Total Price: Rs. {packageData.totalPrice}</p>
              <button className="mt-4 w-full bg-pink-600 text-white px-4 py-3 rounded-lg hover:scale-[1.02] transition">
                Book Now
              </button>
            </div>
          )}

          <div ref={chatRef}></div>
        </div>

        {stepIndex < steps.length && steps[stepIndex].inputType !== 'select' && (
          <form onSubmit={handleSubmit} className="bg-white border-t mt-6 p-4 flex items-center gap-2 rounded-xl">
            <input
              type={steps[stepIndex].inputType || 'text'}
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              className="flex-1 p-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-pink-500 focus:outline-none"
              placeholder="Type your answer or use mic..."
              required
            />
            <button type="submit" className="bg-pink-600 text-white p-3 rounded-full hover:scale-105 transition">
              <Send className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-3 rounded-full transition ${voiceStatus === 'listening' ? 'bg-red-500 text-white' : 'bg-white text-pink-600 border border-pink-600'}`}
            >
              {voiceStatus === 'listening' ? <MicOff /> : <Mic />}
            </button>
          </form>
        )}
        {voiceStatus === 'listening' && <p className="text-sm text-pink-200 mt-2 text-center">Listening... Speak now</p>}
        {voiceTranscript && <p className="text-sm text-pink-500 mt-1 text-center">Heard: {voiceTranscript}</p>}
      </div>
    </div>
  );
}
