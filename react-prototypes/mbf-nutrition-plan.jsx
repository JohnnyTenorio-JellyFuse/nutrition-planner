import { useState } from "react";

const TABS = ["My Plan", "7-Day Meals", "Breakfast", "Lunch", "Dinner", "Snacks", "Best Foods"];

// ─── Reusable Components ──────────────────────────────────────────────────────

function MacroBar({ protein, carbs, fat }) {
  const total = protein * 4 + carbs * 4 + fat * 9;
  const pPct = Math.round((protein * 4 / total) * 100);
  const cPct = Math.round((carbs * 4 / total) * 100);
  const fPct = 100 - pPct - cPct;
  return (
    <div>
      <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 8, marginBottom: 6 }}>
        <div style={{ width: `${pPct}%`, background: "#e05a2a" }} />
        <div style={{ width: `${cPct}%`, background: "#2a7aaa" }} />
        <div style={{ width: `${fPct}%`, background: "#aaa840" }} />
      </div>
      <div style={{ display: "flex", gap: 12, fontSize: 10, fontFamily: "sans-serif" }}>
        <span style={{ color: "#e05a2a" }}>● {protein}g protein</span>
        <span style={{ color: "#2a7aaa" }}>● {carbs}g carbs</span>
        <span style={{ color: "#aaa840" }}>● {fat}g fat</span>
      </div>
    </div>
  );
}

function Tag({ t }) {
  const map = {
    "🐟": { bg: "#e0f5f0", color: "#1a6a50" },
    "ND": { bg: "#1a3a1a", color: "#a0d0a0" },
    "GF": { bg: "#2a1a4a", color: "#c0a0f0" },
    "V": { bg: "#1a3a2a", color: "#80d080" },
    "⭐": { bg: "#4a3a00", color: "#f0c840" },
  };
  const s = map[t] || { bg: "#2a2a2a", color: "#ccc" };
  return (
    <span style={{
      background: s.bg, color: s.color, fontSize: 9, fontWeight: 800,
      padding: "2px 7px", borderRadius: 20, letterSpacing: "0.06em",
      fontFamily: "sans-serif", whiteSpace: "nowrap"
    }}>{t}</span>
  );
}

function RecipeCard({ name, tags = [], cal, protein, fat, carbs, fiber, notes, boost }) {
  return (
    <div style={{
      background: "#111", borderRadius: 14, padding: "14px 16px", marginBottom: 10,
      border: "1px solid #252525"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
        <div style={{ fontWeight: 800, fontSize: 14, color: "#f0f0f0", lineHeight: 1.3, fontFamily: "sans-serif" }}>{name}</div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#e05a2a", fontFamily: "sans-serif" }}>{cal}</div>
          <div style={{ fontSize: 9, color: "#666", fontFamily: "sans-serif" }}>cal</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
        {tags.map(t => <Tag key={t} t={t} />)}
      </div>
      <MacroBar protein={protein} carbs={carbs} fat={fat} />
      {fiber && <div style={{ fontSize: 11, color: "#667a66", marginTop: 6, fontFamily: "sans-serif" }}>🌿 {fiber}g fiber</div>}
      {notes && <div style={{ marginTop: 8, fontSize: 12, color: "#888", lineHeight: 1.6, fontStyle: "italic", fontFamily: "sans-serif" }}>{notes}</div>}
      {boost && (
        <div style={{ marginTop: 8, background: "#1a2a1a", borderRadius: 8, padding: "8px 10px", border: "1px solid #2a4a2a" }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: "#60b060", fontFamily: "sans-serif", letterSpacing: "0.05em" }}>💪 MUSCLE BOOST — </span>
          <span style={{ fontSize: 11, color: "#80c080", fontFamily: "sans-serif" }}>{boost}</span>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 900, letterSpacing: "0.14em", textTransform: "uppercase",
      color: "#e05a2a", marginBottom: 12, marginTop: 4,
      paddingBottom: 6, borderBottom: "1px solid #222",
      fontFamily: "sans-serif"
    }}>{title}</div>
  );
}

// ─── Tab Content ──────────────────────────────────────────────────────────────

function MyPlan() {
  const daysLeft = 60;
  const startWeight = 190;
  const goalWeight = 175;
  const lbsToLose = startWeight - goalWeight;

  return (
    <div>
      {/* Goal Banner */}
      <div style={{
        background: "linear-gradient(135deg, #1a0a00, #3a1500)",
        borderRadius: 16, padding: "20px", marginBottom: 20,
        border: "1px solid #5a2a00"
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", color: "#e05a2a", marginBottom: 8, fontFamily: "sans-serif" }}>
          60-DAY MISSION
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", fontFamily: "sans-serif" }}>190</div>
            <div style={{ fontSize: 10, color: "#e05a2a", fontFamily: "sans-serif" }}>START</div>
          </div>
          <div style={{ fontSize: 24, color: "#5a2a00" }}>→</div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#60d060", fontFamily: "sans-serif" }}>175</div>
            <div style={{ fontSize: 10, color: "#60d060", fontFamily: "sans-serif" }}>GOAL</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { label: "lbs to lose", val: lbsToLose },
            { label: "lbs/week", val: "1.75" },
            { label: "days", val: daysLeft },
          ].map(m => (
            <div key={m.label} style={{ flex: 1, background: "rgba(0,0,0,0.4)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "sans-serif" }}>{m.val}</div>
              <div style={{ fontSize: 9, color: "#888", fontFamily: "sans-serif", letterSpacing: "0.05em" }}>{m.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Targets */}
      <SectionHeader title="Daily Nutrition Targets" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
        {[
          { icon: "🔥", label: "Calories", val: "1,800", sub: "lose weight + MBF", color: "#e05a2a" },
          { icon: "🥩", label: "Protein", val: "150g", sub: "muscle preservation", color: "#d04a4a" },
          { icon: "🌾", label: "Carbs", val: "~175g", sub: "fuel MBF workouts", color: "#2a7aaa" },
          { icon: "🫒", label: "Fat", val: "~55g", sub: "from whole foods", color: "#aaa840" },
        ].map(t => (
          <div key={t.label} style={{
            background: "#111", borderRadius: 12, padding: "14px 14px",
            border: `1px solid #252525`
          }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{t.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: t.color, fontFamily: "sans-serif" }}>{t.val}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#ccc", fontFamily: "sans-serif" }}>{t.label}</div>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "sans-serif", marginTop: 2 }}>{t.sub}</div>
          </div>
        ))}
      </div>

      {/* Why 150g Protein */}
      <div style={{ background: "#0d1a0d", borderRadius: 12, padding: "14px 16px", marginBottom: 20, border: "1px solid #1a3a1a" }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: "#60b060", marginBottom: 8, fontFamily: "sans-serif", letterSpacing: "0.05em" }}>
          WHY 150G PROTEIN?
        </div>
        <div style={{ fontSize: 12, color: "#8a9a8a", lineHeight: 1.7, fontFamily: "sans-serif" }}>
          At 190 lbs in an aggressive calorie deficit (1.75 lbs/week), your body needs <strong style={{ color: "#a0c0a0" }}>0.8g of protein per pound</strong> to avoid burning muscle for fuel. MBF resistance training signals your body to keep that muscle — but only if you feed it enough protein. <strong style={{ color: "#a0c0a0" }}>Your 30g post-workout shake covers 20% of your daily target before your first meal.</strong>
        </div>
      </div>

      {/* Meal Timing */}
      <SectionHeader title="Daily Meal Schedule" />
      <div style={{ marginBottom: 20 }}>
        {[
          { time: "Early Morning", label: "#MBF / MBF+A Workout", icon: "💪", color: "#e05a2a", note: "Train fasted — fine for fat burn at this intensity" },
          { time: "5:00 AM", label: "Vegan Protein Shake", icon: "🥤", color: "#d04a4a", note: "30g protein. Non-negotiable. Stops muscle breakdown immediately post-workout." },
          { time: "7:30 AM", label: "Breakfast", icon: "🍳", color: "#2a7aaa", note: "22–28g protein. Prioritize eggs + whole grains or tofu." },
          { time: "12:00 PM", label: "Lunch", icon: "🥗", color: "#2a8a5a", note: "25–35g protein. Tuna, shrimp, egg salad, or tofu-based." },
          { time: "3:00 PM", label: "Optional Snack", icon: "🫐", color: "#6a6a6a", note: "Only if hungry. Keep under 250 cal. Skip if you've hit your calorie goal." },
          { time: "6:30 PM", label: "Dinner", icon: "🐟", color: "#5a3aaa", note: "35–50g protein. Your biggest protein meal. Salmon or shrimp = best options." },
        ].map((m, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, alignItems: "flex-start",
            marginBottom: 10, padding: "12px 14px",
            background: "#111", borderRadius: 12, border: "1px solid #252525"
          }}>
            <div style={{ textAlign: "center", flexShrink: 0, minWidth: 52 }}>
              <div style={{ fontSize: 18 }}>{m.icon}</div>
              <div style={{ fontSize: 9, color: m.color, fontWeight: 700, fontFamily: "sans-serif" }}>{m.time}</div>
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 13, color: "#f0f0f0", marginBottom: 3, fontFamily: "sans-serif" }}>{m.label}</div>
              <div style={{ fontSize: 11, color: "#777", lineHeight: 1.5, fontFamily: "sans-serif" }}>{m.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Deficit Math */}
      <SectionHeader title="The Math Behind Your Goal" />
      <div style={{ background: "#0a0a14", borderRadius: 12, padding: "14px 16px", border: "1px solid #1a1a3a", marginBottom: 20 }}>
        {[
          ["15 lbs ÷ 60 days", "1.75 lbs/week needed"],
          ["1.75 lbs × 3,500 cal", "~6,125 cal deficit/week"],
          ["6,125 ÷ 7 days", "~875 cal/day below maintenance"],
          ["Your TDEE (est.)", "~2,650 cal/day at 190 lbs active"],
          ["2,650 − 875", "→ 1,775 cal target"],
          ["Guide recommendation", "1,800 cal (MBF = Int–Advanced)"],
        ].map(([left, right], i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "7px 0", borderBottom: i < 5 ? "1px solid #1a1a2a" : "none"
          }}>
            <div style={{ fontSize: 11, color: "#666", fontFamily: "sans-serif" }}>{left}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: i === 5 ? "#60d060" : "#ccc", fontFamily: "sans-serif" }}>{right}</div>
          </div>
        ))}
      </div>

      {/* MBF Notes */}
      <SectionHeader title="MBF + Nutrition Notes" />
      {[
        { icon: "🏋️", title: "Rest Days: Cut Carbs Slightly", body: "On non-workout days, drop carbs by 30-40g (skip the grain serving at one meal). Keep protein the same." },
        { icon: "⚡", title: "Pre-Workout: Nothing Needed in the morning", body: "Your glycogen stores from the prior day's carbs are your fuel. A shake after is what matters most." },
        { icon: "📏", title: "Track Weekly, Not Daily", body: "Weigh yourself once per week, same time, same conditions. Daily weight fluctuates by 2-4 lbs from water." },
        { icon: "🐟", title: "Salmon Twice a Week Minimum", body: "Omega-3s from salmon actively reduce inflammation caused by MBF training, improving recovery speed." },
        { icon: "💧", title: "Water Target: 95 oz/day", body: "You're 190 lbs. Half your bodyweight in ounces = 95 oz. Add electrolytes on hard training days." },
      ].map((n, i) => (
        <div key={i} style={{
          background: "#111", borderRadius: 12, padding: "12px 14px", marginBottom: 8,
          border: "1px solid #252525", display: "flex", gap: 12
        }}>
          <div style={{ fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 12, color: "#e0e0e0", marginBottom: 3, fontFamily: "sans-serif" }}>{n.title}</div>
            <div style={{ fontSize: 11, color: "#777", lineHeight: 1.5, fontFamily: "sans-serif" }}>{n.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function WeekPlan() {
  const [activeDay, setActiveDay] = useState(0);

  const days = [
    {
      label: "MON", name: "Monday",
      meals: [
        { time: "5:00 AM", icon: "🥤", title: "Post-Workout Shake", detail: "Your own 30g vegan protein shake", cal: 150, protein: 30, carbs: 5, fat: 2 },
        { time: "7:30 AM", icon: "🍳", title: "Simple Breakfast (3 eggs)", detail: "3 hard-boiled eggs + ½ avocado + tomato + slice sprouted grain toast + pear", cal: 460, protein: 25, carbs: 42, fat: 20 },
        { time: "12:00 PM", icon: "🥗", title: "Mediterranean Tuna Salad", detail: "Chunk light tuna + brown rice + spinach + avocado + cucumber + olive oil dressing", cal: 424, protein: 27, carbs: 36, fat: 19 },
        { time: "6:30 PM", icon: "🐟", title: "Shrimp & Avocado Lettuce Wraps", detail: "Cooked shrimp + red onion + bell pepper + cilantro + lime in butter lettuce with avocado", cal: 401, protein: 42, carbs: 11, fat: 20 },
        { time: "3:00 PM", icon: "🫐", title: "Snack: Maple Chai Chickpeas", detail: "Roasted chickpeas with maple + ginger + cinnamon. Optional — skip if not hungry.", cal: 151, protein: 6, carbs: 20, fat: 6, optional: true },
      ],
      note: "Highest protein day. Shrimp wraps are 42g protein alone."
    },
    {
      label: "TUE", name: "Tuesday",
      meals: [
        { time: "5:00 AM", icon: "🥤", title: "Post-Workout Shake", detail: "Your own 30g vegan protein shake", cal: 150, protein: 30, carbs: 5, fat: 2 },
        { time: "7:30 AM", icon: "🍳", title: "Mexican Tofu Scramble + 1 Hard-Boiled Egg", detail: "Tofu + black beans + bell peppers + avocado + salsa + 1 extra egg alongside", cal: 485, protein: 27, carbs: 62, fat: 13 },
        { time: "12:00 PM", icon: "🥗", title: "Egg Salad Sandwich", detail: "2 hard-boiled eggs + olive oil mayo + Dijon on sprouted grain bread with tomato + lettuce", cal: 400, protein: 22, carbs: 34, fat: 20 },
        { time: "6:30 PM", icon: "🐟", title: "Shrimp over Squash Noodles", detail: "Shrimp marinated in tomato + cilantro + lime, served over spiralized summer squash & carrots", cal: 409, protein: 53, carbs: 25, fat: 13 },
        { time: "3:00 PM", icon: "🫐", title: "Snack: Avocado Toast + Pumpkin Seeds", detail: "Mashed avocado + lime on sprouted toast with toasted pumpkin seeds. Optional.", cal: 170, protein: 5, carbs: 21, fat: 8, optional: true },
      ],
      note: "Shrimp noodles = 53g protein. Your highest single-meal protein dish."
    },
    {
      label: "WED", name: "Wednesday",
      meals: [
        { time: "5:00 AM", icon: "🥤", title: "Post-Workout Shake", detail: "Your own 30g vegan protein shake", cal: 150, protein: 30, carbs: 5, fat: 2 },
        { time: "7:30 AM", icon: "🍳", title: "Breakfast Salad (3 Eggs)", detail: "Kale + tomato + cucumber + sunflower seeds + 3 soft-boiled eggs + avocado + vinaigrette. Skip turkey bacon.", cal: 430, protein: 24, carbs: 22, fat: 30 },
        { time: "12:00 PM", icon: "🥗", title: "Mediterranean Tuna Salad", detail: "Chunk light tuna + brown rice + spinach + avocado + cucumber + olive oil dressing", cal: 424, protein: 27, carbs: 36, fat: 19 },
        { time: "6:30 PM", icon: "🐟", title: "Poached Salmon with Vegetables", detail: "Wild Alaskan salmon poached in white wine + lemon + dill over onion, carrot, zucchini", cal: 415, protein: 38, carbs: 21, fat: 21 },
        { time: "3:00 PM", icon: "🫐", title: "Snack: Tuna Salad", detail: "Canned tuna + lime + mayo over mixed greens + sprouts + tomato + sunflower seeds. Optional.", cal: 328, protein: 33, carbs: 9, fat: 18, optional: true },
      ],
      note: "Omega-3 day. Salmon + tuna cover your EPA/DHA needs. Critical for MBF recovery."
    },
    {
      label: "THU", name: "Thursday",
      meals: [
        { time: "5:00 AM", icon: "🥤", title: "Post-Workout Shake", detail: "Your own 30g vegan protein shake", cal: 150, protein: 30, carbs: 5, fat: 2 },
        { time: "7:30 AM", icon: "🍳", title: "Pumpkin Pancakes + 2 Hard-Boiled Eggs", detail: "GF oat pancakes with maple syrup + 2 hard-boiled eggs on the side for protein boost", cal: 550, protein: 28, carbs: 74, fat: 14 },
        { time: "12:00 PM", icon: "🥗", title: "Winter Superfoods Bowl + Tuna", detail: "Bulgur + kale + chickpeas + roasted beets + sweet potato + almonds + seeds. Add 3oz tuna on top.", cal: 510, protein: 38, carbs: 57, fat: 19 },
        { time: "6:30 PM", icon: "🐟", title: "Shrimp & Avocado Lettuce Wraps", detail: "Cooked shrimp + red onion + bell pepper + cilantro + lime in butter lettuce with avocado", cal: 401, protein: 42, carbs: 11, fat: 20 },
      ],
      note: "No snack needed — this day hits the calorie target across 4 meals. High carb day for MBF fuel."
    },
    {
      label: "FRI", name: "Friday",
      meals: [
        { time: "5:00 AM", icon: "🥤", title: "Post-Workout Shake", detail: "Your own 30g vegan protein shake", cal: 150, protein: 30, carbs: 5, fat: 2 },
        { time: "7:30 AM", icon: "🍳", title: "Mexican Tofu Scramble + 1 Hard-Boiled Egg", detail: "Tofu + black beans + bell peppers + avocado + salsa + 1 extra egg on the side", cal: 485, protein: 27, carbs: 62, fat: 13 },
        { time: "12:00 PM", icon: "🥗", title: "Baked Tofu Sandwich with Peanut Sauce", detail: "Tofu baked in coconut milk peanut sauce in whole grain pita with lettuce, tomato, onion", cal: 394, protein: 19, carbs: 61, fat: 11 },
        { time: "6:30 PM", icon: "🐟", title: "Poached Salmon with Vegetables", detail: "Wild Alaskan salmon poached in white wine + lemon + dill over onion, carrot, zucchini", cal: 415, protein: 38, carbs: 21, fat: 21 },
        { time: "3:00 PM", icon: "🫐", title: "Snack: Shrimp Cocktail", detail: "4oz shrimp + cocktail sauce + lemon + raw veggies. Optional but adds 33g protein.", cal: 295, protein: 33, carbs: 39, fat: 2, optional: true },
      ],
      note: "Second salmon day. Push for 2 salmon meals per week minimum — omega-3s accelerate recovery."
    },
    {
      label: "SAT", name: "Saturday",
      meals: [
        { time: "5:00 AM", icon: "🥤", title: "Post-Workout Shake", detail: "Your own 30g vegan protein shake", cal: 150, protein: 30, carbs: 5, fat: 2 },
        { time: "7:30 AM", icon: "🍳", title: "Simple Breakfast (3 eggs)", detail: "3 hard-boiled eggs + ½ avocado + tomato + slice sprouted grain toast + pear", cal: 460, protein: 25, carbs: 42, fat: 20 },
        { time: "12:00 PM", icon: "🥗", title: "Greek-Style Veggie Burger", detail: "High-protein veggie patty (Beyond Meat) on sprouted bun with hummus + roasted red pepper + romaine", cal: 396, protein: 27, carbs: 51, fat: 11 },
        { time: "6:30 PM", icon: "🐟", title: "Shrimp over Squash Noodles", detail: "Shrimp marinated in fresh tomato salsa + lime over spiralized summer squash and carrot noodles", cal: 409, protein: 53, carbs: 25, fat: 13 },
        { time: "3:00 PM", icon: "🫐", title: "Snack: Avocado Deviled Eggs + Apple", detail: "Egg yolks + avocado + lime piped into egg whites. Served with 1 apple. Optional.", cal: 304, protein: 14, carbs: 26, fat: 17, optional: true },
      ],
      note: "Strong protein day. Great choice if you have a more active Saturday."
    },
    {
      label: "SUN", name: "Sunday — Meal Prep Day",
      meals: [
        { time: "5:00 AM", icon: "🥤", title: "Post-Workout Shake", detail: "Your own 30g vegan protein shake (if training). Skip if full rest day.", cal: 150, protein: 30, carbs: 5, fat: 2 },
        { time: "8:00 AM", icon: "🍳", title: "Fruity Whole-Grain Porridge + 2 Hard-Boiled Eggs", detail: "Slow-cooker oats, wild rice, quinoa, almond milk, walnuts, dried fruit. Make a full batch for Mon–Tue. Add 2 eggs alongside.", cal: 530, protein: 27, carbs: 72, fat: 16 },
        { time: "12:00 PM", icon: "🥗", title: "Vegetarian Paella + 4oz Shrimp", detail: "Brown rice + mushrooms + eggplant + olives + bell peppers + peas. Add 4oz shrimp for protein.", cal: 540, protein: 32, carbs: 70, fat: 12 },
        { time: "6:30 PM", icon: "🐟", title: "Sweet Potato Tofu Scramble", detail: "Tofu + sweet potato + kale + bell pepper + turmeric + cumin. One pan, 36 minutes.", cal: 439, protein: 28, carbs: 46, fat: 18 },
      ],
      note: "Use Sunday to batch-cook: porridge, hard-boil eggs, cook shrimp, prep grains. Sets up Mon–Wed."
    },
  ];

  const current = days[activeDay];
  const totalCal = current.meals.filter(m => !m.optional).reduce((s, m) => s + m.cal, 0);
  const totalPro = current.meals.filter(m => !m.optional).reduce((s, m) => s + m.protein, 0);
  const totalCarbs = current.meals.filter(m => !m.optional).reduce((s, m) => s + m.carbs, 0);
  const totalFat = current.meals.filter(m => !m.optional).reduce((s, m) => s + m.fat, 0);
  const totalCalWithSnack = current.meals.reduce((s, m) => s + m.cal, 0);
  const totalProWithSnack = current.meals.reduce((s, m) => s + m.protein, 0);

  return (
    <div>
      {/* Day Selector */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 16, paddingBottom: 4, scrollbarWidth: "none" }}>
        {days.map((d, i) => (
          <button key={i} onClick={() => setActiveDay(i)} style={{
            flexShrink: 0, border: "none", cursor: "pointer", borderRadius: 10,
            padding: "8px 10px", textAlign: "center", minWidth: 48,
            background: activeDay === i ? "#e05a2a" : "#111",
            border: activeDay === i ? "1px solid #ff7a4a" : "1px solid #252525",
          }}>
            <div style={{ fontSize: 9, fontWeight: 900, color: activeDay === i ? "#fff" : "#666", letterSpacing: "0.05em", fontFamily: "sans-serif" }}>{d.label}</div>
          </button>
        ))}
      </div>

      {/* Day Header */}
      <div style={{ background: "#111", borderRadius: 14, padding: "14px 16px", marginBottom: 14, border: "1px solid #252525" }}>
        <div style={{ fontSize: 16, fontWeight: 900, color: "#f0f0f0", marginBottom: 4, fontFamily: "sans-serif" }}>{current.name}</div>
        <div style={{ fontSize: 11, color: "#888", marginBottom: 12, fontFamily: "sans-serif", fontStyle: "italic" }}>{current.note}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6 }}>
          {[
            { label: "CAL", val: totalCal, color: "#e05a2a" },
            { label: "PRO", val: `${totalPro}g`, color: "#d04a4a" },
            { label: "CARBS", val: `${totalCarbs}g`, color: "#2a7aaa" },
            { label: "FAT", val: `${totalFat}g`, color: "#aaa840" },
          ].map(m => (
            <div key={m.label} style={{ background: "#0a0a0a", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 900, color: m.color, fontFamily: "sans-serif" }}>{m.val}</div>
              <div style={{ fontSize: 8, color: "#555", fontFamily: "sans-serif", letterSpacing: "0.06em" }}>{m.label}</div>
            </div>
          ))}
        </div>
        {current.meals.some(m => m.optional) && (
          <div style={{ marginTop: 8, fontSize: 10, color: "#666", fontFamily: "sans-serif" }}>
            With optional snack: <strong style={{ color: "#aaa" }}>{totalCalWithSnack} cal · {totalProWithSnack}g protein</strong>
          </div>
        )}
      </div>

      {/* Meals */}
      {current.meals.map((meal, i) => (
        <div key={i} style={{
          background: meal.optional ? "#0d0d0d" : "#111",
          border: `1px solid ${meal.optional ? "#1a1a1a" : "#252525"}`,
          borderRadius: 14, padding: "14px 16px", marginBottom: 10,
          opacity: meal.optional ? 0.8 : 1
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 22 }}>{meal.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#e05a2a", letterSpacing: "0.06em", fontFamily: "sans-serif" }}>
                  {meal.time}{meal.optional ? " · OPTIONAL" : ""}
                </div>
                <div style={{ fontSize: 13, fontWeight: 900, color: meal.optional ? "#666" : "#e05a2a", fontFamily: "sans-serif" }}>{meal.cal} cal</div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 13, color: meal.optional ? "#888" : "#f0f0f0", fontFamily: "sans-serif" }}>{meal.title}</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5, marginBottom: 8, fontFamily: "sans-serif" }}>{meal.detail}</div>
          <MacroBar protein={meal.protein} carbs={meal.carbs} fat={meal.fat} />
        </div>
      ))}

      {/* Meal Prep Note for Sunday */}
      {activeDay === 6 && (
        <div style={{ background: "#0d1a0d", borderRadius: 12, padding: "12px 14px", border: "1px solid #1a3a1a", marginTop: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: "#60b060", marginBottom: 6, fontFamily: "sans-serif", letterSpacing: "0.05em" }}>
            🧺 SUNDAY PREP LIST
          </div>
          {["Make a full batch of Whole-Grain Porridge (keeps 4 days)", "Hard-boil 8–10 eggs for the week", "Cook 1.5 cups dry quinoa or brown rice", "Grill or poach 1 lb shrimp — refrigerate", "Wash and bag all produce", "Make a big jar of olive oil dressing"].map((item, i) => (
            <div key={i} style={{ fontSize: 11, color: "#6a8a6a", padding: "4px 0", borderBottom: i < 5 ? "1px solid #1a2a1a" : "none", fontFamily: "sans-serif" }}>
              ☐ {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Breakfasts() {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 16, fontFamily: "sans-serif", fontStyle: "italic" }}>
        Target: 22–28g protein per breakfast. All pescatarian + dairy-free.
      </div>
      <SectionHeader title="Egg-Based (Quick, High Protein)" />
      <RecipeCard name="Simple Breakfast (3 Eggs)" tags={["ND"]} cal={460} protein={25} carbs={42} fat={20} fiber={11}
        notes="3 hard-boiled eggs + ½ avocado + tomato + sprouted toast + sliced pear. 5 minutes, no cooking."
        boost="Add a 3rd egg vs. the recipe's 2. That's +6g protein for +75 cal. Do this every time." />
      <RecipeCard name="Breakfast Salad (3 Eggs, No Bacon)" tags={["ND", "GF"]} cal={430} protein={24} carbs={22} fat={30} fiber={10}
        notes="Kale + tomato + sunflower seeds + avocado + 3 soft-boiled eggs + vinaigrette. Skip the turkey bacon entirely."
        boost="The 3rd egg and sunflower seeds give you healthy fat + protein combo. Add chia seeds for omega-3s." />

      <SectionHeader title="Plant-Based (High Fiber + Protein)" />
      <RecipeCard name="Mexican Tofu Scramble + 1 Hard-Boiled Egg" tags={["ND", "V"]} cal={485} protein={27} carbs={62} fat={13} fiber={18}
        notes="Tofu + black beans + bell peppers + avocado + salsa + whole grain toast + apple. Add 1 hard-boiled egg on the side."
        boost="Tofu alone isn't enough protein for MBF mornings. The extra egg bridges the gap." />

      <SectionHeader title="Grain-Based (Best for Carb-Loading Days)" />
      <RecipeCard name="Pumpkin Pancakes + 2 Hard-Boiled Eggs" tags={["ND", "GF"]} cal={550} protein={28} carbs={74} fat={14} fiber={14}
        notes="Oat-pumpkin pancakes made with almond milk + eggs + cinnamon. Serve 2 hard-boiled eggs on the side."
        boost="Highest carb breakfast — save this for Mon/Tue/Thu when MBF is most intense." />
      <RecipeCard name="Fruity Whole-Grain Porridge + 2 Hard-Boiled Eggs" tags={["ND", "V"]} cal={530} protein={27} carbs={72} fat={16} fiber={10}
        notes="Steel-cut oats + wild rice + quinoa + barley slow-cooked overnight. Top with walnuts + almond milk. Make Sunday, eat Mon–Tue."
        boost="Batch-cook on Sunday. The 2 boiled eggs alongside are critical — porridge alone is only 9g protein." />

      <SectionHeader title="Best Shakes (Meal 1 Already Covered — These Are Backup)" />
      <RecipeCard name="PB Banana Café Latte Shake" tags={["ND", "V"]} cal={418} protein={27} carbs={37} fat={19}
        notes="Almond milk + plant-based Shakeology + hemp seeds + banana + peanut butter. Use if you want to skip cooking."
        boost="Hemp seeds add 3g complete protein + omega-3s. Best shake for protein density." />
      <RecipeCard name="Café Latte Protein Shake" tags={["ND", "V"]} cal={290} protein={22} carbs={27} fat={11}
        notes="Almond milk + plant-based Shakeology + chia seeds. Lighter option."
        boost="Add 2 Tbsp hemp seeds to push protein to ~28g." />
    </div>
  );
}

function Lunches() {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 16, fontFamily: "sans-serif", fontStyle: "italic" }}>
        Target: 25–38g protein per lunch. All pescatarian + dairy-free.
      </div>
      <SectionHeader title="⭐ Highest Protein Lunches" />
      <RecipeCard name="Mediterranean Tuna Salad" tags={["ND", "GF", "🐟", "⭐"]} cal={424} protein={27} carbs={36} fat={19} fiber={8}
        notes="Chunk light tuna + brown rice + spinach + avocado + cucumber + roasted red pepper + olive oil + lemon dressing."
        boost="Best regular lunch in this plan. Prep a double batch — keeps 3 days in the fridge." />
      <RecipeCard name="Winter Superfoods Bowl + Tuna" tags={["ND", "GF", "⭐"]} cal={510} protein={38} carbs={57} fat={19} fiber={15}
        notes="Bulgur + kale + chickpeas + roasted beets + sweet potato + almonds + sunflower seeds + avocado dressing. Add 3oz tuna on top."
        boost="Without tuna it's 14g protein. Adding 3oz tuna brings it to 38g. Don't skip this." />

      <SectionHeader title="Fish + Seafood" />
      <RecipeCard name="Shrimp Cocktail + Mediterranean Wrap" tags={["ND", "🐟"]} cal={601} protein={37} carbs={68} fat={23}
        notes="4oz cooked shrimp with cocktail sauce + lemon alongside a whole wheat tortilla wrap with avocado + romaine + olives."
        boost="Higher calorie combo. Use on Thursday (MBF intense training day) when you need more fuel." />

      <SectionHeader title="Egg-Based" />
      <RecipeCard name="Egg Salad Sandwich" tags={["ND"]} cal={400} protein={22} carbs={34} fat={20} fiber={7}
        notes="2 hard-boiled eggs + olive oil mayo + Dijon + parsley on sprouted whole-grain bread with tomato + lettuce."
        boost="Add a 3rd egg to the salad mix for +6g protein and only +75 cal." />

      <SectionHeader title="Plant-Based" />
      <RecipeCard name="Greek-Style Veggie Burger" tags={["ND", "V"]} cal={396} protein={27} carbs={51} fat={11} fiber={12}
        notes="High-protein veggie patty (Beyond Meat or similar with 10g+ protein) on sprouted bun with hummus + roasted red pepper."
        boost="Must use a brand with 10g+ protein. Beyond Meat is fine. Add avocado for healthy fat." />
      <RecipeCard name="Baked Tofu Sandwich with Peanut Sauce" tags={["ND", "V"]} cal={394} protein={19} carbs={61} fat={11} fiber={12}
        notes="Tofu baked in coconut milk + peanut butter sauce, served in whole grain pita with lettuce, tomato, onion, apple."
        boost="Low protein for this plan — pair with a hard-boiled egg or small tuna side to hit 27g+ protein." />
      <RecipeCard name="Vegetarian Paella + Shrimp" tags={["ND", "🐟"]} cal={540} protein={32} carbs={70} fat={12} fiber={11}
        notes="Brown rice + mushrooms + eggplant + bell peppers + olives + peas. Add 4oz cooked shrimp for protein."
        boost="Paella alone is only 10g protein. The shrimp addition is non-negotiable for MBF." />
    </div>
  );
}

function Dinners() {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 16, fontFamily: "sans-serif", fontStyle: "italic" }}>
        Target: 35–53g protein per dinner. Your biggest protein meal of the day.
      </div>

      <SectionHeader title="⭐ Top Priority Dinners (Highest Protein)" />
      <RecipeCard name="Shrimp over Summer Squash Noodles" tags={["ND", "GF", "🐟", "⭐"]} cal={409} protein={53} carbs={25} fat={13} fiber={7}
        notes="Shrimp marinated in fresh tomato + cilantro + lime, served over spiralized squash and carrot noodles. Lowest carb, highest protein dinner in the plan."
        boost="53g protein in a 409 cal meal — unmatched efficiency. Make this 2x per week." />
      <RecipeCard name="Shrimp & Avocado Lettuce Wraps" tags={["ND", "GF", "🐟", "⭐"]} cal={401} protein={42} carbs={11} fat={20} fiber={4}
        notes="Cooked shrimp + red onion + bell pepper + cilantro + lime in butter lettuce cups, topped with sliced avocado."
        boost="Only 401 cal for 42g protein. If you're under your calorie goal, add a side of roasted chickpeas." />

      <SectionHeader title="Omega-3 Priority (2x Per Week)" />
      <RecipeCard name="Poached Salmon with Vegetables" tags={["ND", "GF", "🐟", "⭐"]} cal={415} protein={38} carbs={21} fat={21} fiber={5}
        notes="Wild Alaskan salmon poached in white wine + lemon + dill over sautéed onion, carrot, and zucchini."
        boost="EPA + DHA omega-3s reduce muscle soreness from MBF training. Have this minimum twice a week." />

      <SectionHeader title="Plant-Based Dinners" />
      <RecipeCard name="Vegan Buddha Bowl + Shrimp" tags={["ND", "V", "GF"]} cal={560} protein={36} carbs={60} fat={17} fiber={13}
        notes="Quinoa + chickpeas + roasted brussels sprouts + butternut squash + spinach + tahini-lemon dressing + pumpkin seeds. Add 4oz shrimp."
        boost="Buddha bowl alone is 16g protein. The shrimp addition doubles it. Don't serve without it." />
      <RecipeCard name="Sweet Potato Tofu Scramble" tags={["ND", "V", "GF"]} cal={439} protein={28} carbs={46} fat={18} fiber={11}
        notes="Extra-firm tofu + sweet potato + kale + bell pepper + turmeric + cumin. One pan, 36 minutes."
        boost="Lower protein for a dinner. Pair with a side of Tuna Salad snack if you're under your protein goal." />
    </div>
  );
}

function Snacks() {
  return (
    <div>
      <div style={{ fontSize: 11, color: "#666", marginBottom: 16, fontFamily: "sans-serif", fontStyle: "italic" }}>
        Only eat a snack if you're still under 1,800 cal or need more protein. Don't force it.
      </div>

      <SectionHeader title="High-Protein Snacks (20g+)" />
      <RecipeCard name="Tuna Salad" tags={["ND", "GF", "🐟"]} cal={328} protein={33} carbs={9} fat={18} fiber={3}
        notes="Canned tuna + lime + mayo over mixed greens + alfalfa sprouts + tomato + sunflower seeds. Best snack for hitting protein goals." />
      <RecipeCard name="Shrimp Cocktail" tags={["ND", "🐟"]} cal={295} protein={33} carbs={39} fat={2}
        notes="4oz cooked shrimp + cocktail sauce + lemon + raw veggies. Quick prep. Use pre-cooked shrimp from Sunday meal prep." />
      <RecipeCard name="Avocado Deviled Eggs + Apple" tags={["ND", "GF"]} cal={304} protein={14} carbs={26} fat={17} fiber={7}
        notes="Egg yolks + avocado + lime + cilantro piped into egg whites. 4 halves + 1 apple per serving." />

      <SectionHeader title="Moderate Snacks (5–10g protein)" />
      <RecipeCard name="Avocado Toast + Pumpkin Seeds" tags={["ND", "V"]} cal={170} protein={5} carbs={21} fat={8} fiber={7}
        notes="Mashed avocado + lime on sprouted grain toast with toasted pumpkin seeds. Add a hard-boiled egg alongside for +6g protein." />
      <RecipeCard name="Maple Chai Roasted Chickpeas" tags={["ND", "GF", "V"]} cal={151} protein={6} carbs={20} fat={6} fiber={6}
        notes="Batch-roast a big tray on Sunday. Store in airtight container. Grab ¼ cup when you need something crunchy." />
      <RecipeCard name="English Muffin + Almond Butter" tags={["ND", "V"]} cal={159} protein={16} carbs={16} fat={9} fiber={3}
        notes="Half a whole-grain English muffin + 1 Tbsp almond butter. Quick and portable." />
      <RecipeCard name="Thai Hummus + Raw Veggies" tags={["ND", "GF"]} cal={299} protein={10} carbs={29} fat={18} fiber={8}
        notes="Chickpea hummus with peanut butter + Sriracha + garlic + peanuts. Served with carrots, tomatoes, bell pepper." />

      <SectionHeader title="Lowest Calorie Snacks (Hunger Control)" />
      <RecipeCard name="Cucumber Avocado Roll-Ups" tags={["ND", "GF", "V"]} cal={142} protein={4} carbs={9} fat={11} fiber={5}
        notes="Cucumber slices spread with avocado-basil puree, rolled with sunflower seeds. Use when you're slightly hungry but close to your calorie limit." />
      <RecipeCard name="Mixed Berries + Coconut + Almonds" tags={["ND", "GF", "V"]} cal={298} protein={7} carbs={41} fat={15} fiber={17}
        notes="2 cups mixed berries + shredded coconut + cinnamon + slivered almonds. Highest fiber snack in the plan — great for evening cravings." />
    </div>
  );
}

function BestFoods() {
  const Grid = ({ items }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 4 }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: "#111", borderRadius: 10, padding: "10px 12px",
          fontSize: 12, color: "#d0d0d0", display: "flex", gap: 8,
          alignItems: "flex-start", border: "1px solid #1e1e1e",
          fontFamily: "sans-serif"
        }}>
          <span style={{ flexShrink: 0, fontSize: 16 }}>{item.icon}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, color: "#f0f0f0" }}>{item.name}</div>
            {item.note && <div style={{ fontSize: 10, color: "#555", marginTop: 2, lineHeight: 1.4 }}>{item.note}</div>}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <SectionHeader title="Best Proteins (Ranked by Efficiency)" />
      <Grid items={[
        { icon: "🐟", name: "Wild Salmon", note: "#1 — omega-3 + 38g/serving" },
        { icon: "🦐", name: "Shrimp", note: "53g protein in one dinner" },
        { icon: "🐟", name: "Tuna (chunk light)", note: "Easy canned protein for lunches" },
        { icon: "🥚", name: "Eggs", note: "Complete protein. Buy in bulk." },
        { icon: "🌱", name: "Tofu (extra-firm)", note: "Marinate it — absorbs everything" },
        { icon: "🫘", name: "Lentils", note: "17g protein + 22g fiber/serving" },
        { icon: "🫘", name: "Chickpeas", note: "Roast for snacks, toss in bowls" },
        { icon: "🌾", name: "Quinoa", note: "Only grain with all 9 amino acids" },
        { icon: "🌿", name: "Hemp Seeds", note: "3g complete protein per Tbsp. Add to everything." },
        { icon: "🥜", name: "Edamame", note: "18g protein per cup. Easy snack." },
      ]} />

      <SectionHeader title="Best Fats + Omega-3s (MBF Recovery)" />
      <div style={{ background: "#0a1a14", borderRadius: 12, padding: "12px 14px", marginBottom: 10, border: "1px solid #1a3a2a" }}>
        <div style={{ fontSize: 11, color: "#60a080", marginBottom: 6, fontFamily: "sans-serif", fontWeight: 700 }}>
          OMEGA-3 PRIORITY — anti-inflammatory, accelerates MBF recovery
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {["Wild Salmon (EPA+DHA best)", "Chia Seeds (ALA)", "Flaxseeds (ALA)", "Hemp Seeds (ALA)", "Walnuts (ALA)"].map(f => (
            <span key={f} style={{ background: "#1a3a2a", color: "#80c080", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, fontFamily: "sans-serif" }}>{f}</span>
          ))}
        </div>
      </div>
      <Grid items={[
        { icon: "🥑", name: "Avocado", note: "Mono fat + fiber + potassium" },
        { icon: "🫒", name: "Extra-Virgin Olive Oil", note: "All dressings and cooking" },
        { icon: "🌰", name: "Walnuts", note: "ALA omega-3. Best nut for you." },
        { icon: "🌱", name: "Chia Seeds", note: "Add to shakes and overnight oats" },
        { icon: "🌱", name: "Flaxseeds (ground)", note: "Grind for absorption. Blend in shakes." },
        { icon: "🌻", name: "Sunflower Seeds", note: "Vitamin E + fat. Top every salad." },
        { icon: "🎃", name: "Pumpkin Seeds", note: "Zinc + magnesium for muscle function" },
        { icon: "🥜", name: "Almond Butter", note: "Fat + protein. Better than PB for MBF." },
      ]} />

      <SectionHeader title="Best Carbs (Fuel for MBF)" />
      <Grid items={[
        { icon: "🌾", name: "Quinoa", note: "Protein + carb. Use as rice replacement." },
        { icon: "🍠", name: "Sweet Potato", note: "Slow-burning. Pre and post workout." },
        { icon: "🥣", name: "Rolled/Steel-Cut Oats", note: "Sustained energy for long MBF sessions" },
        { icon: "🌾", name: "Brown Rice", note: "Lunch staple. Batch-cook Sundays." },
        { icon: "🌾", name: "Bulgur", note: "Faster to cook than rice. High fiber." },
        { icon: "🫘", name: "Lentils", note: "Carb + protein dual source" },
        { icon: "🥙", name: "Sprouted Grain Bread", note: "Only bread option. More protein than regular." },
        { icon: "🍌", name: "Banana", note: "Pre-workout carb if you eat before training" },
      ]} />

      <SectionHeader title="Dairy-Free Milk Alternatives" />
      <Grid items={[
        { icon: "🥛", name: "Almond Milk (unsweetened)", note: "Use in shakes, oats, pancakes" },
        { icon: "🥥", name: "Lite Coconut Milk (canned)", note: "Sauces and cooking only" },
        { icon: "🥥", name: "Coconut Milk Beverage", note: "Smoothies and shakes" },
      ]} />

      <SectionHeader title="Superfoods for MBF Recovery" />
      <Grid items={[
        { icon: "🥬", name: "Kale", note: "Iron + calcium (no dairy needed)" },
        { icon: "🥬", name: "Spinach", note: "Iron + folate. Add to everything." },
        { icon: "🫐", name: "Blueberries", note: "#1 antioxidant — fights training inflammation" },
        { icon: "🟣", name: "Beets", note: "Nitrates boost endurance + blood flow" },
        { icon: "🌿", name: "Chia + Flax Seeds", note: "Omega-3 + fiber + calcium combo" },
        { icon: "🧅", name: "Brussels Sprouts", note: "High fiber + vitamin C for muscle repair" },
      ]} />
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("My Plan");

  const tabContent = {
    "My Plan": <MyPlan />,
    "7-Day Meals": <WeekPlan />,
    "Breakfast": <Breakfasts />,
    "Lunch": <Lunches />,
    "Dinner": <Dinners />,
    "Snacks": <Snacks />,
    "Best Foods": <BestFoods />,
  };

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      background: "#0a0a0a",
      minHeight: "100vh",
      maxWidth: 480,
      margin: "0 auto",
      color: "#e0e0e0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0a0a0a 0%, #1a0800 100%)",
        padding: "28px 20px 20px",
        borderBottom: "1px solid #1e1e1e"
      }}>
        <div style={{ fontSize: 9, letterSpacing: "0.18em", fontFamily: "sans-serif", fontWeight: 900, color: "#e05a2a", marginBottom: 6 }}>
          #MBF · 60-DAY PLAN
        </div>
        <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.15, color: "#fff", marginBottom: 4, fontFamily: "sans-serif" }}>
          Nutrition Plan
        </div>
        <div style={{ fontSize: 13, color: "#777", fontFamily: "sans-serif" }}>
          Pescatarian · No Dairy · 1,800 cal · 150g protein
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <div style={{ flex: 1, background: "#e05a2a", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#fff", fontFamily: "sans-serif" }}>190→175</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", fontFamily: "sans-serif" }}>LBS</div>
          </div>
          <div style={{ flex: 1, background: "#111", border: "1px solid #252525", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#60d060", fontFamily: "sans-serif" }}>−15 lbs</div>
            <div style={{ fontSize: 9, color: "#555", fontFamily: "sans-serif" }}>60 DAYS</div>
          </div>
          <div style={{ flex: 1, background: "#111", border: "1px solid #252525", borderRadius: 8, padding: "6px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#e05a2a", fontFamily: "sans-serif" }}>150g</div>
            <div style={{ fontSize: 9, color: "#555", fontFamily: "sans-serif" }}>PROTEIN/DAY</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", overflowX: "auto", background: "#0d0d0d",
        borderBottom: "1px solid #1e1e1e", scrollbarWidth: "none",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActive(tab)} style={{
            border: "none", background: "none", cursor: "pointer",
            padding: "11px 13px 9px",
            fontSize: 11, fontWeight: active === tab ? 900 : 500,
            fontFamily: "sans-serif",
            color: active === tab ? "#e05a2a" : "#555",
            borderBottom: active === tab ? "2px solid #e05a2a" : "2px solid transparent",
            marginBottom: -1, whiteSpace: "nowrap", flexShrink: 0,
            letterSpacing: "0.03em"
          }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 16px 48px" }}>
        {tabContent[active]}
      </div>
    </div>
  );
}
