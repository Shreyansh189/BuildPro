import { useState } from "react";
import { createClient } from "../../api";

function ClientForm({ onClientAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
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
      !formData.designation ||
      !formData.description
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

      const response = await createClient(payload);
      setMessage({
        type: "success",
        text: "Client added successfully!",
      });
      setFormData({
        name: "",
        designation: "",
        description: "",
        imageUrl: "",
      });
      setImageFile(null);
      onClientAdded(response.data);
    } catch (err) {
      console.error("Error creating client:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to add client",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section">
      <h3>Add New Client / Testimonial</h3>

      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="client-name">Client Name</label>
        <input
          type="text"
          id="client-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Client name"
        />

        <label htmlFor="client-designation">Designation</label>
        <input
          type="text"
          id="client-designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="e.g., CEO, Web Developer"
        />

        <label htmlFor="client-desc">Testimonial / Description</label>
        <textarea
          id="client-desc"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What the client says..."
        ></textarea>

        <label htmlFor="client-image">Image URL</label>
        <input
          type="url"
          id="client-image"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />

        <label htmlFor="client-image-file">Or Upload Image</label>
        <input
          type="file"
          id="client-image-file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Adding..." : "Add Client"}
        </button>
      </form>
    </div>
  );
}

export default ClientForm;
