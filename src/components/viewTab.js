import React from 'react';
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
import {LIST_VIEW, GRAPH_VIEW} from '../utility';


const generateLinkClass = (current, view) => {
  return (current===view)?  'nav-link active':'nav-link'
}

var ViewTab = ({activeTab, onTabChange})=> {
  return(
      <ul className='nav nav-tabs nav-fill'>
        <li className='nav-item'>
          <a
            className={generateLinkClass(activeTab,LIST_VIEW)}
            href='#'
            onClick={e=>{e.preventDefault(); onTabChange(LIST_VIEW)}}
          >
            <Ionicon className = "rounded-circle"
              icon="ios-paper"
              fontSize="30px"
              color={"#007bbf"}>
            </Ionicon>list
          </a>
        </li>
        <li className='nav-item'>
          <a
            className={generateLinkClass(activeTab,GRAPH_VIEW)}
            href='#'
            onClick={e=>{e.preventDefault(); onTabChange(GRAPH_VIEW)}}
          >
            <Ionicon className = "rounded-circle"
              icon="ios-pie"
              fontSize="30px"
              color={"#007bbf"}>
            </Ionicon>graph
          </a>
        </li>
      </ul>
  )
}

ViewTab.propTypes = {
  activeTab:PropTypes.string.isRequired,
  onTabChange:PropTypes.func.isRequired
}

export default ViewTab;
