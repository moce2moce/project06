import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import BlogItem from "../../components/BlogItem";
import PageTitle from "../../components/PageTitle";
import { BlogItemCard } from "../../interfaces/MyItnerfaces";

interface Props {
  filteredItems: BlogItemCard[];
}
const Blog: NextPage<Props> = ({ filteredItems }) => {
  const router = useRouter();
  const [filtered, setFiltered] = useState(router.query.category_like || "");
  const [searchInputValue, setSearchInputValue] = useState(
    router.query.q || ""
  );

  useEffect(() => {
    if (
      filtered === "beauty" ||
      filtered === "fashion" ||
      filtered === "diy" ||
      filtered === "streetstyle" ||
      filtered === "lifestyle"
    ) {
      router.push({
        pathname: "/blog",
        query: {
          ...router.query,
          category_like: filtered,
        },
      });
    }
  }, [filtered]);

  useEffect(() => {
    if (searchInputValue) {
      router.push({
        pathname: "/blog",
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
        <title>Store - Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTitle title={router.pathname} />

      <section className="bg0 p-t-62 p-b-60">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-9 p-b-80">
              <div className="p-r-45 p-r-0-lg">
                {/* blog item */}
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <BlogItem
                      key={`blogItem-${item.id}`}
                      id={item.id}
                      title={item.title}
                      img={item.img}
                      date={item.date}
                      category={item.category}
                      author={item.author}
                      excerpt={item.excerpt}
                    />
                  ))
                ) : (
                  <h1>There are no results with your search</h1>
                )}
              </div>
            </div>

            <div className="col-md-4 col-lg-3 p-b-80">
              <div className="side-menu">
                <form
                  className="bor17 of-hidden pos-relative"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="stext-103 cl2 plh4 size-116 p-l-28 p-r-55"
                    type="text"
                    name="search"
                    placeholder="Search"
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                  />

                  <button className="flex-c-m size-122 ab-t-r fs-18 cl4 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search"></i>
                  </button>
                </form>

                <div className="p-t-55">
                  <h4 className="mtext-112 cl2 p-b-33">Categories</h4>

                  <ul>
                    <li className="bor18">
                      <button
                        onClick={() => setFiltered("fashion")}
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                      >
                        Fashion
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        onClick={() => setFiltered("beauty")}
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                      >
                        Beauty
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        onClick={() => setFiltered("streetstyle")}
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                      >
                        Street Style
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        onClick={() => setFiltered("lifestyle")}
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                      >
                        Life Style
                      </button>
                    </li>

                    <li className="bor18">
                      <button
                        onClick={() => setFiltered("diy")}
                        className="dis-block stext-115 cl6 hov-cl1 trans-04 p-tb-8 p-lr-4"
                      >
                        DIY & Crafts
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let res;
  let filteredItems: BlogItemCard[];

  const category_like = query.category_like;
  const q = query.q;

  res = await fetch(
    `http://localhost:5001/blogs?${
      category_like ? `category_like=${category_like}` : ""
    }&${q ? `q=${q}` : ""}`
  );
  filteredItems = await res.json();

  return {
    props: {
      filteredItems,
    },
  };
};

export default Blog;
