import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll } from 'framer-motion';

const layoutTransitionIn = {
    layout: {
        duration: 0.15,
        ease: 'easeOut',
      },
}
const Work = ({ work, setWorkDetail }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = useRef(null)
  const isInView = useInView(ref, { margin: "0px -50% 0px -50%" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"]
  })

  useEffect(() => {
    const bounding = ref.current.getBoundingClientRect()
    if (isInView) {
      setIsExpanded(true)
      setWorkDetail(work)
    } else {
      setIsExpanded(false)
    }
  }, [isInView])

  return (
    <motion.div ref={ref} className={"work-small-container" + (isInView ? " expanded" : "")}
      animate={{ paddingLeft: isExpanded ? "1em" : 0, paddingRight: isExpanded ? "1em" : 0 }}
      transition={{ duration: 0.3 }}
    >
    <div className="work-small">
      {work.representations.map((representation, index) => (
        <AnimatePresence>
        {/* <div>small</div> */}
        {/* <motion.div layout={"preserve-aspect"} layoutScroll layoutId={"work-representation-" + work.id + "-" + index} key={"work-representation-" + work.id + "-" + index} className="work-image"> */}
        {representation.image_url && (
          <motion.div
            className="work-image"
            // animate={{ width: isExpanded ? 75 : 50 }}
            // transition={{ duration: 0.3 }}
          >
            <motion.img
              src={representation.image_url}
              alt={work.title}
            />
          </motion.div>
        )}
          {representation.text && (
          <motion.div 
            className="work-image work-text"
            dangerouslySetInnerHTML={{ __html: representation.text }}
            // animate={{ width: isExpanded ? 75 : 50 }}
            // transition={{ duration: 0.3 }}
          >

          </motion.div>
        )}
        </AnimatePresence>
      ))}
    </div>  
    </motion.div>
  );
};

export default Work;

const WorkSmall = ({ work, setWorkDetail }) => {
  const workHero = work.representations.find(
    (representation) => representation.image_url
  );

  const workHeroIndex = work.representations.findIndex(
    (representation) => representation.image_url
  );
  return (
    <div className="work-small">
      {work.representations.map((representation, index) => (
        
        <AnimatePresence>
        {/* <div>small</div> */}
        {/* <motion.div layout={"preserve-aspect"} layoutScroll layoutId={"work-representation-" + work.id + "-" + index} key={"work-representation-" + work.id + "-" + index} className="work-image"> */}
        {representation.image_url && (
          <motion.div  className="work-image">
            <motion.img
                src={representation.image_url}
                alt={work.title}
              />
          </motion.div>
        )}
                {representation.text && (
          <motion.div style={{ backgroundColor: "white"}} className="work-image work-text" dangerouslySetInnerHTML={{ __html: representation.text }}>

          </motion.div>
        )}
        </AnimatePresence>
      ))}
    </div>
  );
};