import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestion } from "../actions/question";
import Button from "./common/Button";
import QuestionsTable from "./common/QuestionsTable";
import Spinner from "./common/Spinner";
import CategoriesList from "./CategoriesList";
import Card from "./containers/Card";

const QuestionsList = ({ category }) => {
  const dispatch = useDispatch();

  const [questionsListHandler, setQuestionsListHandler] = useState(category);

  useEffect(() => {
    dispatch(getQuestion(category));
  }, [dispatch]);

  setTimeout(() => {
    setLoading(false);
  }, 150);
  let data = null;
  const [loading, setLoading] = useState(true);

  data = useSelector((state) => state.QuestionReducer);

  return questionsListHandler !== null ? (
    <Card>
      {!loading ? (
        <div className='questions-list'>
          <Button
            text='Retour'
            onClick={() => {
              setQuestionsListHandler(null);
            }}
          />
          <div className='questions-list__title'>
            <h1>{category}</h1>
          </div>
          <div className='questions-list__content'>
            {!data.loading ? (
              <QuestionsTable series={data.questions} isResults={false} />
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Card>
  ) : (
    <CategoriesList />
  );
};

export default QuestionsList;
