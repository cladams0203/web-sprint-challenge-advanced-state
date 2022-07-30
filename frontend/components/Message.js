import React from "react";
import { connect } from "react-redux";

function Message(props) {
  return <div id="message">{props.message}</div>;
}

export default connect((s) => {
  return { message: s.infoMessage };
})(Message);
