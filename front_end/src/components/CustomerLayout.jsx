import { Activity, Bot, ClipboardList, FileUp, MapPin, Pill, Search, ShoppingBag, UserRound } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import "../pages/customer-workspace.css";

const links = [
  ["/customer/dashboard", "Overview", Activity],
  ["/customer/medicines", "Find medicine", Search],
  ["/customer/pharmacies", "Pharmacies", MapPin],
  ["/customer/cart", "Cart", ShoppingBag],
  ["/customer/orders", "My orders", ClipboardList],
  ["/customer/prescriptions", "Prescriptions", FileUp],
  ["/customer/assistant", "Assistant", Bot],
  ["/customer/profile", "Profile", UserRound],
];

function CustomerLayout({ session, onSessionChange }) {
  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <a className="workspace-brand" href="/customer/dashboard">
          <span className="workspace-brand-mark"><Pill size={19} /></span>
          <span>Medi<span>Track</span></span>
        </a>
        <p className="workspace-label">CUSTOMER</p>
        <nav aria-label="Customer navigation" className="workspace-nav">
          {links.map(([to, label, Icon]) => (
            <NavLink className={({ isActive }) => isActive ? "workspace-link active" : "workspace-link"} end={to.endsWith("dashboard")} key={to} to={to}>
              <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="workspace-user">
          <span className="workspace-avatar">{session.user.name?.slice(0, 1).toUpperCase() || "U"}</span>
          <span className="workspace-user-name">{session.user.name}</span>
          <button aria-label="Sign out" onClick={() => onSessionChange(null)} title="Sign out" type="button">↗</button>
        </div>
      </aside>
      <main className="workspace-main">
        <header className="workspace-mobile-header">
          <a className="workspace-brand" href="/customer/dashboard">
            <span className="workspace-brand-mark"><Pill size={18} /></span>
            <span>Medi<span>Track</span></span>
          </a>
          <button onClick={() => onSessionChange(null)} type="button">Sign out</button>
        </header>
        <div className="workspace-content"><Outlet /></div>
      </main>
      <nav aria-label="Customer navigation" className="workspace-mobile-nav">
        {links.map(([to, label, Icon]) => (
          <NavLink aria-label={label} className={({ isActive }) => isActive ? "mobile-workspace-link active" : "mobile-workspace-link"} end={to.endsWith("dashboard")} key={to} to={to}>
            <Icon aria-hidden="true" size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default CustomerLayout;