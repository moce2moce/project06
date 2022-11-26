import Link from "next/link";
import React from "react";
import { BlogItemCard } from "../interfaces/MyItnerfaces";


interface Props {
  featuredBlogInfo:BlogItemCard[]
}

const FeaturedBlogs: React.FC<Props> = ({featuredBlogInfo}) => {
  return (
    <section className="sec-blog bg0 p-t-60 p-b-90">
      <div className="container">
        <div className="p-b-66">
          <h3 className="ltext-105 cl5 txt-center respon1">Our Blogs</h3>
        </div>
        <div className="row">
         {featuredBlogInfo.map(c=>(
          <Link href={`/blog/${c.id}`} key={`BlogItem${c.id}`}  >
           <div className="col-sm-6 col-md-4 p-b-40">
           <a className="blog-item">
             <div className="hov-img0">
               <img src={c.img} alt="IMG-BLOG" className="img-fluid" />
             </div>
             <div className="p-t-15">
               <div className="stext-107 flex-w p-b-14">
                 <span className="m-r-3">
                   <span className="cl4">By</span>
                   <span className="cl5">{c.author}</span>
                 </span>
                 <span>
                   <span className="cl4">on</span>
                   <span className="cl5 ml-1">{c.date}</span>
                 </span>
               </div>
               <h4 className="p-b-12">
                 <div className="mtext-101 cl2 hov-cl1 trans-04">{c.title}</div>
               </h4>
               <p className="stext-108 cl6">{c.excerpt}</p>
             </div>
           </a>
         </div>
         </Link>
         ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
