import projectPlaceholder from '../assets/svg/project-placeholder.svg'
import attendMockup from '../assets/mockups/attend.png'
import cwitoMockup from '../assets/mockups/cwito.png'
import easyspendMockup from '../assets/mockups/easyspend.png'
import elderopsMockup from '../assets/mockups/elderops.png'
import enablePayMockup from '../assets/mockups/enable-pay.png'
import exoMockup from '../assets/mockups/exo.png'
import inscribeMockup from '../assets/mockups/inscribe.png'
import nubaMockup from '../assets/mockups/nuba.png'
import zestMockup from '../assets/mockups/zest.png'
import crdbMockup from '../assets/mockups/crdb.png'
import smartMockup from '../assets/mockups/smart.png'

// ZYRA — Selected Work
// Drop-in data module. `projectPlaceholder` is kept as the default preview image.
// Voice is studio-style "we" — switch to "I" if ZYRA reads as personal.
// Scope note: every project is build-only (engineering) EXCEPT ElderOps, which
// was design + build. EasySpend was a contribution within a large dev team.
// Metrics use real figures where the work reported them; the rest describe scope/scale.

export type Project = {
  id: string
  index: string
  client: string
  name: string
  year: string
  href?: string
  title: string
  summary: string
  detail: string
  accent: string
  surface: string
  previewImage: string
  previewPosition: string
  metrics: [string, string][]
  services: string[]
}

export const projects: Project[] = [
  {
    id: 'smartafcfta',
    index: '01',
    client: 'African Union',
    name: 'SmartAfCFTA',
    year: '2024',
    title: 'A pan-African trade platform built for cross-border commerce.',
    summary:
      'The African Union needed a single digital trade platform spanning many member nations — each with its own operational needs and release cadence.',
    detail:
      'We led frontend delivery on a microfrontend architecture, shipping independently deployable UI modules engineered for maintainability and long-term extensibility across regions.',
    accent: '#2f9e7a',
    surface: '#d9f2e8',
    previewImage: smartMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['54', 'African nations in scope'],
      ['Microfrontend', 'architecture'],
      ['Multi-region', 'deployments'],
      ['Independent', 'module delivery'],
    ],
    services: ['Frontend Architecture', 'Microfrontend Systems', 'UX/UI Design', 'Design System', 'Performance', 'DevOps'],
  },
  {
    id: 'enablepay',
    index: '02',
    client: 'Supply Smart',
    name: 'EnablePay',
    year: '2026',
    href: 'https://enablepay.africa/',
    title: 'A cross-border payments platform with USD cards and multi-currency rails.',
    summary:
      'Supply Smart needed a payments product that could move money across borders — virtual accounts, USD card issuance, and multi-currency flows — without friction for users.',
    detail:
      'We lead frontend development on EnablePay, building the interfaces for virtual accounts, USD card issuance, and multi-currency transaction workflows, with rendering tuned for low-bandwidth environments.',
    accent: '#0891b2',
    surface: '#d4eff5',
    previewImage: enablePayMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['Cross-border', 'payments'],
      ['USD', 'card issuance'],
      ['Multi-currency', 'workflows'],
      ['Virtual', 'accounts'],
    ],
    services: ['Frontend Engineering', 'Component Library', 'Performance', 'API Integration', 'Payments UI'],
  },
  {
    id: 'invoq',
    index: '03',
    client: 'CRDB Bank — Tanzania',
    name: 'Invoq',
    year: '2024',
    title: 'An AI support platform for one of Tanzania\u2019s largest banks.',
    summary:
      'CRDB Bank needed internal teams to find documents and answers fast, without compromising on access control or data security.',
    detail:
      'We architected a document management and AI-powered support platform with semantic search, intelligent response suggestions, and RBAC-enforced internal file sharing — sharpening both operational speed and support accuracy.',
    accent: '#5b5be0',
    surface: '#e4e4fb',
    previewImage: crdbMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['Semantic', 'search engine'],
      ['RBAC', 'enforced sharing'],
      ['AI-assisted', 'responses'],
      ['Enterprise', 'banking client'],
    ],
    services: ['Product Strategy', 'Frontend Engineering', 'AI Integration', 'Search & Retrieval', 'Auth & Security', 'UX/UI Design'],
  },
  {
    id: 'exo-agents',
    index: '04',
    client: 'Exo-AI',
    name: 'Exo Agents',
    year: '2025',
    href: 'https://www.exoai.tech/',
    title: 'Real-time compliance dashboards for a fleet of AI agents.',
    summary:
      'High-volume financial datasets were pushing rendering latency on compliance interfaces that traders and risk teams relied on in real time.',
    detail:
      'We built scalable UI systems for the Darcy, Fibonacci, and Euclid agents — driving compliance monitoring and risk analysis — and cut render latency through state normalization, memoization, and tighter component structuring.',
    accent: '#3b6fd4',
    surface: '#dde9ff',
    previewImage: exoMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['~30%', 'Lower render latency'],
      ['3', 'AI agents shipped'],
      ['Real-time', 'risk analysis'],
      ['Enterprise', 'compliance'],
    ],
    services: ['Frontend Architecture', 'Real-Time Systems', 'Data Visualization', 'Performance', 'AI Integration', 'Product Analytics'],
  },
  {
    id: 'disone',
    index: '05',
    client: 'Supply Smart',
    name: 'Dis-one',
    year: '2026',
    title: 'An embedded-finance operating system for auto workshops.',
    summary:
      'Auto workshops were juggling disconnected tools for operations, vehicle data, and finance — with no single system tying them together.',
    detail:
      'We architected Dis-one, combining workflow tooling, vehicle intelligence data, and financial infrastructure into one embedded-finance platform.',
    accent: '#b45309',
    surface: '#fbe8d3',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Embedded', 'finance OS'],
      ['Auto-workshop', 'tooling'],
      ['Vehicle', 'intelligence data'],
      ['Unified', 'platform'],
    ],
    services: ['Frontend Engineering', 'Platform Architecture', 'Workflow Systems', 'API Integration', 'Performance'],
  },
  {
    id: 'zest',
    index: '06',
    client: 'Zest',
    name: 'Zest',
    year: '2024',
    href: 'https://zestpayment.com/',
    title: 'An AI engagement bot that cut support time and lifted retention.',
    summary:
      'Support response times were dragging and customers were churning before getting the answers they needed.',
    detail:
      'We built an AI-driven customer engagement bot wired into admin dashboards and knowledge systems, turning slow manual support into fast, contextual responses. This was for ZEST of Stanbic IBTC Bank, Nigeria.',
    accent: '#e8654d',
    surface: '#ffe3dc',
    previewImage: zestMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['40%', 'Faster support response'],
      ['25%', 'Retention increase'],
      ['AI-driven', 'engagement'],
      ['Integrated', 'admin dashboards'],
    ],
    services: ['Product Strategy', 'Frontend Engineering', 'AI Integration', 'UX/UI Design', 'Dashboard Systems'],
  },
  {
    id: 'inscribe',
    index: '07',
    client: 'Inscribe',
    name: 'Inscribe',
    year: '2023',
    href: 'https://infinion-product-dev-inscribe.azurewebsites.net/',
    title: 'An enterprise document workflow platform, compliance-ready by design.',
    summary:
      'Enterprise teams needed approval routing, audit trails, and document generation that could stand up to compliance requirements.',
    detail:
      'We delivered configurable approval routing, audit tracking, recipient management, and AI-assisted document generation — wrapped in role-based workflows and dashboards built around document lifecycle management.',
    accent: '#c98a2e',
    surface: '#f7ecd6',
    previewImage: inscribeMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['Role-based', 'approval routing'],
      ['Full', 'audit tracking'],
      ['AI-assisted', 'doc generation'],
      ['Compliance', 'ready lifecycle'],
    ],
    services: ['Frontend Engineering', 'Workflow Design', 'AI Integration', 'RBAC & Auth', 'UX/UI Design'],
  },
  {
    id: 'insight',
    index: '08',
    client: 'Insight',
    name: 'Insight',
    year: '2023',
    title: 'A secure CCTV monitoring platform for banking environments.',
    summary:
      'Banking operations needed centralized, access-controlled oversight of live surveillance across sites.',
    detail:
      'We developed a CCTV monitoring and management platform with access-controlled dashboards, giving operations teams real-time oversight and a single source of operational visibility.',
    accent: '#4a6b8a',
    surface: '#dde8f2',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Real-time', 'surveillance'],
      ['Access-', 'controlled access'],
      ['Centralized', 'oversight'],
      ['Banking-', 'grade security'],
    ],
    services: ['Frontend Engineering', 'Real-Time Systems', 'Auth & Security', 'Dashboard Systems', 'UX/UI Design'],
  },
  {
    id: 'elderops',
    index: '09',
    client: 'ElderOps',
    name: 'ElderOps',
    year: '2025',
    href: 'https://www.elderops.net/',
    title: 'A two-sided marketplace matching US orgs with vetted remote engineers.',
    summary:
      'US organizations needed a reliable way to find and hire vetted remote technical talent without wading through noise.',
    detail:
      'We designed and built ElderOps end-to-end — a talent marketplace connecting U.S. organizations with vetted remote technical professionals, from matching flows through the systems behind them.',
    accent: '#6d4ad4',
    surface: '#e6dffa',
    previewImage: elderopsMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['US', 'org clients'],
      ['Vetted', 'tech talent'],
      ['Two-sided', 'marketplace'],
      ['Design', '+ build'],
    ],
    services: ['Product Strategy', 'UX/UI Design', 'Frontend Engineering', 'Full-Stack Dev', 'Design System'],
  },
  {
    id: 'inhire',
    index: '10',
    client: 'InHire',
    name: 'InHire',
    year: '2025',
    title: 'An AI-assisted recruitment platform from CV to hire.',
    summary:
      'Hiring teams were buried in manual CV screening and disconnected steps across the recruitment funnel.',
    detail:
      'We built the frontend systems for an AI-assisted recruitment platform supporting CV analysis, candidate filtering, and end-to-end hiring workflow automation.',
    accent: '#8b5cf6',
    surface: '#efe6ff',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['AI', 'CV analysis'],
      ['Automated', 'candidate filtering'],
      ['End-to-end', 'hiring workflow'],
      ['Recruitment', 'automation'],
    ],
    services: ['Frontend Engineering', 'AI Integration', 'UX/UI Design', 'Workflow Automation'],
  },
  {
    id: 'intime',
    index: '11',
    client: 'InTime',
    name: 'InTime',
    year: '2024',
    href: 'https://infinion-attendance-test.azurewebsites.net/',
    title: 'RBAC-secured workflows for distributed teams.',
    summary:
      'Distributed teams needed controlled, location-independent access without sacrificing security across regions.',
    detail:
      'We designed an RBAC-enabled workflow system with scalable role management and session-based authorization, supporting authenticated access wherever the team logged in from.',
    accent: '#2aa6a6',
    surface: '#d6f1f1',
    previewImage: attendMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['RBAC', 'access control'],
      ['Distributed', 'team support'],
      ['Session-based', 'authorization'],
      ['Location-', 'independent auth'],
    ],
    services: ['Frontend Engineering', 'RBAC & Auth', 'Session Management', 'UX/UI Design'],
  },
  {
    id: 'easyspend',
    index: '12',
    client: 'EasySpend',
    name: 'EasySpend',
    year: '2026',
    href: 'https://app.easyspend.cc/',
    title: 'UI engineering for a consumer spend product, shipped with a large team.',
    summary:
      'EasySpend was scaling fast with a large engineering team and needed responsive, accessible UI delivered at pace.',
    detail:
      'We contributed frontend development as part of a large multi-developer team, focusing on responsive layouts, performance, and WCAG-compliant patterns across the product.',
    accent: '#c026d3',
    surface: '#f6def7',
    previewImage: easyspendMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['25%', 'Engagement lift'],
      ['20%', 'Lower bounce rate'],
      ['WCAG', 'accessibility'],
      ['Multi-dev', 'team build'],
    ],
    services: ['Frontend Engineering', 'Component Implementation', 'Performance', 'Accessibility'],
  },
  {
    id: 'cwito',
    index: '13',
    client: 'Cwito',
    name: 'Cwiti',
    year: '2022',
    href: 'https://cwito.com/',
    title: 'Convert crypto to Naira, seamlessly.',
    summary:
      'Crypto holders in Nigeria needed a simple, trustworthy way to move value into Naira without friction.',
    detail:
      'We built a platform designed to seamlessly convert cryptocurrencies into Naira, with a focus on clear conversion states and secure transaction flows.',
    accent: '#1f9d57',
    surface: '#d6f3e2',
    previewImage: cwitoMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['Crypto \u2192 Naira', 'conversion'],
      ['Secure', 'transaction flows'],
      ['Web3', 'integration'],
      ['Nigeria', 'market'],
    ],
    services: ['Product Strategy', 'Frontend Engineering', 'Web3 Integration', 'UX/UI Design'],
  },
  {
    id: 'nuba',
    index: '14',
    client: 'Nuba',
    name: 'Nuba',
    year: '2025',
    href: 'https://www.nubarewards.com/',
    title: 'A rent rewards platform for UK renters.',
    summary:
      'UK renters had nothing to show for years of on-time payments — rent was a cost with no upside.',
    detail:
      'We built a rent rewards platform that turns recurring rent payments into tangible rewards for users in the UK market.',
    accent: '#d6557f',
    surface: '#fce0ea',
    previewImage: nubaMockup,
    previewPosition: '50% 50%',
    metrics: [
      ['UK', 'market'],
      ['Rent', 'rewards engine'],
      ['Recurring', 'payment rewards'],
      ['Consumer', 'fintech'],
    ],
    services: ['Product Strategy', 'Frontend Engineering', 'UX/UI Design', 'Rewards System'],
  },
  {
    id: 'alat',
    index: '15',
    client: 'Wema Bank',
    name: 'ALAT',
    year: '2024',
    title: 'Redesigning Nigeria’s leading digital banking experience.',
    summary:
      'Worked with product managers, engineers, and stakeholders to redesign key experiences for the next generation of the ALAT mobile banking app.',
    detail:
      'Led product design across customer journeys, improving usability, simplifying complex banking flows, and creating scalable interface patterns aligned with business and user goals.',
    accent: '#8A1C7C',
    surface: '#F5E6F2',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Digital', 'banking'],
      ['Mobile', 'experience'],
      ['Cross-functional', 'collaboration'],
      ['UX', 'redesign'],
    ],
    services: [
      'Product Design',
      'UX Research',
      'Interaction Design',
      'Design Systems',
      'Prototyping',
      'Usability Testing',
    ],
  },
  {
    id: 'performancemanagement',
    index: '16',
    client: 'ToBe Visuals',
    name: 'Performance Management',
    year: '2024',
    title: 'An internal platform for employee performance and growth.',
    summary:
      'Designed a centralized performance management platform that enables HR and team leads to monitor, evaluate, and improve employee performance.',
    detail:
      'Created end-to-end workflows for reviews, ratings, performance insights, employee development, and company-wide reporting.',
    accent: '#3454D1',
    surface: '#E7EDFF',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['360°', 'performance reviews'],
      ['HR', 'analytics'],
      ['Manager', 'workflows'],
      ['Goal', 'tracking'],
    ],
    services: [
      'Product Design',
      'Dashboard Design',
      'Workflow Design',
      'Design Systems',
      'UX Strategy',
    ],
  },
  {
    id: 'visitormanagement',
    index: '17',
    client: 'Enterprise',
    name: 'Visitor Management System',
    year: '2024',
    title: 'Digitizing workplace visitor experiences.',
    summary:
      'Designed a visitor management platform that streamlines guest registration, access control, and employee notifications.',
    detail:
      'Built intuitive workflows for pre-registration, digital check-in, badge management, approvals, and visitor reporting.',
    accent: '#0F766E',
    surface: '#DDF8F5',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Digital', 'check-in'],
      ['Visitor', 'tracking'],
      ['Security', 'workflow'],
      ['Analytics', 'dashboard'],
    ],
    services: [
      'Product Design',
      'UX Design',
      'Workflow Design',
      'Dashboard Design',
      'Interaction Design',
    ],
  },
  {
    id: 'quikdb',
    index: '18',
    client: 'QuikDB',
    name: 'QuikDB',
    year: '2024',
    title: 'Simplifying decentralized database management.',
    summary:
      'Designed the product experience for a decentralized database platform focused on developers and modern web applications.',
    detail:
      'Designed authentication, dashboards, database management, rewards, collaboration, and educational experiences.',
    accent: '#6C63FF',
    surface: '#EEEAFE',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Web3', 'database'],
      ['Developer', 'experience'],
      ['Dashboard', 'platform'],
      ['Identity', 'authentication'],
    ],
    services: [
      'Product Design',
      'Dashboard Design',
      'UX Strategy',
      'Design Systems',
      'Prototyping',
    ],
  },
  {
    id: 'trendx',
    index: '19',
    client: 'Trendx',
    name: 'Trendx',
    year: '2024',
    title: 'Designing digital asset experiences for the future.',
    summary:
      'Created intuitive experiences for a blockchain platform focused on digital assets and education.',
    detail:
      'Simplified complex blockchain workflows through accessible interfaces, structured navigation, and scalable design systems.',
    accent: '#F59E0B',
    surface: '#FFF3D9',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Blockchain', 'platform'],
      ['Digital', 'assets'],
      ['Education', 'hub'],
      ['Scalable', 'design'],
    ],
    services: [
      'Product Design',
      'UX Design',
      'Information Architecture',
      'Design Systems',
      'Prototyping',
    ],
  },
  {
    id: 'lisaprop',
    index: '20',
    client: 'LisaProp',
    name: 'LisaProp',
    year: '2024',
    title: 'Connecting developers and property owners.',
    summary:
      'Designed a proptech marketplace that helps developers and landowners discover opportunities and collaborate.',
    detail:
      'Built seamless discovery, engagement, and partnership experiences that simplify property transactions.',
    accent: '#16A34A',
    surface: '#E6F8EC',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['PropTech', 'platform'],
      ['Marketplace', 'UX'],
      ['Property', 'matching'],
      ['Developer', 'network'],
    ],
    services: [
      'Product Design',
      'Marketplace Design',
      'UX Research',
      'Interaction Design',
      'Prototyping',
    ],
  },
  {
    id: 'internalcontrol',
    index: '21',
    client: 'Enterprise',
    name: 'Internal Control & Risk Assessment',
    year: '2024',
    title: 'Modernizing enterprise governance and compliance.',
    summary:
      'Designed a digital platform that streamlines internal control and risk assessment processes.',
    detail:
      'Developed structured workflows for assessments, approvals, monitoring, reporting, and enterprise-wide compliance tracking.',
    accent: '#DC2626',
    surface: '#FDECEC',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Risk', 'assessment'],
      ['Compliance', 'workflow'],
      ['Enterprise', 'dashboard'],
      ['Process', 'automation'],
    ],
    services: [
      'Enterprise UX',
      'Product Design',
      'Workflow Design',
      'Dashboard Design',
      'Design Systems',
    ],
  },
  {
    id: 'canvas',
    index: '22',
    client: 'Canvas',
    name: 'Canvas',
    year: '2025',
    title: 'Designing collaborative digital workspaces.',
    summary:
      'Designed collaborative experiences that help teams organize, create, and manage digital projects efficiently.',
    detail:
      'Focused on simplifying complex workflows, improving usability, and building scalable experiences for growing teams.',
    accent: '#4F46E5',
    surface: '#ECEBFF',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Collaborative', 'workspace'],
      ['Scalable', 'UX'],
      ['Team', 'productivity'],
      ['Workflow', 'optimization'],
    ],
    services: [
      'Product Design',
      'UX Strategy',
      'Interaction Design',
      'Design Systems',
      'Prototyping',
    ],
  },
  {
    id: 'stableblocks',
    index: '23',
    client: 'Stable Blocks',
    name: 'Stable Blocks',
    year: '2025',
    title: 'Making blockchain products easier to use.',
    summary:
      'Designed intuitive product experiences for blockchain services, reducing complexity for everyday users.',
    detail:
      'Created dashboards, onboarding flows, and scalable interfaces that improve usability across blockchain products.',
    accent: '#0F172A',
    surface: '#E8EDF5',
    previewImage: projectPlaceholder,
    previewPosition: '50% 50%',
    metrics: [
      ['Blockchain', 'platform'],
      ['Dashboard', 'experience'],
      ['User', 'onboarding'],
      ['Scalable', 'design'],
    ],
    services: [
      'Product Design',
      'UX Research',
      'Dashboard Design',
      'Interaction Design',
      'Design Systems',
    ],
  },
];
