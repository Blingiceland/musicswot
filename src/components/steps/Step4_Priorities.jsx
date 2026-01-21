
import React from 'react';
import LikertScale from '../LikertScale';

export default function Step4_Priorities({ data, update }) {
    return (
        <div className="fade-in">
            <h2>Step 4: Prioritization</h2>
            <p>What matters most to your venue right now?</p>

            <label>Primary Strategic Goal (Next 12 Mos)</label>
            <select value={data.goal} onChange={(e) => update('goal', e.target.value)}>
                <option value="Survive">Survive (Maintain operations)</option>
                <option value="Stabilize">Stabilize (Improve margins)</option>
                <option value="Grow">Grow (Expand events/revenue)</option>
                <option value="Innovate">Innovate (New formats)</option>
            </select>

            <label>Biggest Area of Concern</label>
            <select value={data.concern} onChange={(e) => update('concern', e.target.value)}>
                <option value="Financial stability">Financial Stability</option>
                <option value="Operational quality">Operational Quality</option>
                <option value="Market competition">Market Competition</option>
                <option value="External threats">External Threats (Policy/Lease)</option>
            </select>

            <LikertScale
                label="Urgency for Change (1=Comfortable, 5=Crisis)"
                value={data.urgency}
                onChange={(v) => update('urgency', v)}
            />
        </div>
    );
}
