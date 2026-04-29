// Item lists for the three modes.
//
// Items marked `preferred: true` come from the user's personal
// preference doc (food preferences PDF + Bangalore Restaurants Guide).
// Other items are popular Bangalore options included for variety —
// the picker leans toward preferred items but still surfaces these.

export type EatItem = {
  name: string;
  cuisine: string;
  area?: string;
  emoji: string;
  tags: string[];
  preferred?: boolean;
};

export type CookItem = {
  name: string;
  emoji: string;
  tags: string[];
  preferred?: boolean;
};

export const eatOut: EatItem[] = [
  // ── Preferred (from food preferences doc) ──────────────────────────
  { name: "Toit", cuisine: "Brewpub", area: "Indiranagar", emoji: "🍺", tags: ["beer", "pizza", "outdoor", "brewpub", "casual", "groups"], preferred: true },
  { name: "Bier Library", cuisine: "Brewpub", area: "Koramangala", emoji: "🍻", tags: ["beer", "casual", "drinks", "groups"], preferred: true },
  { name: "Brooks & Bonds", cuisine: "Brewpub", area: "Koramangala", emoji: "🍺", tags: ["beer", "brunch", "brewery", "casual"], preferred: true },
  { name: "The Jamming Goat", cuisine: "Brewpub", area: "Indiranagar", emoji: "🐐", tags: ["beer", "casual", "groups"], preferred: true },
  { name: "Burma Burma", cuisine: "Burmese", area: "Indiranagar", emoji: "🍜", tags: ["khow-suey", "veg", "light", "noodles", "asian"], preferred: true },
  { name: "Yuki", cuisine: "Japanese", area: "Indiranagar", emoji: "🍣", tags: ["sushi", "japanese", "asian", "non-veg"], preferred: true },
  { name: "Nasi & Mee", cuisine: "Southeast Asian", area: "Indiranagar", emoji: "🍲", tags: ["asian", "indonesian", "malay", "noodles", "rice"], preferred: true },
  { name: "Neon Market", cuisine: "Modern Asian", area: "Indiranagar", emoji: "🥢", tags: ["asian", "modern", "cocktails", "small-plates"], preferred: true },
  { name: "Mezcalita", cuisine: "Mexican", area: "Koramangala", emoji: "🌮", tags: ["mexican", "tacos", "cocktails", "groups"], preferred: true },
  { name: "Northwest Kebab & Curry House", cuisine: "North Indian", area: "Indiranagar", emoji: "🍢", tags: ["north-indian", "kebabs", "non-veg", "rich"], preferred: true },
  { name: "Sendhoor", cuisine: "South Indian", area: "Koramangala", emoji: "🍛", tags: ["south-indian", "casual", "veg", "thali"], preferred: true },
  { name: "Nagarjuna", cuisine: "Andhra", area: "Koramangala", emoji: "🌶️", tags: ["andhra", "south-indian", "spicy", "non-veg", "thali", "filling"], preferred: true },
  { name: "Brik Oven", cuisine: "Italian", area: "Koramangala", emoji: "🍕", tags: ["italian", "pizza", "casual", "wood-fired"], preferred: true },
  { name: "Chianti", cuisine: "Italian", area: "Indiranagar", emoji: "🍝", tags: ["italian", "fine-dining", "pasta", "date-night", "wine"], preferred: true },
  { name: "Hole in the Wall Cafe", cuisine: "Breakfast Cafe", area: "Koramangala", emoji: "🍳", tags: ["breakfast", "brunch", "eggs", "western", "cafe"], preferred: true },
  { name: "Terra Bites", cuisine: "Cafe", area: "Indiranagar", emoji: "🥐", tags: ["breakfast", "brunch", "cafe", "quiet", "veg"], preferred: true },
  { name: "Filter Coffee", cuisine: "South Indian Cafe", area: "Bangalore", emoji: "☕", tags: ["south-indian", "breakfast", "cafe", "casual", "veg"], preferred: true },

  // ── Bangalore Guide (additional, non-preferred but solid) ─────────
  { name: "Truffles", cuisine: "American", area: "Koramangala", emoji: "🍔", tags: ["burgers", "american", "casual", "groups", "non-veg"] },
  { name: "Dyu Art Cafe", cuisine: "European Cafe", area: "Koramangala", emoji: "🎨", tags: ["cafe", "brunch", "quiet", "european", "veg"] },
  { name: "The Reservoire", cuisine: "Continental", area: "Koramangala", emoji: "🍷", tags: ["continental", "italian", "casual", "groups"] },
  { name: "Bathinda Junction", cuisine: "Punjabi", area: "Koramangala", emoji: "🫓", tags: ["punjabi", "north-indian", "non-veg", "filling"] },
  { name: "California Burrito", cuisine: "Mexican", area: "Koramangala", emoji: "🌯", tags: ["mexican", "burritos", "quick", "casual"] },
  { name: "Bamey's Restro Cafe", cuisine: "Burmese", area: "Koramangala", emoji: "🥗", tags: ["burmese", "asian", "casual", "veg"] },
  { name: "Empire Restaurant", cuisine: "North Indian / Chinese", area: "Koramangala", emoji: "🍗", tags: ["north-indian", "chinese", "biryani", "non-veg", "filling"] },
  { name: "The Fatty Bao", cuisine: "Asian", area: "Indiranagar", emoji: "🥟", tags: ["asian", "bao", "dimsum", "small-plates", "non-veg"] },
  { name: "Glen's Bakehouse", cuisine: "Bakery", area: "Indiranagar", emoji: "🧁", tags: ["bakery", "breakfast", "sweet", "cafe", "veg"] },
  { name: "Cafe Noir", cuisine: "French / Italian", area: "Indiranagar", emoji: "🥖", tags: ["french", "italian", "brunch", "cafe", "european"] },
  { name: "Rumi", cuisine: "Mediterranean", area: "Indiranagar", emoji: "🫒", tags: ["mediterranean", "fine-dining", "date-night"] },
  { name: "Lucky Chan", cuisine: "Asian", area: "Indiranagar", emoji: "🥡", tags: ["asian", "dimsum", "cocktails", "groups"] },
  { name: "Dhaba Estd 1986", cuisine: "North Indian", area: "Indiranagar", emoji: "🍲", tags: ["north-indian", "punjabi", "filling", "casual"] },
  { name: "Go Native", cuisine: "Vegan", area: "HSR Layout", emoji: "🥬", tags: ["vegan", "healthy", "veg", "light", "low-cal"] },
  { name: "Oyster Bar & Kitchen", cuisine: "Seafood", area: "HSR Layout", emoji: "🦪", tags: ["seafood", "non-veg", "fine-dining"] },
  { name: "Copper + Kitchen", cuisine: "Indian", area: "HSR Layout", emoji: "🍛", tags: ["indian", "casual", "non-veg"] },
  { name: "The Dreaming Tree", cuisine: "Italian", area: "HSR Layout", emoji: "🌳", tags: ["italian", "outdoor", "garden", "date-night"] },
  { name: "Banoffee Cafe", cuisine: "Cafe", area: "HSR Layout", emoji: "🍰", tags: ["cafe", "sweet", "brunch", "desserts"] },
  { name: "PizzaExpress", cuisine: "Italian", area: "HSR Layout", emoji: "🍕", tags: ["italian", "pizza", "casual"] },
  { name: "Taiki", cuisine: "Asian", area: "HSR Layout", emoji: "🍱", tags: ["asian", "japanese", "sushi"] },
  { name: "Hustle", cuisine: "American", area: "HSR Layout", emoji: "🍔", tags: ["burgers", "american", "loud", "groups"] },
];

export const orderIn: EatItem[] = [
  // ── Preferred (from food preferences doc) ──────────────────────────
  { name: "Meghana Foods", cuisine: "Andhra Biryani", emoji: "🍛", tags: ["biryani", "andhra", "spicy", "non-veg", "filling", "rice"], preferred: true },
  { name: "ITC Aashirvad", cuisine: "North Indian", emoji: "🍲", tags: ["north-indian", "rich", "comfort", "non-veg"], preferred: true },
  { name: "Good Flippin' Burgers", cuisine: "Burgers", emoji: "🍔", tags: ["burgers", "american", "junk", "non-veg", "comfort"], preferred: true },
  { name: "Chinita Mexican", cuisine: "Mexican", emoji: "🌮", tags: ["mexican", "tacos", "burritos", "casual"], preferred: true },
  { name: "Paris Panini", cuisine: "Sandwiches", emoji: "🥪", tags: ["sandwiches", "panini", "quick", "western", "light"], preferred: true },
  { name: "The Great Indian Khichdi", cuisine: "Khichdi", emoji: "🍚", tags: ["khichdi", "indian", "light", "comfort", "veg", "easy"], preferred: true },

  // ── Online additions (popular delivery options) ───────────────────
  { name: "Behrouz Biryani", cuisine: "Biryani", emoji: "🍚", tags: ["biryani", "rich", "non-veg", "rice", "filling"] },
  { name: "Faasos", cuisine: "Wraps & Rolls", emoji: "🌯", tags: ["wraps", "quick", "non-veg", "snack"] },
  { name: "Freshmenu", cuisine: "Continental", emoji: "🥗", tags: ["bowls", "salads", "light", "healthy", "veg"] },
  { name: "Wow! Momo", cuisine: "Momos", emoji: "🥟", tags: ["momos", "quick", "snack", "veg"] },
  { name: "EatFit", cuisine: "Healthy", emoji: "🥬", tags: ["healthy", "low-cal", "salads", "light", "veg"] },
  { name: "Box8", cuisine: "Indian Meals", emoji: "🍱", tags: ["thali", "indian", "casual", "filling"] },
  { name: "Domino's", cuisine: "Pizza", emoji: "🍕", tags: ["pizza", "junk", "comfort", "cheese"] },
  { name: "Subway", cuisine: "Sandwiches", emoji: "🥪", tags: ["sandwiches", "healthy", "quick", "light"] },
  { name: "Smoor", cuisine: "Desserts", emoji: "🍫", tags: ["desserts", "sweet", "chocolate", "snack"] },
  { name: "Kaati Zone", cuisine: "Rolls", emoji: "🌯", tags: ["rolls", "quick", "non-veg", "snack"] },
  { name: "Burger King", cuisine: "Burgers", emoji: "🍔", tags: ["burgers", "junk", "non-veg", "comfort"] },
];

export const cookOptions: {
  breakfast: CookItem[];
  lunch: CookItem[];
  dinner: CookItem[];
} = {
  breakfast: [
    // Preferred
    { name: "Masala Dosa", emoji: "🥞", tags: ["south-indian", "veg", "savoury", "no-rice"], preferred: true },
    { name: "Poha", emoji: "🍚", tags: ["indian", "veg", "light", "quick", "no-rice"], preferred: true },
    { name: "Paneer Paratha", emoji: "🫓", tags: ["indian", "veg", "protein", "filling", "no-rice"], preferred: true },
    { name: "Aloo Paratha", emoji: "🫓", tags: ["indian", "veg", "filling", "comfort", "no-rice"], preferred: true },
    { name: "Omelette", emoji: "🍳", tags: ["eggs", "protein", "healthy", "quick", "no-rice", "non-veg"], preferred: true },
    { name: "Boiled Eggs", emoji: "🥚", tags: ["eggs", "protein", "healthy", "quick", "light", "non-veg"], preferred: true },
    { name: "Moong / Besan Chila", emoji: "🥞", tags: ["indian", "veg", "healthy", "protein", "quick", "no-rice"], preferred: true },
    { name: "Oats", emoji: "🥣", tags: ["western", "veg", "healthy", "light", "quick"], preferred: true },
    // Online additions
    { name: "Idli + Sambar", emoji: "🍘", tags: ["south-indian", "veg", "light", "quick"] },
    { name: "Avocado Toast + Eggs", emoji: "🥑", tags: ["western", "eggs", "quick", "healthy", "no-rice", "non-veg"] },
    { name: "Greek Yogurt Bowl", emoji: "🥣", tags: ["western", "veg", "quick", "healthy", "light", "sweet"] },
    { name: "Upma", emoji: "🍚", tags: ["south-indian", "veg", "quick", "light"] },
    { name: "Bread + Peanut Butter", emoji: "🍞", tags: ["western", "veg", "quick", "easy", "no-rice"] },
  ],
  lunch: [
    // Preferred (from food preferences)
    { name: "Paneer Bhurji + Roti", emoji: "🧀", tags: ["indian", "veg", "protein", "filling", "no-rice"], preferred: true },
    { name: "Chana Masala + Rice", emoji: "🍛", tags: ["indian", "veg", "filling", "rice", "comfort"], preferred: true },
    { name: "Soyabean Aloo + Roti", emoji: "🥘", tags: ["indian", "veg", "protein", "no-rice"], preferred: true },
    { name: "Paneer Matar + Roti", emoji: "🧀", tags: ["indian", "veg", "protein", "rich", "no-rice"], preferred: true },
    { name: "Paneer Masala + Naan", emoji: "🍛", tags: ["indian", "veg", "protein", "rich", "no-rice"], preferred: true },
    { name: "Palak Paneer + Roti", emoji: "🥬", tags: ["indian", "veg", "protein", "healthy", "no-rice"], preferred: true },
    { name: "Veg Pulao + Raita", emoji: "🍚", tags: ["indian", "veg", "rice", "light", "quick"], preferred: true },
    // Online additions
    { name: "Rajma Chawal", emoji: "🍛", tags: ["indian", "veg", "rice", "filling", "comfort"] },
    { name: "Curd Rice + Pickle", emoji: "🍚", tags: ["south-indian", "veg", "rice", "light", "easy"] },
    { name: "Pasta Aglio e Olio", emoji: "🍝", tags: ["western", "veg", "no-rice", "quick", "light"] },
    { name: "Egg Curry + Rice", emoji: "🍳", tags: ["indian", "non-veg", "eggs", "rice", "protein"] },
    { name: "Vegetable Biryani", emoji: "🍛", tags: ["indian", "veg", "rice", "filling", "spicy"] },
  ],
  dinner: [
    // Preferred
    { name: "Paneer Bhurji + Pav", emoji: "🧀", tags: ["indian", "veg", "protein", "no-rice", "comfort"], preferred: true },
    { name: "Palak Paneer + Roti", emoji: "🥬", tags: ["indian", "veg", "protein", "healthy", "no-rice"], preferred: true },
    { name: "Chana Masala + Bhature", emoji: "🫓", tags: ["indian", "veg", "filling", "no-rice", "comfort"], preferred: true },
    { name: "Paneer Matar + Roti", emoji: "🧀", tags: ["indian", "veg", "protein", "rich", "no-rice"], preferred: true },
    { name: "Paneer Masala + Roti", emoji: "🍛", tags: ["indian", "veg", "protein", "rich", "no-rice"], preferred: true },
    { name: "Pulao + Curry", emoji: "🍚", tags: ["indian", "veg", "rice", "filling"], preferred: true },
    { name: "Aloo Paratha + Curd", emoji: "🫓", tags: ["indian", "veg", "filling", "comfort", "no-rice"], preferred: true },
    // Online additions
    { name: "Khichdi + Ghee", emoji: "🍚", tags: ["indian", "veg", "light", "comfort", "rice", "easy"] },
    { name: "Vegetable Soup + Garlic Bread", emoji: "🍲", tags: ["western", "veg", "light", "no-rice", "easy"] },
    { name: "Stuffed Parathas", emoji: "🫓", tags: ["indian", "veg", "no-rice", "filling", "comfort"] },
    { name: "Egg Bhurji + Pav", emoji: "🍳", tags: ["indian", "eggs", "non-veg", "no-rice", "quick", "protein"] },
    { name: "Maggi Noodles", emoji: "🍜", tags: ["western", "veg", "noodles", "junk", "quick", "easy"] },
  ],
};

export type Mode = "eatOut" | "orderIn" | "cook";
export type Meal = "breakfast" | "lunch" | "dinner";

export const MODE_THEME: Record<
  Mode,
  { emoji: string; label: string; gradient: string; accent: string; glow: string }
> = {
  eatOut: {
    emoji: "🍽️",
    label: "Eat Out",
    gradient: "from-rose-400 via-orange-400 to-amber-400",
    accent: "text-rose-600 dark:text-rose-300",
    glow: "shadow-rose-500/20",
  },
  orderIn: {
    emoji: "🛵",
    label: "Order In",
    gradient: "from-violet-500 via-fuchsia-400 to-pink-400",
    accent: "text-fuchsia-600 dark:text-fuchsia-300",
    glow: "shadow-fuchsia-500/20",
  },
  cook: {
    emoji: "👨‍🍳",
    label: "Cook",
    gradient: "from-emerald-500 via-teal-400 to-lime-400",
    accent: "text-emerald-600 dark:text-emerald-300",
    glow: "shadow-emerald-500/20",
  },
};

export const MEAL_EMOJI: Record<Meal, string> = {
  breakfast: "🌅",
  lunch: "🌞",
  dinner: "🌙",
};
