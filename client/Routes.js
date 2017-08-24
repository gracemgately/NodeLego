//COMPONENTS
import React, {Component} from 'react'
import {Main, Login, Signup, UserHome, Home, Linkedlist, BinarySearchTree, Queue, Stack, SingleUserDS, BSTType} from './components'

//LIBRARIES
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

//UTILS & STORE
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {

    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors*/}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/linked-list" component={Linkedlist} />
            <Route path="/binary-search-tree" component={BinarySearchTree} />
            <Route path="/queue" component={Queue} />
            <Route path="/stack" component={Stack} />
            <Route path="/bstDemo" component={BSTType} />
            {
              isLoggedIn ?
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/" component={Home} />
                  <Route exact path="/linked-list" component={Linkedlist} />
                  <Route path="/binary-search-tree" component={BinarySearchTree} />
                  <Route path="/queue" component={Queue} />
                  <Route path="/stack" component={Stack} />
                  <Route path="/my-data-structures" component={SingleUserDS}/>
                  <Route path="/bstDemo" component={BSTType} />
                </Switch> : null
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Home} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
