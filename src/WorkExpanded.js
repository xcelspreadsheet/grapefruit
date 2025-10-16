import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

const layoutTransitionIn = {
    layout: {
        duration: 0.15,
        ease: 'easeOut',
      },
}
const Work = ({ work, setWorkDetail }) => {
  const workHero = work.representations.find(
    (representation) => representation.image_url
  );

  const workHeroIndex = work.representations.findIndex(
    (representation) => representation.image_url
  );

  return (
    <div className="work-large">
      {work.representations.map((representation, index) => (
        representation.image_url &&
        <motion.div key={"work-representation-" + work.id + "-" + index} className="work-image">
          <motion.img
            src={representation.image_url}
            alt={work.title}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default Work;
