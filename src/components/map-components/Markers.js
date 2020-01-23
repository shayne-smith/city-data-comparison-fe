import React, { useState } from 'react';
import { Marker } from 'react-map-gl';

import  PopupMap  from './PopupMap';

import pin from './icons/pin.png';
import activepin from"./icons/activepin.png";

const Markers = ({ cityMarkers, setCityMarkers, selected, toggleSelected, cityIndex }) => {

  const [popState, setPopState] = useState ({
    posleft: 1,
    postop: 1,
    display: 'none',
    city: 'none',
    animate: false
  })

  return (
        <div>
          {/* this converts selected cities into markers, even if they're outside of the zoom scope */}
          {selected.map (city => 
              <Marker key={city._id} latitude={city.Latitude} longitude={city.Longitude}>
                <div onClick={() => {
                  let foundCity = cityIndex.find(indexed => indexed.ID === city._id);
                  setCityMarkers([...cityMarkers, foundCity]);
                  toggleSelected(foundCity);
                }
              }
                onMouseOver={(e) => (Number.isNaN(parseFloat(e.target.getAttribute("latitude"))) || setPopState({...popState, lat:parseFloat(e.target.getAttribute("latitude")), lng:parseFloat(e.target.getAttribute("longitude")),
                posleft:e.target.getBoundingClientRect().left, postop:e.target.getBoundingClientRect().top, display:'block', city:`${city.City}`, animate:true}))}
                onMouseLeave={(e) => (setPopState({...popState, display:'none', animate:false}))}
                >
                  <img src={activepin} alt={`A map pin indicating ${city.name}`} latitude={city.Latitude} longitude={city.Longitude}  />
                </div>
              </Marker>
            )}
          {cityMarkers.map(cityMarker=> {
            return (
              <Marker key={cityMarker.ID} latitude={cityMarker.lat} longitude={cityMarker.lng}>
                    {/* <Link className='map-marker' to={`/map/${cityMarker.city}${cityMarker.state_id}`}> */}
                  <div
                    onClick={() => toggleSelected(cityMarker)} 
                    // these events are to control state when a marker is hovered over
                    onMouseOver={(e) => (Number.isNaN(parseFloat(e.target.getAttribute("latitude"))) || setPopState({...popState, lat:parseFloat(e.target.getAttribute("latitude")), lng:parseFloat(e.target.getAttribute("longitude")),
                    posleft:e.target.getBoundingClientRect().left, postop:e.target.getBoundingClientRect().top, display:'block', city:`${cityMarker.name}`, animate:true}))}
                    onMouseLeave={(e) => (setPopState({...popState, display:'none', animate:false}))}
                  >
                      {selected.find(item => item._id === cityMarker.ID) 
                      ? <img src={activepin} alt={`A map pin indicating ${cityMarker.city}`} latitude={cityMarker.lat} longitude={cityMarker.lng}  />
                      : <img src={pin} alt={`A map pin indicating ${cityMarker.city}`} latitude={cityMarker.lat} longitude={cityMarker.lng}/>}
                  </div>
                  {/* </Link> */}
              </Marker>
              );
        })}
        {/* passing state to PopupMap.js */}
        <PopupMap lat={popState.lat} lng={popState.lng} posleft={popState.posleft} postop={popState.postop} display={popState.display} city={popState.city} animate={popState.animate}/>
      </div>
  );
};
export default Markers;