import React from "react";

const BasicButton = (props) => {
  const { text, variant = "primary", ...others } = props;
  return (
    <a className={`btn btn-${variant}`} {...others}>
      {text}
    </a>
  );
};

export default BasicButton;
