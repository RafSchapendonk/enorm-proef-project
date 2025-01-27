import PropTypes from "prop-types";

function SearchButton({ onSearch }) {
  return (
    <button
      onClick={onSearch}
      className="w-full p-2 bg-red-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
    >
      Search
    </button>
  );
}

SearchButton.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchButton;
