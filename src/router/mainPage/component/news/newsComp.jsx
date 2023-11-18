import { Link } from "react-router-dom";

export default function NewsComp({ section }) {
  return (
    <div className="w-full  border-t border-black font-semibold flex flex-col">
      {section.map((el) => {
        return (
          <Link
            to={el.link}
            target="_blank"
            className="mb-3 hover:bg-sky-100 rounded-xl h-12"
          >
            <p>{el.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
