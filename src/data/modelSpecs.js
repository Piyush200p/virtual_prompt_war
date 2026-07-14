export const MODEL_SPECS = {
  gemini_flash: {
    name: "Gemini Flash",
    latency: "0.18s",
    cost: "$0.075 / M tokens",
    accuracy: "90.2%",
    reasoning: "Sub-second lightweight execution",
    recommendation: "Recommended for simple chat interactions, quick multi-language translation, and basic local concession lookups."
  },
  flash_3_5_low: {
    name: "Gemini 3.5 Flash (Low)",
    latency: "0.20s",
    cost: "$0.10 / M tokens",
    accuracy: "92.1%",
    reasoning: "Cost-optimized fast routing",
    recommendation: "Optimized for high-speed ticket scanning verifications and low-priority crowd sensor checks."
  },
  flash_3_5_medium: {
    name: "Gemini 3.5 Flash (Medium)",
    latency: "0.25s",
    cost: "$0.15 / M tokens",
    accuracy: "94.3%",
    reasoning: "Balanced speed and accuracy",
    recommendation: "Highly recommended for active volunteer inquiries, navigation path queries, and stadium info-desk guidelines."
  },
  flash_3_5_high: {
    name: "Gemini 3.5 Flash (High)",
    latency: "0.35s",
    cost: "$0.25 / M tokens",
    accuracy: "95.8%",
    reasoning: "High precision speed routing",
    recommendation: "Ideal for real-time crowd heatmaps, volunteer green duty dispatching, and minor safety warning announcements."
  },
  sonnet_4_6_thinking: {
    name: "Claude 4.6 Sonnet (Thinking)",
    latency: "2.10s",
    cost: "$3.00 / M tokens",
    accuracy: "98.7%",
    reasoning: "Deep reasoning & SOP alignment",
    recommendation: "Critical for Operations command hazard control, multi-agency dispatches, and step-free wheelchair routing logic."
  },
  opus_4_6: {
    name: "Claude 4.6 Opus",
    latency: "4.50s",
    cost: "$15.00 / M tokens",
    accuracy: "99.4%",
    reasoning: "Extreme complex task synthesis",
    recommendation: "Best for high-stakes emergency routing under stadium-wide power grid failure or complex crowd evacuation protocols."
  }
};
