import React, { useState, useEffect, useCallback, useRef } from "react";
import {searchCourse } from "../../../services/operations/courseDetailsAPI";
import { Link } from "react-router-dom";
import RatingStars from "../../Common/RatingStars";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  const debounceTimeout = useRef(null);

  const debouncedSearch = useCallback(
    async (query) => {
      try {
        setLoading(true);
        const response = await searchCourse(String(query));
        if (!response) {
          throw new Error("No response received");
        }
        if (response.status !== 200) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        let sortedResults = response.data.courses;
        console.log(sortedResults, "printing result");
        if (sortOption === "priceHigh") {
          sortedResults = sortedResults.sort((a, b) => b.price - a.price);
        } else if (sortOption === "priceLow") {
          sortedResults = sortedResults.sort((a, b) => a.price - b.price);
        } else if (sortOption === "date") {
          sortedResults = sortedResults.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        else if (sortOption === "Top") {
          sortedResults = sortedResults.sort((a, b) => a.ratingAndReviews[0]?.rating - b.ratingAndReviews[0]?.rating);
        }



        setSearchResults(sortedResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    },
    [sortOption]
  );



  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 700);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery, debouncedSearch]);

  return (
    <div className="flex flex-col items-center lg:mx-auto my-8 text-white">
      <div className="relative">
        <input
          className="text-black border p-2 w-[350px] lg:w-[850px] rounded mx-auto"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for courses..."
        />

        <div className="absolute -right-2 text-sm -bottom-22 p-2 rounded">
          <label className="pr-2" htmlFor="sortOption">Sort:</label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="ml-2 p-2 border rounded bg-richblack-900 border-richblack-800 mb-10 px-2"
          >
            <option value="default">Default</option>
            <option value="priceHigh">Price - High to Low</option>
            <option value="priceLow">Price - Low to High</option>
            <option value="date">Latest</option>
            <option value="Top">Top Courses</option>
          </select>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="mt-12 lg:mt-10 px-10 lg:min-w-[100%]">
          <h3 className="text-xl font-bold mb-5 lg:mb-10">Search Results:</h3>
          <ul>
            {searchResults.map((course) => (
              <Link to={`/courses/${course._id}`} key={course._id}>
                <li
                  className="flex flex-col text-left bg-richblack-800 px-4 rounded-xl lg:flex-row items-center gap-4 py-4 mb-5 lg:mb-10"
                >
                  <div className="min-w-[35%]">
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="h-36 min-w-[300px] lg:min-w-[250px] lg:max-w-[250px] rounded-lg object-cover"
                    />
                  </div>
                  <div className="min-w-[99%] lg:min-w-[65%] flex flex-col  justify-evenly h-[150px] lg:h-[150px]">
                    <p className="font-extrabold lg:mr-10">{course.courseName} </p>
                    <p>Instructor - {course.instructor.firstName + " " + course.instructor.lastName}</p>
                    <p>Students Enrolled - {course.studentsEnroled.length}</p>
                    <p>Price - &#8377;{course.price}</p>
                    <div className="flex">
                      <p>Rating-</p>
                      <RatingStars Review_Count={course.ratingAndReviews[0]?.rating} Star_Size={24} />
                    </div>

                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ) : !loading && searchQuery ? (
        <div className="mt-10 text-xl font-bold">No Courses Found for : {searchQuery}</div>
      ) : null}
    </div>
  );
};

export default SearchPage;
