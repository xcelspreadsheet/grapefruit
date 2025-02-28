import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Work from './Work';
import WorkDetail from './WorkDetail';

const Works = () => {
    const [works, setWorks] = useState([]);
    const [workDetail, setWorkDetail] = useState(null);

    useEffect(() => {
      fetch("https://xcelspreadsheet.pythonanywhere.com/" + 'api/v1/works/')
        .then(response => response.json())
        .then(data => setWorks(data.results))
        .catch(error => console.error(error));
    }, []);

    return (
        <LayoutGroup>
        <div className="container works">
            {works.map(work => (
                <Work key={"work-" + work.id} work={work} setWorkDetail={setWorkDetail} />
            ))}

            {workDetail && (
                <WorkDetail work={workDetail} setWorkDetail={setWorkDetail} />
            )}
        </div>
        </LayoutGroup>
    );
};

export default Works;