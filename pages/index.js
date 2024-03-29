import Head from "next/head";
import Card from "../components/containers/Card";
import Question from "../components/Question";
import QuestionForm from "../components/QuestionForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Question />
      {/* <Card>
        <QuestionForm />
      </Card> */}
    </>
  );
}
