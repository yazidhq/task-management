import Input from "./Elements/input";
import Option from "./Elements/option";
import Button from "../Button";

const FormTask = ({
  handleSubmit,
  isEdit = true,
  valueData = [],
  handleUpdate,
  userID,
}) => {
  return (
    <form action="" onSubmit={!isEdit ? handleSubmit : handleUpdate}>
      <div className="ml-7 mr-3 mt-3 rounded-md flex gap-4 items-center">
        {isEdit && <Input type="hidden" name="id" valueData={valueData[0]} />}
        <Input type="hidden" name="user_id" valueData={userID} />
        <Input
          type="text"
          placeholder="Task Title"
          name="title"
          valueData={valueData[1]}
        />
        {isEdit && (
          <Option mode={"taskStatus"} name="status" valueData={valueData[2]} />
        )}
        <Input
          type="text"
          placeholder="Task description"
          name="description"
          valueData={valueData[3]}
        />
        <Input
          type="datetime-local"
          placeholder="Due Date"
          name="duedate"
          valueData={valueData[4]}
        />
        <Option mode={"priority"} name="priority" valueData={valueData[5]} />
        {!isEdit ? (
          <Button type="submit" weight="px-7" height="py-2">
            Submit
          </Button>
        ) : (
          <Button type="submit" weight="px-7" height="py-2">
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormTask;
