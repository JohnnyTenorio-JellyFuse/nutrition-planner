import { useState } from "react";

const TABS = ["Your Plan", "5-Day Meals", "Recipes", "Snacks", "Best Foods"];

function Tag({ type }) {
  const map = {
    fish: { bg: "#ddf0f5", color: "#0e6070", label: "🐟 Fish/Seafood" },
    egg: { bg: "#fef3e2", color: "#8a4f00", label: "🥚 Eggs" },
    plant: { bg: "#e4f5e4", color: "#1a6a1a", label: "🌱 Plant" },
    nd: { bg: "#e0f0f8", color: "#1a5070", label: "No Dairy" },
    gf: { bg: "#ede8f8", color: "#5a2a9a", label: "GF" },
    topProtein: { bg: "#fff0e0", color: "#9a4a00", label: "⚡ Top Protein" },
  };
  const s = map[type] || { bg: "#eee", color: "#555", label: type };
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: 10, fontWeight: 700,
      padding: "2px 7px", borderRadius: 10, letterSpacing: "0.03em", whiteSpace: "nowrap"
    }}>{s.label}</span>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "14px 16px",
      border: "1px solid #e4ede4", boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      marginBottom: 10, ...style
    }}>{children}</div>
  );
}

function SLabel({ children }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase",
      color: "#1e6020", marginBottom: 10, marginTop: 20, paddingBottom: 5,
      borderBottom: "2px solid #c8e8c8"
    }}>{children}</div>
  );
}

function RecipeCard({ name, tags = [], cals, protein, fat, carbs, fiber, mod }) {
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#1a2a1a", lineHeight: 1.3, flex: 1 }}>{name}</div>
        <div style={{ fontSize: 15, fontWeight: 900, color: "#246024", whiteSpace: "nowrap" }}>{protein}g P</div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
        {tags.map(t => <Tag key={t} type={t} />)}
      </div>
      <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#777", flexWrap: "wrap", marginBottom: mod ? 8 : 0 }}>
        <span>🔥 {cals} cal</span>
        {fat !== undefined && <span>🫒 {fat}g fat</span>}
        {carbs !== undefined && <span>🌾 {carbs}g carbs</span>}
        {fiber !== undefined && <span>🌿 {fiber}g fiber</span>}
      </div>
      {mod && (
        <div style={{
          background: "#fffbe8", borderRadius: 8, padding: "7px 10px",
          fontSize: 12, color: "#6a5000", lineHeight: 1.5, borderLeft: "3px solid #f0c040"
        }}>
          <strong>Modify:</strong> {mod}
        </div>
      )}
    </Card>
  );
}

function MealDay({ day, meals, totalP, totalCal }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 10 }}>
      <div onClick={() => setOpen(!open)} style={{
        background: open ? "#1a4a1a" : "#246024",
        color: "#fff", borderRadius: open ? "12px 12px 0 0" : 12,
        padding: "13px 16px", cursor: "pointer",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontWeight: 800, fontSize: 14 }}>{day}</div>
        <div style={{ display: "flex", gap: 10, fontSize: 12, alignItems: "center" }}>
          <span style={{ background: "rgba(255,255,255,0.18)", borderRadius: 8, padding: "2px 9px", fontWeight: 800 }}>{totalP}g P</span>
          <span style={{ opacity: 0.7, fontSize: 11 }}>{totalCal} cal</span>
          <span style={{ fontSize: 14, opacity: 0.6 }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>
      {open && (
        <div style={{ border: "1px solid #b0d8b0", borderTop: "none", borderRadius: "0 0 12px 12px", overflow: "hidden" }}>
          {meals.map((m, i) => (
            <div key={i} style={{
              padding: "10px 14px",
              background: i % 2 === 0 ? "#f7fbf7" : "#fff",
              borderBottom: i < meals.length - 1 ? "1px solid #e0ede0" : "none"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, color: "#6a8a6a", fontWeight: 700, marginBottom: 1 }}>{m.time}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1a3a1a" }}>{m.name}</div>
                  {m.mod && <div style={{ fontSize: 11, color: "#7a5500", marginTop: 3, fontStyle: "italic", lineHeight: 1.5 }}>+ {m.mod}</div>}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#246024" }}>{m.protein}g</div>
                  <div style={{ fontSize: 10, color: "#aaa" }}>{m.cals} cal</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FoodGrid({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 4 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: "#f8fdf8", borderRadius: 10, padding: "10px 12px",
          border: "1px solid #d4e8d4"
        }}>
          <div style={{ fontSize: 16, marginBottom: 3 }}>{item.icon}</div>
          <div style={{ fontWeight: 700, fontSize: 12, color: "#1a3a1a" }}>{item.name}</div>
          {item.note && <div style={{ fontSize: 10, color: "#6a8a6a", marginTop: 2, lineHeight: 1.4 }}>{item.note}</div>}
        </div>
      ))}
    </div>
  );
}

// ─── Tab Views ───────────────────────────────────────────────────────────────

function YourPlan() {
  return (
    <div>
      <div style={{
        background: "linear-gradient(135deg, #1a4a1a 0%, #2d8030 100%)",
        borderRadius: 12, padding: "18px 20px", marginBottom: 16, color: "#fff",
        boxShadow: "0 2px 12px rgba(30,90,30,0.15)"
      }}>
        <div style={{ fontSize: 9, letterSpacing: "0.12em", color: "#a8e0a8", fontWeight: 800, fontFamily: "sans-serif", marginBottom: 8 }}>
          60-DAY FAT LOSS · BODI MBF + MBF+A
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1 }}>190</div>
            <div style={{ fontSize: 11, color: "#a0d0a0" }}>lbs today</div>
          </div>
          <div style={{ fontSize: 24, opacity: 0.4 }}>→</div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 30, fontWeight: 900, lineHeight: 1, color: "#80ff80" }}>175</div>
            <div style={{ fontSize: 11, color: "#a0d0a0" }}>lbs target (−15)</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["1,800", "cal/day"], ["~180g", "protein"], ["60", "days"]].map(([val, lbl]) => (
            <div key={lbl} style={{
              flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 10,
              padding: "8px 6px", textAlign: "center"
            }}>
              <div style={{ fontSize: 17, fontWeight: 900 }}>{val}</div>
              <div style={{ fontSize: 10, color: "#c0e0c0", marginTop: 1 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: "#fff8e1", borderRadius: 12, padding: "14px 16px", marginBottom: 16,
        border: "1px solid #ffe082", borderLeft: "4px solid #f9a825"
      }}>
        <div style={{ fontWeight: 800, fontSize: 13, color: "#5a3e00", marginBottom: 6 }}>⚠️ Honest Assessment: Is 15 lbs in 60 Days Doable?</div>
        <div style={{ fontSize: 12, color: "#6a4a00", lineHeight: 1.8 }}>
          With MBF burning <strong>350–500 cal/session</strong> and eating 1,800 cal/day, your daily
          deficit is roughly <strong>900–1,200 calories</strong> — that targets 1.5–2 lbs of fat per week.
          Over 60 days, that's <strong>12–17 lbs</strong>. Week 1 typically shows 3–5 lbs fast from water
          weight and glycogen. So 15 lbs is within range — but only with strict adherence.<br /><br />
          The real risk: drop protein below 175g and your body burns muscle instead of fat. The number on
          the scale drops, but you're weaker and your metabolism slows. <strong>Protein is the
          non-negotiable.</strong>
        </div>
      </div>

      <SLabel>Daily Macro Targets</SLabel>
      <Card>
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {[
            { val: "1,800", lbl: "Calories", sub: "per day", color: "#246024" },
            { val: "~180g", lbl: "Protein", sub: "top priority", color: "#b03000" },
            { val: "~55g", lbl: "Fat", sub: "healthy fats", color: "#0a5a7a" },
            { val: "~135g", lbl: "Carbs", sub: "morning focus", color: "#6a4a00" },
          ].map(m => (
            <div key={m.lbl} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 17, fontWeight: 900, color: m.color, lineHeight: 1 }}>{m.val}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#555", marginTop: 2 }}>{m.lbl}</div>
              <div style={{ fontSize: 9, color: "#aaa" }}>{m.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#f4faf4", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#3a5a3a", lineHeight: 1.6, border: "1px solid #dceadc" }}>
          <strong>Why 180g protein?</strong> At 1g per pound of body weight during a calorie deficit, this
          is the threshold that preserves lean muscle while MBF breaks down fat stores. Drop below it
          consistently and the scale will move but you'll lose strength and slow your metabolism.
        </div>
      </Card>

      <SLabel>Daily Schedule — Morning Workout</SLabel>
      {[
        { time: "Early Morning", label: "MBF Workout", note: "Train fasted — totally fine. Your body runs on stored glycogen. Don't eat before.", bg: "#e8f0fa", accent: "#1a4a7a" },
        { time: "4:45–5:00 AM", label: "Meal 1 · Vegan Protein Shake", note: "Your 30g shake. Non-negotiable. Hits the post-workout anabolic window. This is when your muscles absorb protein most efficiently.", bg: "#e8f8e8", accent: "#1a6a1a", macros: "30g P · ~160 cal" },
        { time: "8:00 AM", label: "Meal 2 · Breakfast", note: "Real food. High protein + smart carbs to fuel the rest of the morning. Don't skip this even if not hungry — you need the protein spread.", bg: "#f8f4e8", accent: "#7a5000", macros: "~30g P · ~400–430 cal" },
        { time: "12:30 PM", label: "Meal 3 · Lunch", note: "Biggest protein meal of the day. Shrimp or tuna every time possible. Your top-protein lunches hit 42–53g in one sitting.", bg: "#e8f5f8", accent: "#1a5a6a", macros: "~42–53g P · ~400–460 cal" },
        { time: "4:00 PM", label: "Meal 4 · Snack", note: "Protein-forward only. Shrimp cocktail or tuna salad. Skip high-carb snacks at this hour — carbs now will be stored, not burned.", bg: "#f0e8f8", accent: "#5a1a6a", macros: "~33g P · ~295–330 cal" },
        { time: "7:00 PM", label: "Meal 5 · Dinner", note: "Low-carb. Fish + vegetables is your best pattern. No grains, no bread. Your body doesn't need carbs at this hour.", bg: "#f8f8e8", accent: "#4a4a00", macros: "~38–42g P · ~400–420 cal" },
      ].map((row, i) => (
        <div key={i} style={{
          background: row.bg, borderRadius: 12, padding: "12px 14px", marginBottom: 8,
          border: `1px solid ${row.accent}22`
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: row.accent, fontWeight: 800, letterSpacing: "0.04em", marginBottom: 2 }}>{row.time}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2a1a", marginBottom: 4 }}>{row.label}</div>
              <div style={{ fontSize: 11, color: "#5a6a5a", lineHeight: 1.5 }}>{row.note}</div>
            </div>
            {row.macros && (
              <div style={{
                background: row.accent + "18", borderRadius: 8, padding: "4px 8px",
                fontSize: 10, fontWeight: 700, color: row.accent, whiteSpace: "nowrap", textAlign: "right", flexShrink: 0
              }}>{row.macros}</div>
            )}
          </div>
        </div>
      ))}

      <SLabel>6 Rules for MBF Muscle Preservation</SLabel>
      {[
        ["🐟", "Shrimp or Fish at Every Lunch", "Shrimp over squash noodles = 53g protein in one meal. This single lunch recipe alone gets you to 29% of your daily protein target."],
        ["🥚", "Egg Whites Are Your Calorie-Free Protein Hack", "2 egg whites = 7g protein, 34 calories, near-zero fat. Add them to any scramble, any meal. The cheapest protein booster in this plan."],
        ["🌊", "Salmon Minimum Twice a Week", "EPA + DHA omega-3s from wild salmon reduce muscle inflammation between MBF sessions. This speeds recovery and keeps you training hard all 60 days."],
        ["🚫", "No Grain or Bread at Dinner", "Keep dinner to fish and vegetables only. Carbs at night don't get burned — they get stored. This one habit alone accelerates fat loss noticeably."],
        ["💧", "95 oz of Water Daily", "190 lbs ÷ 2 = 95 oz. Drink 16 oz the moment you wake up in the morning. Dehydration by even 2% tanks MBF performance and slows fat metabolism."],
        ["⏰", "Protein Every 3–4 Hours", "5 meals spaced 3–4 hours apart keeps muscle protein synthesis elevated continuously. Going longer without protein lets your body start catabolizing muscle."],
      ].map(([icon, title, desc], i) => (
        <Card key={i}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13, color: "#1a3a1a", marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#5a7a5a", lineHeight: 1.6 }}>{desc}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function FiveDayPlan() {
  const days = [
    {
      day: "Day 1 — Salmon + Shrimp",
      totalP: 184, totalCal: 1742,
      meals: [
        { time: "4:45 AM · Post-Workout", name: "Vegan Protein Shake", protein: 30, cals: 160 },
        { time: "8:00 AM · Breakfast", name: "Simple Breakfast — 3 Eggs", protein: 30, cals: 430, mod: "Use 3 eggs instead of 2. Avocado + tomato + sprouted grain toast." },
        { time: "12:30 PM · Lunch", name: "Shrimp over Squash + Carrot Noodles", protein: 53, cals: 409 },
        { time: "4:00 PM · Snack", name: "Tuna Salad", protein: 33, cals: 328 },
        { time: "7:00 PM · Dinner", name: "Poached Salmon + Vegetables", protein: 38, cals: 415 },
      ]
    },
    {
      day: "Day 2 — Tofu + Shrimp",
      totalP: 171, totalCal: 1783,
      meals: [
        { time: "4:45 AM · Post-Workout", name: "Vegan Protein Shake", protein: 30, cals: 160 },
        { time: "8:00 AM · Breakfast", name: "Mexican Tofu Scramble", protein: 30, cals: 450, mod: "Add 2 egg whites scrambled in. +7g protein, +34 cal." },
        { time: "12:30 PM · Lunch", name: "Shrimp + Avocado Lettuce Wraps", protein: 42, cals: 401 },
        { time: "4:00 PM · Snack", name: "Shrimp Cocktail", protein: 33, cals: 295 },
        { time: "7:00 PM · Dinner", name: "Sweet Potato Tofu Scramble", protein: 36, cals: 477, mod: "Add 3 egg whites to the pan during cooking." },
      ]
    },
    {
      day: "Day 3 — Tuna Focus",
      totalP: 172, totalCal: 1706,
      meals: [
        { time: "4:45 AM · Post-Workout", name: "Vegan Protein Shake", protein: 30, cals: 160 },
        { time: "8:00 AM · Breakfast", name: "Breakfast Salad — No Bacon", protein: 27, cals: 380, mod: "Skip turkey bacon. Use 3 eggs. Add extra tbsp sunflower seeds." },
        { time: "12:30 PM · Lunch", name: "Mediterranean Tuna Salad", protein: 38, cals: 455, mod: "Add 2oz extra canned tuna. Same dressing, same bowl." },
        { time: "4:00 PM · Snack", name: "Shrimp Cocktail", protein: 33, cals: 295 },
        { time: "7:00 PM · Dinner", name: "Shrimp + Avocado Lettuce Wraps", protein: 42, cals: 401 },
      ]
    },
    {
      day: "Day 4 — Shrimp Bowl",
      totalP: 180, totalCal: 1767,
      meals: [
        { time: "4:45 AM · Post-Workout", name: "Vegan Protein Shake", protein: 30, cals: 160 },
        { time: "8:00 AM · Breakfast", name: "Pumpkin Pancakes + 2 Boiled Eggs", protein: 28, cals: 400, mod: "Make 4 pancakes (2/3 recipe). Add 2 hard-boiled eggs on the side. Skip syrup." },
        { time: "12:30 PM · Lunch", name: "Shrimp over Squash + Carrot Noodles", protein: 53, cals: 409 },
        { time: "4:00 PM · Snack", name: "Tuna Salad", protein: 33, cals: 328 },
        { time: "7:00 PM · Dinner", name: "Vegan Buddha Bowl + Shrimp", protein: 37, cals: 470, mod: "Add 5oz cooked shrimp. Reduce chickpeas by half to keep calories in range." },
      ]
    },
    {
      day: "Day 5 — Grain Porridge + Salmon",
      totalP: 173, totalCal: 1714,
      meals: [
        { time: "4:45 AM · Post-Workout", name: "Vegan Protein Shake", protein: 30, cals: 160 },
        { time: "8:00 AM · Breakfast", name: "Fruity Grain Porridge — Boosted", protein: 33, cals: 415, mod: "Stir in 3 tbsp hemp seeds + 1/2 scoop vegan protein powder. Skip walnuts or reduce to 1 tbsp." },
        { time: "12:30 PM · Lunch", name: "Shrimp + Avocado Lettuce Wraps", protein: 42, cals: 401 },
        { time: "4:00 PM · Snack", name: "Tuna Salad", protein: 33, cals: 328 },
        { time: "7:00 PM · Dinner", name: "Poached Salmon + Vegetables", protein: 38, cals: 415 },
      ]
    },
  ];

  return (
    <div>
      <div style={{
        background: "#e8f5e8", borderRadius: 12, padding: "12px 14px", marginBottom: 14,
        border: "1px solid #b0d8b0", fontSize: 12, color: "#2a5a2a", lineHeight: 1.7
      }}>
        Rotate Days 1–5 then repeat. Post-workout shake is the same every day. Tap any day to expand the full meal breakdown.
      </div>

      {days.map((d, i) => <MealDay key={i} {...d} />)}

      <SLabel>Meal Prep — Sunday + Wednesday</SLabel>
      <Card>
        {[
          "🦐 Cook 2 lbs shrimp — keeps 3 days max in fridge",
          "🐟 Buy 2 salmon fillets — cook same day or next day only",
          "🥚 Hard-boil 8 eggs — keep in shell in fridge all week",
          "🥫 Stock 5 cans chunk light tuna — your fastest protein source",
          "🌿 Wash and bag kale, spinach, romaine",
          "🍠 Roast 2 sweet potatoes — use across multiple dinners",
          "🌾 Cook 2 cups quinoa or brown rice in bulk",
          "🥣 Make grain porridge in slow cooker Sunday night (Mon/Tue breakfasts)",
        ].map((item, i) => (
          <div key={i} style={{ fontSize: 12, color: "#3a5a3a", padding: "4px 0", borderBottom: i < 7 ? "1px solid #eef5ee" : "none" }}>{item}</div>
        ))}
      </Card>

      <SLabel>If You Fall Short on Protein</SLabel>
      <Card>
        <div style={{ fontSize: 12, color: "#4a4a4a", marginBottom: 8 }}>Add any of these without breaking your calorie budget:</div>
        {[
          ["2 egg whites scrambled in", "+7g P", "34 cal"],
          ["1 extra oz canned tuna", "+7g P", "30 cal"],
          ["3oz extra cooked shrimp", "+18g P", "85 cal"],
          ["½ cup edamame", "+9g P", "95 cal"],
          ["2 tbsp hemp seeds", "+6g P", "110 cal"],
        ].map(([item, p, cal], i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", padding: "6px 0",
            borderBottom: i < 4 ? "1px solid #eee" : "none", fontSize: 12
          }}>
            <span style={{ color: "#3a3a3a" }}>{item}</span>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ color: "#246024", fontWeight: 800 }}>{p}</span>
              <span style={{ color: "#aaa", minWidth: 48, textAlign: "right" }}>{cal}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function Recipes() {
  const [meal, setMeal] = useState("Breakfast");

  const recipes = {
    Breakfast: [
      { name: "Simple Breakfast — 3 Eggs", tags: ["egg", "nd"], cals: 430, protein: 30, fat: 22, carbs: 43, fiber: 11, mod: "Use 3 eggs instead of 2. Avocado + tomato + sprouted grain toast. No changes to anything else." },
      { name: "Mexican Tofu Scramble", tags: ["plant", "nd"], cals: 450, protein: 30, fat: 12, carbs: 62, fiber: 18, mod: "Add 2 egg whites scrambled in alongside the tofu. +7g protein, +34 cal." },
      { name: "Breakfast Salad — No Bacon", tags: ["egg", "nd", "gf"], cals: 380, protein: 27, fat: 26, carbs: 22, fiber: 10, mod: "Skip turkey bacon entirely. Use 3 eggs. Add 1 extra tbsp sunflower seeds." },
      { name: "Pumpkin Pancakes + 2 Boiled Eggs", tags: ["egg", "nd", "gf"], cals: 400, protein: 28, fat: 12, carbs: 54, fiber: 14, mod: "Make only 4 pancakes (2/3 of recipe). Two hard-boiled eggs on the side. Skip maple syrup." },
      { name: "Fruity Grain Porridge — Boosted", tags: ["plant", "nd"], cals: 415, protein: 33, fat: 8, carbs: 62, fiber: 10, mod: "Add 3 tbsp hemp seeds + 1/2 scoop vegan protein powder stirred in. Reduce walnuts to 1 tbsp." },
    ],
    Lunch: [
      { name: "Shrimp over Squash + Carrot Noodles", tags: ["fish", "nd", "gf", "topProtein"], cals: 409, protein: 53, fat: 13, carbs: 25, fiber: 7 },
      { name: "Shrimp + Avocado Lettuce Wraps", tags: ["fish", "nd", "gf", "topProtein"], cals: 401, protein: 42, fat: 20, carbs: 11, fiber: 4 },
      { name: "Mediterranean Tuna Salad", tags: ["fish", "nd", "gf"], cals: 455, protein: 38, fat: 19, carbs: 38, fiber: 8, mod: "Add 2oz extra canned tuna to the bowl. Keep all other measurements the same." },
      { name: "Egg Salad Sandwich — 3 Eggs", tags: ["egg", "nd"], cals: 430, protein: 28, fat: 21, carbs: 35, fiber: 7, mod: "Use 3 hard-boiled eggs instead of 2. Add handful of spinach or arugula." },
      { name: "Winter Superfoods Bowl + Protein", tags: ["plant", "fish", "nd", "gf"], cals: 470, protein: 33, fat: 18, carbs: 56, fiber: 15, mod: "Add 5oz cooked shrimp or 2 boiled eggs on top to reach your protein target for this meal." },
    ],
    Dinner: [
      { name: "Poached Salmon + Vegetables", tags: ["fish", "nd", "gf", "topProtein"], cals: 415, protein: 38, fat: 21, carbs: 21, fiber: 5 },
      { name: "Shrimp + Avocado Lettuce Wraps", tags: ["fish", "nd", "gf", "topProtein"], cals: 401, protein: 42, fat: 20, carbs: 11, fiber: 4 },
      { name: "Shrimp over Squash + Carrot Noodles", tags: ["fish", "nd", "gf", "topProtein"], cals: 409, protein: 53, fat: 13, carbs: 25, fiber: 7 },
      { name: "Sweet Potato Tofu Scramble + Egg Whites", tags: ["plant", "egg", "nd", "gf"], cals: 477, protein: 36, fat: 19, carbs: 48, fiber: 11, mod: "Add 3 egg whites to the scramble while cooking." },
      { name: "Vegan Buddha Bowl + Shrimp", tags: ["plant", "fish", "nd", "gf"], cals: 470, protein: 37, fat: 15, carbs: 52, fiber: 13, mod: "Add 5oz cooked shrimp. Reduce chickpeas by half a can to stay in calorie range." },
    ],
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "#f0f7f0", borderRadius: 10, padding: 4, border: "1px solid #dce8dc" }}>
        {["Breakfast", "Lunch", "Dinner"].map(m => (
          <button key={m} onClick={() => setMeal(m)} style={{
            flex: 1, border: "none", borderRadius: 9, cursor: "pointer",
            padding: "8px 4px", fontWeight: 700, fontSize: 12, fontFamily: "sans-serif",
            background: meal === m ? "#246024" : "transparent",
            color: meal === m ? "#fff" : "#6a8a6a",
          }}>{m}</button>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#8a9a8a", marginBottom: 12, fontStyle: "italic" }}>
        Sorted by protein · All pescatarian + dairy-free
      </div>
      {recipes[meal].map((r, i) => <RecipeCard key={i} {...r} />)}
    </div>
  );
}

function Snacks() {
  return (
    <div>
      <div style={{
        background: "#e8f5e8", borderRadius: 12, padding: "12px 14px", marginBottom: 14,
        border: "1px solid #b0d8b0", fontSize: 12, color: "#2a5a2a", lineHeight: 1.6
      }}>
        Your snack goal: <strong>30g+ protein, under 350 cal.</strong> Shrimp and tuna are your best options by a wide margin. Eat around <strong>4pm</strong>.
      </div>

      <SLabel>Top Protein Snacks — Use These</SLabel>
      <RecipeCard name="Shrimp Cocktail" tags={["fish", "nd", "topProtein"]} cals={295} protein={33} fat={2} carbs={39} fiber={6} />
      <RecipeCard name="Tuna Salad" tags={["fish", "nd", "gf", "topProtein"]} cals={328} protein={33} fat={18} carbs={9} fiber={3} />
      <RecipeCard name="Avocado Deviled Eggs + Apple" tags={["egg", "nd", "gf"]} cals={304} protein={14} fat={17} carbs={26} fiber={7}
        mod="Add 2 more hard-boiled egg whites to the plate to push protein to ~22g." />

      <SLabel>Lighter Snacks — Pair with Protein</SLabel>
      <RecipeCard name="Avocado Toast + Pumpkin Seeds" tags={["plant", "nd"]} cals={170} protein={5} fat={8} carbs={21} fiber={7}
        mod="Low protein alone. Add 1 can of tuna on the side to make it a complete snack." />
      <RecipeCard name="Maple Chai Roasted Chickpeas" tags={["plant", "nd", "gf"]} cals={151} protein={6} fat={6} carbs={20} fiber={6}
        mod="Good fiber snack but low protein. Pair alongside Shrimp Cocktail." />
      <RecipeCard name="Cucumber Avocado Roll-Ups" tags={["plant", "nd", "gf"]} cals={142} protein={4} fat={11} carbs={9} fiber={5}
        mod="Use as a side with tuna or shrimp, not as a standalone snack." />

      <SLabel>Skip for the 60 Days</SLabel>
      <div style={{
        background: "#fff3f3", borderRadius: 12, padding: "12px 14px",
        border: "1px solid #ffb0b0", fontSize: 12, color: "#7a2a2a", lineHeight: 1.8
      }}>
        <strong>Not worth it right now:</strong> Yogurt with blueberries (dairy), BEACHBAR with yogurt (dairy), Cheesy Cauliflower Nachos (dairy), PB&amp;J (high sugar, low protein), Chocolate Matcha Energy Balls (only 6g protein). These are fine foods for maintenance — not for an aggressive 60-day cut.
      </div>
    </div>
  );
}

function BestFoods() {
  return (
    <div>
      <SLabel>Protein — Ranked by Value for Your Goals</SLabel>
      <FoodGrid items={[
        { icon: "🦐", name: "Shrimp", note: "53g P in a recipe serving. Best protein density in this plan." },
        { icon: "🐟", name: "Wild Salmon", note: "38g P per 6oz fillet + anti-inflammatory omega-3s." },
        { icon: "🐟", name: "Canned Tuna (light)", note: "33g P per 5oz can. Keep 5 cans in the pantry." },
        { icon: "🥚", name: "Eggs + Egg Whites", note: "6g P whole egg. 3.5g P per egg white at 17 cal." },
        { icon: "🌱", name: "Firm Tofu", note: "Best paired with egg whites to hit 30g+ at breakfast." },
        { icon: "🫘", name: "Lentils", note: "17g P + 22g fiber. Best plant protein-to-fiber ratio." },
        { icon: "🫘", name: "Chickpeas", note: "~15g P per can. Use in Buddha bowls and salads." },
        { icon: "🌾", name: "Quinoa", note: "Complete protein — all 9 essential amino acids." },
        { icon: "🌿", name: "Hemp Seeds", note: "6g P per 2 tbsp. Stir into shakes and porridge." },
      ]} />

      <SLabel>Omega-3 Sources — Recovery Priority</SLabel>
      <div style={{ background: "#e8f5f8", borderRadius: 12, padding: "12px 14px", marginBottom: 10, border: "1px solid #a0d0e0", fontSize: 12, color: "#1a4a5a", lineHeight: 1.7 }}>
        EPA + DHA from <strong>wild salmon</strong> are the most bioavailable omega-3s and the ones with the strongest evidence for reducing exercise-induced inflammation. Eat salmon at least twice a week during MBF or recovery suffers.
      </div>
      <FoodGrid items={[
        { icon: "🐟", name: "Wild Salmon (EPA/DHA)", note: "Best form — directly usable. Eat 2x/week." },
        { icon: "🌱", name: "Chia Seeds (ALA)", note: "Good plant source. Add to shakes + porridge." },
        { icon: "🌱", name: "Flaxseeds (ALA)", note: "Grind before using for full absorption." },
        { icon: "🌿", name: "Hemp Seeds (ALA)", note: "Best omega-6:3 ratio of any seed." },
        { icon: "🌰", name: "Walnuts (ALA)", note: "Best nut for omega-3s. Use 1 tbsp in porridge." },
      ]} />

      <SLabel>Smart Carbs — Time These for Morning</SLabel>
      <div style={{ background: "#f8f5e8", borderRadius: 12, padding: "12px 14px", marginBottom: 10, border: "1px solid #e0d080", fontSize: 12, color: "#5a4a00", lineHeight: 1.7 }}>
        Eat carbs at Meal 2 (breakfast) and Meal 3 (lunch). <strong>No grains or bread at dinner.</strong> Your muscles absorb carbs best in the hours after a workout. By evening, unused carbs get stored as fat.
      </div>
      <FoodGrid items={[
        { icon: "🍠", name: "Sweet Potato", note: "Post-workout carb. Slow-burning, nutrient-dense." },
        { icon: "🌾", name: "Quinoa", note: "Protein + carb combo. Best lunch grain base." },
        { icon: "🥣", name: "Rolled Oats", note: "Breakfast only. Steady energy, no crash." },
        { icon: "🌾", name: "Brown Rice", note: "Pairs with tuna salad and shrimp lunches." },
        { icon: "🥙", name: "Sprouted Grain Bread", note: "More protein than regular bread. Breakfast only." },
        { icon: "🫘", name: "Lentils", note: "Dual carb + protein. Extremely satiating." },
      ]} />

      <SLabel>Dairy Replacements (Calcium Sources)</SLabel>
      <FoodGrid items={[
        { icon: "🥛", name: "Almond Milk (unswt.)", note: "In shakes, porridge, pancakes." },
        { icon: "🥥", name: "Lite Coconut Milk", note: "For sauces and tofu dishes." },
        { icon: "🌱", name: "Chia Seeds", note: "Calcium source — replaces dairy calcium." },
        { icon: "🥬", name: "Kale + Spinach", note: "Both high in calcium. Eat with every meal." },
      ]} />

      <SLabel>Water — 95 oz Daily</SLabel>
      <Card>
        <div style={{ fontSize: 12, color: "#3a5a3a", lineHeight: 1.9 }}>
          <strong>190 lbs ÷ 2 = 95 oz target</strong>
          <div style={{ color: "#5a7a5a", marginTop: 6 }}>
            Early Morning wake-up: 16 oz immediately<br />
            During MBF workout: 16–20 oz<br />
            Post-workout to noon: 20 oz<br />
            Afternoon: 20 oz<br />
            Evening: 16 oz<br /><br />
            Add lemon, lime, or mint. Sparkling water is fine — zero cal, no artificial sweeteners.
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("Your Plan");
  const views = {
    "Your Plan": <YourPlan />,
    "5-Day Meals": <FiveDayPlan />,
    "Recipes": <Recipes />,
    "Snacks": <Snacks />,
    "Best Foods": <BestFoods />,
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#ffffff", minHeight: "100vh", maxWidth: 480, margin: "0 auto" }}>
      <div style={{
        background: "linear-gradient(160deg, #1a4a1a 0%, #2d8030 100%)",
        padding: "22px 20px 16px", color: "#fff"
      }}>
        <div style={{ fontSize: 9, letterSpacing: "0.14em", color: "#a8e0a8", fontWeight: 800, fontFamily: "sans-serif", marginBottom: 4 }}>
          BODI · MBF + MBF+A · 60-DAY CUT · PESCATARIAN
        </div>
        <div style={{ fontSize: 21, fontWeight: 900, lineHeight: 1.2, marginBottom: 4 }}>
          Muscle-Preservation<br />Nutrition Plan
        </div>
        <div style={{ fontSize: 11, color: "#c0e8c0", fontFamily: "sans-serif" }}>
          190 → 175 lbs · 1,800 cal/day · 175–185g protein
        </div>
      </div>

      <div style={{
        display: "flex", overflowX: "auto", background: "#fff",
        borderBottom: "2px solid #e0ece0", padding: "0 2px",
        position: "sticky", top: 0, zIndex: 10, scrollbarWidth: "none",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActive(tab)} style={{
            border: "none", background: "none", cursor: "pointer",
            padding: "12px 10px 10px", fontSize: 12, fontWeight: active === tab ? 700 : 400,
            fontFamily: "sans-serif", color: active === tab ? "#1e6020" : "#999",
            borderBottom: active === tab ? "2px solid #1e6020" : "2px solid transparent",
            marginBottom: -2, whiteSpace: "nowrap", flexShrink: 0,
          }}>{tab}</button>
        ))}
      </div>

      <div style={{ padding: "18px 16px 56px", background: "#ffffff" }}>
        {views[active]}
      </div>
    </div>
  );
}
