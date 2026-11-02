import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection.jsx";
import MedicineCard from "../components/MedicineCard.jsx";
import SiteHeader from "../components/SiteHeader.jsx";
import "../App.css";

const categories = ["All medicines", "Pain relief", "Vitamins", "First aid"];

function HomePage() {
  const [query, setQuery] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (query.trim()) params.set("search", query.trim());
        const response = await fetch(`/api/pharmacy/medicines?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Could not load medicines.");
        const data = await response.json();
        setMedicines(data.medicines);
      } catch (requestError) {
        if (requestError.name !== "AbortError") setError(requestError.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  return (
    <main className="page-shell">
      <SiteHeader />
      <HeroSection onSearchChange={setQuery} query={query} />

      <section className="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <div>
            <p className="section-kicker">LOCAL PHARMACIES</p>
            <h2 id="catalog-title">Find what you need</h2>
          </div>
          <span className="result-count">
            {loading ? "Searching..." : `${medicines.length} ${medicines.length === 1 ? "result" : "results"}`}
          </span>
        </div>

        <div className="category-list" aria-label="Medicine categories">
          {categories.map((category, index) => (
            <button
              className={index === 0 ? "category-chip selected" : "category-chip"}
              key={category}
              onClick={() => index === 0 && setQuery("")}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {error ? (
          <div className="empty-state" role="alert">
            <span className="empty-icon">!</span>
            <h3>We couldn’t reach the pharmacy list</h3>
            <p>{error} Please try again in a moment.</p>
          </div>
        ) : loading ? (
          <div className="loading-state" aria-live="polite">Finding available medicines…</div>
        ) : medicines.length ? (
          <div className="medicine-grid">
            {medicines.map((medicine) => (
              <MedicineCard key={medicine._id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-icon">⌕</span>
            <h3>{query ? "No matching medicines yet" : "Your local listings will appear here"}</h3>
            <p>
              {query
                ? "Try another name, or check back as pharmacies update their stock."
                : "Search by medicine name to see availability from nearby pharmacies."}
            </p>
          </div>
        )}
      </section>

      <footer id="how-it-works">
        <span className="footer-brand">MediTrack</span>
        <span>Helping you find care, one search at a time.</span>
      </footer>
    </main>
  );
}

export default HomePage;
