import Head from "next/head";
import CategoriesList from "../components/CategoriesList";

const categories = () => {
  return (
    <>
      <Head>
        <title>Toutes les catégories</title>
      </Head>

      <CategoriesList />
    </>
  );
};

export default categories;
