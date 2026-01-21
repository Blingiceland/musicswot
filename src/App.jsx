import { useState } from 'react';
import './styles/index.css';
import WizardContainer from './components/WizardContainer';
import LandingPage from './components/LandingPage';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app-container">
      {started ? (
        <WizardContainer />
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <LandingPage onStart={() => setStarted(true)} />
        </div>
      )}
    </div>
  );
}

export default App;
