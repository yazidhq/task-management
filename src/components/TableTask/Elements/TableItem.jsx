import Popup from "reactjs-popup";
import Button from "../../Button";
import FormTask from "../../FormInput/FormTask";

const TableItem = ({
  taskID,
  title,
  status,
  description,
  duedate,
  priority,
  handleRemove,
  handleUpdate,
  action = true,
}) => {
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString().replace("T", " ").slice(0, 16);
  };

  let bgPriority;
  if (priority === "critical priority") {
    bgPriority = "bg-red-600";
  } else if (priority === "high priority") {
    bgPriority = "bg-yellow-600";
  } else if (priority === "medium priority") {
    bgPriority = "bg-green-600";
  } else if (priority === "low priority") {
    bgPriority = "bg-blue-600";
  }

  let bgStatus;
  if (status === "over due") {
    bgStatus = "bg-red-600";
  } else if (status === "in progress") {
    bgStatus = "bg-yellow-600";
  } else if (status === "completed") {
    bgStatus = "bg-green-600";
  } else if (status === "to do") {
    bgStatus = "bg-blue-600";
  }

  return (
    <div className="py-3 bg-zinc-800 px-7 ml-7 mr-7 rounded-md">
      <div className="text-gray-300 flex flex-row">
        {action && (
          <div className="w-1/5">
            <div className="flex flex-between gap-1">
              <Popup
                trigger={
                  <button className="bg-green-600 rounded-md h-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>
                }
                position="right center"
              >
                <div className="bg-green-500 rounded px-3 py-1">
                  Description : {description}
                </div>
              </Popup>
              <Popup
                trigger={
                  <button className="bg-yellow-600 rounded-md h-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                }
                position="bottom left"
              >
                <div className="bg-zinc-700 rounded pl-1 pr-3 pb-3 pt-1">
                  <div style={{ marginLeft: "-1.65%", marginRight: "-0.65%" }}>
                    <FormTask
                      isEdit={true}
                      handleUpdate={handleUpdate}
                      valueData={[
                        taskID,
                        title,
                        status,
                        description,
                        duedate,
                        priority,
                      ]}
                    />
                  </div>
                </div>
              </Popup>
              <Button color="bg-red-600" onClick={handleRemove}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </div>
          </div>
        )}
        <p className="w-1/5 pt-1">{title}</p>
        <div className="w-1/5 pt-1">
          <p className={`${bgStatus} rounded-xl px-3 mr-12`}>
            {status != null ? status.toUpperCase() : ""}
          </p>
        </div>
        <p className="w-1/5 pt-1">{formatDateTime(duedate)}</p>
        <div className="w-1/5 pt-1">
          <p className={`${bgPriority} rounded-xl px-3`}>
            {priority != null ? priority.toUpperCase() : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TableItem;
