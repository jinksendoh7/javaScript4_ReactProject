import React from 'react';

function Logo({url, altDisplay}) {
    return (
            <img src={url} alt="home-logo" className={altDisplay} ></img>
      
    )
}

export default Logo;