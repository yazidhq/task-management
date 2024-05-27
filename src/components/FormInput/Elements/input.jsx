const Input = ({
  type = "text",
  placeholder,
  inputRef = null,
  name,
  valueData,
  bg = "bg-zinc-900",
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`py-2 px-3 rounded-md ${bg} ${
        type === "datetime-local" ? "w-1/3" : "w-full"
      } text-gray-300 dark:[color-scheme:dark]`}
      ref={inputRef}
      defaultValue={valueData}
    />
  );
};

export default Input;
