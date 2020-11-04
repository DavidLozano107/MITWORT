import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase-config";
import SliderNewFeed from "../sliderNewFeed";
import PostUserCompany from "../postUserCompany";
const Publication = () => {
  const [post, setPost] = useState(null);

  const postArray = [];

  useEffect(() => {
    var user = auth.currentUser;
    const readDataCompany = async () => {
      const CompanyPostRef = db
        .collection("usuarios")
        .doc(user.email)
        .collection("post");

      const snapshotBd = await CompanyPostRef.get();
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

export default Publication;
