import ProductImage from "../../../components/individualpage/imagesection";
import InfoIndividual from "../../../components/individualpage/infosection";

export default function IndividualPage() {
  return (
    <div>
      <div>
      <ProductImage />
    </div>
    <div className="mb-6">
      <InfoIndividual />
    </div>
  </div>
  );
}
