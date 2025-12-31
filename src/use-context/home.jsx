import { Box, Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalHeader, useDisclosure, ModalOverlay, ModalContent, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import SideBar from "./sidebar";


// eslint-disable-next-line react-refresh/only-export-components
export const ToggleContext = React.createContext();

export default function Home(){

  
  const {isOpen, onClose, onToggle} = useDisclosure()
  const [toggle, setToggle] = useState(false)

 


  function handleToggle(){
    setToggle(prev => !prev)
  }



  return (
    <>
      <ToggleContext.Provider value={toggle}>
        <SideBar onClose={handleToggle} />

        <Box p="20px"
        overflow='hidden'
        
        
        >
          <IconButton icon={<FaBars />} onClick={handleToggle} />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH={"100vh"}
          >
            <Button onClick={onToggle} bg='green.300'>Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton onClick={onClose} />
                <ModalHeader></ModalHeader>
                <ModalBody p='2em' >
                  <Text as='h2' fontSize={'2rem'} textAlign={'center'}>Modal Content</Text>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </Box>
      </ToggleContext.Provider>
    </>
  );
}