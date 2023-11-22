import React, { useState, useEffect, useCallback, useRef } from "react";
import { searchCourse } from "../../../services/operations/courseDetailsAPI";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setSearchResults(response.data.courses);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      debouncedSearch(searchQuery);
    }, 700);
    return () => clearTimeout(debounceTimeout.current);
  }, [searchQuery, debouncedSearch]);

  return (
    <div className="flex flex-col items-center mx-auto my-8 text-white">
      <div>
        <input
          className="text-black border p-2 w-[350px] lg:w-[800px] rounded mx-auto"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for courses..."
        />
      </div>

      {searchResults.length > 0 ? (
        <div className="mt-10 px-10 lg:min-w-[100%]">
          <h3 className="text-xl font-bold mb-5 lg:mb-10">Search Results:</h3>
          <ul>
            {searchResults.map((course) => (
              <Link to={`/courses/${course._id}`}>
                <li
                  className="flex flex-col bg-richblack-800 px-4 rounded-xl lg:flex-row items-center gap-8 py-4 mb-5 lg:mb-10"
                  key={course._id}
                  >
                  <div className="min-w-[30%]">
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="h-36 min-w-[300px] lg:min-w-[220px] lg:max-w-[220px] rounded-lg object-cover"
                      />
                  </div>
                  <div className="min-w-[70%] flex flex-col justify-evenly h-[150px] lg:h-[150px]">
                    <p className="font-extrabold" >{course.courseName} </p>
                    <p>Instructor - {course.instructor.firstName + " " + course.instructor.lastName}</p>
                    <p>Students Enrolled - {course.studentsEnroled.length}</p>
                    <p>Price - &#8377;{course.price}</p>
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
