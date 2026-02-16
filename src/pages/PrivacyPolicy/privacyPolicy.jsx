import React from "react";
import styles from "./privacyPolicy.module.css";

function PrivacyPolicy() {
  // Set a FIXED "Last Updated" date (professional practice)
  const lastUpdated = "August 15, 2025";

  return (
    <div className={styles.pageWrapper}>
      {/* Background Image */}
      <img
        src="/assets/privacy-policy.jpg"
        alt="Privacy Policy Background"
        className={styles.bgImage}
      />

      <div className={styles.privacyContainer}>
        <h1>Privacy Policy</h1>
        <p>
          <strong>Last Updated:</strong> {lastUpdated}
        </p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            R & H Law Associates and Consultants LLP (“<strong>we</strong>”, “
            <strong>our</strong>”, or “<strong>us</strong>”) respects your
            privacy and is committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your
            data when you visit our website or engage our legal services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Details you voluntarily
              provide through our contact, appointment, or feedback forms, such
              as:
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>
                  Other information relevant to your inquiry or consultation
                </li>
              </ul>
            </li>

            <li>
              <strong>Usage Data:</strong> Information automatically collected
              when you visit our website, including:
              <ul>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on them</li>
                <li>Device type and operating system</li>
              </ul>
            </li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use your personal information to:</p>
          <ul>
            <li>Respond to your inquiries and appointment requests</li>
            <li>Provide legal consultations and related services</li>
            <li>Improve our website, user experience, and service quality</li>
            <li>Comply with legal obligations and maintain business records</li>
          </ul>
        </section>

        <section>
          <h2>4. Cookies and Tracking Technologies</h2>
          <p>
            Our website may use cookies or similar tracking technologies to
            enhance your browsing experience. Cookies help us understand how
            visitors interact with our website and allow us to improve website
            performance.
          </p>
          <p>
            You can choose to disable cookies through your browser settings.
            However, disabling cookies may affect some website functionality.
          </p>
        </section>

        <section>
          <h2>5. Data Sharing and Disclosure</h2>
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal
            information. We may share your information only with:
          </p>
          <ul>
            <li>
              Trusted service providers who assist us in operating our website
              and delivering services, and who are bound by confidentiality
              obligations
            </li>
            <li>
              Legal or regulatory authorities when required by law, court order,
              or to protect our legal rights
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to
            fulfill the purposes for which it was collected, comply with legal
            obligations, resolve disputes, and enforce agreements.
          </p>
        </section>

        <section>
          <h2>7. Data Security</h2>
          <p>
            We use appropriate technical and organizational measures to protect
            your personal data from unauthorized access, alteration, disclosure,
            or destruction. However, please note that no method of electronic
            storage or transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data, where applicable</li>
            <li>
              Withdraw your consent at any time by contacting us (where consent
              is the basis of processing)
            </li>
          </ul>
        </section>

        <section>
          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of external sites.
            We encourage you to review their privacy policies before providing
            any personal information.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Updates will be
            posted on this page with a revised “Last Updated” date.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:rhlawassociates@gmail.com">
                rhlawassociates@gmail.com
              </a>
            </li>
            <li>
              Phone: <a href="tel:+923365374302">+92 336 5374302</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
