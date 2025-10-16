import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Work from './Work';
import WorkDetail from './WorkDetail';
import debounce from 'lodash.debounce';

const Works = () => {
    const [works, setWorks] = useState([]);
    const [workDetail, setWorkDetail] = useState(null);
    const debouncedSetWorkDetail = useRef(debounce(setWorkDetail, 500)).current;

    useEffect(() => {
      fetch("https://xcelspreadsheet.pythonanywhere.com/" + 'api/v1/works/')
        .then(response => response.json())
        .then(data => setWorks(data.results))
        .catch(error => console.error(error));
    }, []);

    return (
        <LayoutGroup>
        <div className="container works">

        {workDetail && (
                <WorkDetail work={workDetail} setWorkDetail={setWorkDetail} />
            )}
            <div className="work-list">
            {works.map(work => (
                <Work key={"work-" + work.id} work={work} setWorkDetail={setWorkDetail} />
            ))}
            </div>
        </div>
        </LayoutGroup>
    );
};

export default Works;