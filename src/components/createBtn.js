import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';

const CreateBtn = ({onCreateItem}) => {
  return(
    <div>
      <button className='btn btn-primary btn-lg btn-block'
        onClick={onCreateItem}>
        <Ionicon
          className = "rounded-circle"
          fontSize="30px"
          icon="md-create"
          style={{padding:"5px"}}></Ionicon>
        add a new record</button>
    </div>
  )
}

export default CreateBtn;
