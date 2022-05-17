import { useSelector } from "react-redux";

const QuestionsTable = ({ series, isResults = true }) => {
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated
  );

  return (
    <table className='questions-table'>
      <thead>
        <tr>
          <th>Image</th>
          <th>Question</th>
          {isResults && <th>Votre réponse</th>}
          <th>Réponse</th>
          {isAuthenticated && <th>Points</th>}
        </tr>
      </thead>
      <tbody>
        {series.map((serie) => (
          <tr key={serie._id} className={serie.classRowColor}>
            <th>
              {serie.image !== "" ? (
                <img src={serie.image} alt={serie.category} />
              ) : (
                <img
                  src={`./images/${serie.category}.jpg`}
                  alt={serie.category}
                />
              )}
            </th>
            <th>{serie.question}</th>
            {isResults && (
              <th>
                <span className='italic'>{serie.input}</span>
              </th>
            )}
            <th>{serie.answer}</th>
            {isAuthenticated && <th>{serie.points}</th>}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>Image</th>
          <th>Question</th>
          {isResults && <th>Votre réponse</th>}
          <th>Réponse</th>
          {isAuthenticated && <th>Points</th>}
        </tr>
      </tfoot>
    </table>
  );
};

export default QuestionsTable;
