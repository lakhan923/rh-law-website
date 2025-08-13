import React from "react";
import { Link } from "react-router-dom";
import styles from "./practiceArea.module.css";
import data from "../../data/practiceAreaData.json";
import {
  FaGavel,
  FaHome,
  FaBuilding,
  FaUsers,
  FaGlobe,
  FaBalanceScale,
  FaBriefcase,
  FaPassport,
} from "react-icons/fa";

// Icon map to resolve icon names from JSON
const iconMap = {
  FaGavel: <FaGavel />,
  FaHome: <FaHome />,
  FaBuilding: <FaBuilding />,
  FaUsers: <FaUsers />,
  FaGlobe: <FaGlobe />,
  FaBalanceScale: <FaBalanceScale />,
  FaBriefcase: <FaBriefcase />,
  FaPassport: <FaPassport />,
};

function PracticeAreas() {
  return (
    <section className={styles.practiceAreas}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Practice Areas</h2>
        <div className={styles.grid}>
          {data.map((area, index) => (
            <Link
              to={`/practice/${area.slug}`}
              className={styles.card}
              key={index}
            >
              <div className={styles.icon}>{iconMap[area.icon]}</div>
              <h3 className={styles.title}>{area.title}</h3>
              <p className={styles.description}>{area.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PracticeAreas;
