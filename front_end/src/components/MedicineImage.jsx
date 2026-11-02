import { useState } from "react";
import { Pill } from "lucide-react";

function MedicineImage({ medicine, className = "" }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = medicine.image?.storageName
    ? `/api/pharmacy/medicines/${medicine._id}/image`
    : "";

  if (!imageUrl || failed) {
    return <span aria-label={`${medicine.name} image unavailable`} className={`${className} medicine-image-fallback`} role="img"><Pill aria-hidden="true" size={27} strokeWidth={1.5} /></span>;
  }

  return <img alt={medicine.name} className={className} onError={() => setFailed(true)} src={imageUrl} />;
}

export default MedicineImage;