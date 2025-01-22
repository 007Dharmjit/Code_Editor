import { useEffect, useContext, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FriendContext } from "../context/FriendContext.jsx";
import { BsFillSendFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const AccountPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const { fetchFolders, userData, folders } = useAuth();
  const { FriendsData, friends } = useContext(FriendContext);
  const navigate = useNavigate();
  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };
  useEffect(() => {
    if (userData?.id) {
      fetchFolders(); // Fetch folders when userData is available
      FriendsData(userData.id);
    }
  }, [userData]);
  const sendMessage = (friendID,userId) => { 
    navigate(`/MessagePage/${userId}/${friendID}`); 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Profile Section */}
      {userData ? (
        <>
          <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-md shadow-md">
            <div className="flex items-center gap-4">
              {/* Profile Image */}
              <div className="relative">
                <label htmlFor="profileImageInput" className="cursor-pointer">
                  <img
                    src={
                      profileImage ||
                      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1737209112~exp=1737212712~hmac=4fdcc7726126f5dce10a263cab39c96a8c073505ba74ae9549fa4fe7be243a89&w=740"
                    }
                    alt="Profile"
                    className="w-20 h-20 bg-gray-700 rounded-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition">
                    <span className="text-sm text-gray-200">Change</span>
                  </div>
                </label>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold">{userData.username}</h1>
                <p className="text-gray-400"> {userData.email}</p>
                <p className="mt-1">Short bio about the user...</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
      {/* Folder Section */}
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">My Folders</h2>
        <ul className="space-y-4">
          {folders.length === 0 ? (
            <h2 className="text-2xl text-zinc-700 font-bold  ">
              No folders to display
            </h2>
          ) : (
            <>
              {folders.map((folder) => {
                return (
                  <li
                    key={folder._id}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-md"
                  >
                    <span>{folder.folderName} </span>
                    <Link to="/Folder" className="text-blue-300">
                      Edit
                    </Link>
                  </li>
                );
              })}
            </>
          )}
          {/* <li className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
            <span>Folder 1</span>
            <button className="text-blue-300">Edit</button>
          </li> */}
        </ul>
      </div>

      {/* Problem Section */}
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">My Problems</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
            <span>Problem 1</span>
            <button className="text-red-300">Delete</button>
          </li>
          <li className="flex justify-between items-center bg-gray-700 p-4 rounded-md">
            <span>Problem 2</span>
            <button className="text-red-300">Delete</button>
          </li>
        </ul>
      </div>

      {/* Friend Section */}
      <div className="max-w-4xl mx-auto p-6 mt-6 bg-gray-800 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Friends {friends.username}</h2>
        {friends.length > 0 ? (
          <ul className="space-y-4">
            {friends.map((friend) => (
              <div key={friend._id} className="flex items-center">
                <img
                  src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1737209112~exp=1737212712~hmac=4fdcc7726126f5dce10a263cab39c96a8c073505ba74ae9549fa4fe7be243a89&w=740"
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-100">
                    {friend.username}
                  </h3>
                  <p className="text-sm text-gray-400">{friend.email}</p>

                  {friend.online ? (
                    <>
                      <h3 className="text-sm text-blue-700">Online</h3>
                    </>
                  ) : (
                    <>
                      <h3 className="text-sm text-zinc-700">Offline</h3>
                    </>
                  )}
                </div>
                <BsFillSendFill
                  className=" ml-10 cursor-pointer"
                  size={23}
                  onClick={() => {
                    sendMessage(friend._id, userData.id);
                   
                  }}
                />
              </div>
            ))}
          </ul>
        ) : (
          <p>No friends .</p>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
