import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import partnersData from "../../data/partnersData.json";
import styles from "./team.module.css";

export default function Team() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className={styles.pageWrapper}>
      {/* Full-page background image using <img> */}
      <img
        src="/assets/team-bg.jpg"
        alt="Background"
        className={styles.backgroundImage}
        loading="eager"
      />

      {/* Content sits above background */}
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Our Founding Partners</h1>

        {partnersData.map(({ id, name, title, description, image }) => (
          <section
            key={id}
            id={id}
            className={styles["partner-profile"]}
            aria-labelledby={`${id}-label`}
          >
            <header className={styles["partner-header"]}>
              <img
                src={image}
                alt={`Portrait of ${name}`}
                className={styles["partner-photo"]}
              />
              <div>
                <h2 id={`${id}-label`} className={styles["partner-name"]}>
                  {name}
                </h2>
                <p className={styles["partner-title"]}>{title}</p>
              </div>
            </header>
            <ul className={styles["partner-description-list"]}>
              {description.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}
