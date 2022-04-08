const LocalSearch = ({ keyword, setKeyword, placeholder }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <div className={styles.wrapper}>
      <div className="flex items-center">
        <svg
          className={styles.svg}
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.0004 19.0004L14.6504 14.6504"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={handleSearchChange}
        className={styles.input}
      />
    </div>
  );
};

const styles = {
  wrapper:
    "w-[40%] flex space-x-3 border-b border-gray-200 dark:border-gray-700",
  svg: "fill-stroke text-gray-600 dark:text-white",
  input:
    "text-sm text-gray-600 border-transparent focus:border-transparent focus:ring-0",
};

export default LocalSearch;
