
import React from 'react';
import LikertScale from '../LikertScale';

export default function Step1_Financial({ data, update }) {
    return (
        <div className="fade-in">
            <h2>Step 1: Financial Health</h2>
            <p>Financial health is an <strong>Internal Factor</strong>. Rate your current status.</p>

            <label>Cash Reserves (Months of Expenses)</label>
            <select value={data.cashReserves} onChange={(e) => update('cashReserves', Number(e.target.value))}>
                <option value={1}>0 months (Critical)</option>
                <option value={2}>1-2 months (Low)</option>
                <option value={3}>3-4 months (Moderate)</option>
                <option value={4}>5-6 months (Healthy)</option>
                <option value={5}>7+ months (Strong)</option>
            </select>

            <label>Typical Profit Margin per Event</label>
            <select value={data.profitMargin} onChange={(e) => update('profitMargin', Number(e.target.value))}>
                <option value={1}>Loss (Negative)</option>
                <option value={2}>Break-even (0%)</option>
                <option value={3}>Low (1-10%)</option>
                <option value={4}>Moderate (11-20%)</option>
                <option value={5}>Strong (20%+)</option>
            </select>

            <LikertScale
                label="Ability to Access Funding/Capital"
                value={data.fundingAccess}
                onChange={(v) => update('fundingAccess', v)}
            />
        </div>
    );
}
