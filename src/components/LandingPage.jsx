import React from 'react';
import { ArrowRight, BarChart3, ShieldCheck, Target } from 'lucide-react';

export default function LandingPage({ onStart }) {
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
                    <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Academic Edition v1.0</span>
                </div>

                <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
                    Master Your Venue's <br />
                    <span style={{
                        background: 'linear-gradient(to right, #a78bfa, #2dd4bf)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Strategic Potential</span>
                </h1>

                <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2.5rem', color: '#94a3b8' }}>
                    A professional SWOT analysis tool designed specifically for live music venues.
                    Identify strengths, mitigate threats, and plan for growth in minutes.
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
                    Start Free Analysis <ArrowRight />
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
                    title="Financial Health"
                    desc="Analyze your cash flow, margins, and funding access to ensure stability."
                />
                <FeatureCard
                    icon={<Target color="#2dd4bf" />}
                    title="Strategic Focus"
                    desc="Prioritize goals based on real data, managing internal and external factors."
                />
                <FeatureCard
                    icon={<ShieldCheck color="#f472b6" />}
                    title="Risk Mitigation"
                    desc="Identify blind spots in your operations and market environment."
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
