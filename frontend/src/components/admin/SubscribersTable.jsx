import { useEffect, useState } from "react";
import { getSubscribers } from "../../api";

function SubscribersTable() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await getSubscribers();
      setSubscribers(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
      setError("Failed to load subscribers");
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
      <h3>Newsletter Subscribers</h3>

      {loading && <div className="loader"></div>}
      {error && <div className="message error">{error}</div>}

      {!loading && subscribers.length === 0 && (
        <p style={{ color: "#7f8c8d" }}>No subscribers yet.</p>
      )}

      {!loading && subscribers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber._id}>
                <td>{subscriber.email}</td>
                <td>{formatDate(subscriber.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SubscribersTable;
