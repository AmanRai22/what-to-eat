// TODO: replace with real options. These are placeholders.
// Tags drive the smart filter — keep them generous so the LLM and
// fallback substring/tag matchers have something to work with.

export type EatItem = {
  name: string;
  cuisine: string;
  tags: string[];
};

export type CookItem = {
  name: string;
  tags: string[];
};

export const eatOut: EatItem[] = [
  { name: "Toit", cuisine: "European Pub", tags: ["beer", "pizza", "outdoor", "loud", "groups", "casual"] },
  { name: "Truffles", cuisine: "American", tags: ["burgers", "casual", "groups", "comfort", "non-veg"] },
  { name: "Karavalli", cuisine: "Coastal Indian", tags: ["seafood", "fine-dining", "south-indian", "spicy", "non-veg"] },
  { name: "The Permit Room", cuisine: "South Indian Bar", tags: ["cocktails", "south-indian", "loud", "non-veg", "spicy"] },
  { name: "Olive Beach", cuisine: "Mediterranean", tags: ["pasta", "outdoor", "fine-dining", "wine", "date-night"] },
  { name: "Toast & Tonic", cuisine: "Modern European", tags: ["cocktails", "small-plates", "date-night", "fine-dining"] },
  { name: "Burma Burma", cuisine: "Burmese", tags: ["khow-suey", "veg", "light", "noodles", "casual"] },
  { name: "Naru Noodle Bar", cuisine: "Japanese Ramen", tags: ["ramen", "noodles", "small", "comfort", "non-veg"] },
  { name: "ZLB23", cuisine: "Cocktail Bar", tags: ["cocktails", "small-plates", "speakeasy", "date-night", "loud"] },
  { name: "Communiti", cuisine: "Modern Indian", tags: ["small-plates", "fine-dining", "cocktails", "date-night"] },
  { name: "Smoke House Deli", cuisine: "Continental Cafe", tags: ["pasta", "salads", "brunch", "casual", "veg"] },
  { name: "Chinita Real Mexican", cuisine: "Mexican", tags: ["tacos", "casual", "spicy", "groups", "non-veg"] },
];

export const orderIn: EatItem[] = [
  { name: "Meghana Foods", cuisine: "Andhra Biryani", tags: ["biryani", "spicy", "non-veg", "filling", "rice"] },
  { name: "Burma Burma", cuisine: "Burmese", tags: ["khow-suey", "veg", "light", "noodles", "soup"] },
  { name: "Nagarjuna", cuisine: "Andhra", tags: ["thali", "spicy", "non-veg", "rice", "filling"] },
  { name: "Ovenstory Pizza", cuisine: "Pizza", tags: ["pizza", "cheese", "casual", "comfort", "junk"] },
  { name: "Behrouz Biryani", cuisine: "Biryani", tags: ["biryani", "rich", "non-veg", "rice", "filling"] },
  { name: "Faasos", cuisine: "Wraps & Rolls", tags: ["wraps", "quick", "non-veg", "casual", "light"] },
  { name: "Freshmenu", cuisine: "Continental", tags: ["bowls", "salads", "light", "healthy", "veg"] },
  { name: "Wow! Momo", cuisine: "Momos", tags: ["momos", "quick", "casual", "veg", "snack"] },
  { name: "Eat Fit", cuisine: "Healthy", tags: ["healthy", "light", "salads", "low-cal", "veg"] },
  { name: "Tibbs Frankie", cuisine: "Frankies", tags: ["wraps", "quick", "non-veg", "snack", "junk"] },
  { name: "Chai Point", cuisine: "Indian Snacks", tags: ["chai", "snack", "veg", "light", "breakfast"] },
  { name: "Kaati Zone", cuisine: "Rolls", tags: ["rolls", "quick", "non-veg", "snack", "casual"] },
];

export const cookOptions: {
  breakfast: CookItem[];
  lunch: CookItem[];
  dinner: CookItem[];
} = {
  breakfast: [
    { name: "Masala Dosa", tags: ["south-indian", "veg", "quick", "no-rice", "savoury"] },
    { name: "Avocado Toast + Eggs", tags: ["western", "eggs", "quick", "no-rice", "healthy"] },
    { name: "Poha", tags: ["indian", "veg", "quick", "light", "no-rice"] },
    { name: "Greek Yogurt Bowl", tags: ["western", "veg", "quick", "healthy", "light", "sweet"] },
    { name: "Idli + Sambar", tags: ["south-indian", "veg", "quick", "light", "no-rice"] },
    { name: "Scrambled Eggs + Toast", tags: ["western", "eggs", "quick", "non-veg", "no-rice"] },
    { name: "Oats Porridge", tags: ["western", "veg", "healthy", "light", "quick"] },
    { name: "Aloo Paratha + Curd", tags: ["indian", "veg", "filling", "no-rice", "comfort"] },
  ],
  lunch: [
    { name: "Dal Rice + Sabzi", tags: ["indian", "veg", "rice", "comfort", "filling"] },
    { name: "Chicken Curry + Rice", tags: ["indian", "non-veg", "rice", "spicy", "filling"] },
    { name: "Veg Pulao + Raita", tags: ["indian", "veg", "rice", "light", "quick"] },
    { name: "Pasta Aglio e Olio", tags: ["western", "veg", "no-rice", "quick", "light"] },
    { name: "Stir-fried Noodles + Tofu", tags: ["asian", "veg", "no-rice", "quick", "light"] },
    { name: "Quinoa Buddha Bowl", tags: ["western", "veg", "healthy", "no-rice", "light", "low-cal"] },
    { name: "Rajma Chawal", tags: ["indian", "veg", "rice", "filling", "comfort"] },
    { name: "Grilled Chicken Salad", tags: ["western", "non-veg", "no-rice", "healthy", "light", "low-cal"] },
  ],
  dinner: [
    { name: "Khichdi + Ghee", tags: ["indian", "veg", "light", "comfort", "rice", "easy"] },
    { name: "Roti + Paneer Butter Masala", tags: ["indian", "veg", "no-rice", "rich", "filling"] },
    { name: "Soup + Garlic Bread", tags: ["western", "veg", "light", "no-rice", "easy"] },
    { name: "Fried Rice + Manchurian", tags: ["asian", "veg", "rice", "filling", "junk"] },
    { name: "Grilled Fish + Veggies", tags: ["western", "non-veg", "no-rice", "healthy", "light", "low-cal"] },
    { name: "Stuffed Parathas", tags: ["indian", "veg", "no-rice", "filling", "comfort"] },
    { name: "Stir-fried Tofu + Brown Rice", tags: ["asian", "veg", "rice", "healthy", "light"] },
    { name: "Eggs Bhurji + Pav", tags: ["indian", "eggs", "non-veg", "no-rice", "quick"] },
  ],
};

export type Mode = "eatOut" | "orderIn" | "cook";
export type Meal = "breakfast" | "lunch" | "dinner";
