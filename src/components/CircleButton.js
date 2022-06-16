import React from "react";

const CircleButton = (props) => {
  const { icon, onClick, href, variant = "primary", ...others } = props;
  return (
    <a
      href={href}
      className={`btn btn-${variant} btn-circle`}
      onClick={onClick}
    >
      {icon}
    </a>
  );
};

export default CircleButton;
