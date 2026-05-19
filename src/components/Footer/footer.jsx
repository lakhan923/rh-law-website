import React from "react";
import styles from "./footer.module.css";
import {
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserClock,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerColumns}>
          {/* Left Column: Contact Info */}
          <div className={styles.leftColumn}>
            <div className={styles.contactInfo}>
              <p>
                <FaMapMarkerAlt className={styles.icon} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=House+%231592%2C+Street+%2319%2F1%2C+Block-C%2C+NPF%2C+Sector+O-9%2C+Islamabad%2C+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  House #1592, Street #19/1, Block-C
                  <br />
                  NPF, Sector O-9
                  <br />
                  Islamabad, Pakistan
                </a>
              </p>
              <p>
                <FaPhone className={styles.icon} />
                <a href="tel:+923365374302" className={styles.contactLink}>
                  +92 336 5374302
                </a>
              </p>
              <p>
                <FaUserClock className={styles.icon} />
                <strong>Contact Hours:</strong> Mon – Fri: 9:00 AM – 5:00 PM
              </p>
            </div>
          </div>

          {/* Middle Column: Quick Links */}
          <div className={styles.middleColumn}>
            <nav
              className={styles.quickLinksGrid}
              aria-label="Footer Navigation"
            >
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

          {/* Column 3 — Partners */}
          <div className={styles.rightColumn}>
            <div className={styles.followUsSection}>
              <h4 className={styles.foundersTitle}>Partners</h4>

              <div className={styles.partnerLinks}>
                <a
                  href="mailto:qurratulain.rehman@rhlaw.com"
                  className={styles.partnerLink}
                >
                  <FaEnvelope className={styles.icon} />
                  <span>Qurratulain Rehman</span>
                </a>

                <a
                  href="mailto:hareem.hilal@rhlaw.com"
                  className={styles.partnerLink}
                >
                  <FaEnvelope className={styles.icon} />
                  <span>Hareem Hilal</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Follow Us */}
          <div className={styles.rightColumn}>
            <div className={styles.followUsSection}>
              <h4 className={styles.foundersTitle}>Follow Us</h4>
              <div className={styles.socialLinks}>
                <a
                  href="https://www.instagram.com/r__h_law?igsh=OW94NnptdTI1N2g4"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.instagramLink}
                  aria-label="Visit our Instagram"
                >
                  <FaInstagram className={styles.icon} />
                  <span>Instagram</span>
                </a>
              </div>
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
