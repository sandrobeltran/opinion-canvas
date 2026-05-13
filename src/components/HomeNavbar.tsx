import {
  locations,
  locationsDict,
  opinionTypes,
  type Location,
} from "@/types/opinion.types";
import React, { useState } from "react";
import CustomSelect from "./forms/CustomSelect";

interface Props {}

const HomeNavbar = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | "">("");

  return (
    <footer className="w-full">
      <nav className="w-full p-3 flex items-center gap-4 bg-white border-t border-t-primary/30 shadow-[0px_-8px_16px_#6c6c6c30] flex-wrap">
        <div className="flex gap-2">
          <CustomSelect<Location>
            id="location-filter"
            options={locationsDict}
            name="location"
            onChange={(e) => setSelectedLocation(e)}
            value={selectedLocation}
            allowEmptyOption
            placeholder="Todos los lugares"
          />
        </div>

        {/* <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="flex-1 max-w-sm px-3 py-3 bg-primary/20 text-primary font-semibold"
        >
          {locatio.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select> */}

        <a
          href="/opinar"
          className="w-fit px-3 py-3 bg-primary text-light font-semibold flex items-center gap-1"
        >
          Opinar
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </a>

        <button
          id="recenter-btn"
          className="px-3 py-3 bg-primary/20 text-primary font-semibold flex items-center gap-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-viewfinder"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 3l0 4" />
            <path d="M12 21l0 -3" />
            <path d="M3 12l4 0" />
            <path d="M21 12l-3 0" />
            <path d="M12 12l0 .01" />
          </svg>
          Centrar vista
        </button>
      </nav>
    </footer>
  );
};

export default HomeNavbar;
