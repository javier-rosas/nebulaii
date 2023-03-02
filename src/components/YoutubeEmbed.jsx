import YouTube from 'react-youtube';

function YoutubeEmbed({ videoId, height, width }) {

  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
      <YouTube
        videoId={videoId}
        opts={opts}
        className="w-full h-full aspect-video p-10"
      />
  );
}

export default YoutubeEmbed;
