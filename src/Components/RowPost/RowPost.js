import React, { useEffect, useState } from "react";
import {imgUrl,API_KEY} from '../../Constants/Constants'
import axios from '../../axios'
import Youtube from 'react-youtube'
import "./RowPost.css";
function RowPost(props) {

  const [movie, setmovie] = useState([])
  const [urlid, setUrlid] = useState('')
  

  

  useEffect(() => {
   axios.get(props.url)
   .then((response) => {
    console.log(response.data.results[0])
    setmovie(response.data.results)
   })
  }, [props])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id) =>{
    console.log("id is : "+id)
   
     axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
     .then((response) => {
      console.log(response.data.results[0].key);
      setUrlid(response.data.results[0].key)
     })
   
    
   
  }
  
  return (
      
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
      {movie.map((obj) => 
        <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? "smallPoster" : "poster"} src={`${imgUrl+obj.backdrop_path}`} alt="poster" />
      )}
      </div>
      {urlid && <Youtube opts = {opts} videoId= {urlid}  />}
    </div>
  );
}

export default RowPost;
