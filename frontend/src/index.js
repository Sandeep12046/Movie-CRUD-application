import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import "./index.css";
function Main(){
  const[movieName,setMovieName]=useState('');
  const[review,setReview]=useState('');
const[movieReviewList,setMovieNameList]=useState([]);
const[newReview,setnewReview]=useState("");
useEffect(()=>{
  Axios.get("http://localhost:7000/api/get").then((response)=>{
    setMovieNameList(response.data);
  })
})


  function submitReview(){
    Axios.post("http://localhost:7000/api/inserts",
    {
      movieName:movieName,
      movieReview:review,
    }).then(()=>{
      setMovieNameList([...movieReviewList,{movieName:movieName,movieReview:review},
      ]);
  });
};

function deleteReview(movie){
  Axios.delete(`http://localhost:7000/api/delete${movie}`)
}
function updateReview(movie){
  Axios.put("http://localhost:7000/api/update",{
    movieName:movie,
    movieReview:newReview,
  })
  setnewReview('')
}

  return(
    <>
    <div>
      <h1>CRUD APPLICATION</h1>
    </div>
    <div>
      <label>Movie Name:</label>
      <input type="text" name="movieName" onChange={(err)=>{
        setMovieName(err.target.value);
      }}/>
      <label>Review:</label>
      <input type="text" name="review" onChange={(err)=>{
        setReview(err.target.value);}}/>
      <button type="submit" onClick={submitReview}>Submit</button>
      <h1>Result</h1>
      {movieReviewList.map((val)=>{
      return( <div className="card">
        <h2>{val.movieName}</h2>
        <p>{val.movieReview}</p>
        <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
        <input type="text" id="updateInput" onChange={(e)=>{
          setnewReview(e.target.value)}}/>
        <button onClick={()=>{
          updateReview(val.movieName)}}>Update</button>
    </div>);
  })}
    </div>
    </>
  )
}
ReactDOM.render(<Main/>,document.getElementById("root"));