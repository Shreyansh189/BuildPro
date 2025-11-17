import { useState } from "react";
import { createProject } from "../../api";

function ProjectForm({ onProjectAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    category: "",
    timeline: "",
    services: "",
    imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
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

    if (
      !formData.name ||
      !formData.description ||
      !formData.location ||
      !formData.imageUrl
    ) {
      setMessage({ type: "error", text: "All fields are required" });
      return;
    }

    if (!imageFile && !formData.imageUrl) {
      setMessage({ type: "error", text: "Please provide an image file or URL" });
      return;
    }

    try {
      setLoading(true);
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          payload.append(key, value);
        }
      });

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const response = await createProject(payload);
      setMessage({
        type: "success",
        text: "Project created successfully!",
      });
      setFormData({
        name: "",
        description: "",
        location: "",
        category: "",
        timeline: "",
        services: "",
        imageUrl: "",
      });
      setImageFile(null);
      onProjectAdded(response.data);
    } catch (err) {
      console.error("Error creating project:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to create project",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h3>Add New Project</h3>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="project-name">Project Name</label>
        <input
          type="text"
          id="project-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Project name"
        />

        <label htmlFor="project-desc">Description</label>
        <textarea
          id="project-desc"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project description"
        ></textarea>

        <label htmlFor="project-location">Location</label>
        <input
          type="text"
          id="project-location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, Country"
        />

        <label htmlFor="project-image">Image URL</label>
        <input
          type="url"
          id="project-image"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <label htmlFor="project-image-file">Or Upload Image</label>
        <input
          type="file"
          id="project-image-file"
          name="image"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        <label htmlFor="project-category">Category</label>
        <input
          type="text"
          id="project-category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Consultation, Marketing & Design..."
        />

        <label htmlFor="project-timeline">Timeline</label>
        <input
          type="text"
          id="project-timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          placeholder="e.g., 6 weeks"
        />

        <label htmlFor="project-services">Services</label>
        <input
          type="text"
          id="project-services"
          name="services"
          value={formData.services}
          onChange={handleChange}
          placeholder="Staging + Marketing"
        />

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Creating..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
