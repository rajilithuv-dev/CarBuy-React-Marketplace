import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Heart, ShieldCheck, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { formatINR } from "../data";

export default function CarDetailsPage() {
  const { id } = useParams();
  const { getCar, favorites, toggleFavorite, addRecent } = useCars();
  const navigate = useNavigate();
  const car = getCar(id);
  const [active, setActive] = useState(0);

  useEffect(()=>{ if(car) addRecent(car.id); }, [car?.id]);

  if (!car) return <div className="empty"><h2>Car not found</h2><button className="primary" onClick={()=>navigate("/browse")}>Browse Cars</button></div>;

  const gallery = [car.image, ...[1,2,3].map(i=>car.image + `&v=${i}`)];

  return <div>
    <button className="back-btn" onClick={()=>navigate(-1)}><ArrowLeft size={17}/> Browse Cars / {car.brand} / {car.model}</button>
    <div className="detail-header"><div><h1>{car.brand} {car.model}</h1><div className="rating"><Star fill="currentColor" size={16}/> 4.8 (320 reviews) <span>•</span> {car.type}</div></div><button className={`favorite-pill ${favorites.includes(car.id)?"liked":""}`} onClick={()=>toggleFavorite(car.id)}><Heart size={17} fill={favorites.includes(car.id)?"currentColor":"none"}/> {favorites.includes(car.id)?"Saved":"Add to Favorites"}</button></div>

    <div className="details-main">
      <section>
        <div className="gallery"><img src={gallery[active]} alt={car.model}/><button className="gallery-arrow left" onClick={()=>setActive((active+gallery.length-1)%gallery.length)}>‹</button><button className="gallery-arrow right" onClick={()=>setActive((active+1)%gallery.length)}>›</button><span className="gallery-count">{active+1}/{gallery.length}</span></div>
        <div className="thumbs">{gallery.map((g,i)=><button className={i===active?"selected":""} key={g} onClick={()=>setActive(i)}><img src={g} alt=""/></button>)}</div>
      </section>

      <aside className="price-card">
        <div className="available">Available</div>
        <h2>{formatINR(car.price)}</h2><p>Ex-showroom price</p>
        <div className="spec-grid">
          <Spec t="Year" v={car.year}/><Spec t="Fuel Type" v={car.fuel}/><Spec t="Transmission" v={car.transmission}/><Spec t="Mileage" v={`${car.mileage} km/l`}/><Spec t="Seats" v={car.seats}/><Spec t="Engine" v={car.engine}/>
        </div>
        <button className="primary full" onClick={()=>navigate(`/purchase/${car.id}`)}>Buy Now →</button>
        <button className="secondary full" onClick={()=>navigate(`/calculator?car=${car.id}`)}>Check Loan Options</button>
      </aside>
    </div>

    <section className="about-grid">
      <div><h2>About This Car</h2><p>{car.description}</p><div className="feature-highlights"><span><CarIcon/> Premium {car.type}</span><span><ShieldCheck/> Advanced Safety</span><span><CheckCircle2/> Verified Seller</span></div></div>
      <div><h2>Key Specifications</h2><div className="spec-list"><Spec t="Engine" v={car.engine}/><Spec t="Fuel Type" v={car.fuel}/><Spec t="Transmission" v={car.transmission}/><Spec t="Mileage" v={`${car.mileage} km/l`}/><Spec t="Seating Capacity" v={car.seats}/><Spec t="Body Type" v={car.type}/></div></div>
    </section>

    <section className="section"><div className="section-head"><div><h2>Features</h2></div></div><div className="feature-grid">{(car.features || []).map((f,index)=>(<div className="feature-item" key={`${f}-${index}`}><CheckCircle2 size={17}/>{f}</div>))}</div></section>
  </div>;
}
function Spec({t,v}) { return <div className="spec"><small>{t}</small><b>{v}</b></div> }
function CarIcon(){ return <CarIconBase/> }
function CarIconBase(){ return <span className="simple-icon">🚙</span> }