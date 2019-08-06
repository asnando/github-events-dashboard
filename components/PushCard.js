import PropTypes from 'prop-types';
import cardStyles from '../styles/card';

const PushCard = (props) => {
  console.log(props);
  return (
    <div className="card">
      <style jsx>{cardStyles}</style>
      <style jsx>{`
      
      `}</style>
    </div>
  );
};

PushCard.propTypes = {

};

export default PushCard;
