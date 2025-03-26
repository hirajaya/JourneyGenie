import { MapPin, Calendar, Users, Coffee } from 'lucide-react';

const provinceDestinations = {
    "Western Province": ["Colombo", "Negombo", "Mount Lavinia"],
    "Central Province": ["Kandy", "Nuwara Eliya", "Sigiriya", "Dambulla"],
    "Southern Province": ["Galle", "Mirissa", "Unawatuna", "Hikkaduwa"],
    "Northern Province": ["Jaffna", "Delft Island", "Point Pedro"],
    "Eastern Province": ["Trincomalee", "Pasikuda", "Arugam Bay", "Nilaweli Beach"],
    "North Western Province": ["Anuradhapura", "Wilpattu", "Yapahuwa"],
    "North Central Province": ["Polonnaruwa", "Minneriya", "Medirigiriya"],
    "Uva Province": ["Ella", "Bandarawela"],
  };
  
  const allProvinces = Object.keys(provinceDestinations);
  
  const steps = [
    { type: 'bot', text: "Hello, there! I am Journey Genie. Would you like me to create a tour package for you?", inputType: null, icon: Coffee },
    { type: 'bot', text: "Which province would you like to explore?", inputType: 'select', field: 'province', icon: MapPin },
    { type: 'bot', text: "Awesome! What destination do you have in mind?", inputType: 'select', field: 'destination', icon: MapPin },
    { type: 'bot', text: "When do you want to start your journey?", inputType: 'date', field: 'startDate', icon: Calendar },
    { type: 'bot', text: "When does your trip end?", inputType: 'date', field: 'endDate', icon: Calendar },
    { type: 'bot', text: "How many people are traveling?", inputType: 'number', field: 'numberOfPersons', icon: Users },
    
  ];
  

const wordToNumberMap = {
  one: 1, two: 2, three: 3, four: 4, five: 5,
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20
};

function convertWordsToNumbers(text) {
  return text.replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty)\b/gi, match => {
    return wordToNumberMap[match.toLowerCase()];
  });
}

function normalizeDate(text) {
  const cleaned = text.replace(/(st|nd|rd|th)/gi, '').replace(/\s+/g, ' ').trim();
  const parsed = new Date(cleaned);
  if (!isNaN(parsed)) {
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const day = String(parsed.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return '';
}

function normalizeVoiceInput(text, inputType) {
  const normalized = convertWordsToNumbers(text.toLowerCase());

  if (inputType === 'number') {
    const num = normalized.match(/\d+/);
    return num ? parseInt(num[0]) : '';
  }

  if (inputType === 'date') {
    return normalizeDate(normalized);
  }

  if (inputType === 'text') {
    const parts = normalized.match(/\d+/g);
    if (parts?.length >= 2) return `${parts[0]}-${parts[1]}`;
    return normalized;
  }

  return normalized;
}

// ✅ New function to convert YYYY-MM-DD to DD/MM/YYYY
function formatDateForBackend(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export {
    steps,
    provinceDestinations,
    allProvinces,
    normalizeVoiceInput,
};
