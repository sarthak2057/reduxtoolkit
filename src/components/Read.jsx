import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, showUser } from '../features/userDetailSlice'
import { Link } from 'react-router-dom'
import CustomModal from './CustomModal'

const Read = () => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState()
  const [radioData, setRadioData] = useState('')
  const { users, loading, searchData } = useSelector((state) => state.app)
  useEffect(() => {
    dispatch(showUser())
  }, [dispatch])

  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <div>
      {showModal && (
        <CustomModal
          userId={id}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      <h2>All Data</h2>
      <div className="mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="gender"
          checked={radioData === ''}
          onChange={() => setRadioData('')}
        />
        <label className="form-check-label">All</label>
      </div>

      <div className="mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="gender"
          value="Male"
          checked={radioData === 'Male'}
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label className="form-check-label">Male</label>
      </div>
      <div className="mb-3">
        <input
          className="form-check-input"
          type="radio"
          name="gender"
          value="Female"
          checked={radioData === 'Female'}
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label className="form-check-label">Female</label>
      </div>
      {users &&
        users
          .filter((ele) => {
            if (searchData.length === 0) {
              return ele
            } else {
              return ele.name.toLowerCase().includes(searchData.toLowerCase())
            }
          })
          .filter((ele) => {
            if (radioData === 'Male') {
              return ele.gender === radioData
            } else if (radioData === 'Female') {
              return ele.gender === radioData
            } else return ele
          })
          .map((user, index) => (
            <div className="my-2" key={index}>
              <div className="card w-50 mx-auto">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted"> {user.email}</h6>
                <span>{user.gender}</span>
                <div className="d-flex ">
                  <button onClick={() => [setId(user.id), setShowModal(true)]}>
                    View
                  </button>
                  <Link to={`/edit/${user.id}`}>Edit</Link>
                  <Link onClick={() => dispatch(deleteUser(user.id))}>
                    Delete
                  </Link>
                </div>
              </div>
            </div>
          ))}
    </div>
  )
}

export default Read
