
import React, { useMemo } from 'react';
import { calculateSwot, generatePriorities, getRecommendations } from '../../utils/scoringLogic';
import { CheckCircle2, AlertTriangle, TrendingUp, AlertOctagon, RotateCcw } from 'lucide-react';

export default function Step5_Summary({ data, restart, t }) {

    const results = useMemo(() => {
        // Pass 't' to logic functions so they can access translated strings
        if (!t) return { swot: { strengths: [], weaknesses: [], opportunities: [], threats: [] }, priorities: [], recommendations: [] };

        const swot = calculateSwot({
            financial: data.financial,
            operations: data.operations,
            external: data.external
        }, t);

        // Priorities generation doesn't technically require 't' for logic, BUT it might if we used codes.
        // The current implementation uses English codes internally (keys in scoringLogic.js), so we just pass data.
        const priorities = generatePriorities(swot, data.priorities);

        // Recommendations need 't' to return translated template strings.
        const recommendations = getRecommendations(priorities, t);

        return { swot, priorities, recommendations };
    }, [data, t]);

    const { swot, priorities, recommendations } = results;

    if (!t) return null;

    return (
        <div className="fade-in">
            <div className="text-center" style={{ marginBottom: '2rem' }}>
                <h2>{t.s5Title}</h2>
                <p>{t.s5Sub} <strong>{data.venue.name || 'Venue'}</strong></p>
            </div>

            {/* SWOT Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {/* Strengths */}
                <div style={cardStyle('rgba(16, 185, 129, 0.1)', '#10b981')}>
                    <h3 style={{ fontSize: '1.2rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={20} /> {t.s5Strengths}
                    </h3>
                    <ul style={listStyle}>
                        {swot.strengths.length ? swot.strengths.map((s, i) => <li key={i}>{s.item}</li>) : <li>{t.s5None}</li>}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div style={cardStyle('rgba(245, 158, 11, 0.1)', '#f59e0b')}>
                    <h3 style={{ fontSize: '1.2rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={20} /> {t.s5Weaknesses}
                    </h3>
                    <ul style={listStyle}>
                        {swot.weaknesses.length ? swot.weaknesses.map((s, i) => <li key={i}>{s.item}</li>) : <li>{t.s5None}</li>}
                    </ul>
                </div>

                {/* Opportunities */}
                <div style={cardStyle('rgba(59, 130, 246, 0.1)', '#3b82f6')}>
                    <h3 style={{ fontSize: '1.2rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={20} /> {t.s5Opportunities}
                    </h3>
                    <ul style={listStyle}>
                        {swot.opportunities.length ? swot.opportunities.map((s, i) => <li key={i}>{s.item}</li>) : <li>{t.s5None}</li>}
                    </ul>
                </div>

                {/* Threats */}
                <div style={cardStyle('rgba(239, 68, 68, 0.1)', '#ef4444')}>
                    <h3 style={{ fontSize: '1.2rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertOctagon size={20} /> {t.s5Threats}
                    </h3>
                    <ul style={listStyle}>
                        {swot.threats.length ? swot.threats.map((s, i) => <li key={i}>{s.item}</li>) : <li>{t.s5None}</li>}
                    </ul>
                </div>
            </div>

            {/* Top 3 Priorities */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                <h3>🎯 {t.s5Top3}</h3>
                {/* We can optionally translate the goal value lookup if we want, but for now displaying the selected option is okay-ish,
            thought ideally we should map 'Survive' to t.linkSurvive here.
            Let's keep it simple for MVP. */}
                <p style={{ fontSize: '0.9rem' }}>{t.s5BasedOn} <strong>{data.priorities.goal}</strong>:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {priorities.map((p, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '0.5rem' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#8b5cf6' }}>#{i + 1}</div>
                            <div>
                                <div style={{ fontWeight: '600' }}>{p.item} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>({p.type})</span></div>
                                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{recommendations[i]}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="btn btn-secondary" onClick={restart} style={{ width: '100%', justifyContent: 'center' }}>
                <RotateCcw size={18} /> {t.startNew}
            </button>
        </div>
    );
}

const cardStyle = (bg, border) => ({
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: '0.75rem',
    padding: '1.25rem'
});

const listStyle = {
    paddingLeft: '1.2rem',
    margin: '1rem 0 0 0',
    fontSize: '0.95rem',
    color: 'rgba(255,255,255,0.9)'
};
