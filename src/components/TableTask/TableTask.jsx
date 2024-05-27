const TableTask = ({ action = true }) => {
  return (
    <div className="bg-zinc-900 ml-7 mr-3 mt-3 rounded-t-md">
      <div className="py-5 shadow-md">
        <div className="bg-zinc-900 px-7 ml-7 mr-7 rounded-md">
          <div className=" text-gray-300 flex flex-row font-bold">
            {action && <p className="w-1/5">ACTION</p>}
            <p className="w-1/5">TITLE</p>
            <p className="w-1/5">TASK STATUS</p>
            <p className="w-1/5">DUE DATE</p>
            <p className="w-1/5">PRIORITY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableTask;
