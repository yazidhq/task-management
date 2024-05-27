const Button = ({
  type = "button",
  color = "bg-blue-600",
  onClick = () => {},
  weight = "px-1",
  height = "py-1",
  children,
}) => {
  return (
    <button
      type={type}
      className={`${color} rounded-md ${weight} ${height} h-full text-gray-300`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
