import { useState } from 'react';
import { ArrowLeft, ArrowRight, BarChart3 } from 'lucide-react';

// Steps
import Step0_Context from './steps/Step0_Context';
import Step1_Financial from './steps/Step1_Financial';
import Step2_Operations from './steps/Step2_Operations';
import Step3_External from './steps/Step3_External';
import Step4_Priorities from './steps/Step4_Priorities';
import Step5_Summary from './steps/Step5_Summary';

const TOTAL_STEPS = 5; // 0 to 4 are input steps, 5 is summary

export default function WizardContainer() {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        venue: { name: '', capacity: '', years: '', events: '' },
        financial: { cashReserves: 3, profitMargin: 3, fundingAccess: 3 },
        operations: { equipmentQuality: 3, teamExpertise: 3, processEfficiency: 3, brandRecognition: 3 },
        external: { marketTrend: 'Stable', policySupport: 3, locationStability: 3, competitionIntensity: 3, economicConditions: 'Stable' },
        priorities: { goal: 'Stabilize', concern: 'Financial stability', urgency: 3 }
    });

    const updateData = (section, field, value) => {
        setData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const nextStep = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
    const prevStep = () => setStep(s => Math.max(0, s - 1));

    // Determine what component to render
    const renderStep = () => {
        switch (step) {
            case 0: return <Step0_Context data={data.venue} update={(f, v) => updateData('venue', f, v)} />;
            case 1: return <Step1_Financial data={data.financial} update={(f, v) => updateData('financial', f, v)} />;
            case 2: return <Step2_Operations data={data.operations} update={(f, v) => updateData('operations', f, v)} />;
            case 3: return <Step3_External data={data.external} update={(f, v) => updateData('external', f, v)} />;
            case 4: return <Step4_Priorities data={data.priorities} update={(f, v) => updateData('priorities', f, v)} />;
            case 5: return <Step5_Summary data={data} restart={() => setStep(0)} />;
            default: return null;
        }
    };

    const progress = (step / TOTAL_STEPS) * 100;

    return (
        <div className="wizard-card">
            <header style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <BarChart3 className="text-primary" size={28} style={{ color: '#8b5cf6' }} />
                    <h1>SWOT Wizard</h1>
                </div>
                <p>Strategic Analysis for Live Music Venues</p>

                {/* Progress Bar */}
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '1rem', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: '#8b5cf6', transition: 'width 0.3s ease' }} />
                </div>
            </header>

            <main>
                {renderStep()}
            </main>

            {step < TOTAL_STEPS && (
                <footer style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                    <button className="btn btn-secondary" onClick={prevStep} disabled={step === 0} style={{ opacity: step === 0 ? 0.5 : 1 }}>
                        <ArrowLeft size={18} /> Back
                    </button>
                    <button className="btn btn-primary" onClick={nextStep} style={{ width: 'auto' }}>
                        {step === TOTAL_STEPS - 1 ? 'Generate Analysis' : 'Next Step'} <ArrowRight size={18} />
                    </button>
                </footer>
            )}
        </div>
    );
}
