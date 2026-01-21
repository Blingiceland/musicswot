
import React from 'react';
import LikertScale from '../LikertScale';

export default function Step3_External({ data, update }) {
    return (
        <div className="fade-in">
            <h2>Step 3: Market & Environment</h2>
            <p>These are <strong>External Factors</strong> outside your direct control.</p>

            <label>Local Live Music Market Trend</label>
            <select value={data.marketTrend} onChange={(e) => update('marketTrend', e.target.value)}>
                <option value="Declining">Declining (Less demand)</option>
                <option value="Stable">Stable</option>
                <option value="Growing">Growing (More demand)</option>
            </select>

            <LikertScale
                label="Local Policy Support (1=Hostile, 5=Supportive)"
                value={data.policySupport}
                onChange={(v) => update('policySupport', v)}
            />

            <LikertScale
                label="Location Stability (1=High Risk, 5=Secure/Owned)"
                value={data.locationStability}
                onChange={(v) => update('locationStability', v)}
            />

            <LikertScale
                label="Competition Intensity (1=Oversaturated, 5=Open Market)"
                value={data.competitionIntensity}
                onChange={(v) => update('competitionIntensity', v)}
            />

            <label>Local Economic Conditions</label>
            <select value={data.economicConditions} onChange={(e) => update('economicConditions', e.target.value)}>
                <option value="recession">Recession / Declining</option>
                <option value="Stable">Stable</option>
                <option value="Strong">Strong / Growing</option>
            </select>
        </div>
    );
}
