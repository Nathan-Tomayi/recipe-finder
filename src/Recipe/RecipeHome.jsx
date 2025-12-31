import { Box, Button, Text, Image, Input, SimpleGrid, useDisclosure, ModalOverlay, ModalContent,ModalBody,ModalFooter,Modal, ModalHeader, ModalCloseButton, UnorderedList, ListItem, OrderedList } from "@chakra-ui/react"

import { useContext, useEffect,  useState } from "react";
import { FaCaretLeft, FaCaretRight, FaFilter, FaSearch } from "react-icons/fa";
import {RecipeReducerContext} from './RecipeReducer'
import { ACTIONS } from "./RecipeReducer";
import { API } from "./RecipeReducer";

const URL = "https://api.spoonacular.com/recipes/complexSearch";



export default function RecipeHome(){

  const {state, dispatch, handleRecipe, initialRef, stripHtml} = useContext(RecipeReducerContext)
  const { isOpen, onOpen, onClose } = useDisclosure();

  /* STATES */
 
  const [input, setInput] = useState('')
  const [lastInput, setLastInput] = useState('')
  const [page,setPage] = useState(0)
  
  
  
  const itemsPerPage = 9
  const start = page * itemsPerPage
  const end = start + itemsPerPage
  const currentList = (state.list).slice(start, end)
  const totalPages = Math.ceil((state.list).length / itemsPerPage)

  

  
  
/* SIDE EFFECTS */

  useEffect(()=> {

    if(lastInput){
      localStorage.setItem('lastSearch', lastInput)
    }

  },[lastInput])

  useEffect(()=>{

    const savedInput = localStorage.getItem('lastSearch')

    if(savedInput){
      handleInput(savedInput)
    }

  },[])



  /* FUNCTIONS */

  async function handleInput(params) {
    /* params.preventDefault() */
    
    dispatch({type: ACTIONS.LOADING, payload:true})
   try {

    const res = await fetch(
      `${URL}?query=${params}&apiKey=${API}`
    );
    const data = await res.json()

    if(data?.results){
      
      dispatch({ type: ACTIONS.LIST, payload: data?.results });
      dispatch({ type: ACTIONS.LOADING, payload: false });
      setLastInput(input)
      setInput('')
      console.log(data?.results);
    }

    

    
   } catch (error) {
    console.log(error)
     dispatch({ type: ACTIONS.LOADING, payload: false });
     setLastInput(input)
     setInput("");
   }

  }

  function handleScroll(){
    const search = document.getElementById('search')
    search?.scrollIntoView({behavior:'smooth'})
  }




  return (
    <>
      <Box h="100vh">
        {/* Hero */}

        <Box
          w={{ base: "100%", lg: "100%" }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          m="0 auto"
          p={{ base: "3em 1em", lg: "4em 2em", xl: "1em 5em" }}
          flexDir={{ base: "column", lg: "row" }}
          gap={{ base: "0", lg: "58px" }}
          h="auto"
          bg="#F2F2F2"
        >
          <Box
            display="flex"
            alignItems={{ base: "center", md: "center", xl: "flex-start" }}
            justifyContent={{
              base: "center",
              md: "center",
              lg: "flex-start",
            }}
            w={{ base: "100%", xl: "497px" }}
            flexDir="column"
            /* bg="blue.100" */
            p={{ base: "2em", xl: "0" }}
            m={{ base: "0", md: "8em 0 0 0", lg: "4em 0 0 0", xl: "0" }}
            overflow={"hidden"}
          >
            <Text
              as="h1"
              fontSize={{ base: "3.5rem", xl: "4.5rem" }}
              lineHeight="94px"
              color="#252525"
              fontWeight="700"
              fontStyle="normal"
              w={{ base: "auto", xl: "442px" }}
              textAlign={{ base: "center", lg: "left" }}
            >
              Imagine, Find & Cook.
            </Text>
            <Text
              mt="20px"
              fontSize={"24px"}
              lineHeight="normal"
              fontWeight="400"
              fontStyle="normal"
              textAlign={{ base: "center", xl: "left" }}
              w={{ base: "auto", xl: "483px" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
              in libero risus semper habitant arcu eget. Et integer facilisi
              eget. Lorem ipsum dolo
            </Text>
            <Button
              bg="#252525"
              borderRadius="36px"
              color="white"
              p="24px 48px"
              mt={{ base: "20px", md: "3em", lg: "20px" }}
              onClick={handleScroll}
            >
              Find Recipe
            </Button>
          </Box>

          <Image
            src="./img/food.png"
            objectFit={"cover"}
            boxSize={"750px"}
            display={{ base: "none", xl: "flex" }}
            overflow={"hidden"}
          />
        </Box>

        {/* Recomended */}

        <Box w="100%" h="auto">
          <Box
            display={"flex"}
            gap={{ base: "2em", xl: ".1em" }}
            alignItems={{ base: "center", xl: "flex-start" }}
            justifyContent={{ base: "center", xl: "flex-start" }}
            flexDir={{ base: "column", xl: "row" }}
            w={{ base: "100%", xl: "100%" }}
            m="0 auto"
            p={{ base: "0 1em", xl: "0 5em" }}
          >
            <Box
              display="flex"
              mt={{ base: "-1.5em", xl: "-6em" }}
              gap={{ base: "1em", md: "1.5em", xl: "1.5em" }}
              alignItems={"center"}
              justifyContent={{ base: "center", xl: "flex-start" }}
              w="100%"
              zIndex={1000}
            >
              <Image
                src="./img/Rectangle 18.png"
                w={{ base: "80px", md: "200px", lg: "200px" }}
                h={{ base: "auto", xl: "369px" }}
                objectFit={"cover"}
                borderRadius="144px"
                /* bg="green.200" */
              />
              <Image
                src="./img/Rectangle 19.png"
                w={{ base: "80px", md: "200px", lg: "200px" }}
                h={{ base: "auto", xl: "369px" }}
                objectFit={"cover"}
                borderRadius="144px"
              />
              <Image
                src="./img/Rectangle 20.png"
                w={{ base: "80px", md: "200px", lg: "200px" }}
                h={{ base: "auto", xl: "369px" }}
                objectFit={"cover"}
                borderRadius="144px"
              />
            </Box>

            <Box mt="20px">
              <Box
                display={"flex"}
                flexDir={"column"}
                gap={{ base: "1em", xl: ".5em" }}
                alignItems={{ base: "center", xl: "flex-start" }}
                justifyContent={{ base: "center", xl: "flex-start" }}
              >
                <Box
                  w={{ base: "50%", md: "20%", xl: "20%" }}
                  h="6px"
                  bg="#252525"
                ></Box>
                <Text
                  fontSize={"1.5rem"}
                  fontStyle={"normal"}
                  fontWeight={"500"}
                  lineHeight={"normal"}
                >
                  Chef ABC
                </Text>
                <Text
                  w="auto"
                  fontSize={{ base: "1.375rem", lg: "2rem", xl: "1.375rem" }}
                  fontStyle={"normal"}
                  fontWeight={"300"}
                  lineHeight={"normal"}
                  color={"#252525CC"}
                  textAlign={{ base: "center", xl: "left" }}
                  p={{ base: "0 1em", lg: "0 5em", xl: "0" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Faucibus in libero risus sem
                </Text>
                <Box
                  display="flex"
                  alignItems={"center"}
                  gap={{ base: ".5em", xl: "1.3125em" }}
                >
                  <Image
                    src="./img/Ellipse 3.png"
                    w={{ base: "70px", lg: "100px" }}
                    h={{ base: "70px", lg: "100px" }}
                  />
                  <Image
                    src="./img/Ellipse 4.png"
                    w={{ base: "70px", lg: "100px" }}
                    h={{ base: "70px", lg: "100px" }}
                  />
                  <Image
                    src="./img/Ellipse 5.png"
                    w={{ base: "70px", lg: "100px" }}
                    h={{ base: "70px", lg: "100px" }}
                  />
                  <Image
                    src="./img/Ellipse 6.png"
                    w={{ base: "70px", lg: "100px" }}
                    h={{ base: "70px", lg: "100px" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Search */}

          <Box
            w={"auto"}
            display={"flex"}
            alignItems="center"
            justifyContent="center"
            m={{ base: "3em auto", lg: "7em auto 3em auto" }}
            p={{ base: "0 1.2em", lg: "0 8em" }}
            gap={{ base: ".5em", lg: "1.6875em" }}
            h="auto"
            id="search"
          >
            <Input
              w="100%"
              borderRadius={"36px"}
              h={{ base: "45px", lg: "66px" }}
              bg="#fff"
              color={"#000"}
              boxShadow={".2px .3px 10px 2.5px #00000036"}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleInput(input);
                }
              }}
              placeholder="ingredient eg milk..."
              _placeholder={{ color: "#000" }}
              _focus={{
                outline:'none',
                border:'none'
              }}

              _active={{
                border:'none'
              }}
            />
            <Button
              bg="#252525"
              color="#fff"
              borderRadius={"36px"}
              display="inline-flex"
              p=".5em"
              alignItems={"center"}
              onClick={() => handleInput(input)}
            >
              <FaSearch />
            </Button>
          </Box>

          {/* toggle */}

          {/* Content--list */}
          {state.loading && <Text textAlign={"center"}>Loading...</Text>}

          <Box
            display={{ base: "flex", md: "flex", lg: "flex", xl: "grid" }}
            gridTemplateColumns={{ lg: "repeat(4,1fr)" }}
            gap={{ base: "1em", lg: "2em" }}
            p={{ base: "0", lg: "2em 5em" }}
            w="100%"
            overflowX={"auto"}
            pb="2em"
            /* mt={toggle ? "7em" : "0"} */
            transition={"all .5s "}

            /* css={{
              "&::-webkit-scrollbar": { display: "none" }, // optional hide scrollbar
            }} */
          >
            {state.list &&
              currentList.map((ele) => {
                const isFavorite = state.favorites.some(
                  (fav) => fav.id === ele.id
                );

                return (
                  <Box
                    key={ele.id}
                    w={{ base: "200px", xl: "300px" }}
                    h="318px"
                    display="flex"
                    alignItems={"center"}
                    justifyContent={"center"}
                    borderRadius="10px"
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
                      <Text
                        noOfLines={state.expanded ? undefined : 1}
                        onClick={() => dispatch({ type: ACTIONS.SETEXPANDED })}
                        fontSize={".85rem"}
                        fontWeight={"medium"}

                        /* transition={'all 3s '} */
                      >
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
                          px={isFavorite ? {base:"1em", md:'5em'} : "1.2em"}
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
                          {isFavorite
                            ? "Remove from Favorites"
                            : "Add to Favorites"}
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
                                  <ListItem key={ing.id}>
                                    {ing.original}
                                  </ListItem>
                                ))}
                              </UnorderedList>

                              <Text m="1em 0" fontWeight={"bold"}>
                                Instructions
                              </Text>

                              <OrderedList spacing={3}>
                                {state.recipe.analyzedInstructions[0]?.steps.map(
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
                );
              })}
          </Box>

          {!state.loading && (
            <Box
              display={{ base: "none", md: "none", lg: "none", xl: "flex" }}
              alignItems="center"
              justifyContent={"center"}
              w="100%"
              m="3em auto"
              fontSize={"1.5rem"}
              gap="1em"
            >
              <FaCaretLeft
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                color="#D9D9D9"
                fontSize={"2rem"}
                cursor={"pointer"}
              />
              <Text>{page + 1}</Text>
              <FaCaretRight
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages - 1))
                }
                color="#D9D9D9"
                fontSize={"2rem"}
                cursor={"pointer"}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}