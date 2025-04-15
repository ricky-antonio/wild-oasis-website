const FilterButton = ({filter, handleFilter, activeFilter, children}) => {
    console.log(filter, activeFilter)
    return (
        <button
            onClick={() => handleFilter(filter)}
            className={`px-5 py-2 duration-300 hover:bg-primary-700 ${activeFilter === filter && "bg-primary-700 text-primary-50"}`}
        >
            {children}
        </button>
    );
};

export default FilterButton;
