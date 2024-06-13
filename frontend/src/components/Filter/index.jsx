import React, { useEffect, useCallback, useState } from "react";

import './styles.css';

const Filter = (props) => {
    const allMovies = props.movies;
    var [allOptions, setAllOptions] = useState([]);
    const  [filters,setFilters]=useState([]);
    const [selected, setSelected]=useState("");

    useEffect(()=>{
            const filter = Object.entries(allMovies[0]).map((_filter, i)=> {
                return({
                    name: _filter[0],
                    id: i
                });
            }).filter((item)=> 
                ['Year', 'Certificate', 'Genre'].includes(item.name));
        return ()=>{
            setFilters(filter);
        }
    }, [allMovies]);

    const onFilterChange = useCallback((event) => {
        const { target: {value} } = event;
        setSelected(value);
        allOptions=[];
        allMovies.forEach((movie, i)=> {
            switch(value){
                case "3":
                    allOptions.push(movie.Year.substring(0, movie.Year.length - 2));
                    break;
                case "4":
                    if (movie["Certificate"] !== ""){
                        allOptions.push(movie["Certificate"]);
                    }
                    break;  
                case "6":
                    const {Genre} = movie;
                    const genre = Genre.split(",");
                    genre
                    .map((_genre)=>_genre.trim())
                    .forEach((_genre)=> {
                        allOptions.push(_genre);
                    });
                    break;
                default:
            };
        });
        if (value == "3"){
            setAllOptions(allOptions.sort().reverse());
        }else{
            setAllOptions(allOptions.sort());
        }
        setAllOptions([...new Set(allOptions)]);

    }, [allMovies,allOptions]);
    

    const onFilterValueChange = useCallback((event) => {
        const { target: {value} } = event;
        switch(selected){
            case "3":
                props.onChange("Year",value+".0");
                break;
            case "4":
                props.onChange("Certificate",value);
                break;  
            case "6":
                props.onChange("Genre",value);
                break;
            default:
        }
    }, [selected,props.onChange, filters, props]);

    const onReset = (()=> {
        setSelected("");
        setAllOptions([]);
        props.onChange();
    });

    return(
        <div>
            {filters.length > 0 && (
                <select value={selected} onChange={onFilterChange}>
                    <option selected disabled value="">Select how you want to Filter</option>
                    {filters.map((filt)=>{
                        return(
                            <option value={filt.id} >{filt.name}</option>
                        );
                    })};
                </select>
            )};
            {allOptions.length > 0&& (
            <>
            <select onChange={onFilterValueChange}>
                <option selected disabled value="">Select an Option</option>
                {
                allOptions.map((filt)=>{
                    return(
                        <option value={filt}>{filt}</option>
                    )
                })};
            </select>
            <button onClick={onReset}>Reset</button>
            </>
            )};
        </div>
    );
};
export default Filter;