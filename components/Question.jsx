import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillSound, AiOutlineSound } from "react-icons/ai";
import { getQuestion, addQuestion } from "../actions/question";

import Card from "./containers/Card";
import Button from "./common/Button";
import Input from "./Input";
import Results from "./Results";
import CategoriesList from "./CategoriesList";

const Question = ({ questionsCategory, questionsNumber = 10 }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestion(questionsCategory, questionsNumber));
  }, [dispatch]);

  let questions = useSelector((state) => state.QuestionReducer.questions);
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );
  let [currentQuestions, setCurrentQuestions] = useState([]);
  let randomRowNumber = Math.floor(Math.random() * questions.length);
  let [randomQuestion, setRandomQuestion] = useState({});
  let [noMoreQuestion, setNoMoreQuestion] = useState(false);
  let [globalPoints, setGlobalPoints] = useState(0);
  let [passedQuestion, setPassedQuestion] = useState("");
  let [series, setSeries] = useState([]);
  let [switchSound, toggleSwitchSound] = useState(true);
  let [back, toggleBack] = useState(false);
  let isGoodAnswer;
  let newRandomNumber;
  let audio;

  useEffect(() => {
    setCurrentQuestions(questions);
  }, [questions]);

  const startQuestion = () => {
    currentQuestions.length > 0
      ? setRandomQuestion(currentQuestions[randomRowNumber])
      : "";
  };

  const page = useRouter();
  const seeCategories = () => {
    router.pathname === "/categories"
      ? toggleBack(!back)
      : router.push("/categories");
  };
  const { _id, question, answer, category, points, image } = randomQuestion;
  const [input, setInput] = useState("");

  const submitAnswer = (e) => {
    e.preventDefault();
    input.toUpperCase() === answer
      ? ((audio = new Audio("./sounds/correct.mp3")),
        setGlobalPoints(globalPoints + 1),
        (isGoodAnswer = "correct"),
        points < 10 ? randomQuestion.points++ : "")
      : ((audio = new Audio("./sounds/wrong.mp3")),
        (isGoodAnswer = "wrong"),
        points > 0 ? randomQuestion.points-- : "");
    switchSound && audio.play();
    isAuthenticated &&
      dispatch(addQuestion(randomQuestion, randomQuestion._id, true));
    setPassedQuestion({
      _id: _id,
      question: question,
      input: input,
      answer: answer,
      image: image,
      category: category,
      isGoodAnswer,
      points: points,
    });
    Object.keys(passedQuestion).length !== 0
      ? setSeries((series) => [...series, passedQuestion])
      : "";
    currentQuestions.indexOf(randomQuestion) > -1
      ? currentQuestions.splice(currentQuestions.indexOf(randomQuestion), 1)
      : "",
      setCurrentQuestions(currentQuestions),
      currentQuestions.length > 0
        ? ((document.getElementById(
            `questionCard`
          ).className += ` --${isGoodAnswer}`),
          setTimeout(() => {
            document.getElementById(`questionCard`).className = "card";
          }, 500),
          (newRandomNumber = Math.floor(
            Math.random() * currentQuestions.length
          )),
          setRandomQuestion(currentQuestions[newRandomNumber]))
        : (setRandomQuestion(
            (randomQuestion) => randomQuestion,
            ((randomQuestion.input = input),
            (randomQuestion.isGoodAnswer = isGoodAnswer))
          ), // Pour pouvoir ajouter la derniere question à series
          setSeries((series) => [...series, randomQuestion]),
          setNoMoreQuestion(true));
    setInput("");
  };

  return !noMoreQuestion ? (
    !back ? (
      <Card id='questionCard'>
        <div className='question'>
          <div className='question__icon'>
            {switchSound ? (
              <AiFillSound
                size={30}
                cursor={"pointer"}
                onClick={() => {
                  toggleSwitchSound(!switchSound);
                }}
                title='Désactiver le son'
              />
            ) : (
              <AiOutlineSound
                size={30}
                cursor={"pointer"}
                onClick={() => {
                  toggleSwitchSound(!switchSound);
                }}
                title='Activer le son'
              />
            )}
          </div>
          {Object.keys(randomQuestion).length === 0 ? (
            <div className='question__title'>
              <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                {questionsCategory !== undefined
                  ? `${questionsCategory}`
                  : "Quizz Aléatoire"}
              </h1>

              <div className='buttons'>
                <Button text='Commencer' onClick={startQuestion} />
                <Button text='Voir les catégories' onClick={seeCategories} />
              </div>
            </div>
          ) : (
            <>
              <div className='question__title'>
                Question{currentQuestions.length > 1 ? "s" : ""} restante
                {currentQuestions.length > 1 ? "s" : ""} :
                <span className='bold'> {currentQuestions.length}</span>
                <br />
                Catégorie :<span className='bold'> {category}</span>
              </div>
              <div className='question__image'>
                {image !== "" ? (
                  <img src={image} alt={category} />
                ) : (
                  <img src={`./images/${category}.jpg`} alt={category} />
                )}
              </div>
              <div className='question__content'>
                <h4>{question}</h4>
              </div>

              <div className='question__input'>
                <form onSubmit={submitAnswer}>
                  <Input
                    type='text'
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  />
                  <Input type='submit' />
                </form>
              </div>
            </>
          )}
        </div>
      </Card>
    ) : (
      <CategoriesList />
    )
  ) : (
    <>
      <Results
        questionsCategory={questionsCategory}
        questionsNumber={questionsNumber}
        passedQuestion={passedQuestion}
        series={series}
        globalPoints={globalPoints}
      />
    </>
  );
};

export default Question;
