import { useContext } from "react"
import { ToggleContext } from "./home"
import { Box, IconButton, Image } from "@chakra-ui/react"
import { FaCalendar, FaDribbble, FaFacebook, FaFile, FaHome, FaInstagram, FaLinkedin, FaProjectDiagram, FaRProject, FaTeamspeak, FaTimes, FaTwitter, FaXingSquare } from "react-icons/fa";




export default function SideBar(props){

  const toggleMenu = useContext(ToggleContext)
  const classStyle = {
    color : '#357dd0ff',
    fontSize : '1.2rem'
  }


  return (
    <>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
        p="10px 20px"
        flexDir="column"
        pos="absolute"
        zIndex={toggleMenu ? "2000" : "1"}
        bg="white"
        h="100%"
        top="0"
        /* left='0' */
        w="350px"
        overflow={"hidden"}
        transform={toggleMenu ? "translateX(0%)" : "translateX(-100%)"}
        transition="transform .5s ease-in-out"
      >
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent="space-between"
          gap="4em"
        >
          <Image src="src/assets/logo.svg" w="200px" />
          <IconButton onClick={props.onClose} icon={<FaTimes />} size={"sm"} />
        </Box>

        <Box
          display="flex"
          flexDir={"column"}
          alignItems="flex-start"
          justifyContent="center"
          gap={"1.5em"}
          mt="2em"
        >
          <Box cursor={"pointer"}>
            {" "}
            <IconButton icon={<FaHome />} size={"sm"} mr="1em" />
            Home
          </Box>
          <Box cursor={"pointer"}>
            {" "}
            <IconButton icon={<FaTeamspeak />} size={"sm"} mr="1em" />
            Team
          </Box>
          <Box cursor={"pointer"}>
            {" "}
            <IconButton icon={<FaProjectDiagram />} size={"sm"} mr="1em" />
            Projects
          </Box>
          <Box cursor={"pointer"}>
            {" "}
            <IconButton icon={<FaCalendar />} size={"sm"} mr="1em" />
            Calendar
          </Box>
          <Box cursor={"pointer"}>
            {" "}
            <IconButton icon={<FaFile />} size={"sm"} mr="1em" />
            Documents
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          pos="absolute"
          bottom="10em"
          gap=".5em"
          left="50%"
          transform="translateX(-50%)"
        >
          <FaFacebook style={classStyle} />
          <FaTwitter style={classStyle} />
          <FaLinkedin style={classStyle} />
          <FaDribbble style={classStyle} />
          <FaInstagram style={classStyle} />
        </Box>
      </Box>
    </>
  );
}