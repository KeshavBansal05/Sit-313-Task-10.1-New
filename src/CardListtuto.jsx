import Card from './Card';
import './Card.css';
import staffList from './staffList';
import { Button } from 'semantic-ui-react';

function cardComponent(staff, i) {
  return (
    <Card
      key={staff.key}
      avatar={staff.avatar}
      name={staff.name}
      position={staff.position}
      rating={staff.rating}
      author={staff.author}
      Auther={staff.Auther}
    />
  );
}

function CardListArt() {
  return (
    <div className='top'>
      <h1 style={{ color: 'white' }}>Featured Articles</h1>
      <div className='row'>
        {staffList.slice(0, 3).map(cardComponent)}
      </div>
      <Button style={{ backgroundColor: '#007bff', color: 'white' }}>See all Articles</Button>
      <div className='row'>
        {staffList.slice(3, 6).map(cardComponent)}
      </div>
    </div>
  );
}

export default CardListArt;
