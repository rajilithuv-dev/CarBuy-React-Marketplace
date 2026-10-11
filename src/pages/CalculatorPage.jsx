import { useMemo, useState } from "react";
import { CalendarDays, CircleDollarSign, Percent, WalletCards } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { calculateEMI, formatINR } from "../data";

export default function CalculatorPage(){
  const {cars}=useCars(); const [params]=useSearchParams();
  const initialCar=cars.find(c=>c.id===Number(params.get("car")))||cars[0];
  const [carPrice,setCarPrice]=useState(initialCar.price); const [down,setDown]=useState(800000); const [rate,setRate]=useState(8.5); const [years,setYears]=useState(5);
  const principal=Math.max(0,carPrice-down); const calc=useMemo(()=>calculateEMI(principal,rate,years),[principal,rate,years]);
  const monthlyRate=rate/12/100;
  const rows=Array.from({length:Math.min(years*12,6)},(_,i)=>{const interest=principal*monthlyRate; const principalPart=Math.max(0,calc.emi-interest); return {month:i+1,emi:calc.emi,principal:principalPart,interest};});
  return <div>
    <div className="page-title-row"><div><h1>Car Loan Calculator</h1><p>Configure your loan details and see the estimated EMI, interest and tenure.</p></div></div>
    <div className="calc-car"><img src={initialCar.image}/><div><h2>{initialCar.brand} {initialCar.model}</h2><strong>{formatINR(carPrice)}</strong><div className="mini-specs"><span>{initialCar.year}</span><span>{initialCar.fuel}</span><span>{initialCar.transmission}</span></div></div></div>
    <div className="calculator-layout">
      <section className="calc-inputs">
        <h2>1. Enter Loan Details</h2>
        <Field label="Car Price"><input type="number" value={carPrice} onChange={e=>setCarPrice(+e.target.value)}/></Field>
        <Field label={`Down Payment — ${formatINR(down)}`}><input type="range" min="0" max={carPrice} step="10000" value={down} onChange={e=>setDown(+e.target.value)}/></Field>
        <Field label="Loan Amount"><input value={formatINR(principal)} readOnly/></Field>
        <Field label="Interest Rate (per year)"><input type="number" step="0.1" value={rate} onChange={e=>setRate(+e.target.value)}/></Field>
        <Field label="Loan Duration"><select value={years} onChange={e=>setYears(+e.target.value)}>{[1,2,3,4,5,6,7].map(y=><option key={y} value={y}>{y} Years</option>)}</select></Field>
      </section>
      <section className="calc-results">
        <h2>2. Calculation Results</h2>
        <div className="result-hero"><span><WalletCards/></span><small>Monthly EMI</small><strong>{formatINR(calc.emi)}</strong><p>You need to pay this amount every month.</p></div>
        <div className="result-grid"><Result icon={<Percent/>} label="Total Interest" value={formatINR(calc.interest)}/><Result icon={<CircleDollarSign/>} label="Total Amount Payable" value={formatINR(calc.total)}/><Result icon={<CalendarDays/>} label="Loan Duration" value={`${years} Years (${years*12} Months)`}/><Result icon={<Percent/>} label="Interest Percentage" value={`${calc.total ? ((calc.interest/calc.total)*100).toFixed(2):0}%`}/></div>
        <div className="donut-large"><div className="donut"><div><b>{formatINR(calc.total)}</b><small>Total Payable</small></div></div><div><p><span className="legend blue"/>Principal {formatINR(principal)}</p><p><span className="legend purple"/>Total Interest {formatINR(calc.interest)}</p></div></div>
      </section>
    </div>
    <section className="schedule"><h2>3. EMI Payment Schedule (First 6 Months)</h2><table><thead><tr><th>Month</th><th>EMI Amount</th><th>Principal</th><th>Interest</th><th>Remaining Loan</th></tr></thead><tbody>{rows.map(r=><tr key={r.month}><td>{r.month}</td><td>{formatINR(r.emi)}</td><td>{formatINR(r.principal)}</td><td>{formatINR(r.interest)}</td><td>{formatINR(Math.max(0,principal-r.principal*r.month))}</td></tr>)}</tbody></table></section>
  </div>
}
function Field({label,children}){return <label className="field"><span>{label}</span>{children}</label>}
function Result({icon,label,value}){return <div className="result-card"><span>{icon}</span><small>{label}</small><b>{value}</b></div>}