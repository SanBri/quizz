import Head from "next/head";
import Card from "../components/containers/Card";
import LoginForm from "../components/LoginForm";
import Alert from "../components/layout/Alert";

const connexion = () => {
  return (
    <>
      <Head>
        <title>Connexion</title>
      </Head>

      <Card>
        <Alert />
        <LoginForm />
      </Card>
    </>
  );
};

export default connexion;
