import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYOu = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  const divRef = useRef(null);
  const apiUrl = `${import.meta.env.VITE_GEO_LOCATION_API_URL}?apiKey=${import.meta.env.VITE_GEO_LOCATION_API_KEY}`
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;

  if (error && country) return <Error />;

  return (
    <div className="flex flex-col" ref={divRef}>
      {data && (
        <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
          Around you (
          <span className="font-black">
            {country === "AE" ? "United Arab Emirates" : country}
          </span>
          )
        </h2>
      )}
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYOu;
