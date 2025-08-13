import React from "react";
import styles from "./contact.module.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Contact Us</h2>
        <p className={styles.subheading}>
          We'd love to hear from you. Reach out using the form or contact
          details below.
        </p>

        <div className={styles.content}>
          {/* Contact Form */}
          <form
            className={styles.contactForm}
            onSubmit={async (e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const message = e.target.message.value;

              const res = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
              });

              if (res.ok) {
                alert("Message sent successfully!");
                e.target.reset();
              } else {
                alert("Failed to send message.");
              }
            }}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Your Message"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className={styles.contactDetails}>
            <h3>Get in Touch</h3>
            <p>
              <FaPhoneAlt className={styles.icon} />
              <a href="tel:+923365374302" className={styles.contactLink}>
                +92 336 5374302
              </a>
            </p>
            <p>
              <FaEnvelope className={styles.icon} />
              <a
                href="mailto:rhlawassociates@gmail.com"
                className={styles.contactLink}
              >
                rhlawassociates@gmail.com
              </a>
            </p>
            <p>
              <FaMapMarkerAlt className={styles.icon} />
              Pakistan, Islamabad
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div className={styles.mapContainer}>
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

        {/* Feedback Form */}
        <form
          className={styles.feedbackForm}
          onSubmit={async (e) => {
            e.preventDefault();
            const name = e.target.feedbackName.value;
            const email = e.target.feedbackEmail.value;
            const feedback = e.target.feedbackText.value;

            try {
              const res = await fetch("http://localhost:5000/api/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, feedback }),
              });

              if (res.ok) {
                alert("Feedback sent successfully!");
                e.target.reset();
              } else {
                alert("Failed to send feedback.");
              }
            } catch (error) {
              alert("Error sending feedback.");
              console.error(error);
            }
          }}
        >
          <h3>Send Us Your Feedback</h3>
          <div className={styles.formGroup}>
            <label htmlFor="feedbackName">Name</label>
            <input
              type="text"
              id="feedbackName"
              name="feedbackName"
              placeholder="Your Name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="feedbackEmail">Email</label>
            <input
              type="email"
              id="feedbackEmail"
              name="feedbackEmail"
              placeholder="Your Email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="feedbackText">Feedback</label>
            <textarea
              id="feedbackText"
              name="feedbackText"
              rows="4"
              placeholder="Your Feedback"
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
        </form>

        {/* Thank You Note */}
        <div className={styles.thankYouNote}>
          <h4>Thank you for visiting!</h4>
          <p>
            Whether you're seeking legal advice, consultation, or partnership,
            we look forward to connecting with you.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
