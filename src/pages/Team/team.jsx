import React, { useState, useEffect } from "react";
import partnersData from "../../data/partnersData.json";
import styles from "./team.module.css";
import { FaUser, FaArrowRight } from "react-icons/fa";

export default function Team() {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activePerson = partnersData.find((p) => p.id === active);

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.main}>
        <h1 className={styles.pageTitle}>Our Team</h1>

        <p className={styles.subText}>
          Meet the attorneys and professionals guiding our clients with
          integrity, expertise, and commitment.
        </p>

        <div className={styles.cardRow}>
          {partnersData.map((p, index) => {
            const isActive = active === p.id;

            return (
              <div
                key={p.id}
                className={`${styles.card} ${
                  isActive ? styles.activeCard : ""
                }`}
                onClick={() => setActive(isActive ? null : p.id)}
              >
                <div className={styles.image}>
                  {p.id === "hareem" ? (
                    <FaUser className={styles.icon} />
                  ) : (
                    <img src={p.image} alt={p.name} />
                  )}
                </div>

                <h3>{p.name}</h3>
                <p>{index < 2 ? "Founding Partner" : "Consultant"}</p>

                {/* READ MORE INDICATOR */}
                <span className={styles.readMore}>
                  {isActive ? "Click to close" : "Read more"}
                  <FaArrowRight />
                </span>

                {/* MOBILE DETAIL INSIDE CARD */}
                {isMobile && isActive && (
                  <div className={styles.mobileDetail}>
                    <h4>{p.title}</h4>
                    <ul>
                      {p.description.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* DESKTOP DETAIL BELOW GRID */}
        {!isMobile && activePerson && (
          <div className={styles.detailBox}>
            <h2>{activePerson.name}</h2>
            <h4>{activePerson.title}</h4>

            <ul>
              {activePerson.description.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
