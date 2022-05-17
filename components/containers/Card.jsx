import Alert from "../layout/Alert";

const Card = ({ id, children, style }) => {
  return (
    <div id={id} className='card' style={style}>
      <Alert />
      {children}
    </div>
  );
};

export default Card;
