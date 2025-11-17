import { useState } from "react";
import ProjectForm from "../components/admin/ProjectForm";
import ClientForm from "../components/admin/ClientForm";
import ContactsTable from "../components/admin/ContactsTable";
import SubscribersTable from "../components/admin/SubscribersTable";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projectRefresh, setProjectRefresh] = useState(0);
  const [clientRefresh, setClientRefresh] = useState(0);

  const handleProjectAdded = () => {
    setProjectRefresh((prev) => prev + 1);
  };

  const handleClientAdded = () => {
    setClientRefresh((prev) => prev + 1);
  };

  return (
    <div className="admin-container">
      <div className="container">
        <h1 style={{ marginBottom: "30px", textAlign: "center" }}>Admin Dashboard</h1>

        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button
            className={`tab-btn ${activeTab === "clients" ? "active" : ""}`}
            onClick={() => setActiveTab("clients")}
          >
            Clients
          </button>
          <button
            className={`tab-btn ${activeTab === "contacts" ? "active" : ""}`}
            onClick={() => setActiveTab("contacts")}
          >
            Contact Submissions
          </button>
          <button
            className={`tab-btn ${activeTab === "subscribers" ? "active" : ""}`}
            onClick={() => setActiveTab("subscribers")}
          >
            Subscribers
          </button>
        </div>

        <div
          className={`tab-content ${activeTab === "projects" ? "active" : ""}`}
        >
          <ProjectForm onProjectAdded={handleProjectAdded} key={projectRefresh} />
        </div>

        <div
          className={`tab-content ${activeTab === "clients" ? "active" : ""}`}
        >
          <ClientForm onClientAdded={handleClientAdded} key={clientRefresh} />
        </div>

        <div
          className={`tab-content ${activeTab === "contacts" ? "active" : ""}`}
        >
          <ContactsTable key={projectRefresh} />
        </div>

        <div
          className={`tab-content ${activeTab === "subscribers" ? "active" : ""}`}
        >
          <SubscribersTable key={clientRefresh} />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
