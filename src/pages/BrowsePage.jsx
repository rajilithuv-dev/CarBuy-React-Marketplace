import { useMemo, useState } from "react";
import { Heart, Search, SlidersHorizontal, X } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { formatINR } from "../data";

export default function BrowsePage() {
  const { cars, favorites, toggleFavorite } = useCars();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({brand:"All Brands", fuel:"All Fuels", transmission:"All Transmissions", year:"All Years"});
  const [priceMax, setPriceMax] = useState(5000000);
  const [sort, setSort] = useState("Latest First");
  const [search, setSearch] = useState(params.get("q") || "");

  const brands = ["All Brands", ...new Set(cars.map(c => c.brand))];

  const filtered = useMemo(() => {
    let data = cars.filter(c => {
      const q = search.toLowerCase();
      return (!q || `${c.brand} ${c.model}`.toLowerCase().includes(q)) &&
        (filters.brand === "All Brands" || c.brand === filters.brand) &&
        (filters.fuel === "All Fuels" || c.fuel === filters.fuel) &&
        (filters.transmission === "All Transmissions" || c.transmission === filters.transmission) &&
        (filters.year === "All Years" || String(c.year) === filters.year) &&
        c.price <= priceMax;
    });
    if (sort === "Price: Low to High") data.sort((a,b)=>a.price-b.price);
    if (sort === "Price: High to Low") data.sort((a,b)=>b.price-a.price);
    if (sort === "Latest First") data.sort((a,b)=>b.year-a.year);
    return data;
  }, [cars, search, filters, priceMax, sort]);

  const clear = () => {
    setSearch(""); setFilters({brand:"All Brands", fuel:"All Fuels", transmission:"All Transmissions", year:"All Years"}); setPriceMax(5000000);
  };

  return <div>
    <div className="page-title-row">
      <div><h1>Browse Cars</h1><p>Find the perfect car that suits your needs and budget.</p></div>
      <button className="outline-btn" onClick={clear}><X size={16}/> Clear All</button>
    </div>

    <div className="filter-toolbar">
      <div className="browse-search"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search cars..."/></div>
      <Select value={filters.brand} options={brands} onChange={v=>setFilters({...filters,brand:v})}/>
      <Select value={filters.fuel} options={["All Fuels","Petrol","Diesel"]} onChange={v=>setFilters({...filters,fuel:v})}/>
      <Select value={filters.transmission} options={["All Transmissions","Automatic","Manual"]} onChange={v=>setFilters({...filters,transmission:v})}/>
      <Select value={filters.year} options={["All Years","2025","2024"]} onChange={v=>setFilters({...filters,year:v})}/>
    </div>

    <div className="browse-layout">
      <aside className="filter-panel">
        <h3><SlidersHorizontal size={17}/> Filters</h3>
        <label>Price Range</label>
        <input type="range" min="500000" max="5000000" step="50000" value={priceMax} onChange={e=>setPriceMax(+e.target.value)}/>
        <div className="range-values"><span>₹5L</span><b>{formatINR(priceMax)}</b></div>
        <label>Brand</label>
        {brands.slice(1).map(b=><CheckBox key={b} label={b} checked={filters.brand===b} onChange={()=>setFilters({...filters,brand:filters.brand===b?"All Brands":b})}/>)}
        <label>Fuel Type</label>
        {["Petrol","Diesel"].map(f=><CheckBox key={f} label={f} checked={filters.fuel===f} onChange={()=>setFilters({...filters,fuel:filters.fuel===f?"All Fuels":f})}/>)}
      </aside>

      <section className="results">
        <div className="results-head"><span>Showing <b>{filtered.length}</b> cars</span><select value={sort} onChange={e=>setSort(e.target.value)}><option>Latest First</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div>
        <div className="car-grid">
          {filtered.map(car=><article className="car-card" key={car.id}>
            <div className="car-image"><img src={car.image} alt={car.model}/><button className={`heart-btn ${favorites.includes(car.id)?"liked":""}`} onClick={()=>toggleFavorite(car.id)}><Heart size={17} fill={favorites.includes(car.id)?"currentColor":"none"}/></button></div>
            <div className="car-info"><div className="muted">{car.brand}</div><h3>{car.model}</h3><strong className="price">{formatINR(car.price)}</strong><div className="mini-specs"><span>{car.year}</span><span>{car.fuel}</span><span>{car.transmission}</span></div><button className="details-link" onClick={()=>navigate(`/cars/${car.id}`)}>View Details →</button><button className="small-buy" onClick={()=>navigate(`/purchase/${car.id}`)}>Buy Now</button></div>
          </article>)}
        </div>
        {filtered.length===0 && <div className="empty"><Search size={36}/><h3>No cars found</h3><p>Try changing your search or filters.</p></div>}
      </section>
    </div>
  </div>;
}

function Select({value,options,onChange}) { return <select className="filter-select" value={value} onChange={e=>onChange(e.target.value)}>{options.map(x=><option key={x}>{x}</option>)}</select> }
function CheckBox({label,checked,onChange}) { return <label className="check-row"><input type="checkbox" checked={checked} onChange={onChange}/><span>{label}</span></label> }