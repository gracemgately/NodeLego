import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import { logout } from '../store'
import { RightArrow, SouthEastArrow, SouthWestArrow } from '../components'

export const drawNode = (node) => {
  console.log('node', node);
  return (
    <div className="basicnode">
    <svg>
      <circle className="circle1" id={node.activated ? "peek" : ''} cx="25" cy="25" r="25"> </circle>

      <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf " strokeWidth="2px" dy=".3em">{node.value}</text>
    </svg>
    {(node.next !== null) ? RightArrow(node.value) : null}
    </div>
  );
}

export const drawBSTNode = (node) => {
  return (
    <div className="basicnode">
    {(node.left !== null) ? SouthWestArrow(node.value) : null}
    <svg>
      <circle className="circle1" cx="25" cy="25" r="25"> </circle>

      <text x="50%" y="50%" textAnchor="middle" stroke="#51c5cf " strokeWidth="2px" dy=".3em">{node.value}</text>
    </svg>
    {(node.right !== null) ? SouthEastArrow(node.value) : null}
    </div>
  );
}

