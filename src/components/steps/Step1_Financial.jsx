
import React from 'react';
import LikertScale from '../LikertScale';

export default function Step1_Financial({ data, update, t }) {
    if (!t) return null;
    return (
        <div className="fade-in">
            <h2>{t.s1Title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.s1Desc }}></p>

            <label>{t.s1Cash}</label>
            <select value={data.cashReserves} onChange={(e) => update('cashReserves', Number(e.target.value))}>
                <option value={1}>{t.opt0mo}</option>
                <option value={2}>{t.opt1_2mo}</option>
                <option value={3}>{t.opt3_4mo}</option>
                <option value={4}>{t.opt5_6mo}</option>
                <option value={5}>{t.opt7mo}</option>
            </select>

            <label>{t.s1Margin}</label>
            <select value={data.profitMargin} onChange={(e) => update('profitMargin', Number(e.target.value))}>
                <option value={1}>{t.optLoss}</option>
                <option value={2}>{t.optBreak}</option>
                <option value={3}>{t.optLow}</option>
                <option value={4}>{t.optMod}</option>
                <option value={5}>{t.optStrong}</option>
            </select>

            <LikertScale
                label={t.s1Fund}
                value={data.fundingAccess}
                onChange={(v) => update('fundingAccess', v)}
            />
        </div>
    );
}
