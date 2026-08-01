const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const TOKEN_KEY = "agriai-token";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const authHeaders = (isForm = false) => {
  const h = {};
  if (!isForm) h["Content-Type"] = "application/json";
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
};

async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { ...authHeaders(options.isForm), ...options.extraHeaders },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Request failed");
    return data.data;
  } catch (err) {
    if (err.message === "Failed to fetch" || err.name === "TypeError") {
      return null; // offline — caller uses fallback
    }
    throw err;
  }
}

const MOCK_RESPONSES = [
  {
    keywords: ["yellow", "wheat"],
    reply:
      "Yellowing wheat leaves usually point to nitrogen deficiency or early-stage rust. Check the lower leaves first.",
    causes: [
      "Nitrogen deficiency",
      "Yellow rust (Puccinia striiformis)",
      "Waterlogging at the root zone",
    ],
    treatment: [
      "Apply urea (40–50 kg/acre) if nitrogen deficiency is confirmed",
      "Spray Propiconazole 25% EC at 0.1% if rust pustules are visible",
    ],
    prevention: [
      "Use rust-resistant wheat varieties",
      "Avoid excess irrigation",
      "Apply balanced NPK at sowing",
    ],
  },
  {
    keywords: ["white", "spot", "tomato"],
    reply:
      "White spots on tomato leaves are commonly caused by powdery mildew or early blight.",
    causes: [
      "Powdery mildew (fungal)",
      "Septoria leaf spot",
      "Magnesium deficiency",
    ],
    treatment: [
      "Spray wettable sulfur (2g/litre water)",
      "Remove and destroy severely affected leaves",
      "Apply Mancozeb 75% WP at 2g/litre",
    ],
    prevention: [
      "Maintain spacing for airflow",
      "Avoid overhead irrigation in the evening",
      "Rotate crops each season",
    ],
  },
  {
    keywords: ["fungal", "disease", "prevent"],
    reply:
      "Preventive fungicide spraying before the rainy season is the most effective approach, combined with good field hygiene.",
    causes: [],
    treatment: [
      "Apply copper-based fungicide as preventive spray before monsoon",
      "Remove crop debris and weeds that harbor fungal spores",
    ],
    prevention: [
      "Rotate crops each season",
      "Use certified disease-free seeds",
      "Ensure proper field drainage",
    ],
  },
];

const FALLBACK_RESPONSE = {
  reply:
    "Based on what you've described, I recommend carefully observing the affected plants and checking for patterns. For a precise diagnosis, use the Disease Detection feature to upload a photo.",
  causes: [
    "Possible fungal or bacterial infection",
    "Nutrient imbalance",
    "Pest activity",
  ],
  treatment: [
    "Isolate affected plants if possible",
    "Apply broad-spectrum fungicide as precaution",
  ],
  prevention: ["Maintain field hygiene", "Rotate crops seasonally"],
};

export async function sendChatMessage(message, chatId = null) {
  const data = await apiFetch("/chat", {
    method: "POST",
    body: JSON.stringify({ message, chatId }),
  });

  if (data) {
    return {
      id: data.message.id,
      role: "assistant",
      timestamp: data.message.timestamp,
      reply: data.message.reply || data.message.content,
      causes: data.message.causes || [],
      treatment: data.message.treatment || [],
      prevention: data.message.prevention || [],
      chatId: data.chatId,
    };
  }

  // Fallback
  await delay(900);
  const lower = message.toLowerCase();
  const match = MOCK_RESPONSES.find((r) =>
    r.keywords.some((k) => lower.includes(k)),
  );
  return {
    id: `mock_${Date.now()}`,
    role: "assistant",
    timestamp: new Date().toISOString(),
    ...(match || FALLBACK_RESPONSE),
  };
}

export async function detectCropDisease(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const data = await apiFetch("/disease-detection", {
    method: "POST",
    body: formData,
    isForm: true,
  });

  if (data) {
    return {
      id: `disease_${data.id || Date.now()}`,
      disease: data.disease,
      confidence: data.confidence,
      crop: data.crop,
      severity: data.severity,
      causes: data.causes || [],
      remedies: data.remedies || [],
    };
  }

  // Fallback
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
  const data = await apiFetch("/crop-recommendation", {
    method: "POST",
    body: JSON.stringify({ soilType, season, location }),
  });

  if (data) return data;

  await delay(1100);
  const cropMap = {
    Loamy: ["Wheat", "Sugarcane", "Cotton"],
    Sandy: ["Groundnut", "Bajra", "Watermelon"],
    Clayey: ["Rice", "Jute", "Pulses"],
    Black: ["Cotton", "Soybean", "Sunflower"],
    Red: ["Maize", "Millets", "Pulses"],
  };
  const crops = cropMap[soilType] || cropMap.Loamy;
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
  phosphorus,
  potassium,
}) {
  const data = await apiFetch("/soil-health", {
    method: "POST",
    body: JSON.stringify({
      ph: parseFloat(ph),
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
    }),
  });

  if (data) return data;

  await delay(1100);
  const phNum = parseFloat(ph);
  const condition =
    phNum < 6 ? "Acidic" : phNum > 7.5 ? "Alkaline" : "Balanced";
  return {
    condition,
    summary: `Soil pH of ${ph} indicates ${condition.toLowerCase()} conditions. Nutrient levels suggest ${nitrogen < 50 ? "a nitrogen boost is needed" : "nitrogen levels are adequate"}.`,
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

export async function getWeather(locationOrCoords) {
  let query = "";
  if (locationOrCoords && typeof locationOrCoords === "object") {
    query = `?lat=${locationOrCoords.lat}&lon=${locationOrCoords.lon}`;
  } else if (locationOrCoords) {
    query = `?location=${encodeURIComponent(locationOrCoords)}`;
  }
  const data = await apiFetch(`/weather${query}`);

  if (data) return data;

  await delay(700);
  return {
    location:
      typeof locationOrCoords === "string"
        ? locationOrCoords
        : "Nashik, Maharashtra",
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
        message: "Heavy rainfall expected mid-week — delay pesticide spraying.",
      },
    ],
    isFallback: true,
  };
}
export async function fetchChatHistory() {
  const data = await apiFetch("/chat");
  return data?.items || null;
}

export async function fetchNotifications() {
  return await apiFetch("/notifications");
}

export async function markAllNotificationsRead() {
  return await apiFetch("/notifications/mark-all-read", { method: "PATCH" });
}

export async function markNotificationRead(id) {
  return await apiFetch(`/notifications/${id}/read`, { method: "PATCH" });
}

export async function fetchSchemes(search = "") {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const data = await apiFetch(`/schemes${query}`);
  return data?.schemes || null;
}

export async function addBookmarkToBackend(item) {
  return await apiFetch("/bookmarks", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export async function removeBookmarkFromBackend(id) {
  return await apiFetch(`/bookmarks/${id}`, { method: "DELETE" });
}
