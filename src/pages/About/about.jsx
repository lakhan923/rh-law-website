import React from "react";
import styles from "./about.module.css";
import { Link } from "react-router-dom";
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
import { FaUserCircle } from "react-icons/fa";

const About = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>About Us</h1>

        {/* Firm Overview */}
        <p className={styles.intro}>
          <strong>R & H Law Associates and Consultants LLP</strong> was founded
          by <span className={styles.highlight}>Ms. Qurrat Ul Ain Rehman</span>{" "}
          and <span className={styles.highlight}>Ms. Hareem Hilal</span> with
          the vision to provide client-centered, policy-informed, and socially
          conscious legal services. The firm offers strategic litigation,
          exceptional legal consultancy, and research in both national and
          international contexts.
        </p>

        {/* Philosophy / Core Values Cards */}
        <div className={styles.cardSection}>
          <div className={styles.card}>
            <h2>Our Philosophy</h2>
            <p>
              We believe in the law as a force for societal transformation.
              Justice, dignity, and strategic advocacy lie at the heart of our
              work.
            </p>
          </div>
          <div className={styles.card}>
            <h2>Our Mission</h2>
            <p>
              To empower our clients through innovative legal strategies and
              policy interventions tailored for real-world results.
            </p>
          </div>
          <div className={styles.card}>
            <h2>What Sets Us Apart</h2>
            <p>
              Our founders' practical legal work with strong academic background
              offer clients a robust platform for legal solutions.
            </p>
          </div>
        </div>

        {/* Founders Spotlight */}
        <div className={styles.founders}>
          <h2 className={styles.subTitle}>Our Founders</h2>
          <div className={styles.founderProfiles}>

            {/* Qurrat Ul Ain Rehman */}
            <div className={styles.founderCard}>
              <div className={styles.founderIcon}>
                <img
                  src="/assets/qurrat-ul-ain-rehman.jpeg"
                  alt="Qurrat Ul Ain Rehman"
                  className={styles.founderPhoto}
                />
              </div>
              <h3 className={styles.founderName}>Ms. Qurrat Ul Ain Rehman</h3>
              <p className={styles.founderBio}>
               Ms. Qurrat Ul Ain Rehman, the Cofounding Partner, is a seasoned legal professional with over 11 years of experience in constitutional, family, corporate, property, service, and immigration laws. She holds a Bachelor of Laws degree from Punjab University, and an LLM degree in International Human Rights Law from Brunel University, London. She has experience of working at the Ministry of Law and Justice (Government of Pakistan), Legal Aid Bureau (Pakistan), and Citizens Advice Bureau (UK). She has also served as Senior Editor at JURIST Legal News and Commentary (US) and as a Member of the IUCN World Commission on Environmental Law (2021-2025). 
              </p>
            </div>

            {/* Hareem Hilal */}
            <div className={styles.founderCard}>
              <div className={styles.founderIcon}>
                <FaUserCircle />
              </div>
              <h3 className={styles.founderName}>Ms. Hareem Hilal</h3>
              <p className={styles.founderBio}>
               Ms. Hareem Hilal, the Cofounding Partner, brings together practical and grassroot experience from public and private sector. She has practical experience of advocacy in family, company, competition, immigration, and taxation laws. She holds a  Bachelor of Laws degree from the University of Peshawar and an LLM degree in Public International Law from the University of Oslo, (Norway) specialising in Human Rights. She has worked as a District Youth Officer and as a Planning Officer with the Government of Khyber Pakhtunkhwa. She has served as a Board Member of the UN Student Association Oslo (Norway) and as a Member of the IUCN World Commission on Environmental Law (2021-2025).
              </p>
            </div>
          </div>
        </div>

        {/* Practice Areas */}
        <div className={styles.practiceAreasWrapper}>
          <div className={styles.practiceAreas}>
            <h2 className={styles.subTitle}>Practice Areas</h2>
            <ul className={styles.areaList}>
              <li>
                <Link
                  to="/practice/civil-constitutional-law"
                  className={styles.practiceLink}
                >
                  <FaGavel className={styles.icon} /> Civil & Constitutional Law
                </Link>
              </li>
              <li>
                <Link to="/practice/family-law" className={styles.practiceLink}>
                  <FaHome className={styles.icon} /> Family Law
                </Link>
              </li>
              <li>
                <Link
                  to="/practice/corporate-commercial-law"
                  className={styles.practiceLink}
                >
                  <FaBuilding className={styles.icon} /> Corporate & Commercial
                  Law
                </Link>
              </li>
              <li>
                <Link
                  to="/practice/human-rights-law"
                  className={styles.practiceLink}
                >
                  <FaUsers className={styles.icon} /> Human Rights Law
                </Link>
              </li>
              <li>
                <Link
                  to="/practice/public-international-law"
                  className={styles.practiceLink}
                >
                  <FaGlobe className={styles.icon} /> Public International Law
                </Link>
              </li>
              <li>
                <Link
                  to="/practice/service-employment-law"
                  className={styles.practiceLink}
                >
                  <FaBalanceScale className={styles.icon} /> Service &
                  Employment Law
                </Link>
              </li>
              <li>
                <Link
                  to="/practice/legal-consultancy"
                  className={styles.practiceLink}
                >
                  <FaBriefcase className={styles.icon} /> Legal Consultancy
                </Link>
              </li>
              <li>
                <Link
                  to="/practice/immigration-law"
                  className={styles.practiceLink}
                >
                  <FaPassport className={styles.icon} /> Immigration Law
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className={styles.cta}>
          <h2>Want to Collaborate With Us?</h2>
          <p>
            Whether you're an individual, institution, or NGO — let's build
            legal solutions together.
          </p>
          <a href="/contact" className={styles.ctaButton}>
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
