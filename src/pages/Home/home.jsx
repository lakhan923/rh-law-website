import React from "react";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import QuoteCarousel from "./quote";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <img
          src="/assets/top_header.jpg"
          alt="Hero background"
          className={styles.heroImage}
          loading="eager"
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>
            Welcome to R & H Law Associates & Consultants
          </h1>
          <p className={styles.heroSubtitle}>
            Your trusted legal partners across constitutional, corporate, and
            human rights law.
          </p>
          <a href="/contact" className={styles.heroButton}>
            Book a Consultation
          </a>
        </div>
      </section>

      {/* Professional Profiles */}
      <section className={styles.profileSection}>
        <h2 className={styles.sectionTitle}>Meet Our Founding Partners</h2>
        <QuoteCarousel />
        <div className={styles.profileGrid}>
          <div className={styles.profileCard}>
            <img
              src="/assets/qurrat-ul-ain-rehman.jpeg"
              alt="Qurrat Ul Ain Rehman"
              className={styles.profileImage}
            />
            <h3>Ms. Qurrat Ul Ain Rehman</h3>
            <p className={styles.profileRole}>Founding Partner</p>
            <p>
              Ms. Qurrat Ul Ain Rehman is a seasoned legal professional with
              over 11 years of advocacy and litigation experience,
            </p>
            <Link to="/team#qurrat" className={styles.readMore}>
              Read More →
            </Link>
          </div>
          <div className={styles.profileCard}>
            <img
              src="/assets/hareem-hilal.png"
              alt="Hareem Hilal"
              className={styles.profileImage}
            />
            <h3>Ms. Hareem Hilal</h3>
            <p className={styles.profileRole}>Founding Partner</p>
            <p>
              Ms. Hareem Hilal is a legally trained academic and legal
              consultant with a robust background in civil law and
              constitutional law,{" "}
            </p>
            <Link to="/team#hareem" className={styles.readMore}>
              Read More →
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <h2>Need legal advice?</h2>
        <p>
          Schedule a free 15-minute consultation with our senior partners today.
        </p>
        <div className={styles.ctaButtons}>
          <a href="/book" className={styles.ctaButton}>
            Book Appointment
          </a>
          <a href="/contact" className={styles.ctaButtonOutline}>
            Contact Us
          </a>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.MapSection}>
        <div className={styles.mapEmbed}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.3831022575083!2d73.03399891520633!3d33.68442278070056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfb8f0a5d6bb07%3A0x7a1870d0204f038f!2sIslamabad%2C%20Pakistan!5e0!3m2!1sen!2sus!4v1691234567890!5m2!1sen!2sus"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Office Location"
          ></iframe>
        </div>
      </section>

      {/* Affiliations Section */}
      <section className={styles.affiliationsSection}>
        <h2 className={styles.sectionTitle}>
          Academic & Professional Affiliations
        </h2>
        <div className={styles.affiliationsGrid}>
          <div className={styles.affiliationCard}>
            <a
              href="https://www.linkedin.com/in/qurrat-ul-ain-rehman-38504299/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/Brunel-logo.png" alt="Brunel University" />
              <p>Brunel University London</p>
            </a>
          </div>
          <div className={styles.affiliationCard}>
            <a
              href="https://www.linkedin.com/in/hareem-hilal-615a17179/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/oslo-uni-logo.png" alt="University of Oslo" />
              <p>University of Oslo</p>
            </a>
          </div>

          <div className={styles.affiliationCard}>
            <a
              href="https://www.bahria.edu.pk/Home/FacultyDetails?facultyId=666"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/bahria-uni-logo.jpeg" alt="Bahria University" />
              <p>Senior Lecturer, Bahria</p>
            </a>
          </div>

          <div className={styles.affiliationCard}>
            <a
              href="https://nls.nust.edu.pk/faculty/hareem-hilal/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/nust-uni-logo.png" alt="NUST" />
              <p>Assistant Professor, NUST</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
