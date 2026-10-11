import { useState } from "react";
import { Routes, Route, useNavigate, NavLink, useLocation } from "react-router-dom";
import {
  Bell, CarFront, Heart, Home, Landmark, Menu, Search, ShoppingBag,
  SlidersHorizontal, WalletCards, X
} from "lucide-react";
import { useCars } from "./context/CarContext";
import HomePage from "./pages/HomePage";
import BrowsePage from "./pages/BrowsePage";
import CarDetailsPage from "./pages/CarDetailsPage";
import PurchasePage from "./pages/PurchasePage";
import PurchasesPage from "./pages/PurchasesPage";
import LoansPage from "./pages/LoansPage";
import FavoritesPage from "./pages/FavoritesPage";
import CalculatorPage from "./pages/CalculatorPage";

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, purchases, loans } = useCars();

  const submitSearch = e => {
    e.preventDefault();
    navigate(`/browse?q=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  };

  const nav = [
    ["/", "Home", Home],
    ["/browse", "Browse Cars", CarFront],
    ["/purchases", "My Purchases", ShoppingBag],
    ["/loans", "My Loans", WalletCards],
    ["/favorites", "Favorites", Heart],
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" onClick={() => navigate("/")}>Car<span>Buy</span></div>
        <form className="global-search" onSubmit={submitSearch}>
          <Search size={18} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search cars by brand, model, or keyword..." />
        </form>
        <div className="top-actions">
          <button className="icon-btn"><Bell size={19}/><span className="dot"/></button>
          <button className="profile" onClick={() => navigate("/")}>
            <span className="avatar">R</span>
            <span className="profile-name">Raji</span>
            <span>⌄</span>
          </button>
          <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X/> : <Menu/>}
          </button>
        </div>
      </header>

      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="sidebar-nav">
          {nav.map(([to, label, Icon]) => (
            <NavLink key={to} to={to} end={to === "/"} onClick={() => setMobileOpen(false)}
              className={({isActive}) => `nav-item ${isActive ? "active" : ""}`}>
              <Icon size={19}/>
              <span>{label}</span>
              {label === "Favorites" && favorites.length > 0 && <b className="nav-count">{favorites.length}</b>}
              {label === "My Purchases" && purchases.length > 0 && <b className="nav-count">{purchases.length}</b>}
              {label === "My Loans" && loans.length > 0 && <b className="nav-count">{loans.length}</b>}
            </NavLink>
          ))}
        </div>
        <div className="sidebar-bottom">
          <button onClick={() => navigate("/calculator")}><Landmark size={18}/> Car Loan Calculator</button>
        </div>
      </aside>

      <main className="main-content" style={{ display: 'block', minHeight: '500px', background: 'white' ,color:'black'}}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/browse" element={<BrowsePage/>}/>
          <Route path="/cars/:id" element={<CarDetailsPage/>}/>
          <Route path="/purchase/:id" element={<PurchasePage/>}/>
          <Route path="/purchases" element={<PurchasesPage/>}/>
          <Route path="/loans" element={<LoansPage/>}/>
          <Route path="/favorites" element={<FavoritesPage/>}/>
          <Route path="/calculator" element={<CalculatorPage/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default Layout;