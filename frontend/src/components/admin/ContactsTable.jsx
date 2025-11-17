import { useEffect, useState } from "react";
import { getContacts } from "../../api";

function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getContacts();
      setContacts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to load contact submissions");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="form-section">
      <h3>Contact Submissions</h3>

      {loading && <div className="loader"></div>}
      {error && <div className="message error">{error}</div>}

      {!loading && contacts.length === 0 && (
        <p style={{ color: "#7f8c8d" }}>No contact submissions yet.</p>
      )}

      {!loading && contacts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.fullName}</td>
                <td>{contact.email}</td>
                <td>{contact.mobile}</td>
                <td>{contact.city}</td>
                <td>{formatDate(contact.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactsTable;
