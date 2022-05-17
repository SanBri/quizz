import { useState } from "react";
import Link from "next/link";

import Button from "./common/Button";
import QuestionsTable from "./common/QuestionsTable";
import Question from "./Question";
import CategoriesList from "./CategoriesList";
import Card from "./containers/Card";

const Results = ({
  questionsCategory,
  questionsNumber,
  series,
  globalPoints,
}) => {
  const [retry, toggleRetry] = useState(false);
  const [back, toggleBack] = useState(false);

  return (
    <>
      {!retry ? (
        !back ? (
          <Card>
            <div className='results'>
              <div className='buttons'>
                <Button
                  text='Rééssayez'
                  onClick={() => {
                    toggleRetry(!retry);
                  }}
                />
                <Link href='/categories'>
                  <Button
                    text='Voir les catégories'
                    onClick={() => {
                      toggleBack(!retry);
                    }}
                  />
                </Link>
              </div>
              <div className='results__title'>
                <h2>
                  Résultats : {globalPoints}/{series.length}
                </h2>
              </div>
              <div className='results__content'>
                <QuestionsTable series={series} />
                <div className='buttons'>
                  <Button
                    text='Rééssayez'
                    onClick={() => {
                      toggleRetry(!retry);
                    }}
                  />
                  <Link href='/categories'>
                    <Button
                      text='Voir les catégories'
                      onClick={() => {
                        toggleBack(!retry);
                      }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <CategoriesList />
        )
      ) : (
        <Question
          questionsNumber={questionsNumber}
          questionsCategory={questionsCategory}
        />
      )}
    </>
  );
};

export default Results;
