
import React from 'react';

export default function Step0_Context({ data, update }) {
    return (
        <div className="fade-in">
            <h2>Tell Us About Your Venue</h2>
            <p>Basic information to contextualize your analysis.</p>

            <label>Venue Name</label>
            <input
                type="text"
                value={data.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="e.g. Dillon Music Venue"
                autoFocus
            />

            <label>Capacity</label>
            <input
                type="number"
                value={data.capacity}
                onChange={(e) => update('capacity', e.target.value)}
                placeholder="e.g. 500"
            />

            <label>Years in Operation</label>
            <input
                type="number"
                value={data.years}
                onChange={(e) => update('years', e.target.value)}
                placeholder="e.g. 8"
            />

            <label>Average Events per Month</label>
            <input
                type="number"
                value={data.events}
                onChange={(e) => update('events', e.target.value)}
                placeholder="e.g. 12"
            />
        </div>
    );
}
