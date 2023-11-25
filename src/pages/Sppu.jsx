import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../services/operations/courseDetailsAPI';
import { useSelector } from 'react-redux';
import Sppu_Course_Card from '../components/core/Catalog/Sppu_Course_Card';
import Course_Slider from '../components/core/Catalog/Course_Slider';

const Sppu = () => {
    const [loading, setLoading] = useState(false);
    const [courses, setCourses] = useState([]);
    const { user } = useSelector((state) => state.profile);
    const userDetails = user?.studentDetails;

    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        async function getCourses() {
            try {
                setLoading(true);
                const response = await getAllCourses();
                if (!response) {
                    console.log('No courses fetched');
                }
                console.log('Courses API: ', response);
                setCourses(response);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        getCourses();
    }, []);

    const matchingCourses = courses?.filter(
        (course) =>
            course?.courseLevel === userDetails?.experience &&
            course?.department === userDetails?.department &&
            course?.year === userDetails?.year
    );

    const allSppuCourse = courses?.filter(
        (course) =>
            course?.category?.name === 'SPPU Syllabus'
    );

    // Function to filter courses based on selected options
    const filterCourses = () => {
        let filteredCourses = allSppuCourse;

        if (selectedDepartment) {
            filteredCourses = filteredCourses.filter(
                (course) => course?.department === selectedDepartment
            );
        }

        if (selectedYear) {
            filteredCourses = filteredCourses.filter(
                (course) => course?.year === selectedYear
            );
        }

        // Apply other filters as needed

        return filteredCourses;
    };

    return (
        <div className="lg:w-10/12 w-11/12 mx-auto text-white mt-10">
            {user?.accountType === 'Student' && (
                <div>
                    <h2 className="font-bold text-2xl lg:text-3xl mb-10">
                        Course's For You
                    </h2>
                    <div className="lg:mb-20 mb-10">
                        <Course_Slider Courses={matchingCourses} />
                    </div>
                </div>
            )}

            <div>
                <div className='flex flex-col lg:flex-row lg:items-center justify-between'>
                    <h2 className="font-bold text-2xl lg:text-3xl mb-10">
                        All Sppu Course's
                    </h2>
                    {/* Department Filter Dropdown */}
                    <div>
                        <select
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="p-2 border rounded bg-richblack-900 border-richblack-800 mb-10 px-2"
                        >
                            <option value="">All Departments</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Computer">Computer</option>
                            <option value="Civil">Civil</option>
                            <option value="Mechanical">Mechanical</option>
                        </select>

                        {/* Year Filter Dropdown */}
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="ml-2 p-2 border rounded bg-richblack-900 border-richblack-800 mb-10 px-2"
                        >
                            <option value="">All Years</option>
                            <option value="FE">FE</option>
                            <option value="SE">SE</option>
                            <option value="TE">TE</option>
                            <option value="BE">BE</option>
                        </select>
                    </div>
                </div>
                <div className="mb-20 max-w-[88%] lg:max-w-[100%] justify-between mx-auto flex flex-wrap gap-9">
                    {filterCourses().map((course, i) => (
                        <Sppu_Course_Card course={course} key={i} Height={'h-[250px]'} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sppu;
