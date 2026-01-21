
// Thresholds for classification
const THRESHOLDS = {
  STRENGTH: 4, // >= 4 is Strength
  WEAKNESS: 2, // <= 2 is Weakness
  OPPORTUNITY: 4, // >= 4 is Opportunity
  THREAT: 2, // <= 2 is Threat
};

/**
 * Classifies responses into S, W, O, T
 * @param {Object} responses - User responses by step
 */
export function calculateSwot(responses) {
  const swot = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
  };

  // Helper to add item
  const addItem = (category, item, score, source) => {
    swot[category].push({ item, score, source });
  };

  // --- INTERNAL ANALYSIS (Steps 1 & 2) ---
  const { financial, operations } = responses;

  // Financial Health
  // Q1.1 Cash Reserves (1-5 scale mapped: 1=0mo, 2=1-2mo, 3=3-4mo, 4=5-6mo, 5=7+mo)
  if (financial.cashReserves >= THRESHOLDS.STRENGTH) addItem('strengths', 'Strong Cash Reserves', financial.cashReserves, 'financial');
  else if (financial.cashReserves <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'Low Cash Reserves', financial.cashReserves, 'financial');

  // Q1.2 Profit Margin (1-5 scale)
  if (financial.profitMargin >= THRESHOLDS.STRENGTH) addItem('strengths', 'Healthy Profit Margins', financial.profitMargin, 'financial');
  else if (financial.profitMargin <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'Low/Negative Margins', financial.profitMargin, 'financial');

  // Q1.3 Funding Access
  if (financial.fundingAccess >= THRESHOLDS.STRENGTH) addItem('strengths', 'Access to Capital', financial.fundingAccess, 'financial');
  else if (financial.fundingAccess <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'Limited Funding Access', financial.fundingAccess, 'financial');

  // Operations
  // Q2.1 Equipment
  if (operations.equipmentQuality >= THRESHOLDS.STRENGTH) addItem('strengths', 'Premium Equipment', operations.equipmentQuality, 'operations');
  else if (operations.equipmentQuality <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'Aging/Poor Equipment', operations.equipmentQuality, 'operations');

  // Q2.2 Team
  if (operations.teamExpertise >= THRESHOLDS.STRENGTH) addItem('strengths', 'Experienced Team', operations.teamExpertise, 'operations');
  else if (operations.teamExpertise <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'Inexperienced Team', operations.teamExpertise, 'operations');

  // Q2.3 Process
  if (operations.processEfficiency >= THRESHOLDS.STRENGTH) addItem('strengths', 'Efficient Operations', operations.processEfficiency, 'operations');
  else if (operations.processEfficiency <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'Inefficient Processes', operations.processEfficiency, 'operations');

  // Q2.4 Brand
  if (operations.brandRecognition >= THRESHOLDS.STRENGTH) addItem('strengths', 'Strong Brand Recognition', operations.brandRecognition, 'operations');
  else if (operations.brandRecognition <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'Weak Brand Presence', operations.brandRecognition, 'operations');


  // --- EXTERNAL ANALYSIS (Step 3) ---
  const { external } = responses;

  // Q3.1 Market Trend
  if (external.marketTrend === 'Growing') addItem('opportunities', 'Growing Market', 5, 'external');
  else if (external.marketTrend === 'Declining') addItem('threats', 'Declining Market', 1, 'external');

  // Q3.2 Policy Support
  if (external.policySupport >= THRESHOLDS.OPPORTUNITY) addItem('opportunities', 'Supportive Local Policy', external.policySupport, 'external');
  else if (external.policySupport <= THRESHOLDS.THREAT) addItem('threats', 'Restrictive Policy Environment', external.policySupport, 'external');

  // Q3.3 Location Stability
  if (external.locationStability >= THRESHOLDS.OPPORTUNITY) addItem('opportunities', 'Secure Location/Lease', external.locationStability, 'external');
  else if (external.locationStability <= THRESHOLDS.THREAT) addItem('threats', 'Lease/Location Uncertainty', external.locationStability, 'external');

  // Q3.4 Competition (High score = Low competition = Opportunity)
  if (external.competitionIntensity >= THRESHOLDS.OPPORTUNITY) addItem('opportunities', 'Low Competition / Underserved Market', external.competitionIntensity, 'external');
  else if (external.competitionIntensity <= THRESHOLDS.THREAT) addItem('threats', 'High Competition Density', external.competitionIntensity, 'external');

  // Q3.5 Economy
  if (external.economicConditions === 'Strong') addItem('opportunities', 'Strong Local Economy', 5, 'external');
  else if (external.economicConditions === 'recession') addItem('threats', 'Economic Downturn', 1, 'external');

  return swot;
}

/**
 * Ranks items and generates top 3 priorities
 */
export function generatePriorities(swot, prioritiesData) {
  const { goal, concern, urgency } = prioritiesData;

  // Flatten all items
  let allItems = [
    ...swot.strengths.map(i => ({ ...i, type: 'Strength' })),
    ...swot.weaknesses.map(i => ({ ...i, type: 'Weakness' })),
    ...swot.opportunities.map(i => ({ ...i, type: 'Opportunity' })),
    ...swot.threats.map(i => ({ ...i, type: 'Threat' }))
  ];

  // Scoring
  allItems = allItems.map(item => {
    let score = 10; // Base

    // Goal Alignment (Simplified)
    // Survive/Stabilize -> prioritize Risks (W/T)
    // Grow/Innovate -> prioritize Advantages (S/O)
    if (['Survive', 'Stabilize'].includes(goal) && ['Weakness', 'Threat'].includes(item.type)) score += 5;
    if (['Grow', 'Innovate'].includes(goal) && ['Strength', 'Opportunity'].includes(item.type)) score += 5;

    // Concern Alignment
    if (concern === 'Financial stability' && item.source === 'financial') score += 5;
    if (concern === 'Operational quality' && item.source === 'operations') score += 5;
    if (concern.includes('External') && item.source === 'external') score += 5;
    if (concern.includes('Market') && item.source === 'external') score += 5;

    // Urgency
    if (urgency >= 4 && ['Weakness', 'Threat'].includes(item.type)) score += 3;

    return { ...item, priorityScore: score };
  });

  // Sort and take top 3
  return allItems.sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3);
}

export function getRecommendations(topPriorities) {
  return topPriorities.map(p => {
    if (p.type === 'Strength') return `Leverage "${p.item}" to capture new market opportunities.`;
    if (p.type === 'Weakness') return `Invest in fixing "${p.item}" to improve operational resilience.`;
    if (p.type === 'Opportunity') return `Act quickly to capitalize on "${p.item}" before competitors do.`;
    if (p.type === 'Threat') return `Develop a contingency plan for "${p.item}" to minimize risk.`;
    return `Monitor "${p.item}" closely.`;
  });
}
