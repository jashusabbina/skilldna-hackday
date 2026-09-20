export const SKILL_IDS = [
  'analytical_thinking','problem_solving','creativity','communication','leadership','collaboration',
  'adaptability','decision_making','attention_to_detail','technical_aptitude','empathy','planning_organization'
];

const P = {
  analytical:       [0.90,0.82,0.45,0.55,0.30,0.45,0.62,0.72,0.82,0.58,0.22,0.55],
  problemSolver:    [0.84,0.94,0.52,0.45,0.30,0.48,0.72,0.66,0.70,0.75,0.20,0.48],
  data:             [0.98,0.90,0.54,0.48,0.25,0.42,0.62,0.72,0.88,0.96,0.18,0.58],
  software:         [0.84,0.94,0.68,0.46,0.28,0.58,0.80,0.58,0.78,0.98,0.18,0.62],
  engineering:      [0.91,0.92,0.48,0.44,0.33,0.55,0.65,0.68,0.88,0.94,0.18,0.66],
  research:         [0.96,0.88,0.65,0.50,0.28,0.42,0.75,0.68,0.84,0.80,0.24,0.52],
  design:           [0.62,0.72,0.96,0.78,0.30,0.64,0.86,0.55,0.58,0.45,0.66,0.48],
  creative:         [0.48,0.62,0.98,0.82,0.34,0.58,0.90,0.48,0.46,0.32,0.52,0.40],
  product:          [0.78,0.76,0.80,0.88,0.72,0.78,0.84,0.82,0.56,0.58,0.58,0.82],
  leader:           [0.62,0.70,0.60,0.90,0.94,0.84,0.78,0.88,0.54,0.42,0.60,0.88],
  people:           [0.42,0.52,0.52,0.92,0.72,0.92,0.76,0.65,0.42,0.28,0.98,0.72],
  educator:         [0.52,0.60,0.70,0.96,0.76,0.88,0.78,0.68,0.54,0.30,0.92,0.74],
  healthcare:       [0.78,0.82,0.52,0.74,0.52,0.72,0.70,0.72,0.90,0.60,0.86,0.64],
  finance:          [0.94,0.76,0.40,0.54,0.36,0.40,0.56,0.86,0.92,0.54,0.24,0.68],
  law:              [0.88,0.72,0.48,0.86,0.54,0.58,0.66,0.82,0.92,0.34,0.46,0.68],
  operations:       [0.76,0.78,0.40,0.56,0.58,0.72,0.68,0.78,0.90,0.56,0.28,0.96],
  sales:            [0.50,0.66,0.66,0.96,0.78,0.74,0.88,0.76,0.40,0.44,0.80,0.62],
  spatial:          [0.78,0.74,0.82,0.62,0.52,0.60,0.70,0.68,0.80,0.72,0.34,0.78]
};

const names = [
  ['Data & Analytics','Data Scientist','data'],['Data & Analytics','Data Analyst','data'],['Data & Analytics','BI Analyst','analytical'],['Data & Analytics','Data Engineer','software'],['Data & Analytics','ML Engineer','software'],['Data & Analytics','AI Engineer','software'],['Data & Analytics','ML Research Scientist','research'],['Data & Analytics','Quantitative Analyst','finance'],['Data & Analytics','Operations Research Analyst','operations'],['Data & Analytics','Statistician','data'],['Data & Analytics','Econometrician','finance'],['Data & Analytics','Decision Scientist','analytical'],
  ['Software & Engineering','Software Engineer','software'],['Software & Engineering','Backend Engineer','software'],['Software & Engineering','Frontend Engineer','software'],['Software & Engineering','Full Stack Developer','software'],['Software & Engineering','Mobile App Developer','software'],['Software & Engineering','DevOps Engineer','software'],['Software & Engineering','Cloud Engineer','software'],['Software & Engineering','Systems Engineer','engineering'],['Software & Engineering','Embedded Systems Engineer','engineering'],['Software & Engineering','Robotics Engineer','engineering'],['Software & Engineering','QA Automation Engineer','engineering'],['Software & Engineering','Cybersecurity Engineer','engineering'],
  ['Design & Creative','UX Designer','design'],['Design & Creative','UI Designer','design'],['Design & Creative','Product Designer','design'],['Design & Creative','UX Researcher','people'],['Design & Creative','Interaction Designer','design'],['Design & Creative','Service Designer','product'],['Design & Creative','Graphic Designer','creative'],['Design & Creative','Motion Designer','creative'],['Design & Creative','3D Artist','creative'],['Design & Creative','Game Designer','creative'],['Design & Creative','Content Designer','design'],['Design & Creative','Brand Designer','creative'],
  ['Business & Product','Product Manager','product'],['Business & Product','Product Analyst','analytical'],['Business & Product','Program Manager','leader'],['Business & Product','Business Analyst','analytical'],['Business & Product','Strategy Analyst','analytical'],['Business & Product','Management Consultant','leader'],['Business & Product','Operations Manager','operations'],['Business & Product','Project Manager','leader'],['Business & Product','Growth Manager','product'],['Business & Product','Customer Success Manager','people'],['Business & Product','Revenue Operations Manager','operations'],['Business & Product','Innovation Manager','product'],
  ['Marketing & Communication','Marketing Analyst','analytical'],['Marketing & Communication','Digital Marketing Specialist','sales'],['Marketing & Communication','SEO Specialist','analytical'],['Marketing & Communication','Content Strategist','design'],['Marketing & Communication','Copywriter','creative'],['Marketing & Communication','Technical Writer','design'],['Marketing & Communication','Communications Specialist','sales'],['Marketing & Communication','PR Specialist','sales'],['Marketing & Communication','Social Media Manager','creative'],['Marketing & Communication','Market Research Analyst','analytical'],['Marketing & Communication','Brand Strategist','product'],['Marketing & Communication','Community Manager','people'],
  ['Finance & Economics','Financial Analyst','finance'],['Finance & Economics','Investment Analyst','finance'],['Finance & Economics','Corporate Finance Analyst','finance'],['Finance & Economics','FP&A Analyst','finance'],['Finance & Economics','Risk Analyst','finance'],['Finance & Economics','Credit Analyst','finance'],['Finance & Economics','Treasury Analyst','finance'],['Finance & Economics','Portfolio Analyst','finance'],['Finance & Economics','Financial Planner','finance'],['Finance & Economics','Actuary','data'],['Finance & Economics','Economist','finance'],['Finance & Economics','FinTech Product Analyst','product'],
  ['People & Education','HR Analyst','people'],['People & Education','Talent Acquisition Specialist','people'],['People & Education','Learning & Development Specialist','educator'],['People & Education','Organizational Development Consultant','people'],['People & Education','Career Counselor','people'],['People & Education','Instructional Designer','educator'],['People & Education','Teacher','educator'],['People & Education','Corporate Trainer','educator'],['People & Education','Academic Advisor','educator'],['People & Education','Education Program Manager','leader'],['People & Education','Psychometrician','research'],['People & Education','People Operations Manager','people'],
  ['Healthcare & Life Science','Biomedical Engineer','engineering'],['Healthcare & Life Science','Bioinformatics Scientist','research'],['Healthcare & Life Science','Clinical Data Manager','healthcare'],['Healthcare & Life Science','Epidemiologist','research'],['Healthcare & Life Science','Public Health Analyst','healthcare'],['Healthcare & Life Science','Health Informatics Specialist','healthcare'],['Healthcare & Life Science','Clinical Research Coordinator','healthcare'],['Healthcare & Life Science','Laboratory Scientist','healthcare'],['Healthcare & Life Science','Pharmaceutical Scientist','research'],['Healthcare & Life Science','Medical Writer','design'],['Healthcare & Life Science','Healthcare Operations Manager','operations'],['Healthcare & Life Science','Genetic Counselor','people'],
  ['Law & Policy','Lawyer','law'],['Law & Policy','Legal Analyst','law'],['Law & Policy','Compliance Analyst','law'],['Law & Policy','Policy Analyst','law'],['Law & Policy','Regulatory Affairs Specialist','law'],['Law & Policy','Contract Specialist','law'],['Law & Policy','Paralegal','law'],['Law & Policy','Legal Operations Specialist','operations'],['Law & Policy','Privacy Analyst','law'],['Law & Policy','Ethics & Compliance Manager','law'],['Law & Policy','Public Administration Analyst','leader'],['Law & Policy','Intellectual Property Specialist','law'],
  ['Operations & Supply Chain','Supply Chain Analyst','operations'],['Operations & Supply Chain','Logistics Analyst','operations'],['Operations & Supply Chain','Procurement Analyst','operations'],['Operations & Supply Chain','Inventory Planner','operations'],['Operations & Supply Chain','Demand Planner','operations'],['Operations & Supply Chain','Operations Research Scientist','research'],['Operations & Supply Chain','Quality Engineer','engineering'],['Operations & Supply Chain','Process Improvement Specialist','operations'],['Operations & Supply Chain','Manufacturing Engineer','engineering'],['Operations & Supply Chain','Production Planner','operations'],['Operations & Supply Chain','Warehouse Operations Manager','leader'],['Operations & Supply Chain','Sustainability Operations Analyst','operations'],
  ['Sales & Client','Sales Engineer','sales'],['Sales & Client','Account Executive','sales'],['Sales & Client','Enterprise Sales Specialist','sales'],['Sales & Client','Solutions Consultant','sales'],['Sales & Client','Business Development Manager','sales'],['Sales & Client','Account Manager','sales'],['Sales & Client','Customer Insights Manager','product'],['Sales & Client','Sales Operations Analyst','analytical'],['Sales & Client','Pre-Sales Consultant','sales'],['Sales & Client','Partnerships Manager','sales'],['Sales & Client','Technical Account Manager','sales'],['Sales & Client','Client Strategy Manager','product'],
  ['Science & Research','Research Scientist','research'],['Science & Research','Physicist','research'],['Science & Research','Chemist','research'],['Science & Research','Materials Scientist','research'],['Science & Research','Environmental Scientist','research'],['Science & Research','Computational Scientist','data'],['Science & Research','Research Engineer','engineering'],['Science & Research','Lab Manager','healthcare'],['Science & Research','Geospatial Scientist','spatial'],['Science & Research','Marine Scientist','research'],['Science & Research','Climate Data Scientist','data'],['Science & Research','Science Policy Researcher','law'],
  ['Architecture & Built Environment','Architect','spatial'],['Architecture & Built Environment','Urban Planner','spatial'],['Architecture & Built Environment','Landscape Architect','spatial'],['Architecture & Built Environment','Civil Engineer','engineering'],['Architecture & Built Environment','Structural Engineer','engineering'],['Architecture & Built Environment','Transportation Planner','spatial'],['Architecture & Built Environment','Environmental Planner','spatial'],['Architecture & Built Environment','Construction Manager','leader'],['Architecture & Built Environment','Building Services Engineer','engineering'],['Architecture & Built Environment','GIS Analyst','spatial'],['Architecture & Built Environment','Real Estate Development Analyst','finance'],['Architecture & Built Environment','Smart City Planner','spatial']
];

const descriptions = {
  'Data & Analytics': 'Uses data, structured reasoning, and evidence to support decisions or build analytical systems.',
  'Software & Engineering': 'Builds, tests, integrates, or improves technical systems and products.',
  'Design & Creative': 'Transforms user needs and ideas into clear, usable, or expressive experiences.',
  'Business & Product': 'Connects customer needs, business goals, execution, and measurable outcomes.',
  'Marketing & Communication': 'Creates, communicates, researches, or grows ideas for defined audiences.',
  'Finance & Economics': 'Analyzes financial or economic information to manage risk, value, and decisions.',
  'People & Education': 'Helps people learn, grow, collaborate, or succeed through structured support.',
  'Healthcare & Life Science': 'Applies scientific, analytical, or people-centered thinking to health and life-science contexts.',
  'Law & Policy': 'Interprets rules, evidence, risk, and stakeholder needs to support sound decisions.',
  'Operations & Supply Chain': 'Improves processes, resources, quality, planning, and reliable execution.',
  'Sales & Client': 'Understands customer needs and turns them into solutions, relationships, and outcomes.',
  'Science & Research': 'Investigates questions systematically, evaluates evidence, and develops new knowledge.',
  'Architecture & Built Environment': 'Uses spatial, technical, planning, and stakeholder thinking to shape physical environments.'
};

function vector(preset) {
  return Object.fromEntries(SKILL_IDS.map((id, i) => [id, P[preset][i]]));
}

export const CAREERS = names.map(([category, title, preset], index) => ({
  id: `career_${String(index + 1).padStart(3, '0')}`,
  title,
  category,
  archetype: preset,
  description: descriptions[category],
  skills: vector(preset)
}));

// Small per-role nudges make otherwise similar profiles more distinct while retaining deterministic, explainable behavior.
const ROLE_NUDGES = {
  // Distinguish high-volume software/data roles without changing their broad archetype.
  'Data Scientist': { analytical_thinking: 0.03, technical_aptitude: 0.03 },
  'Data Analyst': { analytical_thinking: 0.04, attention_to_detail: 0.03 },
  'BI Analyst': { analytical_thinking: 0.03, communication: 0.03 },
  'Data Engineer': { technical_aptitude: 0.06, planning_organization: 0.04 },
  'ML Engineer': { technical_aptitude: 0.05, problem_solving: 0.04 },
  'AI Engineer': { technical_aptitude: 0.05, creativity: 0.04 },
  'ML Research Scientist': { analytical_thinking: 0.04, creativity: 0.03 },
  'Quantitative Analyst': { analytical_thinking: 0.04, decision_making: 0.04 },
  'Operations Research Analyst': { analytical_thinking: 0.04, planning_organization: 0.04 },
  'Statistician': { analytical_thinking: 0.05, attention_to_detail: 0.04 },
  'Decision Scientist': { analytical_thinking: 0.04, decision_making: 0.05 },
  'Software Engineer': { problem_solving: 0.03, technical_aptitude: 0.04 },
  'Backend Engineer': { technical_aptitude: 0.05, attention_to_detail: 0.03 },
  'Frontend Engineer': { creativity: 0.05, communication: 0.03 },
  'Full Stack Developer': { adaptability: 0.04, technical_aptitude: 0.04 },
  'Mobile App Developer': { creativity: 0.04, adaptability: 0.03 },
  'DevOps Engineer': { adaptability: 0.04, planning_organization: 0.04 },
  'Cloud Engineer': { technical_aptitude: 0.05, planning_organization: 0.03 },
  'Systems Engineer': { problem_solving: 0.04, planning_organization: 0.03 },
  'Embedded Systems Engineer': { attention_to_detail: 0.05, technical_aptitude: 0.04 },
  'Robotics Engineer': { creativity: 0.04, problem_solving: 0.04 },
  'QA Automation Engineer': { attention_to_detail: 0.06, technical_aptitude: 0.03 },
  'Cybersecurity Engineer': { attention_to_detail: 0.06, problem_solving: 0.05 },

  // Creative roles get explicit creativity/empathy/communication signals so a creative
  // response pattern is not pulled toward generic software/data vectors.
  'UX Designer': { creativity: 0.06, empathy: 0.05 },
  'UI Designer': { creativity: 0.07, attention_to_detail: 0.04 },
  'Product Designer': { creativity: 0.06, empathy: 0.05 },
  'UX Researcher': { empathy: 0.08, analytical_thinking: 0.04 },
  'Interaction Designer': { creativity: 0.07, empathy: 0.03 },
  'Service Designer': { creativity: 0.05, empathy: 0.06 },
  'Graphic Designer': { creativity: 0.08, attention_to_detail: 0.04 },
  'Motion Designer': { creativity: 0.08, adaptability: 0.04 },
  '3D Artist': { creativity: 0.08, attention_to_detail: 0.05 },
  'Game Designer': { creativity: 0.07, problem_solving: 0.04 },
  'Content Designer': { creativity: 0.06, communication: 0.05 },
  'Brand Designer': { creativity: 0.08, communication: 0.04 },
  'Copywriter': { creativity: 0.07, communication: 0.06 },
  'Technical Writer': { communication: 0.06, attention_to_detail: 0.05 },
  'Social Media Manager': { creativity: 0.06, communication: 0.05 },
  'Community Manager': { empathy: 0.06, communication: 0.06 },

  // People/education roles need stronger human-facing differentiation.
  'HR Analyst': { empathy: 0.04, attention_to_detail: 0.03 },
  'Talent Acquisition Specialist': { empathy: 0.06, communication: 0.05 },
  'Learning & Development Specialist': { empathy: 0.06, communication: 0.05 },
  'Career Counselor': { empathy: 0.08, communication: 0.06 },
  'Instructional Designer': { creativity: 0.05, empathy: 0.05 },
  'Teacher': { empathy: 0.08, communication: 0.06 },
  'Corporate Trainer': { communication: 0.07, empathy: 0.05 },
  'Academic Advisor': { empathy: 0.07, communication: 0.06 },
  'Education Program Manager': { leadership: 0.04, planning_organization: 0.05, empathy: 0.04 },
  'Psychometrician': { analytical_thinking: 0.05, attention_to_detail: 0.05 },
  'People Operations Manager': { empathy: 0.06, planning_organization: 0.05 },

  // Domain-specific distinctions.
  'Clinical Data Manager': { attention_to_detail: 0.06, planning_organization: 0.04 },
  'Bioinformatics Scientist': { analytical_thinking: 0.05, technical_aptitude: 0.04 },
  'Clinical Research Coordinator': { planning_organization: 0.05, communication: 0.04 },
  'Laboratory Scientist': { attention_to_detail: 0.06, technical_aptitude: 0.04 },
  'Medical Writer': { communication: 0.06, attention_to_detail: 0.05 },
  'Genetic Counselor': { empathy: 0.10, communication: 0.06 },
  'Lawyer': { communication: 0.06, decision_making: 0.05 },
  'Legal Analyst': { analytical_thinking: 0.05, attention_to_detail: 0.05 },
  'Compliance Analyst': { attention_to_detail: 0.06, analytical_thinking: 0.04 },
  'Policy Analyst': { analytical_thinking: 0.05, communication: 0.05 },
  'Regulatory Affairs Specialist': { attention_to_detail: 0.06, planning_organization: 0.04 },
  'Supply Chain Analyst': { analytical_thinking: 0.05, planning_organization: 0.05 },
  'Logistics Analyst': { planning_organization: 0.06, attention_to_detail: 0.04 },
  'Quality Engineer': { attention_to_detail: 0.06, problem_solving: 0.05 },
  'Process Improvement Specialist': { problem_solving: 0.05, planning_organization: 0.05 },
  'Sales Engineer': { technical_aptitude: 0.07, communication: 0.05 },
  'Account Executive': { communication: 0.06, empathy: 0.04 },
  'Solutions Consultant': { problem_solving: 0.05, communication: 0.05 },
  'Research Scientist': { analytical_thinking: 0.05, problem_solving: 0.05 },
  'Physicist': { analytical_thinking: 0.06, problem_solving: 0.04 },
  'Chemist': { attention_to_detail: 0.05, technical_aptitude: 0.04 },

  // Built environment. 'spatial' is not a canonical skill, so Architect now uses valid skills only.
  'Architect': { creativity: 0.07, planning_organization: 0.05, technical_aptitude: 0.03 },
  'Urban Planner': { planning_organization: 0.06, communication: 0.04 },
  'Landscape Architect': { creativity: 0.07, planning_organization: 0.04 },
  'Civil Engineer': { technical_aptitude: 0.05, problem_solving: 0.05 },
  'Structural Engineer': { attention_to_detail: 0.06, technical_aptitude: 0.05 },
  'Transportation Planner': { planning_organization: 0.06, analytical_thinking: 0.04 },
  'Environmental Planner': { analytical_thinking: 0.05, communication: 0.04 },
  'Construction Manager': { leadership: 0.06, planning_organization: 0.06 },
  'Building Services Engineer': { technical_aptitude: 0.05, attention_to_detail: 0.05 },
  'GIS Analyst': { analytical_thinking: 0.06, attention_to_detail: 0.04 },
  'Smart City Planner': { planning_organization: 0.05, creativity: 0.04 }
};

for (const career of CAREERS) {
  const nudge = ROLE_NUDGES[career.title] ?? {};
  for (const [skill, delta] of Object.entries(nudge)) {
    if (skill in career.skills) career.skills[skill] = Math.max(0, Math.min(1, career.skills[skill] + delta));
  }
}

export const CAREER_COUNT = CAREERS.length;
