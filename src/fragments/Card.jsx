import CardItem from "../components/Card/CardItem";

export const cards = [
  {
    id: 1,
    title: "all task",
    desc: "List of all the task",
    colorIcon: "bg-blue-400",
    colorText: "text-blue-400",
  },
  {
    id: 2,
    title: "in progress",
    desc: "The task that in progress",
    colorIcon: "bg-yellow-400",
    colorText: "text-yellow-400",
  },
  {
    id: 3,
    title: "completed",
    desc: "The task already completed",
    colorIcon: "bg-green-400",
    colorText: "text-green-400",
  },
];

const CardFragment = ({ title, desc, colorIcon, colorText, status }) => {
  return (
    <div className="bg-zinc-900 rounded-xl shadow-md">
      <CardItem
        title={title.toUpperCase()}
        desc={desc}
        colorIcon={colorIcon}
        colorText={colorText}
        status={status}
      />
    </div>
  );
};

export default CardFragment;
