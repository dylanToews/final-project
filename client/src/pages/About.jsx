import React from 'react';
import "../About.css";
import {Howl} from "howler";

function About() {

const audioTest = "http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3"

const soundPlay = (src) => {
  const sound = new Howl ({
    src,
    html5: true,
    loop: true
  })
  sound.play()
}

soundPlay(audioTest)


    return (
        <div className="App">
            <br/>
            <br/>
            <h1>LEARN</h1>
            <br/>
            <h2>Welcome to Startle, the App that does... something.</h2>
            <br/>
            <h3>We'll add to this later</h3>
            <p>In the meantime, this page will be used to test styling</p>
        </div>
    );
}

export default About;