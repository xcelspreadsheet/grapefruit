import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const layoutTransitionOut = {
    layout: {
        duration: 0.2,
        ease: 'easeOut',
      },
}

const workDetail = ({ work, setWorkDetail }) => {
  const workHero = work.representations.find(
    (representation) => representation.image_url
  );

  return (
    <div onClick={() => setWorkDetail(null)} className="work work-detail">
      <div className="work-detail-contents">
        <div className="work-title">
          <motion.h2
            transition={layoutTransitionOut}
            layout={"position"}
            layoutId={"work-title" + work.id}
          >
            {work.title}
          </motion.h2>
          <motion.div className="work-description">
            <p dangerouslySetInnerHTML={{ __html: work.description }}></p>
          </motion.div>
          <div className="work-types">
            {work.work_types.map((work_type) => (
              <motion.div
                transition={layoutTransitionOut}
                layout
                key={"work_type-" + work_type.id + "-" + work.id}
                layoutId={"work_type-" + work_type.id + "-" + work.id}
              >
                <div>{work_type.name}</div>
              </motion.div>
            ))}
          </div>
          <motion.div transition={layoutTransitionOut} layout layoutId={'work-date-' + work.id} className="work-date">{work.date_descriptive}</motion.div>
        </div>
        <div className="work-representations">
          {work.representations.map((representation, index) => {
            if (representation.image_url) {
              return (
                <motion.div
                  transition={layoutTransitionOut}
                  drag={true}
                  layout
                  key={"work-representation-" + index + "-" + work.id}
                  layoutId={"work-representation-" + index + "-" + work.id}
                  className="work-representation work-representation-image"
                >
                  <img src={representation.image_url} />
                </motion.div>
              );
            }
            if (representation.text) {
              return (
                <div className="work-representation work-representation-text">
                  <p
                    dangerouslySetInnerHTML={{ __html: representation.text }}
                  ></p>
                </div>
              );
            }
            if (representation.embed) {
              return (
                <div
                  className="work-representation work-representation-embed"
                  dangerouslySetInnerHTML={{ __html: representation.embed }}
                ></div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default workDetail;
