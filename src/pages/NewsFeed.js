import React, { useState, useEffect } from "react";
import User from "../components/user";
import "./welcomeFeed.css";
import SliderNewFeed from "../components/sliderNewFeed";
import PostUserCompany from "../components/postUserCompany";
import { db } from "../firebase-config";

const NewsFeed = ({ user }) => {
  const { email } = user;

  const [post, setPost] = useState(null);

  const postArray = [];

  useEffect(() => {
    const readDataCompany = async () => {
      const citiesRef = db.collection("postUser");

      const snapshotBd = await citiesRef.get();
      if (snapshotBd.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshotBd.forEach(async (doc) => {
        postArray.push(doc.data());
        console.log(doc.id);
      });
      setPost([...postArray]);
    };

    const leeDatos = async () => {
      await readDataCompany();
    };

    leeDatos();
  }, []);

  console.log(post);

  return (
    <>
      <SliderNewFeed />
      <section className="sectionNewFeedFlex newFeedCenter">
        <div className="directionNewFeed">
          {post !== null &&
            post
              .reverse()
              .map(
                (post) => (
                  console.log(post),
                  (<PostUserCompany key={post.createdAt} poster={post} />)
                )
              )}
        </div>
      </section>
    </>
  );
};

export default NewsFeed;
