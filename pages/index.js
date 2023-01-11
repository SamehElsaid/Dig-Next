import Offer from "../components/Offer/Offer";
import Services from "../components/Services/Services";
import { apiPage } from "../api";
import SectionProducts from "../components/SectionProducts/SectionProducts";
import Head from "next/head";
export default function Home({ posts, data }) {
  return (
    <>
      <Head>
        <title>Dig | Home</title>
      </Head>
      <Offer />
      <Services />
      <div className="flex flex-col gap-5 py-5">
        {posts ? (
          posts.length > 0 &&
          posts.map((cateogry) => (
            <SectionProducts
              allData={data}
              key={cateogry.id}
              cateogry={cateogry.cateogr}
            />
          ))
        ) : (
          <div className="bg-white min-h-[30vh] flex items-center justify-center">
            <div className="container text-center text-4xl ">No Data Found</div>
          </div>
        )}
      </div>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const res = await fetch(`${apiPage}sameh`);
    const posts = await res.json();
    const resData = await fetch(`${apiPage}allProducts`);
    const data = await resData.json();
    return {
      props: {
        posts,
        data,
      },
    };
  } catch {
    return {
      props: {
        posts: null,
        data: null,
      },
    };
  }
}
