import { useState } from "react";
import { createContact } from "../api";

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.mobile ||
      !formData.city
    ) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    try {
      setLoading(true);
      const response = await createContact(formData);
      setMessage({ type: "success", text: response.data.message });
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to submit form",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          
          <h2>Contact Us</h2>
          <p className="section-lede">
            Tell us about your project and we will craft a tailored roadmap to bring it
            to life. We respond within one business day.
          </p>
        </div>
        <div className="contact-card">
          {message && <div className={`message ${message.type}`}>{message.text}</div>}

          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />

            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter your mobile number"
            />

            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
            />

            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
