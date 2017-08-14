import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { writeNode, bstNode, addSingleBSTNode } from '../store'

const AddBSTNodeForm = (props) => {

  return (
    <div>
      <form id="form-group" onSubmit={props.handleSubmit}>
        <div>
          <input
            type="text"
            onChange={props.handleChange}
            placeholder="add a node"
            name="node"
            value={props.newNode}
          />
        </div>
        <br />
        <div className="input-group-btn">
          <button
            className="btn btn-default"
            type="submit">Add Me!
          </button>
        </div>
      </form>
    </div>
  )
}

const mapState = (state) => {
    return {
      nodes: state.node,
      newNode: state.newNode
    }
  }

const mapDispatch = (dispatch) => {
    return {
      handleChange(evt) {
        dispatch(writeNode(evt.target.value));
      },
      handleSubmit(evt) {
        evt.preventDefault();
        const nodeValue = evt.target.node.value;
        // console.log('nodeValue ', nodeValue)
        dispatch(addSingleBSTNode({ value: nodeValue }))
        dispatch(writeNode(''))

      }
    }
  }

  export default connect(mapState, mapDispatch)(AddBSTNodeForm);