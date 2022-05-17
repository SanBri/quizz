import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../actions/category";
import { addQuestion } from "../actions/question";

import Input from "./Input";

const QuestionForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  let categories = useSelector((state) => state.CategoryReducer.categories);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { question, answer, category, image } = formData;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addQuestion(formData));
    setTimeout(() => {
      setFormData({ question: "", answer: "", category: "", image: "" });
      console.log("Question ajoutée !");
    }, 500);
  };

  return (
    <div className='question-form'>
      <div className='question-form__title'>
        <h1>Ajouter une Question</h1>
      </div>
      <div className='question-form__content'>
        <form id='questionForm' onSubmit={onSubmit}>
          <Input
            type='text'
            name='question'
            value={question}
            label='Intitulé de la question : '
            onChange={(e) => onChange(e)}
          />
          <Input
            type='text'
            name='answer'
            value={answer}
            label='Réponse à la question :'
            onChange={(e) => onChange(e)}
          />
          <Input
            type='text'
            name='category'
            label='Catégorie de la question :'
            value={category}
            list='categories'
            id='categoriesInput'
            onChange={(e) => onChange(e)}
          />
          <datalist id='categories'>
            {categories.map((category) => (
              <option key={category._id} value={category.name} />
            ))}
          </datalist>
          <Input
            type='text'
            name='image'
            label="URL de l'llustration :"
            value={image}
            onChange={(e) => onChange(e)}
            required={false}
          />
          <Input type='submit' />
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
