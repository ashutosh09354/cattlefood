import { useEffect } from "react";

const DEFAULT = "Scientifically balanced cattle, buffalo, goat and poultry feed delivered across India.";

export default function SEO({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | Cattle Feed` : "Cattle Feed – Premium Animal Nutrition";
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = description || DEFAULT;
  }, [title, description]);
  return null;
}
