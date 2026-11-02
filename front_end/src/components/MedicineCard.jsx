import medicineCross from "../assets/medicine-cross.svg";

function MedicineCard({ medicine }) {
  return (
    <article className="medicine-card-item">
      <img className="medicine-symbol" src={medicineCross} alt="" />
      <div className="medicine-detail">
        <h3>{medicine.name}</h3>
        <p>{medicine.shop?.name || "Local pharmacy"}</p>
        <span>{medicine.shop?.address || "Address not provided"}</span>
      </div>
      <div className="medicine-price">
        <strong>{new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
        }).format(medicine.price)}</strong>
        <span>{medicine.stock > 0 ? "In stock" : "Check availability"}</span>
      </div>
    </article>
  );
}

export default MedicineCard;
