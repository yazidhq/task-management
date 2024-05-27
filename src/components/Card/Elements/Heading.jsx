const Heading = ({ title, colorText }) => {
  return (
    <div>
      <h1 className={`text-2xl font-bold ${colorText}`}>{title}</h1>
    </div>
  );
};

export default Heading;
