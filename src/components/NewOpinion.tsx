import {
  careers,
  careersDict,
  locations,
  locationsDict,
  opinionTypes,
  opinionTypesDict,
  type Career,
  type Location,
  type Opinion,
} from "@/types/opinion.types";
import { useState } from "react";
import clsx from "clsx";
import CustomSelect from "./forms/CustomSelect";
import { OpinionService } from "@/services/OpinionService";
import Spinner from "./Spinner";

interface Props {}

const NewOpinion = () => {
  const [data, setData] = useState<Omit<Opinion, "id" | "createdAt">>({
    email: "",
    type: "CITY",
    career: "SOFTWARE_ENGINEERING",
    location: "BIBLIOSEO - BIBLIOTECA DE LA CREATIVIDAD",
    text: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      await OpinionService.create(data);

      window.location.href = "/";
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectLocation = (location: Location) => {
    setData((e) => ({ ...e, location }));
  };

  const handleSelectCareer = (career: Career) => {
    setData((e) => ({ ...e, career }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-lg font-medium">Opinión para</p>
        <div className={"w-full border border-muted p-1 flex relative"}>
          <span
            style={{
              width: `calc(${100 / opinionTypes.length}% - .5rem)`,
              left: `calc(${(opinionTypes.findIndex((e) => e === data.type) / opinionTypes.length) * 100}% + 0.25rem)`,
            }}
            className="absolute top-1 left-1 bg-primary/20 h-[calc(100%-0.5rem)] transition-[left_.3s] z-0"
          />
          {opinionTypes.map((type) => (
            <button
              type="button"
              onClick={() => setData((e) => ({ ...e, type }))}
              key={type}
              className={clsx([
                "flex-1 py-2 text-center font-bold relative z-10 transition-colors primary",
                data.type === type ? "text-primary" : "text-muted",
              ])}
            >
              {opinionTypesDict[type].label}
            </button>
          ))}
        </div>
      </div>

      <label className="text-lg font-medium flex flex-col items-start gap-1">
        Correo
        <input
          name="email"
          type="email"
          required
          className="px-3 py-2 border border-muted w-full focus:outline-primary"
          placeholder="alguien@unisimon.edu.co"
          value={data.email}
          onChange={(e) => setData((s) => ({ ...s, email: e.target.value }))}
        />
      </label>

      <CustomSelect<Career>
        value={data.career}
        label="Programa"
        name="career"
        onChange={handleSelectCareer}
        options={careersDict}
      />

      <CustomSelect<Location>
        value={data.location}
        label="Lugar"
        name="location"
        onChange={handleSelectLocation}
        options={locationsDict}
      />

      <label className="text-lg font-medium flex flex-col items-start gap-1">
        Opinión
        <textarea
          name="text"
          className="px-3 py-2 border border-muted w-full focus:outline-primary"
          placeholder="Pienso que se debería..."
          rows={4}
          required
          minLength={3}
          maxLength={600}
          value={data.text}
          onChange={(e) => setData((s) => ({ ...s, text: e.target.value }))}
        />
        <span className="text-sm text-right text-muted w-full">
          {data.text.length}/400
        </span>
      </label>

      <button
        type="submit"
        className={clsx([
          "w-full px-3 py-2 text-white bg-primary font-semibold text-lg shadow-primary flex items-center gap-4 justify-center",
          loading && "brightness-50",
        ])}
      >
        {loading && <Spinner color="light" />}
        Publicar opinión
      </button>
    </form>
  );
};

export default NewOpinion;
