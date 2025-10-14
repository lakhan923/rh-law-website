import React from "react";
import styles from "./privacyPolicy.module.css";

function PrivacyPolicy() {
  // Get today's date in a readable format
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.pageWrapper}>
      {/* Background Image */}
      <img
        src="/assets/privacy-policy.jpg"
        alt="Background"
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
            This Privacy Policy outlines how we collect, use, and safeguard your
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
          <h2>4. Data Sharing and Disclosure</h2>
          <p>
            We do <strong>not</strong> sell, rent, or trade your personal
            information. We may share your data only with:
          </p>
          <ul>
            <li>
              Trusted service providers who assist us in operating our website
              and are bound by confidentiality obligations
            </li>
            <li>
              Legal or regulatory authorities when required by law or to protect
              our rights
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We use appropriate technical and organizational measures to protect
            your personal data from unauthorized access, alteration, disclosure,
            or destruction. However, please note that no method of electronic
            storage or transmission over the internet is 100% secure.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your data, where applicable</li>
            <li>Withdraw your consent at any time by contacting us</li>
          </ul>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Updates will be
            posted on this page with a revised “Last Updated” date.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this
            Privacy Policy, please contact us at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:your-email@example.com">
                rhlawassociates@gmail.com
              </a>
            </li>
            <li>Phone: +92 336 5374302</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
