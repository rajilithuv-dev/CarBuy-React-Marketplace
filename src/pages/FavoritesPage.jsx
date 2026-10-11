import { Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { formatINR } from "../data";

export default function FavoritesPage(){
  const {cars,favorites,toggleFavorite,clearFavorites}=useCars(); const navigate=useNavigate();
  const list=cars.filter(c=>favorites.includes(c.id));
  return <div>
    <div className="page-title-row"><div><h1>My Favorites</h1><p>Here are the cars you have added to your favorites.</p></div>{list.length>0&&<button className="outline-btn" onClick={clearFavorites}><Trash2 size={16}/> Clear All</button>}</div>
    {list.length===0?<div className="empty"><Heart size={42}/><h2>No favorite cars</h2><p>Tap the heart icon on any car to save it here.</p><button className="primary" onClick={()=>navigate("/browse")}>Browse Cars</button></div>:<div className="favorite-grid">{list.map(c=><div className="fav-card" key={c.id}><div className="fav-image"><img src={c.image}/><button onClick={()=>toggleFavorite(c.id)}><Heart fill="currentColor"/></button></div><h2>{c.brand} {c.model}</h2><strong>{formatINR(c.price)}</strong><div className="mini-specs"><span>{c.year}</span><span>{c.fuel}</span><span>{c.transmission}</span></div><div className="fav-actions"><button className="secondary" onClick={()=>navigate(`/cars/${c.id}`)}>View Details</button><button className="primary" onClick={()=>navigate(`/purchase/${c.id}`)}>Buy Now</button></div></div>)}</div>}
  </div>
}