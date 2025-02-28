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
    <div  onClick={() => setWorkDetail(work)} className="work">
              {workHero && (
        <motion.div transition={layoutTransitionIn} key={'work-representation-' + workHeroIndex + '-' + work.id} layout layoutId={'work-representation-' + workHeroIndex + '-' + work.id} className="work-hero-image">
          <img src={workHero.image_url} />
        </motion.div>
      )}
      <div className="work-title">
        <motion.h2 transition={layoutTransitionIn} layout={"position"} layoutId={'work-title' + work.id}>{work.title}</motion.h2>
        <div className="work-types">
        {work.work_types.map((work_type) => (
          <motion.div transition={layoutTransitionIn} layout key={"work_type-" + work_type.id + '-' + work.id} layoutId={"work_type-" + work_type.id + '-' + work.id}>
            <div>{work_type.name}</div>
          </motion.div>
        ))}
      </div>
        <motion.div transition={layoutTransitionIn} layout layoutId={'work-date-' + work.id} className="work-date">{work.date_descriptive}</motion.div>
      </div>
    </div>
  );
};

export default Work;
