import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Banner from "../components/Banner";
import CategoryPicker from "../components/CategoryPicker";
import FeaturedBlogs from "../components/FeaturedBlogs";
import FeaturedProducts from "../components/FeaturedProducts";
import { BlogItemCard, ProductItemCard } from "../interfaces/MyItnerfaces";

interface Props {
  bannerInfo: {
    title: string;
    preTitle: string;
  };
  featuredProducInfo: ProductItemCard[];
  featuredBlogInfo: BlogItemCard[];
}

const Home: NextPage<Props> = ({
  bannerInfo,
  featuredProducInfo,
  featuredBlogInfo,
}) => {
  return (
    <>
      <Head>
        <title>Store</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner title={bannerInfo.title} preTitle={bannerInfo.preTitle} />
      <CategoryPicker />
      <FeaturedProducts featuredProducInfo={featuredProducInfo} />
      <FeaturedBlogs featuredBlogInfo={featuredBlogInfo} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch("http://localhost:5001/banner_content");
  const bannerInfo = await response.json();

  const resFeatureProduct = await fetch(
    "http://localhost:5001/products/?_limit=4"
  );
  const featuredProducInfo = await resFeatureProduct.json();

  const resFeaturedBlog = await fetch(" http://localhost:5001/blogs/?_limit=3");
  const featuredBlogInfo = await resFeaturedBlog.json();

  return {
    props: {
      bannerInfo,
      featuredProducInfo,
      featuredBlogInfo,
    },
  };
};

export default Home;
