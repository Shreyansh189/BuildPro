import { useEffect, useState } from "react";
import { getClients } from "../api";

function HappyClientsSection() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await getClients();
        setClients(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <section id="clients" className="section testimonials-section">
      <div className="container">
        <div className="section-header">
         
          <h2>What Our Happy Clients Say</h2>
          <p className="section-lede">
            Insightful partnerships and meticulous execution earn us praise from people
            who trust us with their most ambitious visions.
          </p>
        </div>

        {loading && <div className="loader"></div>}
        {error && <div className="message error">{error}</div>}

        {!loading && clients.length === 0 && (
          <p className="empty-state">No testimonials yet.</p>
        )}

        <div className="testimonials-grid">
          {clients.map((client) => (
            <article key={client._id} className="testimonial-card">
              <div className="quote-icon" aria-hidden="true">
                <svg viewBox="0 0 48 48" role="presentation">
                  <path
                    d="M10 22c0-8 4-14 10-18l2 3c-4 3-6 7-6 12h6v16H10V22zm18 0c0-8 4-14 10-18l2 3c-4 3-6 7-6 12h6v16H28V22z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <p className="testimonial-text">
                &ldquo;{client.description}&rdquo;
              </p>
              <div className="client-meta">
                <img
                  src={client.imageUrl}
                  alt={client.name}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/96?text=" + client.name;
                  }}
                />
                <div>
                  <p className="client-name">{client.name}</p>
                  <p className="client-role">{client.designation}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HappyClientsSection;
