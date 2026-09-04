import React from "react";
import {
  Heart,
  // RotateCw,
  Trash2,
} from "lucide-react";
import ButtonBrand from "../ui/ButtonBrand";
import { cn } from "../../shared/utils/cn";
import { weatherIcon } from "../../shared/utils/weatherIcons";
import { useCities } from "../../shared/contexts/citiesContext";
import { RotateCw, CircleCheckBig } from "lucide";
import { MorphIcon } from "morphicons/react";
import { useIconActions } from "../../shared/hooks/useIconActions";
import { sileo } from "sileo";

const DaysItem = ({
  city,
  className,
  onLike,
  onVisibleSection,
  onDeleteCity,
  onRestoreCity,
}) => {
  const { runAction, getStatus } = useIconActions();

  const refreshStatus = getStatus("refresh");

  const { refreshCity } = useCities();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div
      className={cn(
        "w-full max-w-full site-md:max-w-[262px] site-xl:max-w-[320px] bg-panel pt-3.75 px-3.75 pb-5 site-md:pt-3 site-md:px-4.25 site-md:pb-4.25 site-xl:pt-3.75 site-xl:pb-5 site-xl:px-5 shrink-0 squircle-40",
        className,
      )}
    >
      <div className="space-y-6.25 site-md:space-y-2.75 site-xl:space-y-3.75 px-0 site-md:px-2.25 site-xl:px-2.5 font-medium mb-2.75 site-md:mb-2 site-xl:mb-2.5">
        <p className="flex justify-between text-[12px] site-xl:text-[14px]">
          <span>{city?.city || ""}</span>
          <span>{city?.country || ""}</span>
        </p>
        <p className="text-center text-[20px] site-xl:text-[24px] leading-none">
          {city?.time || ""}
        </p>
      </div>
      <div className="px-6.75 site-md:px-2.25 site-xl:px-3 flex justify-center site-md:justify-between flex-wrap items-center gap-2 site-md:gap-0 text-[10px] font-medium mb-3 site-xl:mb-3.75">
        <ButtonBrand
          className="py-1.5 px-2.75 site-xl:py-2 site-xl:px-4.5"
          onClick={() => onVisibleSection(city.id, "hourly")}
        >
          Hourly forecast
        </ButtonBrand>
        <ButtonBrand
          className="py-1.5 px-2.75 site-xl:py-2 site-xl:px-4.5"
          onClick={() => onVisibleSection(city.id, "eight")}
        >
          Weekly forecast
        </ButtonBrand>
      </div>
      <div className="grid w-full grid-cols-[1fr_1px_1fr] grid-rows-1 items-start gap-3 site-xl:gap-3.25 mb-6 site-md:mb-6.75 site-xl:mb-5.5 text-[12px] site-xl:text-[14px] font-medium leading-[1.1]">
        <p className="text-right">{city?.date?.date || ""}</p>
        <div className="inline-block w-full h-full bg-black" />
        <p className="text-left">{city?.date?.day || ""}</p>
      </div>
      <div className="flex flex-col gap-6.25 site-xl:gap-3.75 items-center mb-11 site-md:mb-8.5 site-xl:mb-9.5">
        {/* <img
          src={weatherIcon(city?.description)}
          alt={city?.description}
          className="w-full max-w-20.75 max-h-20.75 site-md:max-w-19 site-md:max-h-19 site-xl:max-w-30 site-xl:max-h-30 h-full object-cover"
        /> */}
        <svg className="w-full max-w-20.75 max-h-20.75 site-md:max-w-19 site-md:max-h-19 site-xl:max-w-30 site-xl:max-h-30 h-full object-cover">
          <use href={`/symbol-defs.svg${weatherIcon(city?.description)}`} />
        </svg>
        <h2 className="text-[24px] site-xl:text-[32px] font-medium">
          {city?.temperature?.celsius ?? ""} ℃
        </h2>
      </div>
      <div className="flex justify-between items-center flex-wrap px-4.25 site-md:px-0 gap-y-4">
        <div className="flex gap-3.5 site-xl:gap-4 items-center">
          <button
            type="button"
            className="group flex size-6 cursor-pointer items-center justify-center disabled:cursor-wait site-xl:size-7.5"
            disabled={refreshStatus === "loading"}
            onClick={() =>
              runAction(
                "refresh",
                async () => {
                  await Promise.all([refreshCity(city.id), delay(500)]);

                  sileo.success({
                    title: "Successfully updated!",
                  });
                },
                800,
              )
            }
            aria-label="Refresh weather"
          >
            <MorphIcon
              icon={refreshStatus === "success" ? CircleCheckBig : RotateCw}
              className={cn(
                "h-full w-full select-none text-black",

                refreshStatus === "loading"
                  ? "animate-spin [animation-duration:.5s]"
                  : "transition-transform duration-200",

                refreshStatus !== "success" && "group-hover:rotate-30",
              )}
            />
          </button>
          <button
            type="button"
            aria-label={
              city.isLiked
                ? `Remove ${city.city} from favorites`
                : `Add ${city.city} to favorites`
            }
            aria-pressed={city.isLiked}
            className="size-6 site-xl:size-7.5 flex items-center justify-center group cursor-pointer"
            onClick={() => onLike(city.id)}
          >
            <Heart
              // {/* <HeartIcon size={24} color="#f45b48" */}
              className={cn(
                "text-red-400 w-full h-full cursor-pointer select-none group-hover:scale-85 group-active:scale-75 transition-all duration-200",
                city.isLiked && "fill-red-400 animate-like",
              )}
            />
          </button>
        </div>
        <ButtonBrand
          className="py-2 px-5 site-md:py-1.5 site-md:px-4.75 site-xl:py-2 site-xl:px-6.25"
          onClick={() => onVisibleSection(city.id, "current")}
        >
          See more
        </ButtonBrand>
        <button
          type="button"
          aria-label={`Delete ${city.city}`}
          className="size-6 site-xl:size-7.5 flex items-center justify-center group cursor-pointer"
          onClick={() => {
            onDeleteCity(city.id);

            sileo.clear();

            const toastId = sileo.success({
              title: "Successfully deleted!",
              description: `The city ${city.city} has been deleted.`,

              button: {
                title: "Get back",
                onClick: () => {
                  onRestoreCity(city);
                  sileo.dismiss(toastId);
                },
              },

              styles: {
                button:
                  "bg-white! text-black! rounded-2xl! px-4! cursor-pointer! hover:bg-slate-200! hover:text-slate-900! active:bg-slate-300! active:text-slate-800! transition-all!",
              },
            });
          }}
        >
          <Trash2 className="w-full h-full text-black group-hover:text-red-500 group-hover:rotate-12 group-active:scale-90 transition-all duration-200" />
        </button>
      </div>
    </div>
  );
};

export default DaysItem;
