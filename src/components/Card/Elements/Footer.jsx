const Footer = ({ colorIcon, content, status }) => {
  return (
    <div>
      <button
        className={`rounded-full p-5 ${colorIcon} font-bold text-zinc-900 flex items-center justify-center w-16 h-16`}>
        {" "}
        {status}
        {content}
      </button>
    </div>
  );
};

export default Footer;
