import React from "react";
import PropTypes from "prop-types";
import "./NoteError.css";

export default function NoteError(props) {
  if (props.message) {
    return <div className="error">{props.message}</div>;
  }

  return <></>;
}

NoteError.propType = {
  message: PropTypes.string,
};