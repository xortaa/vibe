import "./App.css"
import data from "../data.json"
import { useState, useEffect } from "react"
import YouTube, { YouTubeProps } from "react-youtube"

interface VideoData {
  title: string
  videoID: string
}

interface VideoDataArray {
  data: VideoData[]
}

const YoutubeEmbed: React.FC<VideoDataArray> = ({ data }) => {
  let currVideo = data[Math.floor(Math.random() * data.length)]

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
    },
  }

  const onPlayerReady = (event: any) => {
    const player = event.target
    player.getIframe().autoplay = "allow"
    player.setVolume(100)
    player.playVideo()
    currVideo = player.getVideoUrl()
  }

  const onEnd = (event: any) => {
    currVideo = data[Math.floor(Math.random() * data.length)]
    const player = event.target
    player.loadVideoById(currVideo)
    currVideo = player.getVideoUrl()
  }

  return (
    <div className='embedWrapper'>
      <YouTube videoId={currVideo.videoID} opts={opts} onReady={onPlayerReady} onEnd={onEnd} className='video' />
    </div>
  )
}

function App() {
  return (
    <div className='page'>
      <YoutubeEmbed data={data} />
    </div>
  )
}

export default App
