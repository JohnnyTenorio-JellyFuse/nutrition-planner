# Nutrition Planner

A local-first nutrition tracking and meal-planning web app, plus two React prototypes exploring different UI directions for the same data.

60-Day Cut · Pescatarian + No Dairy · Macro Tracking

---

## Why this exists

Built as a personal tool for following a structured nutrition plan (calorie/macro targets, a recurring meal schedule, and a recipe library) during a fat-loss program. Includes a sample plan template (`docs/nutrition-plan-template.md`) that the app can edit and export — useful as a portable "context document" for an AI assistant or for tracking progress over time.

---

## Structure

```
nutrition-planner/
├── app/                  — the deployed local web app
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   ├── server.js
│   └── package.json
├── react-prototypes/     — earlier React-based UI explorations
│   ├── mbf-nutrition-plan.jsx
│   └── pescatarian-nutrition-guide.jsx
└── docs/
    ├── RECIPES.md                 — detailed recipes for the 5-day meal plan
    └── nutrition-plan-template.md — editable plan/context template
```

---

## Running the App

```bash
cd app
node server.js
```

Then open **http://localhost:3000**.

No `npm install` needed — `server.js` is a zero-dependency static server using only Node.js built-ins.

---

## Architecture

Same pattern as the FitCore app in this portfolio: vanilla JS, no framework, no build step.

- **State** is held in plain JS objects in `app.js`
- **`render()`** rebuilds the active tab's content
- **`PLAN_DAYS`** holds the structured meal plan data (times, meals, macros)
- **`DEFAULT_MD`** holds the editable plan template, shown in the "Edit Plan" tab

### Plan Template Workflow

1. Open the app → **Edit Plan** tab
2. Use **Quick Update** to log current weight or append a note
3. Click **⬇ Download** to export the updated template
4. The downloaded file can be dropped into a project as a reference document for an AI coding assistant

localStorage keeps edits between sessions on the same machine/browser.

---

## React Prototypes

`react-prototypes/` contains two earlier component-based explorations of the same nutrition data — useful as a reference for the macro-bar visualizations, tag system, and tabbed plan layout, built with `useState` and inline styles (no CSS framework).

---

## Editing

| File | What to edit |
|---|---|
| `app/app.js` | `DEFAULT_MD` template, `PLAN_DAYS` meal plan data |
| `app/style.css` | Colors (CSS variables), spacing, fonts |
| `app/index.html` | Sections, tabs, content |
| `docs/RECIPES.md` | Recipe details referenced by the meal plan |
