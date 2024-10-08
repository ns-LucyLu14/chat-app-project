import React from "react";

type ButtonProps = {
  title: string;
};

const Button = ({ title }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="rounded-md bg-secondaryBackground px-5 py-3 font-semibold text-primaryText no-underline transition hover:bg-primaryHover hover:text-secondaryText"
    >
      {title}
    </button>
  );
};

export default Button;
