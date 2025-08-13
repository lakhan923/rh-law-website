import React from "react";
import styles from "./book.module.css";

const Book = () => {
  return (
    // Main Content Section
    <section className={styles.container}>
      <img
        src="/assets/book_appointment.jpg"
        alt="Hero background"
        className={styles.heroImage}
        loading="eager"
      />
      <div className={styles["container-time"]}>
        <h2 className={styles.heading}>Time Open</h2>
        <h3 className={styles["heading-days"]}>Monday-Friday</h3>
        <p>9:00 AM - 5:00 AM </p>

        <h3 className={styles["heading-days"]}>Saturday</h3>
        <p>12:00 AM - 4:00 PM</p>
        <hr />

        <h4 className={styles["heading-phone"]}>Call Us: +92 336 5374302</h4>
      </div>

      <div id="book-appointment">
        <h2>Book an Appointment</h2>
        <p>
          Schedule a consultation or meeting with me at your convenience. Please
          fill out the form below, and I'll get back to you with available time
          slots.
        </p>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const email = e.target.email.value;
            const phone = e.target.phone.value;
            const preferred_date = e.target["preferred-date"].value;
            const preferred_time = e.target["preferred-time"].value;
            const additional_info = e.target.message.value;

            const res = await fetch("http://localhost:5000/api/appointment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                email,
                phone,
                preferred_date,
                preferred_time,
                additional_info,
              }),
            });

            if (res.ok) {
              alert("Appointment request sent!");
              e.target.reset();
            } else {
              alert("Failed to send appointment.");
            }
          }}
        >
          <div className={styles["form-group"]}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" required />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="preferred-date">Preferred Date:</label>
            <input
              type="date"
              id="preferred-date"
              name="preferred-date"
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="preferred-time">Preferred Time:</label>
            <input
              type="time"
              id="preferred-time"
              name="preferred-time"
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="message">Additional Information:</label>
            <textarea id="message" name="message" rows="4"></textarea>
          </div>
          <button type="submit" className={styles.btn}>
            Submit Appointment Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default Book;
