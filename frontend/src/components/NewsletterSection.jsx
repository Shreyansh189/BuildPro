import { useState } from "react";
import { createSubscriber } from "../api";

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ type: "error", text: "Email is required" });
      return;
    }

    try {
      setLoading(true);
      const response = await createSubscriber({ email });
      setMessage({ type: "success", text: response.data.message });
      setEmail("");
    } catch (err) {
      console.error("Error subscribing:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to subscribe",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter">
      <div className="container newsletter-card">
        <div className="newsletter-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" role="presentation">
            <path
              d="M6 12a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4zm4-2a2 2 0 0 0-2 2v.35l16 10.67 16-10.67V12a2 2 0 0 0-2-2zm30 6.65-14.84 9.9a3 3 0 0 1-3.32 0L7 16.65V36a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2>Subscribe to Our Newsletter</h2>
        <p className="newsletter-copy">
          Stay updated with our latest projects and news. Subscribe now!
        </p>

        {message && (
          <div className={`message ${message.type}`} style={{ maxWidth: "500px", margin: "0 auto 20px" }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default NewsletterSection;
