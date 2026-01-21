
export default function LikertScale({ label, value, onChange }) {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <label>{label}</label>
            <div className="likert-group">
                {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="likert-option">
                        <input
                            type="radio"
                            id={`${label}-${num}`}
                            checked={Number(value) === num}
                            onChange={() => onChange(num)}
                        />
                        <label htmlFor={`${label}-${num}`}>{num}</label>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '-1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span>Pool/Weak</span>
                <span>Excellent/Strong</span>
            </div>
        </div>
    );
}
