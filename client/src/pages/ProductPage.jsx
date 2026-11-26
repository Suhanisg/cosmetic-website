import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Announcement from "../components/Announcement";
import Header from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import Gallery from "../components/Gallery";
import ProductInfo from "../components/ProductInfo";
import SimilarProducts from "../components/SimilarProducts";
import { getProduct } from "../data/products";
import WhyYoroma from "../components/WhyYoroma";
import Reels from "../components/Reels";
import Reviews from "../components/Reviews";
import "./Landing.css";

// Gallery ke slides: har slide mein 1 ya 2 box
function makeSlides(product, shade) {
  const imgs = shade ? shade.images : product.images;
  const filter = (shade ? shade.filter : product.filter) || "none";
  const slides = imgs.slice(0, 4).map((src) => [{ src, filter }]);
  if (product.pack) {
    slides[0] = product.pack.map((p) => ({ src: p.src, filter: p.filter }));
  }
  return slides;
}

function ProductView({ product }) {
  const [shadeId, setShadeId] = useState(product.shades?.[0]?.id);
  const shade = product.shades?.find((s) => s.id === shadeId);

  return (
    <div className="lp-page">
      <Announcement />
      <Header />
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: product.category },
          { label: product.name },
        ]}
      />
      <main id="product" className="lp-product-layout">
        <Gallery
          key={shade?.id ?? product.id}
          slides={makeSlides(product, shade)}
          alt={product.name}
        />
        <ProductInfo
          product={product}
          shade={shade}
          onShadeChange={setShadeId}
        />
      </main>
      
      <SimilarProducts excludeId={product.id} />
            <WhyYoroma />
                  <Reels />
                              <Reviews productName={product.name} />
    </div>
  );
}

function ProductPage({ productId }) {
  const params = useParams();
  const product = getProduct(productId ?? params.productId);

  if (!product) {
    return (
      <div className="lp-page">
        <Announcement />
        <Header />
        <div className="lp-notfound">
          <h2>Product not found</h2>
          <Link to="/" className="bc-link">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }

  // key: product badalte hi saara state (size, qty, shade) reset
  return <ProductView key={product.id} product={product} />;
}
export default ProductPage;