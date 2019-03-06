import React from 'react';
import PropTypes from 'prop-types';

var TotalPrice = ({income, outcome}) => {
  return(
    <div className="row">
        <div className="col" style={{fontSize:'20px'}}>
          <h5 className='income'>收入: <span>{income}</span></h5>
        </div>
        <div className="col" style={{fontSize:'20px'}}>
            <h5 className='outcome'>支出: <span>{outcome}</span></h5>
        </div>
    </div>
  )
}

export default TotalPrice;
