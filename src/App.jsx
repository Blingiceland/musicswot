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
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 100 }}>
        <button
          onClick={toggleLang}
          className="btn"
          style={{
            background: 'rgba(139, 92, 246, 0.2)', // Slight violet tint
            color: '#fff',
            fontSize: '1rem',
            fontWeight: '600',
            padding: '0.75rem 1.25rem',
            border: '2px solid #8b5cf6', // Primary color border
            borderRadius: '2rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.8)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <Languages size={20} />
          {lang === 'en' ? 'Breyta í Íslensku' : 'Switch to English'}
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
