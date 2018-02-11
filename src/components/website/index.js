// index.js

import React  from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import InputBox from './../toolkit/inputBox';
import TextArea from './../toolkit/textArea';
import Button from './../toolkit/button';
import * as leadActions from '../../actions/leadActions';
import {bindActionCreators} from 'redux';
import taostr from 'toastr';
import {withRouter} from 'react-router';
//

class HomePage extends React.Component{

  constructor(props, context){
    super(props, context);

    this.state = {
      lead: {
        id:"",
        value: ""
      }
  };

  this.onClickSave = this.onClickSave.bind(this);
  this.updateLeadState = this.updateLeadState.bind(this);
}


updateLeadState(event){
    const field = event.target.name;
    let lead = this.state.lead;
    lead[field] = event.target.value;
    return this.setState({lead: lead});
  }


 onClickSave(event){
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.saveLead(this.state.lead)
      .then(() => {
        taostr.success(this.state.lead.value + ' saved');
        this.setState({saving: false});
        let newLead = Object.assign({}, this.state.lead);
        newLead.value ='';
        this.setState({lead: newLead});
      })
      .catch(error => {
        this.setState({saving: false});
        taostr.error(error);
        //throw error;
      });
  }

  leadRow(lead, index){
    return <div key={index}>{lead.value}</div>;
  }


  render(){

    return (
       <div className="container-fluid">
        <div className="row fill-screen">
          <div className="container">
            <h1>Palindrome Manager</h1>
            <InputBox name="value" type="text" placeholder="Palindrome Value" onChange={this.updateLeadState} value={this.state.lead.value} />
            <Button text={this.state.saving? "Saving..." : "Save"} disabled={this.state.saving} onClick={this.onClickSave} />        
          </div>
        </div>
        <div id="palindromeitems" className="row  fill-screen">
          <div className="container">
            <h1>Palindrome Items</h1>
            {this.props.leads.map(this.leadRow)}
          </div>
        </div>
       </div>);
  }
}

 
HomePage.propTypes = {
  leads: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  ...HomePage.propTypes
};

// state.leads (from reducer)
function mapStateToProps(state, ownProps){
  return {
    leads: state.leads
  };
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(leadActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));