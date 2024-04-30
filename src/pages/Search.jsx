import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";

const Search = () => {
  const searchTerm = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(
    searchTerm?.searchTerm
  );
  const divRef = useRef(null);
  const songs = data?.tracks?.hits?.map((song) => song.track);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  if (isFetching) return <Loader title="Loading top charts" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col" ref={divRef}>
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for{" "}
        <span className="font-black">{searchTerm.searchTerm}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
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

export default Search;
