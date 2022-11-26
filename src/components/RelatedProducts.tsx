import React from "react";
import { ProductItemCard } from "../interfaces/MyItnerfaces";
import ProductItem from "./ProductItem";
interface Props {
  relatedProduct: ProductItemCard[];
}
const RelatedProducts: React.FC<Props> = ({relatedProduct}) => {
  
  return (
    <section className="sec-relate-product bg0 p-t-45 p-b-105">
      <div className="container">
        <div className="p-b-45">
          <h3 className="ltext-106 cl5 txt-center">Related Products</h3>
        </div>

        <div className="wrap-slick2">
          <div className="d-flex">
           {relatedProduct.map(c=> <ProductItem key={`relatedProduct-${c.id}`} id={c.id} img={c.img} price={c.price} title={c.title}   />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
