import "../trackinfo.css";
import React, { Component } from "react";


export default class TrackInfo extends Component {

    render() {
        return (
            <div className="trackContainer">
                <div class="trackheader">
                    <h2>Information about the two trails we currently offer services for </h2>
                </div>

                <div class="trackrow">
                    <div class="leftcolumn">
                        <div class="cardTrack">
                            <h2>THE ROCKY</h2>
                            <h5>Advanced trail meant for experienced mountain bikers</h5>
                            <img class="fakeimg2" src="/images/rocky.jpg"></img>
                            <p>Enjoy a chairlift ride to the top of Snow Summit (elevation 2,941 m) then experience the thrill of traversing 450m of vertical drop, featuring an exciting mix of jumps, berms, and man-made features. Check out The Rocky trail and go big on the all-new 10-ply expert trail that was built for the Austrian Fox Open of Mountain Biking.</p>

                            <p>This trail has a variety of excellent sightings. Among the lines are stunning lakes, open spaces and deep green forest regions. </p>
                            <p> DH World Bike Park is typically open to the public from May through October* with multiple lift ticket and season pass options for riders of all ages and abilities. The trail features a mix of technical singletrack terrain and natural features, including drops, and rock gardens that are sure to test riders’ skills. The 3.6km trail is rated double black diamond, which means it should only be attempted by advanced/expert riders. </p>
                            <p>NOTE: Weather can vary at higher altitudes, so be sure to check our mountain report before planning your next outdoor adventure. </p>
                            <img class="fakeimg2" src="/images/rocky1.jpg"></img>
                            <img class="fakeimg2" src="/images/rocky2.jpg"></img>

                        </div>
                        <div class="cardTrack">
                            <h2>NEED FOR SPEED</h2>
                            <h5>Speed focused trail, suitable for less experienced mountain bikers.</h5>
                            <img class="fakeimg2" src="/images/nfs.jpg"></img>
                            <p>The Need for Speed is a beginner-friendly trail. As the name suggests, it is built for mainting maximum amounts of speed throughout the whole journey. The lift takes you straight to the beginning of the trail. It features many wonderful sightings. The trail is nearly 4 kilometers long and goes through a variety of regions, ranging from big, high-speed-approachable jumps, straight lines to many corners and technique-testing terrains.</p>
                        </div>
                    </div>
                    <div class="rightcolumn">
                        <div class="cardTrack">
                            <h2>About Us</h2>
                            <img class="fakeimg" src="/images/aboutus.jpg"></img>
                            <center><p>We are a small group of mountain bike enthusiasts, who together own a lift based on the Aberg mountain, Austria. Our goal is to provide our clients the best possible experience for their mountain biking needs!</p></center>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
