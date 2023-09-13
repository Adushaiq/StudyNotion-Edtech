import { RxCross2 } from "react-icons/rx"
import { useSelector } from "react-redux"
import {submitAssignment} from "../../../services/operations/courseDetailsAPI"
import AssignmentForm from "./AssignmentForm"

export default function AssignmentModal({ setAssignmentModal }) {
  
  const { token } = useSelector((state) => state.auth)

  const onSubmit = async (data) => {
    
    const response = await submitAssignment(data, token)
    
    setAssignmentModal(false)
  }
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[500px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">
            Submit Assignment
          </p>
          <button onClick={() => setAssignmentModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="mx-auto flex w-11/12 items-center justify-start gap-x-4 lg:justify-center">
            <AssignmentForm onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}
