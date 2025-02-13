import React, {Component} from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import * as updateticketActions from "../../store/updateticket/actions";
export default class updateticket extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {};
    // }
    render() {
      return <div className="component-updateticket">Hello! component updateticket</div>;
    }
  }
// export default connect(
//     ({ updateticket }) => ({ ...updateticket }),
//     dispatch => bindActionCreators({ ...updateticketActions }, dispatch)
//   )( updateticket );