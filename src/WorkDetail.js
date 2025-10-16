import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { del } from "framer-motion/client";
import Work from "./Work";

var transition = {
  type: "spring",
  visualDuration: 0.3,
  bounce: 0.18
}

var transitionDelay = {
  type: "spring",
  visualDuration: 0.3,
  bounce: 0.18,
  delay: 0.3
}

const slideUpFromBottom = {
  initial: { y: "10px", opacity: 0 },
  animate: { y: 0, opacity: 1, transition: transition },
};

const slideInFromRight = {
  initial: { x:"20px", opacity: 0, scale: 1.0 },
  animate: { x: 0, opacity: 1, transition: transitionDelay },
  zoom: { scale: 1.0, transition: transitionDelay }
};

const WorkDetail = ({ work, setWorkDetail }) => {
  const [imgWidth, setImgWidth] = useState("auto");
  const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
  const workDetailRef = useRef(null);
  
  return (
    <>
    <motion.div ref={workDetailRef} className="work-detail">
      <motion.div  className="work-detail-content" >
        <WorkDescription  work={work} ref={workDetailRef} />
        {/* <div className="work-detail-content-with-index"> */}
        <div className="work-detail-content work-detail-content-nested" style={{maxHeight:"75vh"}}>
          {work.representations.map((representation, index) =>
          <WorkRepresentation key={"work-representation-" + work.id + "-" + index} representation={representation} work={work} index={index} setCurrentWorkIndex={setCurrentWorkIndex} />
          )}
          
        {/* </div> */}
        {/* <div className="work-representation-index">{currentWorkIndex + "/" + work.representations.length}</div> */}
</div>
      </motion.div>

    </motion.div>
    {/* <motion.div className="work-detail-indicator" layoutId={"work-detail-indicator"} >
      <div className="work-detail-indicator-title">
        <div>{work.title}</div>
        <div className="work-detail-indicator-description">
          <div className="work-detail-indicator-description-text">
          {work.description
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
          }
          </div>
        </div>
        </div> */}
    {/* {work.representations.map((_, index) => (
      <span
        key={"indicator-" + work.id + "-" + index}
        className={
          "indicator-dot"
        }
      ></span>
    ))} */}
  {/* </motion.div> */}
  </>
  );
};

const WorkRepresentation = ({ representation, work, index, setCurrentWorkIndex }) => {
    const [imgWidth, setImgWidth] = useState("auto");
    const ref = useRef(null)
    const isInView = useInView(ref) 

    useEffect(() => {
      if (isInView) {
              setCurrentWorkIndex(index)

      }
    })

  return (
          representation?.image_url && !representation.embed ? (
            <motion.div
              ref={ref}
              key={"work-representation-" + work.id + "-" + index}
              className="work-detail-image"
              initial="initial"
              animate="animate"
              variants={slideInFromRight}
            >
              <motion.img src={representation.image_url} alt={work.title} />
            </motion.div>
          ) : representation?.text ? (
            <motion.div
              ref={ref}
              key={"work-representation-" + work.id + "-" + index}
              className="work-detail-text"
              initial="initial"
              animate="animate"
              variants={slideInFromRight}
            >
              <motion.div
                dangerouslySetInnerHTML={{ __html: representation.text }}
              />
            </motion.div>
          ) : representation?.embed ? (
            <motion.div
              ref={ref}
              key={"work-representation-" + work.id + "-" + index}
              className="work-detail-embed"
              style={{ width: imgWidth }}
              initial="initial"
              animate="animate"
              variants={slideInFromRight}
            >
              {representation.image_url && (
                              <motion.img
                              className="work-detail-embed-image"
                              src={representation.image_url}
                              alt={work.title}
                              onLoad={(e) => {
                                const width = e.target.width;
                                // set the width of the embed below to the width of the image
                                setImgWidth(width);
                              }}
                            />
              )}

              <motion.div
              ref={ref}
                dangerouslySetInnerHTML={{
                  __html: representation.embed,
                }
              }
                style={{ width: imgWidth }}
                              initial="initial"
              animate="animate"
              variants={slideInFromRight}
              ></motion.div>
            </motion.div>
          ) : null
  );
};

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance])
}

const WorkDescription = ({ work, ref }) => {


  return (
        <motion.div className="work-detail-header"
        initial="initial" animate="animate" variants={slideUpFromBottom} key={work.id}
        >
          <div className="work-title">
            <h2>{work.title}</h2>
          </div>
          <div className="work-description-container">
          <div className="work-description" dangerouslySetInnerHTML={{ __html: work.description }}></div>
          { work.project?.description && 
          <>
          <div className="work-project-title">About {work.project.title }</div>
          <div className="work-description" dangerouslySetInnerHTML={{ __html: work.project.description }}></div>
          </>
          }
          </div>
        </motion.div>
  );
};

export default WorkDetail;
