import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../features/userDetailSlice'

const Navbar = () => {
  const allusers = useSelector((state) => state.app.users)
  const [searchData, setSearchData] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(searchUser(searchData))
  }, [searchData, dispatch])

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <h1 className="navbar-brand">Navbar</h1>
        <Link to="/">Create</Link>
        <Link to="/read">Read All post {allusers.length}</Link>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => setSearchData(e.target.value)}
          />
        </form>
      </div>
    </nav>
  )
}

export default Navbar
