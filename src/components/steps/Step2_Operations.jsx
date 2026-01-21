
import React from 'react';
import LikertScale from '../LikertScale';

export default function Step2_Operations({ data, update, t }) {
    if (!t) return null;
    return (
        <div className="fade-in">
            <h2>{t.s2Title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.s2Desc }}></p>

            <LikertScale
                label={t.s2Equip}
                value={data.equipmentQuality}
                onChange={(v) => update('equipmentQuality', v)}
            />

            <LikertScale
                label={t.s2Team}
                value={data.teamExpertise}
                onChange={(v) => update('teamExpertise', v)}
            />

            <LikertScale
                label={t.s2Proc}
                value={data.processEfficiency}
                onChange={(v) => update('processEfficiency', v)}
            />

            <LikertScale
                label={t.s2Brand}
                value={data.brandRecognition}
                onChange={(v) => update('brandRecognition', v)}
            />
        </div>
    );
}
