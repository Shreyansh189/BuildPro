import { useEffect, useState } from "react";
import { getProjects } from "../api";

function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Track which project descriptions are expanded
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        setProjects(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const defaultBadges = [
    "Consultation",
    "Design",
    "Marketing & Design",
    "Consultation & Marketing",
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
         
          <h2>We know what buyers are looking for.</h2>
          <p className="section-lede">
            From turnkey consultation packages to marketing-driven makeovers, these
            featured projects highlight the strategies that helped our clients earn top
            dollar.
          </p>
        </div>

        {loading && <div className="loader"></div>}
        {error && <div className="message error">{error}</div>}

        {!loading && projects.length === 0 && (
          <p className="empty-state">No projects available yet.</p>
        )}

        <div className="projects-grid">
          {projects.map((project, index) => {
            const isExpanded = !!expanded[project._id];
            const badge = project.category || defaultBadges[index % defaultBadges.length];

            return (
              <article key={project._id} className="project-card">
                <div className="project-image">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x400?text=" +
                        project.name;
                    }}
                  />
                </div>
                <div className="project-body">
                  <div className="project-meta">
                    <span className="project-location">
                      {project.location || "Confidential Location"}
                    </span>
                    <span className="project-badge">{badge}</span>
                  </div>
                  <h3>{project.name}</h3>
                  {isExpanded && project.description && (
                    <p className="project-description">{project.description}</p>
                  )}

                 

                  {project.description && (
                    <button
                      className="btn btn-accent"
                      aria-expanded={isExpanded}
                      onClick={() => toggleExpanded(project._id)}
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
