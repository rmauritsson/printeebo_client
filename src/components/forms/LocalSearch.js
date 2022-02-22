const LocalSearch = ({ keyword, setKeyword, placeholder }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div>
      <input
        type="search"
        className="border px-4 py-2 rounded-full"
        placeholder={placeholder}
        value={keyword}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default LocalSearch;
