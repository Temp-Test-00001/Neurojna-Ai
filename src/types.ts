export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  metric: {
    value: string;
    label: string;
  };
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: 'gen-ai' | 'analytics' | 'dashboards' | 'mvp';
  tags: string[];
  metrics: {
    value: string;
    label: string;
  };
  caseStudy: {
    challenge: string;
    solution: string;
    impact: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  avatar: string;
}

export interface TechItem {
  name: string;
  iconType: string;
  color: string;
  description: string;
}

export interface TechStackCategory {
  id: string;
  title: string;
  items: TechItem[];
}

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
