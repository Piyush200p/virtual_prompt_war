# Directive: Operations Agent

## 🎯 Goal
Enhance the **Tournament Operations Command** in the ArenaFlow dashboard to support green/sustainable stadium practices, volunteer and venue staff coordination, and AI-driven decision support during the FIFA World Cup 2026.

---

## 📥 Inputs
- Current stadium database in `src/data/stadiums.js` (including sustainability telemetry and volunteer tasks).
- User's UI state mapping inside `src/App.jsx`.
- Real-time simulation phases (Gates Open, Match Starting, Live, Half Time, Evacuating).

---

## 🛠️ Actions & Implementations

### 1. Sustainability & Green Operations Panel
- **Telemetry Display:** Render a visual dashboard tracking:
    - **Energy Grid Consumption:** (e.g. 240 kW/h, displaying high/medium/low grid load).
    - **Waste Distribution:** Real-time ratio of Organic vs Recyclable vs Landfill waste.
    - **Carbon Footprint Offset:** Calculated CO2 savings in metric tons from green transportation and solar offsets.
    - **Water Recycling Flow:** Liters of water recycled in the stadium infrastructure.
- **AI Green Decision Support:**
    - Provide a "GenAI Smart Green Recommendation" box.
    - Render AI suggestions based on telemetry, such as:
        - *"Reduce North Concourse brightness by 20% to manage grid peak during halftime."*
        - *"Dispatch Volunteer Crew Delta to Gate B recycling bins to resolve plastic sorting backlog."*

### 2. Volunteer & Venue Staff Task Board
- **Coordinator View:**
    - Create a task grid/board displaying active staff and volunteer assignments.
    - Columns: Task Name, Assigned Crew, Location, Status (Pending, Active, Completed), and priority.
- **AI Task Auto-Generator:**
    - Add an "AI Generate Volunteer Duty" button. When clicked, let the AI assistant analyze the current stadium telemetry (e.g. high density in South Stand, long concession lines) and auto-create volunteer assignments.
    - Example tasks:
        - *"Direct wheelchair fans at Gate B to Ramp 4 (Accessibility Support)"*
        - *"Manage line overflow at Burger Concession Stand (Queue Flow Control)"*

---

## 📤 Outputs
- Updated `src/App.jsx` showing the **Green Operations & Carbon Tracker** and **Volunteer Crew Task Board** within the Operations Tab.
- Fully functional local state hooks managing tasks and sustainability telemetry.
