function AboutSection() {
  return (
    <section className="section about-section">
      <div className="container about-grid">
        <div className="about-copy">
        
          <h2>Consultation, Design, and Marketing that elevates every listing.</h2>
          <p className="section-lede">
            Real Trust is your partner for selling property potential—combining design,
            market intelligence, and concierge-level service so every showing feels like a
            curated experience.
          </p>

          <div className="about-stats">
            <div>
              <strong>15+</strong>
              <span>Years of expertise</span>
            </div>
            <div>
              <strong>320</strong>
              <span>Homes elevated</span>
            </div>
            <div>
              <strong>4.9/5</strong>
              <span>Client rating</span>
            </div>
          </div>
        </div>

        <div className="about-gallery">
          <div className="pulse pulse-lg"></div>
          <div className="pulse pulse-sm"></div>

          <div className="gallery-main">
            <img
              src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=600&q=80"
              alt="Consultation"
              loading="lazy"
            />
          </div>
          <div className="gallery-secondary">
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=80"
              alt="Design presentation"
              loading="lazy"
            />
          </div>
          <div className="gallery-tertiary">
            <img
              src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=400&q=80"
              alt="Team collaboration"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

