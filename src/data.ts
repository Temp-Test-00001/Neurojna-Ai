import { ServiceItem, ProjectItem, TechStackCategory, WhyUsItem, FAQItem } from './types';

export const servicesData: ServiceItem[] = [
  {
    id: 'ai-solutions',
    title: 'Artificial Intelligence Solutions',
    description: 'Custom machine learning models and predictive architectures tailored to solve your complex business bottlenecks.',
    iconName: 'BrainCircuit',
    features: [
      'Predictive Analytics & Forecasting',
      'Computer Vision & Image Segmentation',
      'Natural Language Processing (NLP)',
      'Anomaly Detection Systems'
    ],
    metric: {
      value: '95%+',
      label: 'Model Accuracy'
    }
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & Business Intelligence',
    description: 'Transform raw fragmented data lakes into beautifully visualised, structured, and actionable strategic insights.',
    iconName: 'BarChart3',
    features: [
      'ETL Pipelines & Data Warehousing',
      'Advanced Statistical Analysis',
      'Interactive Custom Reporting',
      'Behavioral Heatmaps & Analytics'
    ],
    metric: {
      value: '10x',
      label: 'Faster Insight Generation'
    }
  },
  {
    id: 'generative-ai',
    title: 'Generative AI & LLM Development',
    description: 'Harness the power of foundational models custom-tuned to automate knowledge work, creativity, and customer loops.',
    iconName: 'Sparkles',
    features: [
      'Custom LLM Fine-tuning (RAG)',
      'Domain-Specific Agent Swarms',
      'Automated Semantic Translation',
      'AI Assistant System Integrations'
    ],
    metric: {
      value: '40%+',
      label: 'Operational Cost Reduction'
    }
  },
  {
    id: 'chatbots',
    title: 'AI Chatbots & Cognitive Automation',
    description: 'Deploy 24/7 intelligent contextual agents capable of handling complex transactions and human-like interactions.',
    iconName: 'MessageSquareCode',
    features: [
      'Multi-turn Contextual Conversation',
      'Dynamic Intent & Sentiment Analysis',
      'Third-party CRM & API Syncing',
      'Voice & Text Multimodal Support'
    ],
    metric: {
      value: '82%',
      label: 'Instant Problem Resolution'
    }
  },
  {
    id: 'dashboard-development',
    title: 'Enterprise Dashboard Development',
    description: 'High-performance real-time visualization centers custom-built for executive decision-makers.',
    iconName: 'LayoutDashboard',
    features: [
      'Sub-second Latency Queries',
      'Highly Responsive Custom Views',
      'Role-based Secure Access Controls',
      'Cross-platform Responsive Panels'
    ],
    metric: {
      value: '100k+',
      label: 'Data Points Monitored Live'
    }
  },
  {
    id: 'mvp-development',
    title: 'Startup MVP Development',
    description: 'Accelerate your time-to-market. We build and launch high-performance production-ready MVPs with rapid iteration cycles.',
    iconName: 'Zap',
    features: [
      'Rapid High-Fidelity Prototyping',
      'Clean Modular Node & React Stack',
      'Serverless Cloud Implementations',
      'Built-in Core Analytics & Tracking'
    ],
    metric: {
      value: '4-6 Wks',
      label: 'Average Design-to-Launch time'
    }
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Engineering',
    description: 'Master modern DevOps practices and cloud-native workflows to build, deploy, and scale applications with speed and reliability.',
    iconName: 'GitBranch',
    features: [
      'CI/CD Pipeline Design & Automation',
      'Docker, Kubernetes & Container Orchestration',
      'AWS, GCP & Azure Cloud Deployments',
      'Infrastructure as Code (Terraform, Ansible)'
    ],
    metric: {
      value: '60%',
      label: 'Faster Deployment Cycles'
    }
  }
];

export const portfolioData: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'E-Commerce Agentic Intelligence Suite',
    description: 'A custom LLM-powered agent swarming system that manages product cataloging, auto-responds to customer queries, and detects fraudulent activities.',
    category: 'gen-ai',
    tags: ['Generative AI', 'Llama 3.1 & GPT-4o', 'Vector DB', 'RAG'],
    metrics: { value: '88%', label: 'SLA Auto-resolved' },
    caseStudy: {
      challenge: 'Overwhelming customer inquiry volumes during sales holidays led to 14+ hour response times.',
      solution: 'Developed a custom domain-specific retrieval-augmented generation engine synchronised directly with inventory systems.',
      impact: 'Average resolution time plummeted from 14 hours to 4.2 seconds while achieving a 4.2/5 customer satisfaction rating.'
    }
  },
  {
    id: 'proj-2',
    title: 'Real-time Analytics Dashboard for Smart Cities',
    description: 'A telemetry visual database that aggregates live IoT sensor feeds of traffic density, air quality indices, and smart street grids.',
    category: 'dashboards',
    tags: ['IoT Streams', 'React / Tailwind', 'D3.js Visualization', 'Power BI Embed'],
    metrics: { value: '< 200ms', label: 'Data Sync Latency' },
    caseStudy: {
      challenge: 'Stale municipal datasets prevented real-time emergency dispatch response prioritization during congestion times.',
      solution: 'Created a sub-second websocket pipeline that dynamically cluster-analyses and map-projects live municipal streams.',
      impact: 'Emergency dispatchers reported a 15% reduction in cross-city response latencies during peak hours.'
    }
  },
  {
    id: 'proj-3',
    title: 'Predictive Medical Image Diagnostics',
    description: 'A research-backed deep learning image segmentation classifier engineered to assist oncologists in micro-tumor identification.',
    category: 'gen-ai',
    tags: ['Computer Vision', 'PyTorch Classifier', 'Medical Datasets', 'API Integration'],
    metrics: { value: '98.4%', label: 'Diagnostic Recall' },
    caseStudy: {
      challenge: 'High clinical oversight rates in early-stage micro-anomalies due to low-contrast pixel resolutions.',
      solution: 'Implemented a custom-trained multi-scale Vision Transformer with a gradient-weighted feedback heat-mapping frontend.',
      impact: 'Significantly enhanced early lesion recognition flags, boosting diagnostic precision rates among testing groups.'
    }
  },
  {
    id: 'proj-4',
    title: 'Fintech Credit Scoring & Risk Analytics Engine',
    description: 'An enterprise business intelligence platform running advanced regression and anomaly trees over historical credit ledgers.',
    category: 'analytics',
    tags: ['Risk Modeling', 'Python ML', 'Tableau Integration', 'Snowflake DW'],
    metrics: { value: '$4.2M', label: 'Fraud Preventive Savings' },
    caseStudy: {
      challenge: 'Traditional static credit scores failed to capture real-time market shifts, risking asset values in high-volatility climates.',
      solution: 'Rebuilt credit modeling using gradient boosted decision trees analyzing high-frequency client transactional telemetry.',
      impact: 'Default rates declined by 18% in the initial testing period while increasing loan approval speed by 40%.'
    }
  },
  {
    id: 'proj-5',
    title: 'Synthetix AI: Instant Ad-Creative Copilot',
    description: 'A complete Startup MVP including automated canvas layouts, AI text copywriting, and dynamic click-through-rate predictions.',
    category: 'mvp',
    tags: ['Startup MVP', 'Full-stack React', 'Stable Diffusion API', 'FastAPI'],
    metrics: { value: '38 Days', label: 'From Zero to Beta launch' },
    caseStudy: {
      challenge: 'Small businesses waste thousands of dollars on generic stock ad imagery and poorly targeted, non-tested copy lines.',
      solution: 'Engineered a clean workspace application that automatically synthesises context-aware product backgrounds and matching tags.',
      impact: 'Acquired 12,000+ waitlisted users within 10 days of the MVP going live and bagged initial pre-seed funding.'
    }
  }
];

export const whyChooseUsData: WhyUsItem[] = [
  {
    id: 'fast-delivery',
    title: 'Rapid Engineering & Delivery',
    description: 'Our proprietary bootstrap modules and visual tooling infrastructure allow us to ship secure enterprise interfaces and fine-tuned AI solutions in a fraction of standard agency times.',
    metric: '3x',
    metricLabel: 'Faster Launch Windows',
    iconName: 'CalendarRange'
  },
  {
    id: 'scalable-solutions',
    title: 'Highly Scalable Foundations',
    description: 'We build with a cloud-native mindset. Our architectures are containerized, query-optimized, and resilient, automatically absorbing massive user traffic spikes.',
    metric: '99.99%',
    metricLabel: 'Uptime Commitment',
    iconName: 'Cpu'
  },
  {
    id: 'research-based',
    title: 'Academic & Research Depth',
    description: 'No shallow wrappers. We are backed by active algorithmic research, regularly benchmarking custom-trained neural structures against leading cloud LLMs.',
    metric: '8+',
    metricLabel: 'Published Case Monographs',
    iconName: 'GraduationCap'
  },
  {
    id: 'startup-friendly',
    title: 'Startup Native Philosophies',
    description: 'We understand early-stage dynamics: changing specs, lean budgets, and the absolute necessity of capturing investor attention with dynamic, validated MVPs.',
    metric: '35+',
    metricLabel: 'Startups Bootstrapped',
    iconName: 'Rocket'
  },
  {
    id: 'professional-support',
    title: 'Rigorous Support & SLG',
    description: 'Our dev teams remain actively on-call to provide system fine-tuning, regression audits, API upgrades, and secure client-managed handovers.',
    metric: '24/7',
    metricLabel: 'Emergency Support Available',
    iconName: 'ShieldCheck'
  }
];

export const techStackData: TechStackCategory[] = [
  {
    id: 'languages-models',
    title: 'AI, Models & Core Algorithms',
    items: [
      { name: 'Python', iconType: 'python', color: '#3776AB', description: 'Core neural pipeline and engine logic scripting.' },
      { name: 'Machine Learning', iconType: 'brain', color: '#FF6F00', description: 'Supervised/Unsupervised models.' },
      { name: 'AI Models (LLMs)', iconType: 'cpu', color: '#00f0ff', description: 'GPT-4o, Claude 3.5, Gemini 1.5 Pro, Llama 3.' },
      { name: 'Deep Learning', iconType: 'network', color: '#bc34fa', description: 'PyTorch, TensorFlow visual classifier stacks.' }
    ]
  },
  {
    id: 'data-vis',
    title: 'Data Systems & Visualization',
    items: [
      { name: 'SQL & Warehouses', iconType: 'database', color: '#336791', description: 'Snowflake, PostgreSQL high-scale query indexing.' },
      { name: 'Power BI', iconType: 'bar-chart', color: '#F2C811', description: 'Intelligent corporate dashboard embeds.' },
      { name: 'Tableau', iconType: 'pie-chart', color: '#E97627', description: 'Enterprise-grade executive reporting.' },
      { name: 'APIs & Cloud', iconType: 'cloud', color: '#00f0ff', description: 'Modern REST/GraphQL gateways hosted on AWS & GCP.' }
    ]
  }
];

export const faqData: FAQItem[] = [
  {
    question: 'How long does a custom AI or Gen AI integration take?',
    answer: 'Simple AI wrappers or tailored model API integrations take about 2 to 3 weeks. Complex, custom retrieval-augmented generation (RAG) setups or custom-trained classification structures typically conclude with full validation in 4 to 8 weeks.'
  },
  {
    question: 'Do you design the UI dashboard as well or just the backend code?',
    answer: 'We provide comprehensive full-stack delivery. We design the highly engaging frontend responsive dashboards (React, Tailwind, D3.js) and anchor them with robust backend storage APIs (Node, Python FastAPI).'
  },
  {
    question: 'How do you ensure enterprise-grade data security in AI applications?',
    answer: 'We secure client IP. All vectors and private corporate data pipelines are locked with encryption-at-rest. If required, we host LLMs completely inside your client-controlled VPC (AWS / Google Cloud) to guarantee private metadata boundaries.'
  },
  {
    question: 'What is your MVP building cycle model for startups?',
    answer: 'We prioritize focus. After a 1-week alignment mapping session, we engineer a polished, highly responsive core feature set over 4 weeks, prepare it for beta testers, and support you during initial funding pitches.'
  }
];
