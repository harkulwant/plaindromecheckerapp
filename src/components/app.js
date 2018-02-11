/*
	app.jsx
*/

import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/header';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

class App extends React.Component{

  constructor(props){
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

   componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions(){
        $(function(){
            $(window).on("load resize", function(){
                $(".fill-screen").css("height", window.innerHeight);
            });
        });
    }

	render(){
		return(
			<div>
				<Header/>
        {this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
};


// state.leads (from reducer)
function mapStateToProps(state, ownProps){
  return {
    loading: state.ajaxCallsInProgress > 0
  };
}


export default withRouter(connect(mapStateToProps) (App));
