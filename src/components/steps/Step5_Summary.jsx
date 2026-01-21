
import React, { useMemo } from 'react';
import { calculateSwot, generatePriorities, getRecommendations } from '../../utils/scoringLogic';
import { CheckCircle2, AlertTriangle, TrendingUp, AlertOctagon, RotateCcw } from 'lucide-react';

export default function Step5_Summary({ data, restart }) {

    const results = useMemo(() => {
        const swot = calculateSwot({
            financial: data.financial,
            operations: data.operations,
            external: data.external
        });
        const priorities = generatePriorities(swot, data.priorities);
        const recommendations = getRecommendations(priorities);
        return { swot, priorities, recommendations };
    }, [data]);

    const { swot, priorities, recommendations } = results;

    return (
        <div className="fade-in">
            <div className="text-center" style={{ marginBottom: '2rem' }}>
                <h2>Analysis Complete</h2>
                <p>Strategic Snapshot for <strong>{data.venue.name || 'Your Venue'}</strong></p>
            </div>

            {/* SWOT Matrix */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                {/* Strengths */}
                <div style={cardStyle('rgba(16, 185, 129, 0.1)', '#10b981')}>
                    <h3 style={{ fontSize: '1.2rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 size={20} /> Strengths
                    </h3>
                    <ul style={listStyle}>
                        {swot.strengths.length ? swot.strengths.map((s, i) => <li key={i}>{s.item}</li>) : <li>No major strengths identified</li>}
                    </ul>
                </div>

                {/* Weaknesses */}
                <div style={cardStyle('rgba(245, 158, 11, 0.1)', '#f59e0b')}>
                    <h3 style={{ fontSize: '1.2rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={20} /> Weaknesses
                    </h3>
                    <ul style={listStyle}>
                        {swot.weaknesses.length ? swot.weaknesses.map((s, i) => <li key={i}>{s.item}</li>) : <li>No major weaknesses identified</li>}
                    </ul>
                </div>

                {/* Opportunities */}
                <div style={cardStyle('rgba(59, 130, 246, 0.1)', '#3b82f6')}>
                    <h3 style={{ fontSize: '1.2rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={20} /> Opportunities
                    </h3>
                    <ul style={listStyle}>
                        {swot.opportunities.length ? swot.opportunities.map((s, i) => <li key={i}>{s.item}</li>) : <li>No major opportunities identified</li>}
                    </ul>
                </div>

                {/* Threats */}
                <div style={cardStyle('rgba(239, 68, 68, 0.1)', '#ef4444')}>
                    <h3 style={{ fontSize: '1.2rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertOctagon size={20} /> Threats
                    </h3>
                    <ul style={listStyle}>
                        {swot.threats.length ? swot.threats.map((s, i) => <li key={i}>{s.item}</li>) : <li>No major threats identified</li>}
                    </ul>
                </div>
            </div>

            {/* Top 3 Priorities */}
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                <h3>🎯 Top 3 Strategic Priorities</h3>
                <p style={{ fontSize: '0.9rem' }}>Based on your goal to <strong>{data.priorities.goal}</strong>:</p>
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
                <RotateCcw size={18} /> Start New Analysis
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
