import { CalendarDays, CircleDollarSign, Clock3, CreditCard, Download, Percent, WalletCards } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { calculateEMI, formatINR } from "../data";

function Stat({ icon, value, label }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}
function LoanCard({ loan, car, emi }) {
  return (
    <div className="loan-card">
      <h2>{car?.brand || car?.name || "Auto Loan"}</h2>

      <p>
        Loan Amount: ₹
        {Number(loan.amount || loan.loanAmount || 0).toLocaleString("en-IN")}
      </p>

      <p>Interest Rate: {loan.interestRate || 8.5}% p.a.</p>

      <p>
        Monthly EMI: ₹
        {Number(emi || 0).toLocaleString("en-IN")}
      </p>

      <p>Status: {loan.status || "Active"}</p>
    </div>
  );
}

export default function LoansPage() {
  const { loans, cars } = useCars();
  const navigate = useNavigate();

  return (
    <div className="loans-page">
      <div className="page-title-row">
        <div>
          <h1>My Loans</h1>
          <p>Track and manage your car loans.</p>
        </div>
      </div>

      <div className="stat-row">
        <Stat
          icon={<WalletCards />}
          value={loans.length}
          label="Active Loans"
        />
      </div>

      {loans.length === 0 ? (
        <div className="empty">
          <CreditCard size={40} />
          <h2>No active loans</h2>
          <p>Your active car loans will appear here.</p>

          <button
            className="btn-primary"
            onClick={() => navigate("/browse")}
          >
            Browse Cars
          </button>
        </div>
      ) : (
        loans.map((loan) => {
          const car = cars.find(
            (item) => item.id === loan.carId
          );

          if (!car) return null;

          return (
            <LoanCard
              key={loan.id}
              loan={loan}
              car={car}
            />
          );
        })
      )}
    </div>
  );
}