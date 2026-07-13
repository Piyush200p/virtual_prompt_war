# Directive: Fan Experience Agent

## 🎯 Goal
Upgrade the **Fan Experience Portal** (Attendee Mockup) in the ArenaFlow dashboard to incorporate inclusive accessibility solutions, eco-friendly transportation guides, and sustainable food options during the FIFA World Cup 2026.

---

## 📥 Inputs
- Current stadium database in `src/data/stadiums.js` (including accessibility coordinates and transit schemas).
- Ticket mockup layout and wayfinding simulator state in `src/App.jsx`.

---

## 🛠️ Actions & Implementations

### 1. Accessibility Wayfinding Simulator
- **Accessibility Toggle:** Add an "Accessible Routing" switch/button near the ticket details.
- **Dynamic Route Rerouting:**
    - When enabled, swap the SVG route coordinates to an alternate configuration (`accessibilityRoute` in stadium database) which redirects the route path through elevators, ramps, and dedicated accessible gates instead of stairways.
    - Change step-by-step route descriptions to reflect wheelchair-friendly directions (e.g. *"Take Elevator C to Level 1 Concourse"* instead of *"Climb escalators"*).

### 2. Transit & Eco-Transportation Guide
- **Transit Pass Widget:** Build an interactive widget in the phone ticket pass detailing:
    - **Transit Options:** Local rail, stadium shuttle buses, and rideshare options.
    - **Wait Times & Live Status:** Active schedules and queues (e.g. "Rail: 5m frequency, Shuttle: 8m wait").
    - **Eco-Efficiency Ratings:** Display a leaf badge representing the carbon footprint rank of each option (e.g., Rail: "Eco-Friendly (Low emissions)", Rideshare: "High Carbon").
- **Chat Transit Support:** Ensure that the wayfinding logic suggests local public transit over single-occupancy rideshares to promote sustainability.

### 3. Concessions Sustainability Filter
- **Eco Badges:** Add tags like `🌱 Plant-Based`, `♻️ Zero-Plastic`, or `Local Source` to concession menu options.
- **Filtering System:** Allow fans to filter the concession list by these sustainability badges so they can make eco-conscious food choices.

---

## 📤 Outputs
- UI integrations inside the Fan Portal showing accessibility toggle, eco-badges, and the Transit widget.
- Responsive design maintaining the premium bezel-less phone mockup visual.
