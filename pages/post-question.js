import PrivatePage from "../components/layout/PrivatePage";
import Card from "../components/containers/Card";
import QuestionForm from "../components/QuestionForm";
import Alert from "../components/layout/Alert";

const postQuestion = () => {
  return (
    <Card>
      <Alert />
      <QuestionForm />
    </Card>
  );
};

export default PrivatePage(postQuestion);
