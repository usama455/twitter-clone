import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { loginSuccess } from "../../redux/userSlice";

import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import Person2Icon from '@mui/icons-material/Person2';

import { useLocation } from "react-router-dom";
import { UserService } from "../../services/users";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      const currentUserId = localStorage.getItem("currentId")
      if (currentUserId) {
        const response: any = await UserService.getUserInfo(currentUserId)
        if (response && response.data?.data?.token) {
          dispatch(loginSuccess(response.data.data))
        }
      }
    }

    fetchData();
  }, [dispatch])
  return (
    <div className="sticky top-0 bg-white ">

      <div className="grid grid-cols-1 md:grid-cols-4 my-5 justify-center">
        <div className="mx-auto md:mx-0">
          <img
            src="/twitter-logo.png"
            alt="Twitter Logo"
            width={"40px"}
            className="ml-8"
          />
        </div>

        <div className="col-span-2 md:border-x-2 md:border-slate-200 md:px-6 my-6 md:my-0">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl">
              {location.includes("profile") ? (
                "Profile"
              ) : location.includes("explore") ? (
                "Explore Users"
              ) : (
                "Home"
              )}
            </h2>
            {location.includes("profile") ?
              <Person2Icon />
              : location.includes("explore") ?
                <PeopleIcon />
                :
                <HomeIcon />

            }
          </div>
        </div>

        <div className="px-0 md:px-6 mx-auto">
          <SearchIcon className="absolute m-2" />
          <input type="text" className="bg-blue-100 rounded-full py-2 px-8" />
        </div>
      </div>
    </div>
  )
}

export default Navbar