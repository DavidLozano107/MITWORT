import React from "react";
import slider_one from "./img/slide1.jpg";
import slider_two from "./img/slider2.jpg";
import slider_three from "./img/slider3.jpg";
import Carousel from "react-bootstrap/Carousel";

const SliderNewFeed = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={slider_one} alt="First slide" />
          <Carousel.Caption>
            <h3>COMPANY</h3>
            <p>
              With MITWORT you will have the opportunity as a company to publish
              places or products which will be of great help to the people who
              create a specific community.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={slider_two} alt="Third slide" />
          <Carousel.Caption>
            <h3>EXPLORE</h3>
            <p>
              Meet people of your own taste by joining a community and dialogue
              with them
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img className="d-block w-100" src={slider_three} alt="Third slide" />
          <Carousel.Caption>
            <h3>COMMUNITIES</h3>
            <p>
              Enjoy the communities that MITWORT offers you.Don't forget that
              you can also create the one you want. Let's go
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default SliderNewFeed;
