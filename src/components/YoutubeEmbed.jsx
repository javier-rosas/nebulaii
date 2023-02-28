import YouTube from 'react-youtube';

function YoutubeEmbed({ videoId }) {

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
      <YouTube
        videoId={videoId}
        opts={opts}
        className="w-full h-full"
      />
  );
}

export default YoutubeEmbed;
