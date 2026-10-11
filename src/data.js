export const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Fortuner",
    price: 3500000,
    year: 2024,
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    brand: "Hyundai",
    model: "Creta",
    price: 1850000,
    year: 2024,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    brand: "Kia",
    model: "Seltos",
    price: 1950000,
    year: 2023,
    fuel: "Petrol",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    brand: "Tata",
    model: "Harrier",
    price: 2200000,
    year: 2024,
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    brand: "Mahindra",
    model: "XUV700",
    price: 2450000,
    year: 2024,
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    brand: "Honda",
    model: "City",
    price: 1650000,
    year: 2023,
    fuel: "Petrol",
    transmission: "Manual",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80",
  },
];

export function calculateEMI(principal, annualRate, months) {
  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return principal / months;
  }

  return (
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

export function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
export const purchaseData = [
  {
    id: 1,
    carId: 1,
    brand: "Toyota",
    model: "Fortuner",
    price: 4200000,
    year: 2024,
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
    purchaseType: "Loan Purchase",
    purchaseDate: "15 Aug 2026",
    status: "Active Loan",
    downPayment: 800000,
    loanAmount: 3400000,
    interestRate: 8.5,
    loanDuration: 5,
    monthlyEMI: 69832,
  },
  {
    id: 2,
    carId: 2,
    brand: "Maruti Suzuki",
    model: "Swift",
    price: 820000,
    year: 2024,
    fuel: "Petrol",
    transmission: "Manual",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",
    purchaseType: "Full Payment",
    purchaseDate: "10 Jun 2026",
    status: "Completed",
    registrationCharges: 60000,
    insurance: 32000,
    totalAmount: 912000,
  },
];

export const loanData = [
  {
    id: 1,
    carId: 1,
    brand: "Toyota",
    model: "Fortuner",
    price: 4200000,
    year: 2024,
    fuel: "Diesel",
    transmission: "Automatic",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80",
    status: "Active Loan",
    downPayment: 800000,
    loanAmount: 3400000,
    interestRate: 8.5,
    loanDuration: 5,
    monthlyEMI: 69832,
    totalEMIs: 60,
    paidEMIs: 12,
  },
];
