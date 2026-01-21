
import React from 'react';
import LikertScale from '../LikertScale';

export default function Step4_Priorities({ data, update, t }) {
    if (!t) return null;
    return (
        <div className="fade-in">
            <h2>{t.s4Title}</h2>
            <p>{t.s4Desc}</p>

            <label>{t.s4Goal}</label>
            <select value={data.goal} onChange={(e) => update('goal', e.target.value)}>
                <option value="Survive">{t.linkSurvive}</option>
                <option value="Stabilize">{t.linkStabilize}</option>
                <option value="Grow">{t.linkGrow}</option>
                <option value="Innovate">{t.linkInnovate}</option>
            </select>

            <label>{t.s4Concern}</label>
            <select value={data.concern} onChange={(e) => update('concern', e.target.value)}>
                <option value="Financial stability">{t.conFin}</option>
                <option value="Operational quality">{t.conOps}</option>
                <option value="Market competition">{t.conComp}</option>
                <option value="External threats">{t.conExt}</option>
            </select>

            <LikertScale
                label={t.s4Urgency}
                value={data.urgency}
                onChange={(v) => update('urgency', v)}
            />
        </div>
    );
}
