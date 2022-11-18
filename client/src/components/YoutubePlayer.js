import { Button, Typography, Box} from '@mui/material';
import React, { useEffect,useState } from 'react';
import PlayerControls from './PlayerControls';


function YoutubePlayer(props) {
    const [player,setPlayer] = useState(null);

    const[currentList,setCurrentList] = useState([
      "ntn6q-ODULo", 
      "vJMMf-z25I0",
       "e0_V8IoYSLU",
        "x1XuN5Rq2ws",
        "mqmxkGjow1A",
        "8UbNbor3OqQ",
        "THL1OPn72vo",
      ])

    const[shuffle,setShuffle] = useState(false);

    const[currentIdx, setCurrentIdx] = useState(-1)

    useEffect(() =>{
      if(window.YT) return;
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      
      return () =>{
        window.YT = null
        window.onYouTubeIframeAPIReady = null
        tag.remove();
        const elem = document.getElementById("www-widgetapi-script")
        if(elem) elem.remove();
      }

    },[])

    useEffect(() =>{
      if(shuffle){
        const shuffledList = shuffleList(currentList)
        setCurrentList(shuffledList)
        console.log("shuffled");
        console.log(shuffledList);
      }
    },[shuffle])

    useEffect(() =>{
        if(player && player.loadVideoById && currentList){
            player.loadVideoById(currentList[currentIdx])
        }
        console.log(currentIdx);
    },[currentIdx,player,currentList])

    function onYouTubeIframeAPIReady() {
        window.player = (new window.YT.Player('player', {
          height: '390',
          width: '500',
          controls:'0',
          videoId:currentIdx > -1 && currentList ? currentList[currentIdx]:"",
          playerVars: {
            'playsinline': 1,
            'origin':window.location
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        }));

        setPlayer(window.player);
      }

      const onPlayerReady= (event) => {
        event.target.playVideo();
      }

      const onPlayerStateChange = (event) =>{
        if(event.data === 0) {
            if(!shuffle) handleNext();
            else getRandom();
        }
      }

      const shuffleList = array => {

        const copy = array.slice();

        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = copy[i];
          copy[i] = copy[j];
          copy[j] = temp;
        }

        return copy;
      }
      

      const getRandom = () =>{
        setCurrentIdx(prev => Math.floor(Math.random() * currentList.length));
      }

      const toggleShuffle = () =>{
        setShuffle(prev => !prev);
      }

      const handleNext = () =>{
        setCurrentIdx( prev => (prev + 1) % currentList.length)
      }

      const handlePrev = () =>{
        setCurrentIdx( prev => {
            let newCount = prev - 1;
            if(newCount < 0) return newCount + currentList.length;
            return newCount;
        })
      }
      const handleClick = () =>{
        setCurrentIdx(0);
      }

      const style ={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        backgroundColor:"#d4d4f5",
        borderRadius:"4px",
        gap:"1rem"
      }

    return (
        <Box style={style}>
            <div id="player"></div>
            <Typography variant="h5">Now Playing</Typography>            
            <Box sx={{textAlign:"left"}}>
              <Typography variant="subtitle2">Playlist: Songs To make you cry</Typography>
              <Typography variant="subtitle2">Song#: {currentIdx + 1}</Typography>
              <Typography variant="subtitle2">Title: Last Day of Our Acquaintance</Typography>
              <Typography variant="subtitle2">Artist: Sinead O'Connor</Typography>
            <PlayerControls player={player} handleNext={handleNext} handlePrev={handlePrev} toggleShuffle={toggleShuffle} shuffle={shuffle}/>
            </Box>
            <Button onClick={handleClick} >Select playlist</Button>
        </Box>
    );
}

export default YoutubePlayer;