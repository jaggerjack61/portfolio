export type Project = {
  title: string
  desc: string
  tech: string[]
  link: string
  imageSrc: string
  imageAlt: string
}

export const projects: Project[] = [
  {
    title: 'AreYouStillThere',
    desc: 'Full-stack service monitoring application. Register services, run HTTP/content checks, track incidents and uptime, and send email notifications for outages and recoveries. Uses JWT auth, Django REST backend with Celery for background checks, and a React dashboard.',
    tech: ['Django', 'React', 'Celery', 'Redis'],
    link: 'https://github.com/jaggerjack61/AreYouStillThere',
    imageSrc: 'images/projects/AreYouStillThere.png',
    imageAlt: 'AreYouStillThere service monitoring',
  },
  {
    title: 'Harness',
    desc: 'Lightweight AI agent framework that connects to any OpenAI-compatible chat model with built-in tools for reading, writing, editing files, and executing shell commands. Features streaming responses, markdown rendering, chain-of-thought reasoning, and real-time token tracking.',
    tech: ['Python', 'OpenAI API', 'CLI'],
    link: 'https://github.com/jaggerjack61/Harness.git',
    imageSrc: 'images/projects/Harness.png',
    imageAlt: 'Harness AI agent framework',
  },
  {
    title: 'Laravel ERD',
    desc: 'VS Code extension that parses Laravel migrations and Eloquent models to render interactive ER diagrams with inline editing support. Built for Laravel developers who need to visualize database schemas without leaving their editor.',
    tech: ['TypeScript', 'VS Code API', 'Laravel'],
    link: 'https://github.com/jaggerjack61/LaravelERD',
    imageSrc: 'images/projects/laravel-erd.png',
    imageAlt: 'Laravel ERD VS Code extension',
  },
  {
    title: 'SchemaField',
    desc: 'Schema-driven form builder and data capture platform with analytics dashboard. Enables teams to create dynamic forms without writing code, with real-time analytics on submissions.',
    tech: ['React', 'Django REST', 'MySQL'],
    link: 'https://github.com/jaggerjack61/SchemaField',
    imageSrc: 'images/projects/SchemaField.png',
    imageAlt: 'SchemaField platform',
  },
  {
    title: 'Database Hoarder',
    desc: 'Multi-tenant database backup automation platform with retention and replication policies. Manages backup schedules, cross-region replication, and point-in-time recovery for PostgreSQL and MySQL.',
    tech: ['Django', 'React', 'AWS'],
    link: 'https://github.com/jaggerjack61/DatabaseHoarder',
    imageSrc: 'images/projects/database-hoarder.png',
    imageAlt: 'Database Hoarder dashboard',
  },
  {
    title: 'Track My Gains',
    desc: 'Cross-platform fitness tracker with themed dashboards for workouts, weight, diet, and cycles. Built with Expo and React Native for a consistent experience across iOS and Android.',
    tech: ['Expo', 'React Native', 'Firebase'],
    link: 'https://github.com/jaggerjack61/TrackMyGains/',
    imageSrc: 'images/projects/TrackMyGains.jpg',
    imageAlt: 'Track My Gains app',
  },
  {
    title: 'Chatbot Designer API',
    desc: 'Django REST API for designing and managing WhatsApp chatbots with bulk messaging capabilities. A visual flow builder backed by a robust webhook-driven messaging system.',
    tech: ['Django', 'Python', 'WhatsApp API'],
    link: 'https://github.com/jaggerjack61/ChatbotDesignerAPI.git',
    imageSrc: 'images/projects/chatbot-designer-api.png',
    imageAlt: 'WhatsApp chatbot flow designer interface',
  },
  {
    title: 'Academic Tracker',
    desc: 'Comprehensive academic tracking system for managing students, grades, and subjects. Handles attendance, examination records, and generates report cards for institutions.',
    tech: ['Laravel', 'PHP', 'MySQL'],
    link: 'https://github.com/jaggerjack61/academic-tracker-back.git',
    imageSrc: 'images/projects/academic-tracker-backend.png',
    imageAlt: 'Academic Tracker backend',
  },
  {
    title: 'NSSA Paynow Bot',
    desc: 'WhatsApp bot for NSSA registration and payments via Paynow integration. Citizens can check contributions, register dependents, and initiate payments without visiting an office.',
    tech: ['Laravel', 'PHP', 'Paynow'],
    link: 'https://github.com/jaggerjack61/NSSA_Paynow.git',
    imageSrc: 'images/projects/nssa-paynow-bot.jpg',
    imageAlt: 'NSSA registration and payment conversation',
  },
]

export const orderedProjects = [...projects].sort(
  (a, b) => Number(b.title === 'Harness') - Number(a.title === 'Harness'),
)
export const categories: Record<string, string> = {
  Harness: 'AI agent framework',
  AreYouStillThere: 'Observability',
  'Laravel ERD': 'Developer tooling',
  SchemaField: 'Data platform',
  'Database Hoarder': 'Cloud infrastructure',
  'Track My Gains': 'Mobile application',
  'Chatbot Designer API': 'Conversational systems',
  'Academic Tracker': 'Education platform',
  'NSSA Paynow Bot': 'Messaging & payments',
}

export const profileImage = 'images/profile_pic.png'
export const focusAreas = [
  'AI systems and agent tooling',
  'Scalable APIs and workflow automation',
  'Cloud infrastructure and deployment',
  'End-to-end product engineering',
]

export const coreStack = [
  'Python',
  'OpenAI API',
  'Django',
  'Laravel',
  'Vue',
  'React',
  'Terraform',
  'AWS',
  'OCI',
]

export const awards = [
  { title: 'Presidential Innovation Award', year: '2023' },
  { title: 'ZESA Risk Awards · Innovation in ICT', year: '2024' },
  { title: 'HIT Book Prize · Best Capstone Design', year: '2023' },
]

export const certifications = [
  'AWS Solutions Architect Associate',
  'HashiCorp Terraform Associate',
  'OCI Developer Professional',
  'OCI Foundations Associate',
  'OCI Data Platform Foundations',
]

export const experiences = [
  {
    role: 'AI Engineer',
    company: 'Econet Wireless',
    period: 'Jul 2026 - Present',
    description: ['Designing and delivering AI-powered systems for Econet Wireless.'],
    current: true,
  },
  {
    role: 'Senior Software Engineer',
    company: 'ZETDC (Zimbabwe Electricity Transmission and Distribution Company)',
    period: '2024 - Jun 2026',
    description: [
      'Converted Excel-based electricity trading and risk management into a production-grade web application.',
      'Designed backend services and REST APIs for data validation, reporting, and auditability.',
      'Integrated AI-driven analytics for historical energy and trading datasets.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'LADS Africa',
    period: '2021 - 2023',
    description: [
      'Developed and maintained modules for a cloud-based ERP system used by multiple City and Rural District Councils.',
      'Built a Laravel-based POS analytics dashboard on AWS for real-time sales and cash-flow monitoring.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Freelance / Contract',
    period: '2017 - 2023',
    description: [
      'Built a WhatsApp Cloud API chatbot for the National Social Security Authority (NSSA).',
      "Co-developed Pahukama, one of Zimbabwe's largest online supermarkets.",
    ],
  },
]

export const email = 'jarai.samuel@gmail.com'
export const phone = '+263 77 536 1584'
export const github = 'https://github.com/jaggerjack61'
export const linkedin = 'https://linkedin.com/in/samuel-jarai'

export const contacts = [
  { label: 'Email', value: email, href: `mailto:${email}` },
  { label: 'Phone', value: phone, href: `tel:${phone.replace(/\s+/g, '')}` },
  { label: 'GitHub', value: 'github.com/jaggerjack61', href: github },
  { label: 'LinkedIn', value: 'linkedin.com/in/samuel-jarai', href: linkedin },
]
