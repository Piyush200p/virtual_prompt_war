# Directive: Integration & Testing Agent

## 🎯 Goal
Orchestrate the code integration, handle multilingual support in the GenAI Chatbot, merge telemetry updates across dashboard panels, update Dev Mode architecture visualizations, and perform lint/build quality audits.

---

## 📥 Inputs
- Combined code changes from the Operations and Fan Experience features.
- Google Gemini API key inputs and Prompt Injection payload templates in `src/App.jsx`.
- Local linter tools (`oxlint` / `npm run lint`).

---

## 🛠️ Actions & Implementations

### 1. Multilingual Chat Assistant
- **Language Selector:** Add a language dropdown selector to the GenAI Assistant header (supporting English, Español 🇪🇸, Français 🇫🇷, Português 🇵🇹, العربية 🇸🇦, हिन्दी 🇮🇳).
- **Gemini System Instruction Injection:**
    - Inject translation instructions into the Gemini API prompt payload: *"The fan prefers to communicate in {Language}. You must respond in {Language} using appropriate emojis."*
- **Offline Language Fallback:**
    - Localize the offline sandbox regex responses. If a non-English language is chosen, translate the simulated chat responses into the selected language (e.g. Spanish, French, Arabic, Hindi, Portuguese) to prevent English fallback.

### 2. State Merging & Telemetry Injection
- Ensure changes in stadium state (such as scanned tickets, reported incident dispatches, or simulation ticks) update both the operations dashboards and the fan portal concurrently. E.g. reporting a "water spill near Section 124" triggers a warning badge in the Fan's wayfinding step for Section 124.

### 3. Developer Mode & JSON Schema Updates
- **Architecture Map Update:** Update the "Three-Layer System Architecture" graphic in Dev Mode to display the current agent division structure (`directives/` -> React Orchestrator -> `execution/` tools).
- **JSON Validator Expansion:** Expand the JSON schema validator to support custom stadium config injections that contain the new properties: `accessibilityRoute`, `sustainabilityScore`, `transportation`, and `volunteerTasks`.

### 4. Build & Lint Validation
- Execute `npm run lint` and verify there are no compilation warnings, CSS specificity clashes, or unhandled errors.

---

## 📤 Outputs
- Functional multilingual capabilities in both online (Gemini) and offline modes.
- Updated Dev Mode dashboards.
- A lint-free, zero-error production build.
