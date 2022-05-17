import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../actions/category";
import Card from "./containers/Card";
import Spinner from "./common/Spinner";
import Button from "./common/Button";
import QuestionsList from "./QuestionsList";
import Question from "./Question";

const CategoriesList = () => {
  const [questionsListHandler, setQuestionsListHandler] = useState(null);
  const [quizzCategory, setQuizzCategory] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  let categories = useSelector((state) => state.CategoryReducer);

  return questionsListHandler === null ? (
    <>
      {!categories.loading ? (
        quizzCategory === null ? (
          <Card>
            <div className='categories-list'>
              <div className='categories-list__title'>
                <h1>Toutes les Catégories</h1>
              </div>
              <div className='categories-list__content'>
                {categories.categories.map((category) => (
                  <Card
                    id={category.name}
                    key={category._id}
                    style={{
                      backgroundImage: `url("/images/${category.name}.jpg")`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <h3>{category.name}</h3>
                    <div className='categories-list__button'>
                      <Button
                        className='secondary'
                        text='Voir les questions'
                        onClick={(e) => {
                          setQuestionsListHandler(category.name);
                        }}
                      />
                      <Button
                        className='secondary'
                        text='Démarrer le quizz'
                        onClick={(e) => {
                          setQuizzCategory(category.name);
                        }}
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <Question questionsCategory={quizzCategory} />
        )
      ) : (
        <Spinner />
      )}
    </>
  ) : (
    <QuestionsList category={questionsListHandler} />
  );
};

export default CategoriesList;
