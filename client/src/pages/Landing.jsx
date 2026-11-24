import Announcement from "../components/Announcement";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import ProductInfo from "../components/ProductInfo";
import "./Landing.css";

function Landing() {
  return (
    <div className="lp-page">
      <Announcement />
      <Header />
      <main className="lp-product-layout">
        <Gallery />
        <ProductInfo />
      </main>
    </div>
  );
}
export default Landing;