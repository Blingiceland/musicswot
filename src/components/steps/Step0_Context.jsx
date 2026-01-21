
import React from 'react';

export default function Step0_Context({ data, update, t }) {
    if (!t) return null;
    return (
        <div className="fade-in">
            <h2>{t.s0Title}</h2>
            <p dangerouslySetInnerHTML={{ __html: t.s0Desc }}></p>

            <label>{t.s0Name}</label>
            <input
                type="text"
                value={data.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="e.g. Bling Venue"
                autoFocus
            />

            <label>{t.s0Cap}</label>
            <input
                type="number"
                value={data.capacity}
                onChange={(e) => update('capacity', e.target.value)}
                placeholder="e.g. 500"
            />

            <label>{t.s0Years}</label>
            <input
                type="number"
                value={data.years}
                onChange={(e) => update('years', e.target.value)}
                placeholder="e.g. 8"
            />

            <label>{t.s0Events}</label>
            <input
                type="number"
                value={data.events}
                onChange={(e) => update('events', e.target.value)}
                placeholder="e.g. 12"
            />
        </div>
    );
}
