import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const Discover = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const genreTitle = "Pop";
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  if (isFetching) return <Loader title="Loading songs" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col" ref={divRef}>
      <div className="w-full flex justify-between items-center flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
      </div>

      <div className="flex flex-wrap justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
