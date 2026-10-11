import { ArrowRight, BadgeCheck, CarFront, CreditCard, Heart, Search, ShieldCheck, ShoppingCart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { formatINR } from "../data";

export default function HomePage() {
  const navigate = useNavigate();
  const { cars, favorites, purchases, loans, toggleFavorite } = useCars();
  const featured = cars.slice(0, 4);

  return (
    <div >    <div>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">DRIVE YOUR DREAM</div>
          <h1>Find Your<br/><span>Perfect Car</span></h1>
          <p>Wide range of new and used cars with easy loan options.</p>
          <div className="hero-buttons">
            <button className="primary" onClick={() => navigate("/browse")}>Browse Cars <ArrowRight size={16}/></button>
            <button className="secondary" onClick={() => navigate("/calculator")}>Learn More</button>
          </div>
        </div>
        <div className="hero-image-wrap">
          <img src={cars[0].image} alt="Toyota Fortuner"/>
          <div className="hero-badge"><BadgeCheck/><b>Trusted Sellers</b><small>Verified and reliable</small></div>
        </div>
      </section>

      <section className="stat-row">
        <Stat icon={<CarFront/>} value={cars.length * 15} label="Available Cars"/>
        <Stat icon={<ShoppingCart/>} value={purchases.length} label="My Purchases"/>
        <Stat icon={<CreditCard/>} value={loans.length} label="Active Loans"/>
        <Stat icon={<Heart/>} value={favorites.length} label="Favorites"/>
      </section>

      <section className="section">
        <div className="section-head"><div><h2>Featured Cars</h2><p>Popular choices from our marketplace</p></div><button className="text-btn" onClick={() => navigate("/browse")}>View All <ArrowRight size={15}/></button></div>
        <div className="car-grid featured-grid">
          {featured.map(car => <CarCard key={car.id} car={car} onFav={() => toggleFavorite(car.id)} liked={favorites.includes(car.id)} />)}
        </div>
      </section>

      <section className="how-section">
        <div className="section-head"><div><h2>How It Works?</h2><p>Buy your dream car in just a few simple steps.</p></div></div>
        <div className="steps">
          {[
            ["1","Browse Cars","Search and filter cars"],
            ["2","Select a Car","Choose your dream car"],
            ["3","Choose Payment","Pay or apply for loan"],
            ["4","Complete Purchase","Confirm your purchase"],
            ["5","Drive Your Car","Enjoy your new car"]
          ].map(([n,t,d]) => <div className="step" key={n}><span>{n}</span><b>{t}</b><small>{d}</small></div>)}
        </div>
      </section>
    </div>
</div>
  );
}

function Stat({icon,value,label}) {
  return <div className="stat-card"><span className="stat-icon">{icon}</span><div><strong>{value}</strong><small>{label}</small></div></div>
}

export function CarCard({ car, onFav, liked }) {
  const navigate = useNavigate();
  return <article className="car-card">
    <div className="car-image">
      <img src={car.image} alt={`${car.brand} ${car.model}`}/>
      <button className={`heart-btn ${liked ? "liked":""}`} onClick={onFav}><Heart size={17} fill={liked ? "currentColor":"none"}/></button>
    </div>
    <div className="car-info">
      <div className="muted">{car.brand}</div>
      <h3>{car.model}</h3>
      <strong className="price">{formatINR(car.price)}</strong>
      <div className="mini-specs"><span>{car.year}</span><span>{car.fuel}</span><span>{car.transmission}</span><span>{car.mileage} km/l</span></div>
      <button className="details-link" onClick={() => navigate(`/cars/${car.id}`)}>View Details <ArrowRight size={13}/></button>
    </div>
  </article>
}