import '../App.css';
import Footer from '../Footer';
import CardList from '../CardListtuto';
import Header from '../Header';
import Bottom from '../Bottom';
import CardListArt from '../CardList';
import staffList2 from '../staffList2';

function Home() {
  return (
    <div>
      <Header/>
      <div className='content'>
        <CardList/>
        <CardListArt/>
        <staffList2/>
      </div>
      <Bottom/>
      <Footer/>
    </div>
  );
}
export default Home;
