import { useState, useEffect } from "react";
import Icon from "./Icon.jsx";

export default function Hero() {
  const images = [
    "/assets/images/image.png",
    "/assets/images/Premium Poultry Nutrition Banner.png"
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero-carousel">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          className={i === current ? "active" : ""}
        />
      ))}
    </div>
  );
}
