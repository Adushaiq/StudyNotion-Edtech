import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../Common/RatingStars"

function Course_Card({ course }) {
  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="max-w-[360px]">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`h-[200px] flex justify-center lg:w-full w-[300px] lg:ml-0 ml-[25px] rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 lg:px-1 px-6 py-3">
            <p className="text-xl  text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-5">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Course_Card;