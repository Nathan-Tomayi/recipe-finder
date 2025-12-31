import { useContext, useState } from "react";
import menu from "./data";
import { Box, Text, Image, SimpleGrid } from "@chakra-ui/react";
import { CategoryContext } from "./Category";

export default function Menu() {
  const toggleBol = useContext(CategoryContext);

  if (!toggleBol || Object.keys(toggleBol).length === 0) return null;

  const filteredMenu = menu.filter((item) => {
    if (toggleBol["All"]) return true;
    return toggleBol[item.category];
  });

  console.log(filteredMenu);

  const menuElements = filteredMenu.map((ele) => (
    <Box
      key={ele.id}
      display="flex"
      w="100%"
      h="250px"
      alignItems="center"
      justifyContent="space-around"
      border="1px solid #333"
    >
      <Box>
        <Image src={ele.img} />
      </Box>

      <Box>
        <Box>
          <Text>{ele.title}</Text>
          <Text>{ele.price}</Text>
        </Box>

        <Box>
          <Text as="p">{ele.desc}</Text>
        </Box>
      </Box>
    </Box>
  ));

  return (
    <>
      <SimpleGrid columns={2} spacing={6} gap={2} p="2em" mt="2m">
        {menuElements}
      </SimpleGrid>
    </>
  );
}
