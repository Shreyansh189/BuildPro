const features = [
  {
    title: "Potential ROI",
    description:
      "We stage, redesign, and market every home to showcase its most profitable angles, helping you sell faster and for more.",
    icon: "🏠",
  },
  {
    title: "Design Studio",
    description:
      "Our interior design partners curate finishes, furnishings, and lighting plans so every walkthrough feels sophisticated.",
    icon: "🎨",
  },
  {
    title: "Marketing Engine",
    description:
      "From cinematic photography to data-backed ad campaigns, we keep your listings top-of-mind for qualified buyers.",
    icon: "📈",
  },
];

function WhyChooseSection() {
  return (
    <section className="section why-section">
      <div className="container">
        <div className="section-header">
          
          <h2>Strategy, design, and marketing in one seamless experience.</h2>
          <p className="section-lede">
            Whether you need staging, renovations, or a full go-to-market plan, we guide
            you through each phase with measurable milestones.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <span className="feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;

