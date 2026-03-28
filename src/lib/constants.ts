import type { Question, Dimension, MaturityBand } from "./types";

export const DIMENSIONS: Dimension[] = [
  {
    key: "data_readiness",
    name: "Data & Document Readiness",
    weight: 0.25,
    questionIds: [1, 2, 3, 4, 5],
  },
  {
    key: "process_maturity",
    name: "Process Maturity",
    weight: 0.20,
    questionIds: [6, 7, 8, 9, 10],
  },
  {
    key: "tech_infrastructure",
    name: "Technology Infrastructure",
    weight: 0.15,
    questionIds: [11, 12, 13, 14, 15],
  },
  {
    key: "governance_risk",
    name: "Governance & Risk",
    weight: 0.25,
    questionIds: [16, 17, 18, 19, 20],
  },
  {
    key: "people_culture",
    name: "People & Culture",
    weight: 0.15,
    questionIds: [21, 22, 23, 24, 25],
  },
];

export const QUESTIONS: Question[] = [
  // Dimension 1: Data & Document Readiness
  {
    id: 1,
    dimension: "data_readiness",
    text: "Our documents follow consistent naming conventions and folder structures.",
    isReversed: false,
  },
  {
    id: 2,
    dimension: "data_readiness",
    text: "Client and matter information is maintained in a centralized system rather than spread across multiple tools.",
    isReversed: false,
  },
  {
    id: 3,
    dimension: "data_readiness",
    text: "We actively follow a documented policy for retaining and destroying client files and data.",
    isReversed: false,
  },
  {
    id: 4,
    dimension: "data_readiness",
    text: "Key information about matters is frequently stored only in individual email inboxes or personal files.",
    isReversed: true,
  },
  {
    id: 5,
    dimension: "data_readiness",
    text: "Our documents are consistently tagged or organized with key details like matter type, status, and responsible attorney.",
    isReversed: false,
  },

  // Dimension 2: Process Maturity
  {
    id: 6,
    dimension: "process_maturity",
    text: "Our core workflows for tasks like client intake, document review, and matter closure are documented in a way others could follow.",
    isReversed: false,
  },
  {
    id: 7,
    dimension: "process_maturity",
    text: "We can readily identify which tasks in our practice are high-volume and repetitive.",
    isReversed: false,
  },
  {
    id: 8,
    dimension: "process_maturity",
    text: "How work gets done on a matter depends largely on which individual is handling it.",
    soloVariant:
      "I handle similar matters in different ways depending on the situation rather than following a consistent process.",
    isReversed: true,
  },
  {
    id: 9,
    dimension: "process_maturity",
    text: "We have defined steps for who reviews, approves, and finalizes work before it goes to a client.",
    soloVariant:
      "I follow a consistent review and quality check process before delivering work to a client.",
    isReversed: false,
  },
  {
    id: 10,
    dimension: "process_maturity",
    text: "We review and update our internal processes at least annually.",
    isReversed: false,
  },

  // Dimension 3: Technology Infrastructure
  {
    id: 11,
    dimension: "tech_infrastructure",
    text: "Our primary practice or matter management system is current and actively supported by its vendor.",
    isReversed: false,
  },
  {
    id: 12,
    dimension: "tech_infrastructure",
    text: "Our core tools (email, documents, calendar, billing) share data or integrate with each other.",
    isReversed: false,
  },
  {
    id: 13,
    dimension: "tech_infrastructure",
    text: "Moving data between our systems typically requires manual export, re-entry, or copy-paste.",
    isReversed: true,
  },
  {
    id: 14,
    dimension: "tech_infrastructure",
    text: "We have reliable IT support (internal or external) capable of evaluating and deploying new tools.",
    isReversed: false,
  },
  {
    id: 15,
    dimension: "tech_infrastructure",
    text: "Our team can securely access the systems they need from any location.",
    isReversed: false,
  },

  // Dimension 4: Governance & Risk
  {
    id: 16,
    dimension: "governance_risk",
    text: "We have a written policy that specifies how and when AI tools may be used in our practice.",
    isReversed: false,
  },
  {
    id: 17,
    dimension: "governance_risk",
    text: "We follow a defined process for evaluating new technology vendors before adoption, including reviewing their data handling practices.",
    isReversed: false,
  },
  {
    id: 18,
    dimension: "governance_risk",
    text: "We have reviewed our jurisdiction's bar association guidance or ethics opinions related to AI in legal practice.",
    isReversed: false,
  },
  {
    id: 19,
    dimension: "governance_risk",
    text: "AI-generated work product could be delivered to a client without a required human review step.",
    isReversed: true,
  },
  {
    id: 20,
    dimension: "governance_risk",
    text: "Our engagement letters or client communications disclose the potential use of AI-assisted tools.",
    isReversed: false,
  },

  // Dimension 5: People & Culture
  {
    id: 21,
    dimension: "people_culture",
    text: "Leadership at our organization has expressed clear support for exploring AI tools.",
    isReversed: false,
  },
  {
    id: 22,
    dimension: "people_culture",
    text: "When new technology is introduced, structured training or onboarding is provided.",
    soloVariant:
      "When I adopt new technology, I invest time in structured learning before using it in client work.",
    isReversed: false,
  },
  {
    id: 23,
    dimension: "people_culture",
    text: "Team members who use AI tools do so with awareness of our firm's guidelines or expectations.",
    isReversed: false,
  },
  {
    id: 24,
    dimension: "people_culture",
    text: "Previous technology changes at our organization have generally been disruptive or poorly received.",
    soloVariant:
      "I have frequently abandoned new tools after adoption because they created more problems than they solved.",
    isReversed: true,
  },
  {
    id: 25,
    dimension: "people_culture",
    text: "At least one person in our organization actively champions the adoption of new technology.",
    soloVariant:
      "I actively seek out and evaluate new technology that could improve my practice.",
    isReversed: false,
  },
];

export const LIKERT_OPTIONS = [
  { value: 1, label: "Strongly Disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neutral" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly Agree" },
] as const;

export const MATURITY_BANDS: MaturityBand[] = [
  { level: "foundation_needed", label: "Foundation Needed", min: 1.0, max: 1.8 },
  { level: "early_stage", label: "Early Stage", min: 1.9, max: 2.6 },
  { level: "developing", label: "Developing", min: 2.7, max: 3.4 },
  { level: "operationalized", label: "Operationalized", min: 3.5, max: 4.2 },
  { level: "optimizing", label: "Optimizing", min: 4.3, max: 5.0 },
];
