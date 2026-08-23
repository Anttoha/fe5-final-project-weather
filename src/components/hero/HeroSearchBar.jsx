import React from "react";
import { Search, X, RotateCw } from "lucide";
import { MorphIcon } from "morphicons/react";

import { useCities } from "../../shared/contexts/citiesContext";
import { useCitySearch } from "../../shared/hooks/useCitySearch";

const HeroSearchBar = ({ onAddCity }) => {
  const { cities, maxCities } = useCities();

  const {
    query,
    setQuery,
    searchResults,
    isAddingCity,
    selectCity,
    selectCurrentLocation,
    clearSearch,
  } = useCitySearch(onAddCity);

  const isSearchActive = query.trim().length > 0;
  const isLimitReached = cities.length >= maxCities;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchResults.length) return;

    selectCity(searchResults[0]);
  };

  return (
    <div className="relative w-full site-xl:max-w-156.25 site-md:max-w-[402px] max-w-[174px]">
      <form
        onSubmit={handleSubmit}
        className="flex h-[15px] site-md:h-[27px] site-xl:h-[42px] w-full overflow-hidden rounded-[10px] bg-box site-xl:h-10.5"
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={isLimitReached || isAddingCity}
          placeholder={
            isLimitReached ? "Maximum 6 cities" : "Search location..."
          }
          className="min-w-0 flex-1 bg-transparent px-2.75 site-md:px-[17px] site-xl:px-[29px] text-[6px] site-md:text-[10px] site-xl:text-[14px] font-medium text-black placeholder:text-placeholder focus:outline-none"
        />

        <button
          type="button"
          disabled={isAddingCity || isLimitReached}
          onClick={isSearchActive ? clearSearch : selectCurrentLocation}
          aria-label={isSearchActive ? "Clear search" : "Use my location"}
          className="flex w-[17px] site-md:w-[29px] site-xl:w-[45px] shrink-0 cursor-pointer items-center justify-center border-black bg-brand text-black hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-50 border-l-2"
        >
          <MorphIcon
            icon={isAddingCity ? RotateCw : isSearchActive ? X : Search}
            className={
              isAddingCity
                ? "size-2.25 animate-spin site-md:size-[17px] site-xl:size-[25px]"
                : "size-2.25 site-md:size-[17px] site-xl:size-[25px]"
            }
          />
        </button>
      </form>

      {searchResults.length > 0 && (
        <ul className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-[10px] bg-white shadow-lg">
          {searchResults.map((city) => (
            <li key={`${city.lat}-${city.lon}`}>
              <button
                type="button"
                disabled={isAddingCity}
                onClick={() => selectCity(city)}
                className="w-full cursor-pointer px-5 py-3 text-left text-black transition hover:bg-gray-100"
              >
                {city.name}
                {city.state && `, ${city.state}`}, {city.country}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HeroSearchBar;
