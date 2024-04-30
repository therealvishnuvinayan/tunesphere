import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) => {
  console.log('##fff activeSong', activeSong)
  console.log('##fff isPlaying', isPlaying)
  console.log('##fff song', song)
  console.log('##fff true ', activeSong?.attributes?.albumName === song?.attributes?.albumName)
  return isPlaying &&
    ((activeSong?.attributes?.albumName === song?.attributes?.albumName)) ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  );
};

export default PlayPause;
