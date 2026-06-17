import React from "react";
import styles from "./book.module.css";

const Book = () => {
  return (
    <section className={styles.container}>
      {/* Background */}
      <img
        src="/assets/book_appointment.jpg"
        alt="background"
        className={styles.heroImage}
      />

      {/* LEFT */}
      <div className={styles.leftPanel}>
        <h2>Contact Hours</h2>

        <h3 className={styles.days}>Mon - Fri</h3>
        <p className={styles.text}>9:00 AM - 5:00 PM</p>

        <div className={styles.divider} />

        <h4 className={styles.phone}>+92 336 5374302</h4>
      </div>

      {/* RIGHT */}
      <div className={styles.rightPanel}>
        <h2 className={styles.title}>Book Appointment</h2>
        <p className={styles.subtitle}>
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
          <div className={styles.group}>
            <label>Name</label>
            <input name="name" placeholder="Full Name" />
          </div>

          <div className={styles.group}>
            <label>Email</label>
            <input name="email" placeholder="Email Address" />
          </div>

          <div className={styles.group}>
            <label>Phone</label>
            <input name="phone" placeholder="Phone Number" />
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label>Date</label>
              <input type="date" name="preferred_date" />
            </div>

            <div className={styles.group}>
              <label>Time</label>
              <input type="time" name="preferred_time" />
            </div>
          </div>

          <div className={styles.group}>
            <label>Message</label>
            <textarea rows="4" />
          </div>

          <button className={styles.button}>Confirm Booking</button>
        </form>
      </div>
    </section>
  );
};

export default Book;
