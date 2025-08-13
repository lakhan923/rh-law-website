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
        <p>Last updated: {lastUpdated}</p>

        <section>
          <h2>1. Introduction</h2>
          <p>
            R & H Law Associates and Consultants LLP ("we", "our", or "us") is
            committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, and safeguard your information when you use our
            website.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email, phone number,
              etc, provided via contact forms or appointment bookings.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you use our
              website, such as pages visited, IP address, and browser type.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>
              To respond to your inquiries or provide legal consultations.
            </li>
            <li>To improve our services and website experience.</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Sharing</h2>
          <p>
            We do not sell or rent your personal data. We may share it with
            trusted service providers who help us operate the site or when
            required by law.
          </p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal data.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <ul>
            <li>
              You have the right to access, correct, or delete your personal
              data.
            </li>
          </ul>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy occasionally. Updates will be
            posted on this page with the "Last updated" date.
          </p>
        </section>

        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this policy, contact us at:
            <br />
            <strong>Email:</strong> rhlawassociates@gmail.com
            <br />
            <strong>Phone:</strong> +92 336 5374302
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
