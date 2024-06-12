import { useCallback } from "react";
import { useState } from "react";
import React, { useEffect } from "react";
import './styles.css';

// import Form from 'react-bootstrap/Form';

const Filter = (props) => {
    const allMovies = props.movies
    var [allOptions, setAllOptions] = useState([]);
    const  [filters,setFilters]=useState([])
    const [selected, setSelected]=useState("")
    // console.log(allMovies)
    
    // const unique = [...new Set(list)];
    
    // onChange={onFilterchange}
    useEffect(()=>{
            const filter = Object.entries(allMovies[0]).map((_filter, i)=> {
                return({
                    name: _filter[0],
                    id: i
                })
            }).filter((item)=> 
                ['Year', 'Certificate', 'Genre'].includes(item.name))
        return ()=>{
            setFilters(filter)
        }
    }, [allMovies])

    // const allOptions=[]
    const onFilterChange = useCallback((event) => {
        const { target: {value} } = event
        setSelected(value)
        allOptions=[]
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
                    const {Genre} = movie
                    const genre = Genre.split(",")
                    genre
                    .map((_genre)=>_genre.trim())
                    .forEach((_genre)=> {
                        allOptions.push(_genre);
                    });
                    break;
                default:
            }
        });
        setAllOptions([...new Set(allOptions)]);
        //console.log([...new Set(allOptions)])
            
        
    }, [allMovies,allOptions]);
    

    const onFilterValueChange = useCallback((event) => {
        const { target: {value} } = event
        // props.onChange(selected,value)
        console.log(filters)
        switch(selected){
            case "3":
                props.onChange("Year",value+".0")
                break;
            case "4":
                props.onChange("Certificate",value)
                break;  
            case "6":
                props.onChange("Genre",value)
                break;
            default:
        }
    }, [selected,props.onChange, filters, props])

    const onReset = (()=> {
        setSelected("");
        setAllOptions([])
        props.onChange()
    })

    return(
        <div>
            {filters.length > 0 && (
                <select value={selected} onChange={onFilterChange}>
                    <option selected disabled value="">Select how you want to Filter</option>
                    {filters.map((filt)=>{
                        // console.log(filt)
                    return(
                        <option value={filt.id} >{filt.name}</option>
                    )})}
                </select>
            )
            }
            {allOptions.length > 0&& (
            <>
            <select onChange={onFilterValueChange}>
                <option selected disabled value="">Select an Option</option>
                {
                allOptions.map((filt)=>{
                    // console.log(filt)
                return(
                    <option value={filt}>{filt}</option>
                )})}
            </select>
            <button onClick={onReset}>Reset</button>
            </>
            )
            }



    {/* <Form.Select  aria-label="Default select example" size="sm">
    <option>Filters</option>
       {filters.forEach((filt)=>{
        console.log(filt)
        return(
            <option value={filt.id}>{filt.name}</option>
        )
       }
    )}
    </Form.Select>
    <Form.Select aria-label="Default select example" size="sm">
       <option>Options</option>
       {allOptions.map((option)=>{
        console.log(option)
        return(
            <option value={option}>{option}</option>
        )
       }
    )}
     </Form.Select> */}
        </div>
    )
    
};
export default Filter
//onChange={onFilterchange(value)}