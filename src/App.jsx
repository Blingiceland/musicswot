import { useState } from 'react';
import './styles/index.css';
import WizardContainer from './components/WizardContainer';
import LandingPage from './components/LandingPage';
import { translations } from './utils/translations';
import { Languages } from 'lucide-react';

function App() {
  const [started, setStarted] = useState(false);
  const [lang, setLang] = useState('is'); // Default to Icelandic as requested? Or 'en' default? 
  // User asked "getum við haft wizardinn á íslensku", implying they want it in Icelandic.
  // I will make Icelandic default or give option. Let's make IS default based on request tone.

  const t = translations[lang];

  const toggleLang = () => setLang(l => l === 'en' ? 'is' : 'en');

  return (
    <div className="app-container">
      {/* Language Toggle - Absolute Top Right */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 100 }}>
        <button
          onClick={toggleLang}
          className="btn"
          style={{
            background: 'rgba(0,0,0,0.3)',
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Languages size={15} />
          {lang === 'en' ? 'Íslenska' : 'English'}
        </button>
      </div>

      {started ? (
        <WizardContainer lang={lang} t={t} />
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <LandingPage onStart={() => setStarted(true)} lang={lang} t={t} />
        </div>
      )}
    </div>
  );
}

export default App;
