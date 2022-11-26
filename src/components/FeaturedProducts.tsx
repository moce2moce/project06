import React from "react";
import { ProductItemCard } from "../interfaces/MyItnerfaces";
import ProductItem from "./ProductItem";

interface Props {
  featuredProducInfo:ProductItemCard[]
}

const FeaturedProducts: React.FC<Props> = ({featuredProducInfo}) => {
  return (
    <section className="sec-product bg0 p-t-100 p-b-50">
      <div className="container">
        <div className="p-b-32">
          <h3 className="ltext-105 cl5 txt-center respon1">Store Overview</h3>
        </div>
        <div className="tab01">
          <div className="tab-content p-t-50">
            <div className="tab-pane fade show active" id="best-seller" role="tabpanel">
              <div className="wrap-slick2">
                <div className="d-flex">
                  {featuredProducInfo.map(c=> (
                    <ProductItem key={`ProductItemCard${c.id}`} img={c.img} price={c.price} title={c.title} id={c.id}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
