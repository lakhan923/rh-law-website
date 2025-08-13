import { useEffect, useState } from "react";
import styles from "./home.module.css";

const quotes = [
  "Law is not just about statutes—it’s about standing with the voiceless and transforming justice into reality.",
  "In the courtroom and beyond, justice begins with listening.",
  "Legal reform begins in the classroom and echoes through the courtroom.",
  "Litigation is strategy, but advocacy is heart.",
  "Climate justice is no longer optional—it’s legal foresight.",
  "Precision in drafting. Purpose in action. That’s how law serves people.",
];

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 4000); // Change quote every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.quoteCarousel}>
      <blockquote key={currentIndex}>{quotes[currentIndex]}</blockquote>
    </div>
  );
}
