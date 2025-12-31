import { useContext } from "react"
import { RecipeReducerContext } from "./RecipeReducer"
import {Box,useDisclosure,Button,Text,Image,ModalOverlay,ModalContent,ModalBody,ModalFooter,Modal,ModalHeader,ModalCloseButton, UnorderedList, OrderedList, ListItem} from "@chakra-ui/react";
import { ACTIONS } from "./RecipeReducer"

export default function Favorite(){

  const {state,dispatch, handleRecipe, initialRef, stripHtml} = useContext(RecipeReducerContext)
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <>
      <Box
        w="100%"
        display={{ base: "flex", xl: "grid" }}
        gridTemplateColumns={{ xl: "repeat(4,1fr)" }}
        gap={{ base: "1em", lg: "1em" }}
        p={{ base: "8em 2em", lg: "7em 5em" }}
      >

        {state.favorites && 

        state.favorites.map(ele => {
          const isFavorite = state.favorites.some((fav) => fav.id === ele.id);
          
          return (
            <Box
              key={ele.id}
              w={{ base: "200px", xl: "300px" }}
              h="318px"
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius="37px"
              bg="#fff"
              boxShadow={"1px 1.3px 10px 2.5px #00000036"}
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
                <Text noOfLines={1} fontSize={".85rem"} fontWeight={"medium"}>
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
                    p="1.2em"
                    color={"#fff"}
                    fontSize={".7rem"}
                    fontWeight={"medium"}
                    bg="#000"
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
                    bg="#000"
                    color="#fff"
                    p={"1.2em"}
                    px={isFavorite ? "5em" : "1.2em"}
                    fontSize={".7rem"}
                    fontWeight={"medium"}
                    onClick={() => {
                      if (isFavorite) {
                        dispatch({
                          type: ACTIONS.DELETE,
                          payload: ele,
                        });
                      } else {
                        dispatch({
                          type: ACTIONS.FAVORITES,
                          payload: ele,
                        });
                      }
                    }}
                  >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </Button>
                </Box>

                {/* Modal */}
                {state.recipe?.id && (
                  <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    motionPreset="scale"
                    blockScrollOnMount={false}
                    initialFocusRef={initialRef}
                    key={state.recipe.id}
                    scrollBehavior="inside"
                  >
                    <ModalOverlay bg="rgba(51, 51, 51, 0.14)" />
                    <ModalContent>
                      <ModalHeader>
                        <Text noOfLines={1} mr="5em" fontWeight={"bold"}>
                          {state.recipe.title}
                        </Text>
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text m="1em 0" fontWeight={"bold"}>
                          Dish Information
                        </Text>
                        <Box>
                          <Text
                            as="span"
                            noOfLines={state.expanded ? undefined : 4}
                            onClick={() =>
                              dispatch({ type: ACTIONS.SETEXPANDED })
                            }
                          >
                            {stripHtml(state.recipe.summary)}
                          </Text>
                        </Box>

                        <Text m="1em 0" fontWeight={"bold"}>
                          Ingredients
                        </Text>
                        <UnorderedList>
                          {state.recipe.extendedIngredients.map((ing) => (
                            <ListItem key={ing.id}>{ing.original}</ListItem>
                          ))}
                        </UnorderedList>

                        <Text m="1em 0" fontWeight={"bold"}>
                          Instructions
                        </Text>

                        <OrderedList spacing={3}>
                          {state.recipe.analyzedInstructions[0].steps.map(
                            (step) => (
                              <ListItem>{step.step}</ListItem>
                            )
                          )}
                        </OrderedList>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                )}
              </Box>
            </Box>
          );}
        
           
        
      )
        
        
        }


      </Box>
    </>
  );
}