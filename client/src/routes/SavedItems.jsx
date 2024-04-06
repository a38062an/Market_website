import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SavedItemList from "../components/SavedItemList";
import "../css/saved.css";

const SavedItems = () => {
  return (
    <div>
      <Navbar />
      <Search />
      <h1>Saved Items</h1>
      <SavedItemList />
    </div>
  );
};

export default SavedItems;
