import React from 'react'
import { connect } from 'react-redux'
import { writeNode, addNodeToTail, deleteNodeFromHead, toggleColor, highlightNodeAtIndex } from '../../store'

const QueueForm = (props) => {

  console.log('toggled prop', props.toggled)
  return (
    <div>
      <form id="form-group"  >
        <div>
          <input
            type="text"
            onChange={props.handleChange}
            placeholder="add an item to queue"
            name="node"
            value={props.newNode}
          />
        <br />
          <button className="buttonstyle" type="click" name="head" onClick={(evt) => props.handleTailSubmit(evt, props.newNode)} >Enqueue</button>
          <button className="buttonstyle" type="click" name="tail" onClick={(evt) => props.handleHeadDelete(evt, props.newNode)} > Dequeue</button>
          <button className="buttonstyle" type="click" onClick={(evt) => props.handlePeek(evt, !props.toggled) } > PEEK </button>
        </div>
      </form>
    </div>
  )
}


//newNode is mounted off writeNode in the reducer
const mapState = (state) => {
  return {
    nodes: state.node,
    newNode: state.writeNode.newNode,
    index: state.writeNode.index,
    toggled: state.node.toggledStatus
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleChange(evt) {
      dispatch(writeNode(Number(evt.target.value)));
    },
    handleTailSubmit(evt, nodeValue){
      evt.preventDefault();
      dispatch(addNodeToTail({ value: +nodeValue }))
      dispatch(writeNode(''))
    },
    handleHeadDelete(evt) {
      evt.preventDefault();
      dispatch(deleteNodeFromHead())
    },
    handlePeek(evt, flip){
      console.log('flip', flip)
      evt.preventDefault();
      dispatch(toggleColor(flip));
      dispatch(highlightNodeAtIndex(0))

  }
  }
}

export default connect(mapState, mapDispatch)(QueueForm);
