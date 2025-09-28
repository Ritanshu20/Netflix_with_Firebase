import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1&api_key=34b66d629b66e6d6fb68fc5e4a008a30`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setApiData(data.results);
      } catch (err) {
        console.error("API Error:", err);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
              alt={card.title}
            />
            <p>{card.title}</p>
          </Link>
})}
      </div>
    </div>
  )
}

export default TitleCards
