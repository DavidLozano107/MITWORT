import React, { useState } from "react";
import User from "../components/user";
import "./welcomeFeed.css";
import SliderNewFeed from "../components/sliderNewFeed"
import PostUserCompany from "../components/postUserCompany"
const NewsFeed = ({user}) => {

  return (
    <> 
      <SliderNewFeed />
        <section className="sectionNewFeedFlex newFeedCenter">
          <div className="directionNewFeed">
            <PostUserCompany/>
          </div>
        </section> 
    </>
  );
};

export default NewsFeed;
