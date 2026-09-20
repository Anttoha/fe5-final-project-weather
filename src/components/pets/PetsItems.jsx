import React from "react";
import PetsItem from "./PetsItem";

const PetsItems = ({ news }) => {
  if (!news) (
    <div>
      <p className="text-red-300">The API does not allow requests from a public domain.</p>
    </div>
  )

  return (
    <ul className="grid site-xl:grid-cols-4 site-md:grid-cols-2 grid-cols-1 justify-between w-full gap-y-10">
      {news.map((article, index) => (
        <PetsItem
          key={`${article?.url}-${index}`}
          article={article}
        />
      ))}
    </ul>
  );
};

export default PetsItems;
