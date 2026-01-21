
import React from 'react';
import LikertScale from '../LikertScale';

export default function Step2_Operations({ data, update }) {
    return (
        <div className="fade-in">
            <h2>Step 2: Operations & Capabilities</h2>
            <p>Operations are <strong>Internal Factors</strong> you control.</p>

            <LikertScale
                label="Quality of Sound & Lighting Equipment"
                value={data.equipmentQuality}
                onChange={(v) => update('equipmentQuality', v)}
            />

            <LikertScale
                label="Team Expertise & Experience"
                value={data.teamExpertise}
                onChange={(v) => update('teamExpertise', v)}
            />

            <LikertScale
                label="Process Efficiency (Setup, Execution)"
                value={data.processEfficiency}
                onChange={(v) => update('processEfficiency', v)}
            />

            <LikertScale
                label="Brand Recognition in Community"
                value={data.brandRecognition}
                onChange={(v) => update('brandRecognition', v)}
            />
        </div>
    );
}
