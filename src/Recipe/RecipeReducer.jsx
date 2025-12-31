import React, { useReducer, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import { useDisclosure } from "@chakra-ui/react";

export const API = "5c92be3fccd147ab902ff541eeaf1ca4";
export const ACTIONS ={
  
  LOADING : 'loading',
  RECIPE : 'recipe',
  LIST : 'list',
  FAVORITES : 'favorites',
  DELETE:'delete',
  SETEXPANDED: 'expanded'
}
export const RecipeReducerContext = React.createContext()

const reducer = (state,action) => {
    switch(action.type){
      case ACTIONS.LOADING:
        return {...state, loading: action.payload}
      case ACTIONS.RECIPE:
        return {...state, recipe:action.payload}
      case ACTIONS.LIST:
        return {...state, list:action.payload }
      case ACTIONS.FAVORITES:
        return {...state, 
          favorites: 
          state.favorites.some(ele => ele.id === action.payload.id) 
          ? state.favorites
          : [...state.favorites, action.payload]
        }
      case ACTIONS.DELETE:
        return {...state, 
          favorites : 
          state.favorites.filter(ele => !ele.id === action.payload.id)
        }
      case ACTIONS.SETEXPANDED:
        return {...state,
          expanded: !state.expanded
        }
      default:
        return state
    }
}

export default function RecipeReducer(){

  const [state, dispatch] = useReducer(reducer, {loading:false,  recipe:{}, list:[], favorites:[], expanded:false})


  const initialRef = useRef(null)

    async function handleRecipe(id) {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API}`
        );
        const data = await res.json()
        console.log(data)
        if(data){
          dispatch({type: ACTIONS.RECIPE, payload: data})
         
          
        }
  
        
      } catch (error) {
        console.log(error)
      }

    
      
    }

      function stripHtml(html) {
        let div = document.createElement("div");
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
      }

  
  return(<>

  <RecipeReducerContext.Provider value={{state,dispatch, handleRecipe, initialRef, stripHtml}}>
    <Outlet/>
  </RecipeReducerContext.Provider>
  
  
  </>)
}