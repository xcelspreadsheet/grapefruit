import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="container about">
            <div style={{margin:"auto"}}>
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 10, -10, 0], transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }}}
                    style={{ fontSize: "2em", marginBottom: "2px" }}
                    >
                    C
                </motion.div>
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -10, 10, 0], transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }}} 
                    style={{ fontSize: "2em", marginBottom: "-4px"}}
>
                    C
                </motion.div>
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, -13, 13, 0], transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }}} 
                    style={{ fontSize: "2em", marginBottom: "1px"}}
>
                    R
                </motion.div>
            </div>
        </div>
    );
};
export default About;

