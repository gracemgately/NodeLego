import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { deleteNodeFromHead, deleteNodeFromTail, deleteAtIndex, writeDeleteIndex } from '../../store'

const DeleteNodeForm = (props) => {

  return (
    <div>
      <form id="form-group">
        <div className="input-group-btn">
          <button type="click" name="head" onClick={(evt) => props.handleHeadDelete(evt)} >Delete Node from Head</button>
          <br/>
          <button type="click" name="tail" onClick={(evt) => props.handleTailDelete(evt)} > Delete Node from Tail</button>
        </div>
        <div>
          <input
            type="text"
            onChange={props.handleIdxChange}
            placeholder="specify index.."
            name="delete-index"
          />
        </div>
        <div>
          <button type="click" onClick={(evt) => props.handleIndexSubmit(evt, props.index)} > Delete at specific index</button>
        </div>
      </form>
    </div>
  )
}

const mapState = (state) => {
    return {
      nodes: state.node,
      index: state.writeNode.index
    }
  }

const mapDispatch = (dispatch) => {
  return {
    handleHeadDelete(evt) {
      evt.preventDefault();
      dispatch(deleteNodeFromHead())
    },
    handleTailDelete(evt){
      evt.preventDefault();
      dispatch(deleteNodeFromTail())
    },
    handleIdxChange(evt) {
      dispatch(writeDeleteIndex(Number(evt.target.value)));
    },
    handleIndexSubmit(evt, index){
      evt.preventDefault();
      dispatch(deleteAtIndex({ index: +index }))
    }
  }
}

  export default connect(mapState, mapDispatch)(DeleteNodeForm);
