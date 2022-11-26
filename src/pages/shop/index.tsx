import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProductItemCard } from "../../interfaces/MyItnerfaces";

interface Props {
  filteredProduct: ProductItemCard[];
}

const Shop: NextPage<Props> = ({ filteredProduct }) => {
  const router = useRouter();
  const [filterValue, setFilterValue] = useState(
    router.query.gender_like || ""
  );
  const [searchInputValue, setSearchInputValue] = useState(
    router.query.q || ""
  );

  useEffect(() => {
    if (filterValue === "") {
      const localQuery = router.query;
      delete localQuery.q;
      delete localQuery.gender_like;
      setSearchInputValue("");
      router.push({
        query: localQuery,
      });
    }

    if (filterValue === "man" || filterValue === "women") {
      router.push({
        pathname: "/shop",
        query: {
          ...router.query,
          gender_like: filterValue,
        },
      });
    }
  }, [filterValue]);

  useEffect(() => {
    if (searchInputValue) {
      router.push({
        pathname: "/shop",
        query: {
          ...router.query,
          q: searchInputValue,
        },
      });
    } else if (searchInputValue === "") {
      const localQuery = router.query;
      delete localQuery.q;
      router.push({
        query: localQuery,
      });
    }
  }, [searchInputValue]);

  return (
    <>
      <Head>
        <title>Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg0 m-t-23 p-b-140">
        <div className="container">
          <div className="flex-w flex-sb-m p-b-52">
            <div className="flex-w flex-l-m filter-tope-group m-tb-10">
              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  router.query.gender_like !== "man" &&
                  router.query.gender_like !== "women"
                    ? "how-active1"
                    : undefined
                }`}
                data-filter="*"
                onClick={() => setFilterValue("")}
              >
                All Products
              </button>

              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  router.query.gender_like === "women" ? "how-active1" : ""
                }`}
                data-filter=".women"
                onClick={() => setFilterValue("women")}
              >
                Women
              </button>

              <button
                className={`stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 ${
                  router.query.gender_like === "man" ? "how-active1" : ""
                }`}
                data-filter=".men"
                onClick={() => setFilterValue("man")}
              >
                Men
              </button>

              {/* <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".bag"
                onClick={() => setFilterValue("belt")}
              >
                Belt
              </button>

              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".shoes"
                onClick={() => setFilterValue("shoes")}
              >
                Shoes
              </button>

              <button
                className="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5"
                data-filter=".watches"
                onClick={(e) => setFilterValue("watches")}
              >
                Watches
              </button> */}
            </div>

            <div className="flex-w flex-c-m m-tb-10">
              <div className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search show-search">
                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
                Search
              </div>
            </div>

            {/* search */}
            <div className="panel-search w-full p-t-10 p-b-15">
              <div className="bor8 dis-flex p-l-15">
                <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                  <i className="zmdi zmdi-search"></i>
                </button>

                <input
                  className="mtext-107 cl2 size-114 plh2 p-r-15"
                  type="text"
                  name="search-product"
                  placeholder="Search"
                  value={searchInputValue}
                  onChange={(e) => setSearchInputValue(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row isotope-grid">
            {filteredProduct.length > 0 ? (
              filteredProduct.map((c) => (
                <div
                  key={`filteredProductId-${c.id}`}
                  className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women"
                >
                  <div className="block2">
                    <div className="block2-pic hov-img0">
                      <img src={c.img} alt="IMG-PRODUCT" />
                      <Link href={`/shop/${c.id}`}>
                        <a
                          href="#"
                          className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                        >
                          View Details
                        </a>
                      </Link>
                    </div>

                    <div className="block2-txt flex-w flex-t p-t-14">
                      <div className="block2-txt-child1 flex-col-l ">
                        <a
                          href="product-detail.html"
                          className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                        >
                          {c.title}
                        </a>
                        <span className="stext-105 cl3">{c.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>There are no results</p>
            )}
          </div>

          <div className="flex-l-m flex-w w-full p-t-10 m-lr--7">
            <a
              className={`flex-c-m how-pagination1 trans-04 m-all-7 active-pagination1 `}
            >
              1
            </a>
            <a className={`flex-c-m how-pagination1 trans-04 m-all-7`}>2</a>
            <a className={`flex-c-m how-pagination1 trans-04 m-all-7  `}>3</a>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res;
  let filteredProduct: ProductItemCard[];

  const gender = query.gender_like;
  const item = query.q;

  if (gender && item) {
    res = await fetch(
      `http://localhost:5001/products?gender_like=${gender}&q=${item}`
    );
  } else if (gender) {
    res = await fetch(`http://localhost:5001/products?gender_like=${gender}`);
  } else if (item) {
    res = await fetch(`http://localhost:5001/products?q=${item}`);
  } else {
    res = await fetch(`http://localhost:5001/products`);
  }
  filteredProduct = await res.json();

  return {
    props: {
      filteredProduct,
    },
  };
};

export default Shop;