import React from "react";


const SearchCommunity = (props) => {


  return (
     <input className={props.className} onChange={props.onChange} type="text" name={props.name} placeholder={props.placeholder} ></input>
  );
};



export default SearchCommunity;
