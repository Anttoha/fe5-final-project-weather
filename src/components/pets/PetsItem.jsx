import React from "react";

const PetsItem = ({article}) => {
  return (
    <li
      className="w-full max-w-[270px] group hover:opacity-90 transition"
    >
      <a
        href={article.url}
        target="_blank"
        rel="noreferrer"
        className="relative flex flex-col flex-grow justify-between pb-2 h-full"
      >
        <div className="space-y-5">
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt=""
              className="w-full h-[208px] object-cover rounded-[10px]"
            />
          )}

          <h3 className="text-[16px] font-medium">{article.title}</h3>
        </div>

        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FFB36C] transition-all duration-300 group-hover:w-full" />
      </a>
    </li>
  );
};

export default PetsItem;
