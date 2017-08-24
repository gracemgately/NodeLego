//COMPONENTS
import React, { Component } from 'react'
import AddBSTNodeForm from './Forms/AddBSTNodeForm';
import DeleteBSTNodeForm from './Forms/DeleteBSTNodeForm';
import SaveDSForm from './Forms/SaveDSForm';
import BSTInsertionTime from './BSTInsertionTime';
import UploadCSV from './Forms/UploadCSV';
import RandomBSTForm from './Forms/RandomBSTForm';


//LIBRARIES
import { connect } from 'react-redux'

//UTILS & STORE
import { drawBSTnodes } from '../components'
import {  groupBstNodes } from '../utils'
import { cleanBSTState } from '../store';

class BinarySearchTree extends Component {

  constructor(props) {
    super(props);
    this.state = {
      array: props.array,
      BST: props.BST,
      groups: []
    }
    this.asyncCalls = this.asyncCalls.bind(this);
  }

  componentWillUnmount(){
    this.props.cleanStateValues();
  }

  componentDidMount() {
    this.asyncCalls();
    let arr = this.state.array;
    if (this.props.location.query) arr = this.props.location.query.content;
    this.asyncCalls(arr);
  }

  componentWillReceiveProps(nextProps) {
    let arr = nextProps.array;
    if (nextProps.BST !== this.state.BST) {
      if (this.props.location.query) arr = this.props.location.query.content;
      this.setState({ BST: nextProps.BST, array: arr });
      this.asyncCalls(nextProps.array);
    }
  }


  asyncCalls(arr) {
    // send arrayified bst nodes, get drawings and parentIdx values back
    const bstDivs = drawBSTnodes(arr);

    // group the bstDivs by parentIdx groups
    let groups = groupBstNodes(bstDivs);
    this.setState({ groups: groups });
  }


  render() {
    return (
        <div>
          {//only render forms to edit DS if it is not a previously-saved one
            this.props.location.query ?
              <div>
                <h2> Binary Search <br /> Tree </h2>
                <h2>Name: {this.props.location.query.name}</h2>
              </div>
              :
              <div className='main-container-controls' >
                <h2> Binary Search <br /> Tree </h2>
                <AddBSTNodeForm />
                <DeleteBSTNodeForm />
                <UploadCSV DSType={'binarysearchtree'} />
                {this.props.user.id ?
                  <div className="save-form">
                  &nbsp;&nbsp;&nbsp;Save Your Binary  <br /> &nbsp;&nbsp;&nbsp;Search Tree:
                <SaveDSForm content={this.props.array} userId={this.props.user.id} />
                  </div>
                  : null}
                <RandomBSTForm />
              </div>
          }
          <div className="container">
            {
              this.state.groups.map((ele, index) => {
                return (
                  <div className={'bstlevel' + index} key={index}>
                    {
                      ele.map((node, idx) => {
                        return (<div key={idx}>{node}</div>)
                      })
                    }
                  </div>)
              })
            }
          </div>
        {this.props.location.query ? null:
          <BSTInsertionTime />
        }
        </div>

    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    BST: state.bstNode,
    array: state.bstNode.array
  }

}

const mapDispatch = (dispatch) => {
  return {
    cleanStateValues() {
      dispatch(cleanBSTState())

    }
  }
}

export default connect(mapState, mapDispatch)(BinarySearchTree);
