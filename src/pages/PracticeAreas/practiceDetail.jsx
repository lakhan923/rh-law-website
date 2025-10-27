import React from "react";
import { useParams } from "react-router-dom";
import areaList from "../../data/practiceAreaData.json";
import styles from "./practiceDetail.module.css";

// Static JSON imports
import civilLaw from "../../data/practiceDetail/ civil-constitutional-law.json";
import familyLaw from "../../data/practiceDetail/family-law.json";
import corporateLaw from "../../data/practiceDetail/corporate-commercial-law.json";
import humanRights from "../../data/practiceDetail/human-rights-law.json";
import publicIntl from "../../data/practiceDetail/public-international-law.json";
import serviceLaw from "../../data/practiceDetail/service-employment-law.json";
import consultancy from "../../data/practiceDetail/legal-consultancy.json";
import immigration from "../../data/practiceDetail/immigration-law.json";
// Mapping slug to imported JSON data
const detailsMap = {
  "civil-constitutional-law": civilLaw,
  "family-law": familyLaw,
  "corporate-commercial-law": corporateLaw,
  "human-rights-law": humanRights,
  "public-international-law": publicIntl,
  "service-employment-law": serviceLaw,
  "legal-consultancy": consultancy,
  "immigration-law": immigration,
};

export default function PracticeDetail() {
  const { slug } = useParams();
  const area = areaList.find((item) => item.slug === slug);
  const details = detailsMap[slug];

  if (!area || !details) {
    return <div className={styles.notFound}>Practice area not found.</div>;
  }

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>{area.title}</h1>
        <p className={styles.description}>{area.description}</p>

        <div className={styles.content}>
          {details.image && (
            <img
              src={details.image}
              alt={area.title}
              className={styles.practiceImage}
            />
          )}
          <h2>Overview</h2>
          <p>{details.overview}</p>

          <h2>Our Expertise</h2>
          <ul>
            {details.expertise.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <h2>Why Choose Us?</h2>
          <p>{details.whyChooseUs}</p>
        </div>
      </div>
    </div>
  );
}
