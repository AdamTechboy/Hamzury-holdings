// Public site content. Edit copy here; pages and components read from this file.

export type Venture = {
  id: string;
  name: string;
  logo: string;
  color: string;
  category: string;
  /** Original lowercase one-line mandate, used on the homepage. */
  mandate: string;
  headline: string;
  summary: string;
  points: string[];
};

export const links = {
  start: '/start',
  startWith: (v: Venture) => `/start?service=${v.id}`,
  track: '/app.html#access',
  workspace: '/app.html#workspace',
  desk: 'https://desk.hamzury.com',
};

export const hours = 'Monday to Friday, 8:00 to 17:00 (WAT)';

export const tiers = ['Essentials', 'Standard', 'Premium', 'Scale & growth'];

export const ventures: Venture[] = [
  {
    id: 'bizdoc',
    name: 'bizdoc',
    logo: '/assets/bizdoc.png',
    color: '#18875b',
    category: 'Registration & compliance',
    mandate: 'documents, tax & compliance',
    headline: 'Get registered. Get bank‑ready. Stay compliant.',
    summary:
      'From company registration to tax and the documents your bank asks for, bizdoc works out what applies to your business and handles it with you.',
    points: [
      'Company registration with the right structure',
      'Bank-ready documents, TIN and SCUML where required',
      'A compliance calendar so deadlines never surprise you',
    ],
  },
  {
    id: 'medialy',
    name: 'medialy',
    logo: '/assets/medialy.png',
    color: '#c63645',
    category: 'Branding & marketing',
    mandate: 'branding, marketing & conversion',
    headline: 'Look the part. Win more customers.',
    summary:
      'medialy shapes how your business presents itself, then builds the content, campaigns and follow-up that turn interest into sales.',
    points: [
      'Business profile and a consistent brand kit',
      'Portfolio and content that show your best work',
      'Campaigns, follow-up and a clear sales process',
    ],
  },
  {
    id: 'subt',
    name: 'subt',
    logo: '/assets/subt.png',
    color: '#2466bf',
    category: 'Websites, software & automation',
    mandate: 'software, automation & workflows',
    headline: 'Simple systems that run your business.',
    summary:
      'subt sets up proven software for your kind of business, from your Google profile and website to enquiry tracking and workflow automation.',
    points: [
      'Google Business Profile setup',
      'Website with built-in enquiry tracking',
      'Workflow automation and reporting',
    ],
  },
  {
    id: 'iotics',
    name: 'iotics',
    logo: '/assets/iotics.png',
    color: '#a0780d',
    category: 'Smart spaces & hardware',
    mandate: 'smart spaces, robotics & hardware',
    headline: 'Put technology to work in the real world.',
    summary:
      'iotics looks at physical tasks where smart devices, IoT or robotics can genuinely help, then plans, installs and maintains what makes sense.',
    points: [
      'Practical needs and feasibility check',
      'A scoped automation plan for your site',
      'Installation, rollout and maintenance',
    ],
  },
  {
    id: 'hub',
    name: 'hamzury hub',
    logo: '/assets/hub.png',
    color: '#14233b',
    category: 'Training & skills',
    mandate: 'practical skills & business training',
    headline: 'Skills your team will actually use.',
    summary:
      'hamzury hub runs practical, supervised training for owners, staff and new talent, built around the tools and work in front of you.',
    points: [
      'Hands-on training for the tools you use',
      'Supervisor and systems training',
      'Team capability programmes and supervised projects',
    ],
  },
  {
    id: 'iwiin',
    name: 'iwiin',
    logo: '/assets/iwiin.png',
    color: '#355c21',
    category: 'Grants & partnerships',
    mandate: 'grants, partnerships & opportunities',
    headline: 'Be ready when the right opportunity comes.',
    summary:
      'iwiin finds the grants, funding and partnerships that suit your organisation and helps you prepare strong applications. Awards are never guaranteed, but you will be ready.',
    points: [
      'Opportunity readiness check',
      'Partnership positioning',
      'Application support from start to submission',
    ],
  },
];

export const ventureById = (id: string) => ventures.find((v) => v.id === id);

export const steps: [string, string][] = [
  [
    'Tell us about your business',
    'Answer a few simple questions about where you are and where you want to go. You don’t need to know which service you need.',
  ],
  [
    'Get a clear plan',
    'Our team reviews your answers and recommends what to do first, and why. Nothing is suggested unless it fits your business.',
  ],
  [
    'Choose and approve',
    'Pick what suits you. You see the scope, timeline and price before you commit, and work starts only once you approve.',
  ],
  [
    'Track every step',
    'Follow progress any time with your client reference. You’ll hear from us at least every 48 hours until the work is done.',
  ],
];

export const faqs: [string, string][] = [
  [
    'I’m not sure what my business needs. Where do I start?',
    'That’s exactly what the questions are for. Tell us about your business and goals, and we’ll recommend a practical first step.',
  ],
  [
    'How much does it cost?',
    'It depends on what you need. You’ll receive a clear quote with scope, timeline and price before any work begins. Any government or third-party fees are listed separately.',
  ],
  [
    'Do I have to commit after answering the questions?',
    'No. You review our recommendation and decide whether to go ahead.',
  ],
  [
    'How will I know how my project is going?',
    'You get a client reference to check progress any time, and we send an update at least every 48 hours.',
  ],
  [
    'Can I use more than one service?',
    'Yes. Our six teams work from one plan, so registration, branding, software and training fit together instead of being handled separately.',
  ],
];

/** Capitalise the first letter and fix common acronyms in seed text. */
export const tidy = (s: string) =>
  s
    .replace(/\b(tin|scuml|cac|crm|qa|iot)\b/g, (m) => m.toUpperCase())
    .replace(/\bgoogle\b/g, 'Google')
    .replace(/^./, (c) => c.toUpperCase());
