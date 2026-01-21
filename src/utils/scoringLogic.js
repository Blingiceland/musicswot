
// Thresholds for classification
const THRESHOLDS = {
  STRENGTH: 4, // >= 4 is Strength
  WEAKNESS: 2, // <= 2 is Weakness
  OPPORTUNITY: 4, // >= 4 is Opportunity
  THREAT: 2, // <= 2 is Threat
};

/**
 * Classifies responses into S, W, O, T
 * Uses translation keys (itemKey) instead of raw strings
 */
export function calculateSwot(responses, t) {
  const swot = {
    strengths: [],
    weaknesses: [],
    opportunities: [],
    threats: [],
  };

  // Helper to add item
  const addItem = (category, itemKey, score, source) => {
    swot[category].push({ item: t[itemKey], score, source });
  };

  const { financial, operations, external } = responses;

  // --- INTERNAL ---
  if (financial.cashReserves >= THRESHOLDS.STRENGTH) addItem('strengths', 'l_StrongCash', financial.cashReserves, 'financial');
  else if (financial.cashReserves <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'l_LowCash', financial.cashReserves, 'financial');

  if (financial.profitMargin >= THRESHOLDS.STRENGTH) addItem('strengths', 'l_HealthyMargin', financial.profitMargin, 'financial');
  else if (financial.profitMargin <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'l_LowMargin', financial.profitMargin, 'financial');

  if (financial.fundingAccess >= THRESHOLDS.STRENGTH) addItem('strengths', 'l_AccessCap', financial.fundingAccess, 'financial');
  else if (financial.fundingAccess <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'l_LimitFund', financial.fundingAccess, 'financial');

  if (operations.equipmentQuality >= THRESHOLDS.STRENGTH) addItem('strengths', 'l_PremEquip', operations.equipmentQuality, 'operations');
  else if (operations.equipmentQuality <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'l_AgeEquip', operations.equipmentQuality, 'operations');

  if (operations.teamExpertise >= THRESHOLDS.STRENGTH) addItem('strengths', 'l_ExpTeam', operations.teamExpertise, 'operations');
  else if (operations.teamExpertise <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'l_InexpTeam', operations.teamExpertise, 'operations');

  if (operations.processEfficiency >= THRESHOLDS.STRENGTH) addItem('strengths', 'l_EffOps', operations.processEfficiency, 'operations');
  else if (operations.processEfficiency <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'l_IneffOps', operations.processEfficiency, 'operations');

  if (operations.brandRecognition >= THRESHOLDS.STRENGTH) addItem('strengths', 'l_StrongBrand', operations.brandRecognition, 'operations');
  else if (operations.brandRecognition <= THRESHOLDS.WEAKNESS) addItem('weaknesses', 'l_WeakBrand', operations.brandRecognition, 'operations');

  // --- EXTERNAL ---
  if (external.marketTrend === 'Growing') addItem('opportunities', 'l_GrowMark', 5, 'external');
  else if (external.marketTrend === 'Declining') addItem('threats', 'l_DecMark', 1, 'external');

  if (external.policySupport >= THRESHOLDS.OPPORTUNITY) addItem('opportunities', 'l_SuppPol', external.policySupport, 'external');
  else if (external.policySupport <= THRESHOLDS.THREAT) addItem('threats', 'l_RestPol', external.policySupport, 'external');

  if (external.locationStability >= THRESHOLDS.OPPORTUNITY) addItem('opportunities', 'l_SecLoc', external.locationStability, 'external');
  else if (external.locationStability <= THRESHOLDS.THREAT) addItem('threats', 'l_UncertLoc', external.locationStability, 'external');

  if (external.competitionIntensity >= THRESHOLDS.OPPORTUNITY) addItem('opportunities', 'l_LowComp', external.competitionIntensity, 'external');
  else if (external.competitionIntensity <= THRESHOLDS.THREAT) addItem('threats', 'l_HighComp', external.competitionIntensity, 'external');

  if (external.economicConditions === 'Strong') addItem('opportunities', 'l_StrongEcon', 5, 'external');
  else if (external.economicConditions === 'recession') addItem('threats', 'l_EconDown', 1, 'external');

  return swot;
}

export function generatePriorities(swot, prioritiesData) {
  const { goal, concern, urgency } = prioritiesData;

  let allItems = [
    ...swot.strengths.map(i => ({ ...i, type: 'Strength' })),
    ...swot.weaknesses.map(i => ({ ...i, type: 'Weakness' })),
    ...swot.opportunities.map(i => ({ ...i, type: 'Opportunity' })),
    ...swot.threats.map(i => ({ ...i, type: 'Threat' }))
  ];

  allItems = allItems.map(item => {
    let score = 10;

    // Logic remains with English keys for goal/concern matching
    if (['Survive', 'Stabilize'].includes(goal) && ['Weakness', 'Threat'].includes(item.type)) score += 5;
    if (['Grow', 'Innovate'].includes(goal) && ['Strength', 'Opportunity'].includes(item.type)) score += 5;

    if (concern === 'Financial stability' && item.source === 'financial') score += 5;
    if (concern === 'Operational quality' && item.source === 'operations') score += 5;
    if (concern.includes('External') && item.source === 'external') score += 5;
    if (concern.includes('Market') && item.source === 'external') score += 5;

    if (urgency >= 4 && ['Weakness', 'Threat'].includes(item.type)) score += 3;

    return { ...item, priorityScore: score };
  });

  return allItems.sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 3);
}

export function getRecommendations(topPriorities, t) {
  return topPriorities.map(p => {
    if (p.type === 'Strength') return t.rec_Strength;
    if (p.type === 'Weakness') return t.rec_Weakness;
    if (p.type === 'Opportunity') return t.rec_Opportunity;
    if (p.type === 'Threat') return t.rec_Threat;
    return t.rec_General;
  });
}
