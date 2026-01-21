
import React from 'react';
import LikertScale from '../LikertScale';

export default function Step3_External({ data, update, t }) {
    if (!t) return null;
    return (
        <div className="fade-in">
            <h2>{t.s3Title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.s3Desc }}></p>

            <label>{t.s3Trend}</label>
            <select value={data.marketTrend} onChange={(e) => update('marketTrend', e.target.value)}>
                <option value="Declining">{t.optDec}</option>
                <option value="Stable">{t.optStable}</option>
                <option value="Growing">{t.optGrow}</option>
            </select>

            <LikertScale
                label={t.s3Policy}
                value={data.policySupport}
                onChange={(v) => update('policySupport', v)}
            />

            <LikertScale
                label={t.s3Loc}
                value={data.locationStability}
                onChange={(v) => update('locationStability', v)}
            />

            <LikertScale
                label={t.s3Comp}
                value={data.competitionIntensity}
                onChange={(v) => update('competitionIntensity', v)}
            />

            <label>{t.s3Econ}</label>
            <select value={data.economicConditions} onChange={(e) => update('economicConditions', e.target.value)}>
                <option value="recession">{t.optRecess}</option>
                <option value="Stable">{t.optStab}</option>
                <option value="Strong">{t.optStrEcon}</option>
            </select>
        </div>
    );
}
