import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { CiFolderOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

const FoldersDetail = () => {
  const {
    userData,
    deleteFolder,
    fetchFolders,
    folders,
    folderName,
    setFolderName,
    CreateFol,
  } = useAuth();

  // Fetch folders when component mounts or userData changes
  useEffect(() => {
    if (userData?.id) {
      fetchFolders(); // Fetch folders when userData is available
    }
  }, [userData]);

  return (
    <>
      {userData ? (
        <>
          <div className=" p-5 my-3 ">
            <h1 className=" text-3xl font-semibold text-purple-700 ">
              Welcome , {userData.username} ! 👋
            </h1>
          </div>
          <div className=" CreateFolder mx-5">
            <h1 className="text-2xl font-semibold text-purple-700">
              Create Folder
            </h1>

            <form onSubmit={CreateFol} className="p-5 flex flex-col gap-2 w-60">
              <label
                htmlFor="folderName"
                className="text-lg font-semibold text-purple-700"
              >
                Folder Name
              </label>
              <input
                required
                onChange={(e) => setFolderName(e.target.value)}
                value={folderName}
                name="folderName"
                type="text"
                className="border-2 bg-transparent text-white outline-none border-purple-700 rounded-lg w-48 px-2 py-1"
              />

              <button
                type="submit"
                className="bg-purple-700 text-white p-2 rounded-lg my-2"
              >
                Create Folder
              </button>
            </form>
          </div>{" "}
          {folders.length === 0 ? (
            <h2 className="text-2xl text-zinc-700 font-bold  ">
              No folders to display
            </h2>
          ) : (
            <>
              <div className="p-5">
                <h1 className="text-2xl font-semibold text-purple-700">
                  Your Folders
                </h1>
                <p className="text-md  text-[#8b4fc0]">
                  To open folder click on folder
                </p>
                <div className=" flex flex-col flex-wrap h-[250px] gap-y-2 mt-5 px-10 w-fit gap-x-10">
                  {folders.map((folder) => (
                    <React.Fragment key={folder._id}>
                      <div className=" flex flex-row items-center gap-4">
                        <Link
                          key={folder._id}
                          to={`/Editor?folderId=${folder._id}&folderName=${folder.folderName}`}
                          className="folder flex flex-row gap-2 cursor-pointer items-center justify-center  h-fit w-fit my-2  rounded-lg"
                        >
                          <CiFolderOn size={26} />
                          <p className="text-xl">{folder.folderName}</p>
                        </Link>
                        <MdDeleteOutline
                          size={26}
                          color="red"
                          className=" cursor-pointer"
                          onClick={() => {
                            deleteFolder(folder._id, folder.userId);
                          }}
                        />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <h2 className=" text-3xl text-zinc-700 font-bold  ">Pleas Login</h2>
      )}
    </>
  );
};

export default FoldersDetail;
