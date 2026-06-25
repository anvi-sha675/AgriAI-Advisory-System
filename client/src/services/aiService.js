const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const SAMPLE_RESPONSES = [
  {
    keywords: ["yellow", "wheat", "leaves"],
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
  {
    keywords: ["tomato", "white", "spots"],
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
  {
    keywords: ["monsoon", "crop", "season"],
    reply:
      "For the monsoon (Kharif) season, the safest high-yield choices depend on your soil and rainfall pattern, but a few crops perform reliably across most regions.",
    causes: [],
    treatment: ["Rice", "Maize", "Soybean", "Cotton", "Pigeon pea (Arhar)"],
    prevention: [
      "Ensure field bunding to manage excess water",
      "Choose short-duration varieties in heavy-rainfall zones",
    ],
  },
];

const FALLBACK_RESPONSE = {
  reply:
    "Thanks for sharing the details. Based on common patterns for this issue, here's a general assessment — for a precise diagnosis, a clear photo of the affected part would help a lot.",
  causes: [
    "Possible fungal or bacterial infection",
    "Nutrient imbalance",
    "Pest activity",
  ],
  treatment: [
    "Isolate affected plants if possible",
    "Apply a broad-spectrum fungicide as a precaution",
    "Monitor for 3–4 days and re-check",
  ],
  prevention: [
    "Maintain field hygiene",
    "Rotate crops seasonally",
    "Test soil every season",
  ],
};

export async function sendChatMessage(message) {
  await delay(900 + Math.random() * 600);
  const lower = message.toLowerCase();
  const match = SAMPLE_RESPONSES.find((r) =>
    r.keywords.some((k) => lower.includes(k)),
  );
  const data = match || FALLBACK_RESPONSE;
  return {
    id: `msg_${Date.now()}`,
    role: "assistant",
    timestamp: new Date().toISOString(),
    ...data,
  };
}

export async function detectCropDisease(_imageFile) {
  await delay(1800);
  const results = [
    {
      disease: "Late Blight (Phytophthora infestans)",
      confidence: 92,
      crop: "Potato / Tomato",
    },
    { disease: "Leaf Rust", confidence: 87, crop: "Wheat" },
    { disease: "Bacterial Leaf Blight", confidence: 79, crop: "Rice" },
  ];
  const result = results[Math.floor(Math.random() * results.length)];
  return {
    id: `disease_${Date.now()}`,
    ...result,
    causes: [
      "Prolonged leaf wetness",
      "High humidity with moderate temperatures",
      "Poor air circulation in dense canopy",
    ],
    remedies: [
      "Apply copper-based fungicide (Copper oxychloride 50% WP, 3g/litre)",
      "Remove and destroy infected plant debris",
      "Improve drainage and spacing between rows",
    ],
    severity: result.confidence > 85 ? "High" : "Moderate",
  };
}

export async function getCropRecommendation({ soilType, season, location }) {
  await delay(1100);
  const cropBank = {
    Loamy: ["Wheat", "Sugarcane", "Cotton"],
    Sandy: ["Groundnut", "Bajra", "Watermelon"],
    Clayey: ["Rice", "Jute", "Pulses"],
    Black: ["Cotton", "Soybean", "Sunflower"],
    Red: ["Maize", "Millets", "Pulses"],
  };
  const crops = cropBank[soilType] || cropBank.Loamy;
  return {
    soilType,
    season,
    location,
    recommendations: crops.map((name, i) => ({
      name,
      suitability: 95 - i * 8,
      benefits:
        "Good market demand and well-suited to local rainfall patterns.",
      tips: "Sow with recommended spacing, ensure timely irrigation, and use certified seeds.",
    })),
  };
}

export async function getSoilHealthAdvisory({
  ph,
  nitrogen,
  phosphorus: _phosphorus,
  potassium: _potassium,
}) {
  await delay(1100);
  const phNum = parseFloat(ph);
  let condition = "Balanced";
  if (phNum < 6) condition = "Acidic";
  else if (phNum > 7.5) condition = "Alkaline";

  return {
    condition,
    summary: `Soil pH of ${ph} indicates ${condition.toLowerCase()} conditions. Nutrient levels suggest ${
      nitrogen < 50
        ? "a nitrogen boost is needed"
        : "nitrogen levels are adequate"
    }.`,
    fertilizers:
      condition === "Acidic"
        ? [
            "Agricultural lime to raise pH",
            "Balanced NPK 12:32:16",
            "Organic compost",
          ]
        : condition === "Alkaline"
          ? [
              "Elemental sulfur to lower pH",
              "Ammonium sulfate",
              "Well-rotted farmyard manure",
            ]
          : [
              "Balanced NPK 10:26:26",
              "Vermicompost",
              "Micronutrient mix (Zinc, Boron)",
            ],
    suitableCrops:
      condition === "Acidic"
        ? ["Tea", "Potato", "Pineapple"]
        : condition === "Alkaline"
          ? ["Barley", "Cotton", "Sugar beet"]
          : ["Wheat", "Maize", "Vegetables"],
  };
}

export async function getWeather(_location) {
  await delay(700);
  return {
    location: "Nashik, Maharashtra",
    current: {
      temp: 29,
      condition: "Partly Cloudy",
      humidity: 64,
      windSpeed: 14,
      rainChance: 30,
    },
    forecast: [
      { day: "Today", high: 31, low: 22, condition: "Partly Cloudy", rain: 30 },
      { day: "Tomorrow", high: 33, low: 23, condition: "Sunny", rain: 5 },
      { day: "Wed", high: 28, low: 21, condition: "Rain", rain: 80 },
      { day: "Thu", high: 27, low: 20, condition: "Rain", rain: 70 },
      { day: "Fri", high: 30, low: 22, condition: "Sunny", rain: 10 },
    ],
    alerts: [
      {
        type: "warning",
        message:
          "Heavy rainfall expected Wednesday — delay pesticide spraying.",
      },
    ],
  };
}

export async function transcribeVoice(_audioBlob) {
  await delay(1400);
  const samples = [
    "मेरे गेहूं के पत्ते पीले हो रहे हैं",
    "My tomato plants have white spots on the leaves",
    "Best time to sow mustard this season?",
  ];
  return samples[Math.floor(Math.random() * samples.length)];
}
