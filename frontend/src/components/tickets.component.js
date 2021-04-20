import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import NfsTicketModal from "./nfs-ticket-modal.component";
import RockyTicketModal from "./tickets/rocky-modal-interface";
import { Button, Modal } from "react-bootstrap"

export default class Tickets extends Component {


    render() {
        function openNfsTicketModal() {
            <NfsTicketModal />
        }
        return (
            <body>
                <header>
                    <img className="homescreenImg" src="/images/homepage2.jpg" />

                    <nav class="navbar navbar-expand-sm navbar-dark">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a id="botnav-item" class="nav-link" href="#">Pass Permission</a>
                            </li>
                            <li class="nav-item">
                                <a id="botnav-item" class="nav-link" href="#">Tickets</a>
                            </li>
                            <li class="nav-item">
                                <a id="botnav-item" class="nav-link" href="#">Tracks & Reviews</a>
                            </li>
                        </ul>
                    </nav>

                </header>
                <center>
                    LIFT TICKETS
                    <Card className="disclaimerCard">
                        <Card.Img variant="right" src="/images/mountain.jpg" />
                        <Card.Body>
                            <Card.Text className="smallText">
                                Travel Advisory - Changes to Lift Operations
                            </Card.Text>
                            <Card.Title className="cardTitle">OUR COMMITMENT TO SAFETY</Card.Title>
                            <Card.Text className="cardDisclaimer">
                                We have reimagined the resort experience to further prioritize the health and safety of our employees and guests in response to COVID-19. Please refrain from touching lift surfaces with bare hands, keep a distance of at least 1.5 meters from other people. To comply with the distance rule it is currently only possible to use the lift by only two people at once, and the middle seat is not to be used.
                            </Card.Text>
                            <Button variant="dark" href="#" class="stretched-link">Learn More</Button>
                        </Card.Body>
                    </Card>
                </center>
                <center>
                    <CardDeck>
                        <Card
                            tag="a"
                            onClick={openNfsTicketModal}
                            style={{ cursor: "pointer" }}
                        >
                            <Card.Img variant="top" src="/images/mtb.jpg" />
                            <Card.Body>
                                <Card.Title className="cardTitle">Need for Speed</Card.Title>
                                <Card.Text>
                                    Get to know our track which is focused on providing many sections suitable for fast riding.
                                    
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Ticket Type</th>
                                                <th scope="col">Adult (19-64 YRS)</th>
                                                <th scope="col">TEEN (13-18 YRS)</th>
                                                <th scope="col">CHILD (5-12 YRS)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1 Day</th>
                                                <td>$80</td>
                                                <td>$72</td>
                                                <td>$46</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2 Days</th>
                                                <td>$150</td>
                                                <td>$133</td>
                                                <td>$80</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3 Days</th>
                                                <td>$200</td>
                                                <td>$186</td>
                                                <td>$144</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="btn btn-dark"><NfsTicketModal /> </button>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Click to find out more!</small>
                            </Card.Footer>
                        </Card>
                        <Card
                            tag="a"
                            onClick={(e) => {
                                e.preventDefault();
                                <NfsTicketModal></NfsTicketModal>;
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <Card.Img variant="top" src="/images/Wallpaper1.jpg" />
                            <Card.Body>
                                <Card.Title className="cardTitle">The Rocky</Card.Title>
                                <Card.Text>
                                    Get to know our track which is focused on providing many sections suitable for fast riding.
                                    
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Ticket Type</th>
                                                <th scope="col">Adult (19-64 YRS)</th>
                                                <th scope="col">TEEN (13-18 YRS)</th>
                                                <th scope="col">CHILD (5-12 YRS)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                                <th scope="row">1 Day</th>
                                                <td>$100</td>
                                                <td>$80</td>
                                                <td>$66</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2 Days</th>
                                                <td>$180</td>
                                                <td>$150</td>
                                                <td>$102</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3 Days</th>
                                                <td>$212</td>
                                                <td>$186</td>
                                                <td>$154</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button className="btn btn-dark"><RockyTicketModal /> </button>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Click to find out more!</small>
                            </Card.Footer>
                        </Card>
                        {/* <Card>
                            <Card.Img variant="top" src="holder.js/100px160" />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a wider card with supporting text below as a natural lead-in to
                                    additional content. This card has even longer content than the first to
                                    show that equal height action.
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card> */}
                    </CardDeck>
                </center>
            </body>
        )
    }
}