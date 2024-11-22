import './Card.css';

function Card(props) {
  return (
    <div className='column'>
      <img src={props.avatar} alt="staff" width='200px' height='200px' />
      <h3>{props.name}</h3>
      <p>{props.position}</p>
      <p>{props.Auther}</p>
    </div>
  );
}
export default Card;
