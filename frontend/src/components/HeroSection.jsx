import { useState } from "react";
import { createContact } from "../api";

function HeroSection() {
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

    if (!formData.fullName || !formData.email || !formData.mobile || !formData.city) {
      setMessage({ type: "error", text: "Please fill in all fields." });
      return;
    }

    try {
      setLoading(true);
      const response = await createContact(formData);
      setMessage({ type: "success", text: response.data.message });
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error("Error submitting consultation form:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero split-hero">
      <div className="hero-media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1600&q=80"
          alt=""
        />
      </div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Real Trust</p>
          <h1>Consultation, Design, & Marketing that wins listings.</h1>
          <p>
            We combine smart renovations, luxury staging, and omnichannel marketing to
            command premium offers for every property we represent.
          </p>
          <ul className="hero-list">
            <li>Dedicated design and staging studio</li>
            <li>Full-service marketing and buyer outreach</li>
            <li>Concierge experience from listing to closing</li>
          </ul>
          <div className="hero-ctas">
            <button className="btn btn-light" onClick={() => scrollTo("projects")}>
              Explore Projects
            </button>
            <button className="btn btn-outline" onClick={() => scrollTo("contact")}>
              Talk to Us
            </button>
          </div>
        </div>

        <div className="hero-form-card">
          <h3>Get a Free Consultation</h3>
          <p>Share a few details and we’ll respond within one business day.</p>

          {message && <div className={`message ${message.type}`}>{message.text}</div>}

          <form onSubmit={handleSubmit}>
            <label htmlFor="lead-name">Full Name</label>
            <input
              id="lead-name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />

            <label htmlFor="lead-email">Email Address</label>
            <input
              id="lead-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />

            <label htmlFor="lead-mobile">Mobile Number</label>
            <input
              id="lead-mobile"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
            />

            <label htmlFor="lead-city">Area / City</label>
            <input
              id="lead-city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your city"
            />

            <button type="submit" className="btn btn-dark" disabled={loading}>
              {loading ? "Sending..." : "Get Quick Quote"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
