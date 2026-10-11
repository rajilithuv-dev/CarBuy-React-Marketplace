import { useNavigate } from "react-router-dom";
import { CalendarDays, Fuel, Settings2 } from "lucide-react";
import { purchaseData } from "../data";

const money = (amount) =>
  "₹ " + Number(amount).toLocaleString("en-IN");

export default function PurchasesPage() {
  const navigate = useNavigate();

  const fullPayments = purchaseData.filter(
    (car) => car.purchaseType === "Full Payment"
  ).length;

  const loanPurchases = purchaseData.filter(
    (car) => car.purchaseType === "Loan Purchase"
  ).length;

  return (
    <div className="purchases-page">
      <div className="page-title-row">
        <div>
          <h1>My Purchases</h1>
          <p>Here are the cars you have purchased.</p>
        </div>
      </div>

      <div className="purchase-stats">
        <div className="stat-card">
          <h2>{purchaseData.length}</h2>
          <p>Total Purchases</p>
        </div>

        <div className="stat-card">
          <h2>{fullPayments}</h2>
          <p>Full Payment</p>
        </div>

        <div className="stat-card">
          <h2>{loanPurchases}</h2>
          <p>Loan Purchase</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Recently Purchased</p>
        </div>
      </div>

      <div className="purchased-car-list">
        {purchaseData.map((car) => (
          <div className="purchase-card" key={car.id}>
            <div className="purchase-image">
              <img src={car.image} alt={car.model} />

              <span className="purchase-badge">
                {car.purchaseType}
              </span>
            </div>

            <div className="purchase-car-info">
              <h2>
                {car.brand} {car.model}
              </h2>

              <h3>{money(car.price)}</h3>

              <div className="car-specs">
                <span>
                  <CalendarDays size={16} />
                  {car.year}
                </span>

                <span>
                  <Fuel size={16} />
                  {car.fuel}
                </span>

                <span>
                  <Settings2 size={16} />
                  {car.transmission}
                </span>
              </div>

              <button
                className="btn-primary"
                onClick={() =>
                  navigate(`/cars/${car.carId}`)
                }
              >
                View Details
              </button>

              {car.purchaseType === "Loan Purchase" && (
                <button
                  className="btn-primary"
                  onClick={() => navigate("/loans")}
                >
                  View Loan Details
                </button>
              )}
            </div>

            <div className="purchase-details">
              <h3>Purchase Details</h3>
              <p>Purchase Date: {car.purchaseDate}</p>
              <p>Car Price: {money(car.price)}</p>

              {car.purchaseType === "Loan Purchase" ? (
                <>
                  <p>Down Payment: {money(car.downPayment)}</p>
                  <p>Loan Amount: {money(car.loanAmount)}</p>
                  <p>Interest Rate: {car.interestRate}%</p>
                  <p>Loan Duration: {car.loanDuration} Years</p>
                  <p>Monthly EMI: {money(car.monthlyEMI)}</p>
                  <span className="status-badge active">
                    Active Loan
                  </span>
                </>
              ) : (
                <>
                  <p>Payment Method: Full Payment</p>
                  <p>
                    Registration: {money(car.registrationCharges)}
                  </p>
                  <p>Insurance: {money(car.insurance)}</p>
                  <p>Total Amount: {money(car.totalAmount)}</p>
                  <span className="status-badge completed">
                    Completed
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}