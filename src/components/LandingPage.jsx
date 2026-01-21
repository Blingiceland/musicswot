import React from 'react';
import { ArrowRight, BarChart3, ShieldCheck, Target } from 'lucide-react';

export default function LandingPage({ onStart, t }) {
    // Guard against undefined t during hot reload or init
    if (!t) return null;

    return (
        <div className="fade-in" style={{ textAlign: 'center' }}>
            {/* Hero Section */}
            <div style={{ marginBottom: '4rem', paddingTop: '2rem' }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(139, 92, 246, 0.1)',
                    padding: '0.5rem 1rem',
                    borderRadius: '2rem',
                    color: '#a78bfa',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(139, 92, 246, 0.2)'
                }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{t.badge}</span>
                </div>

                <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                    {t.heroTitle} <br />
                    <span style={{
                        background: 'linear-gradient(to right, #a78bfa, #2dd4bf)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>{t.heroHighlight}</span>
                </h1>

                <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem', color: '#94a3b8' }}>
                    {t.heroSubtitle}
                </p>

                <button
                    className="btn btn-primary"
                    onClick={onStart}
                    style={{
                        fontSize: '1.1rem',
                        padding: '1rem 2rem',
                        boxShadow: '0 0 30px -5px rgba(139, 92, 246, 0.5)'
                    }}
                >
                    {t.startBtn} <ArrowRight />
                </button>
            </div>

            {/* Features Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                textAlign: 'left'
            }}>
                <FeatureCard
                    icon={<BarChart3 color="#a78bfa" />}
                    title={t.feat1Title}
                    desc={t.feat1Desc}
                />
                <FeatureCard
                    icon={<Target color="#2dd4bf" />}
                    title={t.feat2Title}
                    desc={t.feat2Desc}
                />
                <FeatureCard
                    icon={<ShieldCheck color="#f472b6" />}
                    title={t.feat3Title}
                    desc={t.feat3Desc}
                />
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div style={{
            background: 'rgba(30, 41, 59, 0.4)',
            padding: '1.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            transition: 'transform 0.2s',
            cursor: 'default'
        }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ marginBottom: '1rem' }}>{icon}</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#f8fafc' }}>{title}</h3>
            <p style={{ fontSize: '0.95rem', margin: 0 }}>{desc}</p>
        </div>
    );
}
