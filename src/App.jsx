
import { useEffect } from "react";
import {Routes, Route, Link} from 'react-router-dom'

import { motion, useAnimationControls } from "framer-motion";
import { Box, Text } from "@chakra-ui/react";
import Favorite from "./Recipe/RecipeFav";
import RecipeHome from "./Recipe/RecipeHome";
import RecipeReducer from "./Recipe/RecipeReducer";

function App() {

  const controls = useAnimationControls()
  const style = {
    height: "3px",
    transformOrigin: "center"
  };

   useEffect(() => {
     document.body.style.backgroundColor = "#fff";
     
    /*  return () => {
       document.body.style.backgroundColor = "";
     }; */
   }, []);

   function handleMouseOver(key){
      controls.start(key)
   }
   function handleMouseOut(key){
      
      controls.start(key)
   }




  return (
    <>
      {/*  <Category/> */}
      {/* <Profile /> */}
      {/* <Reviews /> */}
      {/* <Lorem/> */}
      {/* <Color/> */}
      {/* <Grocery/> */}
      {/* <Nav/> */}
      {/* <Home/> */}
     {/*  <Landing/> */}
      {/* <ReducerF/> */}

      
        
          {/* <Text>MY SHOPPING CART</Text> */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{base:'space-between', xl:'flex-start'}}
            gap={{base:'0', xl:'2em'}}
            w={{base:'100%', xl:'10%'}}
            pos='absolute'
            left={{xl:'5em'}}
            top={{base:'1.5em', xl:'3em'}}
            
            p={{base:'0 2em', xl:'0'}}
          >
            <Link to="/">
              <motion.span
                onMouseOver={() => handleMouseOver("hover1")}
                onMouseOut={() => handleMouseOut("initial1")}
              >
                Home
              </motion.span>
              <motion.div
                style={style}
                variants={{
                  initial1: {
                    scaleX: 0,
                    background: "#e73b14",
                  },

                  hover1: {
                    scaleX: 1,
                  },
                }}
                initial="initial1"
                animate={controls}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              ></motion.div>
            </Link>
            <Link to="/Favorite">
              <motion.span
                onMouseOut={() => handleMouseOut("initial2")}
                onMouseOver={() => handleMouseOver("hover2")}
              >
                Favorite
              </motion.span>
              <motion.div
                style={style}
                variants={{
                  initial2: {
                    scaleX: 0,
                    background: "#e73b14",
                  },

                  hover2: {
                    scaleX: 1,
                  },
                }}
                initial="initial2"
                animate={controls}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
              ></motion.div>
            </Link>
          </Box>
        
      

      <Routes>
        <Route path="/" element={<RecipeReducer />}>
          <Route index element={<RecipeHome />} />
          <Route path="/Favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
