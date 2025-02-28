import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function SearchBar({ onSearchSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(input);
  };

  return (
    <form
      onSubmit={handleSubmit}  // Add the onSubmit handler here.
      className="
        relative w-[150px] sm:w-[200px] 
        transition-all duration-300 ease-in-out
        focus-within:w-[300px] sm:focus-within:w-[400px] lg:focus-within:w-[250px]
      "
    >
      <input 
        onChange={handleChange}
        value={input}
        placeholder="Search..."
        type="text"
        style={{ textIndent: "12px" }}
        className="
          w-full h-[40px] 
          rounded-3xl bg-gray-800/50 border border-black 
          pl-12 pr-12 py-2 focus:outline-none caret-white
        "
      />
      <button
        type="submit"  // Change type to "submit" so clicking it submits the form.
        className="absolute inset-y-0 right-0 flex items-center justify-center 
                   w-[40px] h-[40px] btn btn-circle btn-secondary"
      >
        <FaSearch className="w-4 h-4 text-white" />
      </button>
    </form>
  );
}

export default SearchBar;
