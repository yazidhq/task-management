const Option = ({ name, valueData, mode }) => {
  return (
    <select
      name={name}
      className="py-2 px-3 rounded-md bg-zinc-900 text-gray-300 dark:[color-scheme:dark]"
    >
      {valueData ? (
        <option hidden value={valueData}>
          {valueData}
        </option>
      ) : (
        <option hidden value="">
          {mode === "priority" ? "Select Priority" : "Task Status"}
        </option>
      )}
      {mode === "priority" ? (
        <>
          <option value="critical priority">Critical Priority</option>
          <option value="high priority">High Priority</option>
          <option value="medium priority">Medium Priority</option>
          <option value="low priority">Low Priority</option>
        </>
      ) : (
        <>
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="over due">Over Due</option>
        </>
      )}
    </select>
  );
};

export default Option;
