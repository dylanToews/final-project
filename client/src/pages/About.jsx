import "../About.css";

function About() {



    return (
        <div className="App">
            <br/>
            <br/>
            <h1>About Startle</h1>
            <img src={require('../startle.png')}/>
            <br/>
            <h2>Welcome to Startle, the App that does... something.</h2>
            <br/>
            <h3>We'll add to this later</h3>
            <p>In the meantime, this page will be used to test styling</p>
        </div>
    );
}

export default About;