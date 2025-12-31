import { useContext, useRef } from "react";
import { RecipeReducerContext } from "./RecipeReducer";
import { useDisclosure, Box,Image,Text, Button,Modal, ModalBody, ModalCloseButton, ModalOverlay, ModalContent, ModalHeader, ModalFooter } from "@chakra-ui/react";
import { ACTIONS } from "./RecipeReducer";

export default function Card({currentList, handleRecipe}){

  const {state, dispatch} = useContext(RecipeReducerContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
   const initialRef = useRef(null);
  

  return (
    <>
      {state.list &&
        currentList.map((ele) => (
          <Box
            key={ele.id}
            w={{ base: "250px", xl: "349px" }}
            h="318px"
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="37px"
            bg="#D9D9D9"
            flexDir="column"
            p={{ base: "1em", xl: "2em" }}
            flexShrink={0}
          >
            <Image
              w={{ base: "190px", xl: "265px" }}
              h={{ base: "auto", xl: "152px" }}
              borderRadius={"20px"}
              objectFit={"cover"}
              src={ele.image}
              mb="1em"
            />

            <Box
              display="flex"
              alignItems={{ base: "center", xl: "flex-start" }}
              justifyContent={{ base: "center", xl: "flex-start" }}
              w="100%"
              pl=".6em"
              /* mt={{ base: ".2em", xl: "1.5em" }} */
              flexDir="column"
            >
              <Text noOfLines={1} fontSize={"17px"} fontWeight="bold">
                {ele.title}
              </Text>

              <Box
                display="flex"
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{ base: "column", xl: "row" }}
                w="100%"
                m={{ base: ".8em 0", xl: "2em 0 1em 0" }}
                gap={{ base: "1em" }}
              >
                <Button
                  w="86px"
                  h="21px"
                  borderRadius={"10px"}
                  p=".9em"
                  bg="white"
                  onClick={() => {
                    handleRecipe(ele.id);
                    onOpen();
                  }}
                  ref={initialRef}
                >
                  Recipe
                </Button>
                <Button
                  w="auto"
                  h="21px"
                  borderRadius={"10px"}
                  bg="#252525"
                  color="#fff"
                  p=".9em"
                  onClick={() =>
                    dispatch({ type: ACTIONS.FAVORITES, payload: ele })
                  }
                >
                  <Text fontSize={'.6rem'}>
                    Add to Favorites
                  </Text>
                </Button>
              </Box>

              {/* Modal */}
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="scale"
                blockScrollOnMount={true}
                initialFocusRef={initialRef}
              >
                <ModalOverlay bg="rgba(51, 51, 51, 0.14)" />
                <ModalContent>
                  <ModalHeader>Header</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody></ModalBody>
                  <ModalFooter>
                    <Button>Add to Favorites</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </Box>
        ))}
    </>
  );
}