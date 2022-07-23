import React from "react";


const IconButton = (props) => {
  const {
    icon,
    onClick,
    href,
    variant = "primary",
    ...others
  } = props;
  
  return (
    <a
      onClick={onClick}
      className={`btn btn-${variant}`}
      href={href}
      others
    >
      <span className={`icon text-white-50`}>
        {icon}
      </span>
    </a>
  );
};

export default IconButton