import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { cars } from "../data";

const CarContext = createContext(null);
const demoPurchases = [
  {
    id: 1,
    carId: 1,
    purchaseDate: "15 Aug 2026",
    purchaseType: "Loan Purchase",
    downPayment: 800000,
    loanAmount: 3400000,
    interestRate: 8.5,
    loanDuration: 5,
    monthlyEMI: 69832,
    status: "Active Loan",
  },
  {
    id: 2,
    carId: 2,
    purchaseDate: "10 Jun 2026",
    purchaseType: "Full Payment",
    registrationCharges: 60000,
    insurance: 32000,
    totalAmount: 912000,
    status: "Completed",
  },
];

const demoLoans = [
  {
    id: 1,
    carId: 1,
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

const initialState = {
  favorites: JSON.parse(
    localStorage.getItem("carbuy_favorites") || "[]"
  ),
  purchases: JSON.parse(
  localStorage.getItem("carbuy_purchases") || "null"
) ?? [
  {
    id: 1,
    carId: 1,
    purchaseDate: "15 Aug 2026",
    purchaseType: "Loan Purchase",
    downPayment: 800000,
    loanAmount: 3400000,
    interestRate: 8.5,
    loanDuration: 5,
    monthlyEMI: 69832,
    status: "Active Loan",
  },
  {
    id: 2,
    carId: 2,
    purchaseDate: "10 Jun 2026",
    purchaseType: "Full Payment",
    registrationCharges: 60000,
    insurance: 32000,
    totalAmount: 912000,
    status: "Completed",
  },
],

loans: JSON.parse(
  localStorage.getItem("carbuy_loans") || "null"
) ?? [
  {
    id: 1,
    carId: 1,
    status: "Active Loan",
    downPayment: 800000,
    loanAmount: 3400000,
    interestRate: 8.5,
    loanDuration: 5,
    monthlyEMI: 69832,
    totalEMIs: 60,
    paidEMIs: 12,
  },
],
  recentlyViewed: JSON.parse(
    localStorage.getItem("carbuy_recent") || "[]"
  ),
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.includes(action.id)
          ? state.favorites.filter(id => id !== action.id)
          : [...state.favorites, action.id]
      };
    case "CLEAR_FAVORITES":
      return { ...state, favorites: [] };
    case "ADD_RECENT":
      return {
        ...state,
        recentlyViewed: [action.id, ...state.recentlyViewed.filter(id => id !== action.id)].slice(0, 6)
      };
    case "ADD_PURCHASE":
      return { ...state, purchases: [action.purchase, ...state.purchases] };
    case "ADD_LOAN":
      return { ...state, loans: [action.loan, ...state.loans] };
    default:
      return state;
  }
}

export function CarProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => localStorage.setItem("carbuy_favorites", JSON.stringify(state.favorites)), [state.favorites]);
  useEffect(() => localStorage.setItem("carbuy_purchases", JSON.stringify(state.purchases)), [state.purchases]);
  useEffect(() => localStorage.setItem("carbuy_loans", JSON.stringify(state.loans)), [state.loans]);
  useEffect(() => localStorage.setItem("carbuy_recent", JSON.stringify(state.recentlyViewed)), [state.recentlyViewed]);

  const value = useMemo(() => ({
    ...state,
    cars,
    toggleFavorite: id => dispatch({ type: "TOGGLE_FAVORITE", id }),
    clearFavorites: () => dispatch({ type: "CLEAR_FAVORITES" }),
    addRecent: id => dispatch({ type: "ADD_RECENT", id }),
    addPurchase: purchase => dispatch({ type: "ADD_PURCHASE", purchase }),
    addLoan: loan => dispatch({ type: "ADD_LOAN", loan }),
    getCar: id => cars.find(c => String(c.id)=== String(id)),
  }), [state]);

  return <CarContext.Provider value={value}>{children}</CarContext.Provider>;
}

export const useCars = () => useContext(CarContext);
