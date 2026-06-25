export const notifications = [
  {
    id: "n1",
    type: "weather",
    title: "Heavy rainfall expected Wednesday",
    message: "Delay pesticide spraying until conditions clear.",
    time: "10 mins ago",
    read: false,
  },
  {
    id: "n2",
    type: "pest",
    title: "Pest outbreak alert — Nashik region",
    message:
      "Increased bollworm activity reported nearby. Inspect cotton fields.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n3",
    type: "chat",
    title: "AI follow-up suggestion",
    message: "New tips available for your recent wheat leaf query.",
    time: "Yesterday",
    read: false,
  },
  {
    id: "n4",
    type: "scheme",
    title: "New government scheme announced",
    message: "PM-KISAN installment dates updated for this quarter.",
    time: "2 days ago",
    read: true,
  },
];

export const governmentSchemes = [
  {
    id: "s1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "Income Support",
    summary:
      "Direct income support of ₹6,000 per year, paid in three installments, to all landholding farmer families.",
    eligibility:
      "All landholding farmer families with cultivable land, subject to exclusion criteria for higher-income categories.",
    deadline: "Next installment window: 1 Aug – 30 Sep 2026",
    benefit: "₹2,000 per installment, 3 times a year",
    status: "open",
  },
  {
    id: "s2",
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    category: "Crop Insurance",
    summary:
      "Subsidized crop insurance covering yield losses due to natural calamities, pests, and diseases.",
    eligibility:
      "All farmers growing notified crops in notified areas, including sharecroppers and tenant farmers.",
    deadline: "Kharif enrollment closes 31 Jul 2026",
    benefit: "Premium as low as 1.5–5% of sum insured",
    status: "open",
  },
  {
    id: "s3",
    name: "Soil Health Card Scheme",
    category: "Soil & Advisory",
    summary:
      "Free soil testing every 2 years with crop-wise fertilizer and nutrient recommendations.",
    eligibility:
      "All farmers; samples collected through local agriculture extension offices.",
    deadline: "Rolling — no fixed deadline",
    benefit: "Free soil test + personalized fertilizer plan",
    status: "open",
  },
  {
    id: "s4",
    name: "Kisan Credit Card (KCC)",
    category: "Credit & Loans",
    summary:
      "Short-term credit for cultivation expenses, post-harvest needs, and farm asset maintenance at subsidized interest rates.",
    eligibility:
      "Farmers, sharecroppers, and tenant farmers with proof of land cultivation rights.",
    deadline: "Apply anytime through participating banks",
    benefit: "Interest subvention up to 3% on timely repayment",
    status: "open",
  },
  {
    id: "s5",
    name: "Sub-Mission on Agricultural Mechanization (SMAM)",
    category: "Equipment Subsidy",
    summary:
      "Subsidy on purchase of farm machinery and equipment, including custom hiring centers for small farmers.",
    eligibility:
      "Individual farmers, FPOs, and cooperatives; priority for small and marginal farmers.",
    deadline: "Closed for this cycle — reopens Oct 2026",
    benefit: "40–50% subsidy on eligible equipment",
    status: "closed",
  },
];

export const dashboardStats = [
  { label: "Total Queries", value: 248, change: "+12%", trend: "up" },
  { label: "AI Responses", value: 241, change: "+9%", trend: "up" },
  { label: "Disease Reports", value: 37, change: "+4%", trend: "up" },
  { label: "Chat Sessions", value: 56, change: "+18%", trend: "up" },
];

export const recentActivities = [
  {
    id: 1,
    type: "chat",
    title: "Asked about yellow wheat leaves",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "disease",
    title: "Uploaded tomato leaf image for analysis",
    time: "Yesterday",
  },
  {
    id: 3,
    type: "weather",
    title: "Checked weather forecast for Nashik",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "crop",
    title: "Got crop recommendation for Kharif season",
    time: "3 days ago",
  },
  {
    id: 5,
    type: "chat",
    title: "Asked about fungal disease prevention",
    time: "5 days ago",
  },
];

export const chatHistoryList = [
  {
    id: "c1",
    title: "Wheat leaf yellowing issue",
    preview: "Yellowing wheat leaves usually point to nitrogen...",
    date: "2026-06-18",
    messageCount: 2,
    messages: [
      {
        id: "c1-1",
        role: "user",
        content: "Wheat leaves turning yellow",
        timestamp: "2026-06-18T09:12:00.000Z",
      },
      {
        id: "c1-2",
        role: "assistant",
        timestamp: "2026-06-18T09:12:04.000Z",
        reply:
          "Yellowing wheat leaves usually point to nitrogen deficiency or early-stage rust. Check the lower leaves first — uniform yellowing from the base suggests nitrogen shortage, while orange-yellow pustules indicate rust.",
        causes: [
          "Nitrogen deficiency",
          "Yellow rust (Puccinia striiformis)",
          "Waterlogging at the root zone",
        ],
        treatment: [
          "Apply a split dose of urea (40–50 kg/acre) if nitrogen deficiency is confirmed",
          "Spray Propiconazole 25% EC at 0.1% concentration if rust pustules are visible",
          "Improve field drainage to prevent waterlogging",
        ],
        prevention: [
          "Use rust-resistant wheat varieties",
          "Avoid excess irrigation",
          "Apply balanced NPK at sowing",
        ],
      },
    ],
  },
  {
    id: "c2",
    title: "Tomato white spots diagnosis",
    preview: "White spots on tomato leaves are commonly caused...",
    date: "2026-06-15",
    messageCount: 2,
    messages: [
      {
        id: "c2-1",
        role: "user",
        content: "My tomato leaves have white spots",
        timestamp: "2026-06-15T14:30:00.000Z",
      },
      {
        id: "c2-2",
        role: "assistant",
        timestamp: "2026-06-15T14:30:05.000Z",
        reply:
          "White spots on tomato leaves are commonly caused by powdery mildew or early blight. The pattern and texture of the spots help tell them apart.",
        causes: [
          "Powdery mildew (fungal)",
          "Septoria leaf spot",
          "Nutrient deficiency (magnesium)",
        ],
        treatment: [
          "Spray wettable sulfur (2g/litre water) for powdery mildew",
          "Remove and destroy severely affected leaves",
          "Apply Mancozeb 75% WP at 2g/litre for fungal spread",
        ],
        prevention: [
          "Maintain spacing for airflow between plants",
          "Avoid overhead irrigation in the evening",
          "Rotate crops each season",
        ],
      },
    ],
  },
  {
    id: "c3",
    title: "Best crops for monsoon",
    preview: "For the monsoon (Kharif) season, the safest...",
    date: "2026-06-10",
    messageCount: 2,
    messages: [
      {
        id: "c3-1",
        role: "user",
        content: "Best crop for monsoon season?",
        timestamp: "2026-06-10T08:05:00.000Z",
      },
      {
        id: "c3-2",
        role: "assistant",
        timestamp: "2026-06-10T08:05:04.000Z",
        reply:
          "For the monsoon (Kharif) season, the safest high-yield choices depend on your soil and rainfall pattern, but a few crops perform reliably across most regions.",
        causes: [],
        treatment: ["Rice", "Maize", "Soybean", "Cotton", "Pigeon pea (Arhar)"],
        prevention: [
          "Ensure field bunding to manage excess water",
          "Choose short-duration varieties in heavy-rainfall zones",
        ],
      },
    ],
  },
  {
    id: "c4",
    title: "Fungal disease prevention tips",
    preview: "Preventive fungicide spraying before the rainy...",
    date: "2026-06-05",
    messageCount: 4,
    messages: [
      {
        id: "c4-1",
        role: "user",
        content: "How to prevent fungal diseases?",
        timestamp: "2026-06-05T11:00:00.000Z",
      },
      {
        id: "c4-2",
        role: "assistant",
        timestamp: "2026-06-05T11:00:05.000Z",
        reply:
          "Preventive fungicide spraying before the rainy season starts is the most effective approach, combined with good field hygiene year-round.",
        causes: [],
        treatment: [
          "Apply a copper-based fungicide as a preventive spray before monsoon onset",
          "Remove crop debris and weeds that harbor fungal spores",
          "Avoid dense planting that traps humidity",
        ],
        prevention: [
          "Rotate crops each season",
          "Use certified disease-free seeds",
          "Ensure proper field drainage",
        ],
      },
      {
        id: "c4-3",
        role: "user",
        content: "Does this apply to all crops or just wheat?",
        timestamp: "2026-06-05T11:02:30.000Z",
      },
      {
        id: "c4-4",
        role: "assistant",
        timestamp: "2026-06-05T11:02:35.000Z",
        reply:
          "These principles apply broadly across most crops, though the specific fungicide and timing should be adjusted to the crop and the disease most common in your region.",
        causes: [],
        treatment: [
          "Consult region-specific fungicide recommendations for your primary crop",
          "Time sprays based on local weather forecasts",
        ],
        prevention: [
          "Keep a spray calendar aligned with your crop's vulnerable growth stages",
        ],
      },
    ],
  },
  {
    id: "c5",
    title: "Soil pH and fertilizer advice",
    preview: "Your soil pH of 6.8 indicates balanced conditions...",
    date: "2026-05-29",
    messageCount: 2,
    messages: [
      {
        id: "c5-1",
        role: "user",
        content: "My soil pH is 6.8, what fertilizer should I use?",
        timestamp: "2026-05-29T16:20:00.000Z",
      },
      {
        id: "c5-2",
        role: "assistant",
        timestamp: "2026-05-29T16:20:04.000Z",
        reply:
          "Your soil pH of 6.8 indicates balanced conditions, which is suitable for most crops without needing pH correction.",
        causes: [],
        treatment: [
          "Balanced NPK 10:26:26",
          "Vermicompost",
          "Micronutrient mix (Zinc, Boron)",
        ],
        prevention: ["Re-test soil every season to track changes"],
      },
    ],
  },
];

export const queryCategoryData = [
  { name: "Disease", value: 86 },
  { name: "Pest", value: 54 },
  { name: "Weather", value: 38 },
  { name: "Fertilizer", value: 42 },
  { name: "Irrigation", value: 28 },
];

export const userGrowthData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 180 },
  { month: "Mar", users: 240 },
  { month: "Apr", users: 310 },
  { month: "May", users: 410 },
  { month: "Jun", users: 520 },
];

export const queryTrendData = [
  { day: "Mon", queries: 32 },
  { day: "Tue", queries: 41 },
  { day: "Wed", queries: 38 },
  { day: "Thu", queries: 55 },
  { day: "Fri", queries: 48 },
  { day: "Sat", queries: 62 },
  { day: "Sun", queries: 29 },
];

export const adminUsers = [
  {
    id: "u1",
    name: "Ramesh Patil",
    email: "ramesh.patil@example.com",
    location: "Nashik, MH",
    joined: "2025-11-03",
    status: "active",
    queries: 42,
  },
  {
    id: "u2",
    name: "Sita Devi",
    email: "sita.devi@example.com",
    location: "Patna, BR",
    joined: "2025-12-12",
    status: "active",
    queries: 28,
  },
  {
    id: "u3",
    name: "Karthik Reddy",
    email: "karthik.r@example.com",
    location: "Guntur, AP",
    joined: "2026-01-20",
    status: "inactive",
    queries: 9,
  },
  {
    id: "u4",
    name: "Anjali Sharma",
    email: "anjali.s@example.com",
    location: "Jaipur, RJ",
    joined: "2026-02-08",
    status: "active",
    queries: 63,
  },
  {
    id: "u5",
    name: "Manoj Kumar",
    email: "manoj.k@example.com",
    location: "Lucknow, UP",
    joined: "2026-03-15",
    status: "active",
    queries: 17,
  },
];

export const adminRecentQueries = [
  {
    id: "q1",
    user: "Ramesh Patil",
    query: "My wheat leaves are turning yellow",
    category: "Disease",
    time: "10 mins ago",
  },
  {
    id: "q2",
    user: "Sita Devi",
    query: "Best fertilizer for rice in clayey soil",
    category: "Fertilizer",
    time: "32 mins ago",
  },
  {
    id: "q3",
    user: "Anjali Sharma",
    query: "Pest control for cotton bollworm",
    category: "Pest",
    time: "1 hour ago",
  },
  {
    id: "q4",
    user: "Manoj Kumar",
    query: "When will it rain this week?",
    category: "Weather",
    time: "2 hours ago",
  },
];

export const testimonials = [
  {
    name: "Suresh Yadav",
    role: "Farmer, Madhya Pradesh",
    quote:
      "I asked about my soybean crop late at night and got an answer in minutes. No more waiting for the next market visit to ask someone.",
  },
  {
    name: "Lakshmi Narayanan",
    role: "FPO Coordinator, Tamil Nadu",
    quote:
      "We use the disease detection tool across 40+ member farms. It has cut our diagnosis time from days to minutes.",
  },
  {
    name: "Harpreet Singh",
    role: "Farmer, Punjab",
    quote:
      "The voice feature means my father, who can't read English well, can ask questions in Punjabi and get clear answers.",
  },
];

export const faqs = [
  {
    question: "Is AgriAI free to use?",
    answer:
      "Yes, the core advisory chat, weather updates, and crop recommendations are free for all registered farmers. Some advanced organizational features for FPOs and NGOs may require a partnership plan.",
  },
  {
    question: "Does AgriAI work without internet access?",
    answer:
      "Currently AgriAI requires an internet connection. Offline mode and SMS-based advisory are planned for a future release.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "AgriAI currently supports English, Hindi, Marathi, Tamil, and Bengali, with more regional languages being added.",
  },
  {
    question: "How accurate is the disease detection feature?",
    answer:
      "Our image-based detection provides a confidence score with every result. For high-confidence cases it is highly reliable, but we always recommend a follow-up with a local expert for critical decisions.",
  },
  {
    question: "Can I use AgriAI on a basic smartphone?",
    answer:
      "Yes. AgriAI is built to be lightweight and works well on entry-level smartphones with a standard internet connection.",
  },
];
