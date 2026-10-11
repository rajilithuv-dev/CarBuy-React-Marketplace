import { useCars } from "../context/CarContext";

export default function PurchasesPage() {
  const { cars } = useCars();

  const purchases = cars?.slice(0, 2) || [];

  return (
    <div className="page">
      <h1 className="page-title">My Purchases</h1>

      <p className="page-subtitle">
        Here are the cars you have purchased.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div>
            <div className="stat-value">{purchases.length}</div>
            <div className="stat-label">Total Purchases</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div>
            <div className="stat-value">1</div>
            <div className="stat-label">Full Payment</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div>
            <div className="stat-value">1</div>
            <div className="stat-label">Loan Purchase</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❤️</div>
          <div>
            <div className="stat-value">0</div>
            <div className="stat-label">Recently Purchased</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Purchased Cars</h2>
        </div>

        {purchases.length === 0 ? (
          <div className="empty-state">
            <h3>No purchases yet</h3>
            <p>Browse cars and purchase your dream car.</p>
          </div>
        ) : (
          <div className="purchase-list">
            {purchases.map((car) => (
              <div className="purchase-item" key={car.id}>
                <img
                  src={car.image}
                  alt={car.name}
                />

                <div className="purchase-info">
                  <h3>{car.name}</h3>

                  <p className="price">
                    ₹ {Number(car.price).toLocaleString("en-IN")}
                  </p>

                  <p className="car-meta">
                    {car.year} &nbsp; • &nbsp;
                    {car.fuel} &nbsp; • &nbsp;
                    {car.transmission}
                  </p>

                  <br />

                  <span className="status paid">
                    Purchase Completed
                  </span>
                </div>

                <button className="btn btn-primary">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}