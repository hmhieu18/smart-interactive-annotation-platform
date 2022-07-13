import React from "react";


const SplitButton = (props) => {
  const {
    icon,
    onClick,
    text,
    href,
    variant = "primary",
    ...others
  } = props;
  
  return (
    <a
      onClick={onClick}
      className={`btn btn-${variant} btn-icon-split`}
      href={href}
      others
    >
      <span className={`icon text-white-50`}>
        {icon}
      </span>
      <span className="text">{text}</span>
    </a>
  );
};

export default SplitButton;
