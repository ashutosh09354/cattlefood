export const inr = (n) => "₹" + n.toLocaleString("en-IN");
export const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
export const deliveryFee = (net, ship = "std") => (ship === "exp" ? 299 : net >= 5000 ? 0 : 150);
