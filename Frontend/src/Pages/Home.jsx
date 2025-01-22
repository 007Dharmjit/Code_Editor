import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-sans bg-gray-900 min-h-screen text-white">
      <main className="container mx-auto p-8 max-w-screen-xl">
        {/* Welcome Section */}
        <section className="text-center mb-12 bg-gray-800 p-8 rounded-lg shadow-xl">
          <h2 className="text-4xl font-extrabold text-indigo-400 mb-6">
            Welcome to <span className="text-indigo-500">CodeNest.io</span>
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            CodeNest.io is a versatile platform for developers to create, edit,
            and run code in over 15 languages. Collaborate with others, solve
            coding challenges, and grow your skills in one place.
          </p>
          <h3 className="text-2xl font-semibold text-gray-200 mb-4">
            Key Features:
          </h3>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-4">
            <li>
              <strong>Code Editor</strong>: Write and edit your code directly in
              the browser with support for syntax highlighting and error
              checking.
            </li>
            <li>
              <strong>Run Code</strong>: Execute your code in real-time, with
              output displayed instantly for over 15 programming languages.
            </li>
            <li>
              <strong>File Management</strong>: Organize your code efficiently
              with easy file and folder management.
            </li>
            <li>
              <strong>Collaborate</strong>: Share coding problems, challenges,
              and solutions with others in the community.
            </li>
          </ul>
          <p className="text-lg text-gray-300 mb-6">
            Whether you&apos;re just starting or you&apos;re an experienced
            developer, CodeNest.io provides the tools you need to work, learn,
            and grow together.
          </p>
          <p className="text-lg font-semibold text-gray-200 mb-6">
            Join a community of passionate developers today!
          </p>
        </section>

        {/* Start Creating Folder Section */}
        <section className="bg-gradient-to-r from-indigo-700 to-gray-800 text-center p-10 rounded-lg mb-12 shadow-xl">
          <h2 className="text-3xl font-extrabold text-white mb-4 tracking-wide">
            Start Organizing Your Code with Folders
          </h2>
          <p className="text-lg text-gray-200 mb-6 leading-relaxed">
            Create and manage folders to keep your projects organized. Start by
            creating a folder for your code and challenges.
          </p>
          <Link
            to="/Folder"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Create Folder
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
