import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../Common/RatingStars"

function Sppu_Course_Card({ course, Height }) {
  
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])
  
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="max-w-[130px] mx-auto lg:max-w-[330px]">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`h-[100px] lg:h-[200px] flex justify-center lg:w-full w-[300px] rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 lg:px-1  py-3">
            <p className="lg:text-xl text-sm  text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="hidden lg:flex gap-2 items-center">
                <span className="text-yellow-5">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
            </div>
            <p className="lg:text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Sppu_Course_Card;