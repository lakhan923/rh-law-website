import React from "react";
import styles from "./footer.module.css";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserClock,
} from "react-icons/fa";

const founders = [
  {
    name: "Ms. Qurrat Ul Ain Rehman",
    socials: {
      linkedin: "https://www.linkedin.com/in/qurrat-ul-ain-rehman-38504299/",
      instagram: "https://instagram.com/",
      facebook: "https://facebook.com/",
    },
  },
  {
    name: "Ms. Hareem Hilal",
    socials: {
      linkedin: "https://www.linkedin.com/in/hareem-hilal-615a17179/",
      instagram: "https://instagram.com/",
      facebook: "https://facebook.com/",
    },
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerColumns}>
          {/* Left Side: Contact Info */}
          <div className={styles.leftColumn}>
            <div className={styles.contactInfo}>
              <p>
                <FaMapMarkerAlt /> Pakistan, Islamabad
              </p>
              <p>
                <FaPhone />
                <a href="tel:+923365374302" className={styles.contactLink}>
                  +92 336 5374302
                </a>
              </p>
              <p>
                <FaEnvelope />{" "}
                <a
                  href="mailto:rhlawassociates@gmail.com"
                  className={styles.contactLink}
                >
                  rhlawassociates@gmail.com
                </a>
              </p>
              <p>
                <FaUserClock />
                <strong>Office Hours:</strong> Mon – Fri: 9:00 AM – 5:00 PM
              </p>
            </div>
          </div>

          {/* Right Side: Founders + Quick Links */}
          <div className={styles.rightColumn}>
            <div className={styles.foundersAndLinks}>
              {/* Founders */}
              <div className={styles.foundersSection}>
                <h4 className={styles.foundersTitle}>Founders</h4>
                {founders.map((founder) => (
                  <div key={founder.name} className={styles.founderItem}>
                    <span className={styles.founderName}>{founder.name}</span>
                    <div className={styles.socialLinks}>
                      <a
                        href={founder.socials.linkedin}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href={founder.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaInstagram />
                      </a>
                      <a
                        href={founder.socials.facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaFacebook />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <nav className={styles.quickLinksGrid}>
                <ul>
                  <li>
                    <a href="/practice-areas">Practice Areas</a>
                  </li>
                  <li>
                    <a href="/about">About Us</a>
                  </li>
                  <li>
                    <a href="/team">Team</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                  <li>
                    <a href="/privacyPolicy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/book">Book Appointment</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className={styles.footerText}>
          &copy; {new Date().getFullYear()}{" "}
          <strong>R & H Law Associates and Consultants LLP</strong>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
