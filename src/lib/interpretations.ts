import type { DimensionKey, FirmSize, MaturityLevel } from "./types";

// Overall maturity level interpretations
export const OVERALL_INTERPRETATIONS: Record<MaturityLevel, string> = {
  foundation_needed:
    "Your practice currently lacks the foundational systems, policies, and structure that AI tools require to function effectively. This is not a reflection of your legal expertise. It means that before AI can add value, there is groundwork to do in how your data is organized, how your processes run, and how technology decisions are governed. The good news: starting from a clear baseline means you can build the right way from the start, without legacy workarounds.",
  early_stage:
    "Your practice has some foundational elements in place, but significant gaps remain across multiple areas. You may be exploring AI tools or hearing about them from peers and vendors, but the infrastructure to adopt them responsibly is not yet there. Focused effort on your weakest dimensions will move the needle quickly. Prioritize governance and data readiness before investing in any AI tooling.",
  developing:
    "You have the building blocks in place. Some areas of your practice are ready for AI adoption, while others need focused attention. This is where many legal teams find themselves: aware of the opportunity, partially prepared, but uncertain about where to start. Your results below will show you exactly which dimensions to prioritize so you can move from thinking about AI to implementing it with confidence.",
  operationalized:
    "Your practice has strong foundations across most dimensions. You are well positioned to adopt AI tools and likely already using some. The focus at this stage shifts from readiness to optimization: refining your governance framework, measuring outcomes, and expanding AI into additional workflows. Your remaining gaps are specific and addressable.",
  optimizing:
    "Your practice demonstrates mature, well-governed operations that are ready for sophisticated AI integration. Your data is organized, your processes are documented, your governance is in place, and your team is equipped. At this level, the opportunity is to lead: implement AI strategically, measure ROI, and build the internal capability to continuously evaluate and adopt new tools as they emerge.",
};

// Per-dimension interpretations by maturity level
export const DIMENSION_INTERPRETATIONS: Record<
  DimensionKey,
  Record<MaturityLevel, string>
> = {
  data_readiness: {
    foundation_needed:
      "Your document and data management practices are largely informal or inconsistent. Critical matter information may be scattered across email inboxes, local drives, and individual systems with no reliable way to find or use it at scale.",
    early_stage:
      "Some organizational structure exists, but it is not consistently applied. You likely have a practice management system or filing convention, but adherence varies across individuals and matter types.",
    developing:
      "Your data practices are reasonably structured. Documents are generally organized and matter information is mostly centralized, though gaps remain. You are approaching the threshold where AI tools could add real value.",
    operationalized:
      "Your documents and data are well organized with consistent conventions and centralized storage. Metadata is largely reliable. This is a strong foundation for AI.",
    optimizing:
      "Your data and document management is a strength. Consistent naming, centralized storage, reliable metadata, and active retention policies mean your practice is ready for advanced AI applications.",
  },
  process_maturity: {
    foundation_needed:
      "Your workflows are largely undocumented and vary significantly from person to person or matter to matter. AI tools need repeatable processes to plug into.",
    early_stage:
      "Some processes are loosely defined, but documentation is incomplete and consistency is uneven. Start by documenting your three highest-volume workflows end to end.",
    developing:
      "Core workflows are documented and your team generally follows them, though there is room for greater standardization. You can identify your repetitive, high-volume tasks, which is the essential prerequisite for knowing where AI fits.",
    operationalized:
      "Your processes are documented, standardized, and regularly reviewed. You are ready to integrate AI into specific workflow steps, such as first-pass document review, intake triage, or research summarization.",
    optimizing:
      "Your process maturity is strong. Workflows are documented, followed consistently, reviewed regularly, and optimized over time. AI tools can be inserted into specific process steps with clear before-and-after measurement.",
  },
  tech_infrastructure: {
    foundation_needed:
      "Your technology environment is fragmented or outdated. Core systems may not integrate, data movement is manual, and you may lack the IT support needed to evaluate or deploy new tools.",
    early_stage:
      "You have some core systems in place, but integration is limited and moving data between tools is largely manual. Before exploring AI tools, focus on connecting your existing systems.",
    developing:
      "Your technology stack is functional and partially integrated. You can access systems remotely, and some data flows between tools, though manual workarounds remain. This is a workable foundation for introducing AI tools.",
    operationalized:
      "Your technology infrastructure is solid. Core systems are integrated, data flows between tools, your stack is current, and your IT support can evaluate and deploy new software.",
    optimizing:
      "Your technology environment is modern, well-integrated, and actively maintained. This positions you to be an early and effective adopter of AI technologies.",
  },
  governance_risk: {
    foundation_needed:
      "Your practice currently has no formal governance framework for AI. There is no written AI use policy, no vendor vetting process specific to AI, and no required human review step for AI-generated work product. This is the most critical gap to address.",
    early_stage:
      "You have some awareness of the governance issues around AI in legal practice, but formal structures are not yet established. This is the right time to formalize governance before AI use expands further.",
    developing:
      "Governance structures are emerging. You may have a draft AI use policy, some vendor evaluation criteria, or initial discussions about client disclosure. The foundation is forming but is not yet comprehensive.",
    operationalized:
      "Your governance framework is substantive. You have a written AI use policy, a defined vendor vetting process, awareness of applicable bar guidance, and safeguards around AI-generated work product.",
    optimizing:
      "Your AI governance is mature and comprehensive. Policies are documented, enforced, and regularly updated. You are positioned to serve as a model for responsible AI adoption in legal practice.",
  },
  people_culture: {
    foundation_needed:
      "There is little organizational readiness for AI adoption from a people perspective. Before introducing AI tools, invest in building basic technology comfort and change management capacity.",
    early_stage:
      "There is some openness to technology, but structured support for adoption is lacking. Your team may be curious about AI but unsure where to start or concerned about what it means for their roles.",
    developing:
      "Your team shows moderate readiness. Leadership is supportive, some individuals are already exploring AI tools, and there is willingness to learn. Focus on formalizing training and identifying internal champions.",
    operationalized:
      "Your people and culture are well positioned for AI adoption. Leadership is actively supportive, training is provided when new tools are introduced, and your team uses AI tools within established guidelines.",
    optimizing:
      "Your team is your greatest AI asset. Leadership champions AI adoption, training is structured and ongoing, and the team uses AI tools confidently within clear guidelines.",
  },
};

// Firm-size modifier sentences
export const FIRM_SIZE_MODIFIERS: Record<
  DimensionKey,
  Record<FirmSize, string>
> = {
  data_readiness: {
    solo: "As a solo practitioner, your personal information management habits are the entire system, which means small improvements to how you organize files and tag documents will have an outsized impact.",
    small:
      "In a small team, inconsistent document practices compound quickly because there are not enough people to absorb the friction, and not enough structure to enforce the standards.",
    mid: "At your team's size, document management gaps are likely the result of organic growth without centralized standards, which is common but fixable with a focused initiative.",
    large:
      "In a department your size, data readiness challenges are typically systemic and require executive sponsorship and a dedicated project to resolve, but the ROI of fixing them scales with your headcount.",
  },
  process_maturity: {
    solo: "Your processes live in your head, which works until it does not. Documenting even your top three workflows creates insurance and reveals where AI could save you hours each week.",
    small:
      "In a small team, process inconsistency shows up as rework, miscommunication, and things falling through the cracks during busy periods.",
    mid: "At your size, process maturity often varies dramatically between practice groups or teams, and the weakest link determines your overall AI readiness.",
    large:
      "In a larger organization, process documentation likely exists in pockets but is not standardized across departments, creating uneven AI readiness.",
  },
  tech_infrastructure: {
    solo: "As a solo, your tech stack is likely lean, which is actually an advantage. Fewer tools means fewer integration problems, and modern cloud-based practice management platforms can serve as your entire foundation.",
    small:
      "Small teams often outgrow their original tech choices faster than they realize. If your core systems were chosen for cost rather than capability, it may be time to reassess.",
    mid: "At your size, technology decisions have typically accumulated over years, resulting in a patchwork of tools that do not communicate well with each other.",
    large:
      "In a larger organization, technology infrastructure decisions involve multiple stakeholders and longer implementation timelines, but you also have the budget to do this right.",
  },
  governance_risk: {
    solo: "As a solo practitioner, you are both the policymaker and the enforcer. A simple, written AI use protocol protects you and demonstrates professionalism to clients and insurers.",
    small:
      "In a small team, informal norms often substitute for written policies, but \"everyone knows the rules\" breaks down the moment someone new joins or a situation gets complicated.",
    mid: "At your size, governance gaps are often the result of rapid growth outpacing policy development. You likely need to formalize what has been implicit.",
    large:
      "In a department your size, AI governance needs to be an institutional initiative, not an individual effort. This means dedicated ownership, regular review cycles, and integration with your broader compliance framework.",
  },
  people_culture: {
    solo: "Your AI readiness is entirely a function of your own willingness to learn and experiment. Investing structured time in learning new tools is not overhead. It is professional development.",
    small:
      "In a small team, one skeptic or one champion can shift the entire culture. Identifying and empowering your early adopters is the fastest path to team-wide readiness.",
    mid: "At your size, culture around technology often splits along generational or role-based lines. A one-size-fits-all training approach will not work.",
    large:
      "In a larger organization, cultural readiness for AI requires a deliberate change management strategy. Town halls, pilot programs, and visible executive sponsorship make the difference between adoption and resistance.",
  },
};

// Recommendation blocks: top recommendation per dimension per firm size
export const RECOMMENDATIONS: Record<
  DimensionKey,
  Record<FirmSize, string[]>
> = {
  data_readiness: {
    solo: [
      "Choose one practice management tool and commit to using it as your single source of truth for all matter information.",
      "Create a simple naming convention for all documents and apply it going forward.",
      "Set a quarterly calendar reminder to purge or archive files that have passed your retention requirements.",
    ],
    small: [
      "Audit how your team currently stores and names documents. Create a one-page standard that everyone follows starting this month.",
      "Centralize matter information into your practice management system. Consolidate any personal tracking spreadsheets or email folders.",
      "Assign one person to be responsible for document management standards.",
    ],
    mid: [
      "Conduct a data audit across practice groups to identify where matter information lives and how it is organized.",
      "Implement mandatory fields in your practice management system for key metadata.",
      "Develop a firm-wide document management policy with training and periodic compliance checks.",
    ],
    large: [
      "Commission a formal data readiness assessment with department-level granularity.",
      "Establish a data governance committee with representation from each major practice area.",
      "Invest in data migration and cleanup as a dedicated project with a timeline and budget.",
    ],
  },
  process_maturity: {
    solo: [
      "Document your three highest-volume workflows, step by step, as if you were training a new associate.",
      "Create a simple checklist for your review process before any work goes to a client.",
      "Block 30 minutes each quarter to review your workflows and identify manual tasks that happen the same way every time.",
    ],
    small: [
      "Pick your most common matter type and document its workflow end to end. Get agreement from the team.",
      "Identify the top three tasks where team members are duplicating effort or reinventing the wheel each time.",
      "Implement a simple review and approval step before client deliverables go out.",
    ],
    mid: [
      "Map your core workflows across practice groups to identify inconsistencies.",
      "Designate process owners for your five highest-volume workflows.",
      "Establish a quarterly workflow review cadence.",
    ],
    large: [
      "Invest in a formal process mapping initiative that covers all major workflow types across the department.",
      "Build workflow standardization into your quality management framework.",
      "Create a process improvement feedback loop where team members can flag inefficiencies.",
    ],
  },
  tech_infrastructure: {
    solo: [
      "If your practice management system is outdated, evaluate a modern cloud-based platform like Clio, PracticePanther, or MyCase.",
      "Check whether your current tools can connect to each other through built-in integrations or a tool like Zapier.",
      "Establish a relationship with an IT consultant who understands legal technology.",
    ],
    small: [
      "Audit your current tech stack for integration gaps between billing, document management, and practice management.",
      "Ensure your core systems are cloud-based and vendor-supported.",
      "Evaluate whether your current IT support has the capacity to evaluate AI tools.",
    ],
    mid: [
      "Conduct a technology audit focused on data flow. Map how information moves between your core systems.",
      "Prioritize API-capable platforms when making technology decisions.",
      "Build an IT evaluation framework for new tools that includes data security and AI-readiness criteria.",
    ],
    large: [
      "Develop a technology roadmap that explicitly includes AI readiness criteria.",
      "Establish a legal technology committee that evaluates new tools against standardized criteria.",
      "Invest in a data integration layer that connects your core systems.",
    ],
  },
  governance_risk: {
    solo: [
      "Write a one-page AI use protocol for your practice. Define which tasks you will and will not use AI for.",
      "Review your jurisdiction's bar association guidance on AI.",
      "Update your engagement letters to include a disclosure about AI-assisted work.",
    ],
    small: [
      "Draft and adopt a firm-wide AI use policy covering permitted uses, prohibited uses, and mandatory human review.",
      "Establish a vendor evaluation checklist for any AI tool before it enters your practice.",
      "Assign governance ownership to a specific person.",
    ],
    mid: [
      "Develop a comprehensive AI governance framework covering use policies, vendor evaluation, and client disclosure.",
      "Conduct a gap analysis between your current practices and your jurisdiction's bar association requirements.",
      "Integrate AI governance into your existing risk management and compliance processes.",
    ],
    large: [
      "Establish a formal AI governance committee with cross-functional representation.",
      "Develop tiered AI use policies based on risk level.",
      "Build an AI incident response plan for errors that reach clients or vendor data breaches.",
    ],
  },
  people_culture: {
    solo: [
      "Dedicate two hours per month to structured AI learning through legal technology publications or short courses.",
      "Join a legal technology community or peer group where practitioners share what is working.",
      "Start with one AI tool for one specific task. Master it before expanding.",
    ],
    small: [
      "Identify your team's AI champion and give them dedicated time to explore tools and report back.",
      "When introducing any new AI tool, provide structured training showing how it fits into existing workflows.",
      "Create a safe space for the team to share concerns about AI.",
    ],
    mid: [
      "Develop a tiered AI training program that meets people where they are.",
      "Run a small pilot with a willing team before rolling AI tools out broadly.",
      "Include AI literacy in your professional development framework.",
    ],
    large: [
      "Launch a formal AI adoption program with executive sponsorship, a dedicated budget, and a change management plan.",
      "Create internal case studies from early AI adopters in your organization.",
      "Establish an AI center of excellence that curates approved tools and develops training.",
    ],
  },
};
