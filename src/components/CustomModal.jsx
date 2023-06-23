import React from 'react'
import './CustomModal.css'
import { useSelector } from 'react-redux'

const CustomModal = ({ userId, showModale, setShowModal }) => {
  const allusers = useSelector((state) => state.app.users)
  const singleUser = allusers.filter((user) => user.id === userId)

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowModal(false)}>Close</button>
        <h1>{singleUser[0].name}</h1>
        <h1>{singleUser[0].email}</h1>
        <h1>{singleUser[0].age}</h1>
        <h1>{singleUser[0].gender}</h1>
      </div>
    </div>
  )
}

export default CustomModal
