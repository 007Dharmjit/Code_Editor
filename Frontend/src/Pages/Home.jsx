
const Home = () => { 
  

  return (
    <div className="font-sans bg-gray-900 min-h-screen text-white">
      <main className="container mx-auto p-6 max-w-screen-lg">
        {/* Welcome Section */}
        <section className="text-center mb-12 bg-gray-800 p-8 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300">
          <h2 className="text-5xl font-extrabold text-indigo-400 mb-6">
            Welcome to <span className="text-indigo-600">CodeNest.io</span> — Your Ultimate Code Playground!
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            CodeNest.io is a versatile, user-friendly platform designed for developers to create, edit, and run code in over 15 programming languages. Whether you&apos;re building a simple script, solving a coding challenge, or collaborating with others, our platform provides the tools you need to get the job done.
          </p>
          <h3 className="text-3xl font-semibold text-gray-200 mb-4">Key Features:</h3>
          <ul className="list-disc list-inside text-lg text-gray-300 space-y-3">
            <li><strong>Code Editor</strong>: Write and edit your code directly in the browser with support for syntax highlighting and error checking.</li>
            <li><strong>Run Code</strong>: Execute your code in real-time, with output displayed instantly for over 15 programming languages.</li>
            <li><strong>File Management</strong>: Create, organize, and delete folders and files with ease. Keep your code structured and efficient.</li>
            <li><strong>Share Problems</strong>: Create coding challenges or problems and share them with others. Collaborate, solve, and learn together!</li>
          </ul>
          <p className="text-lg text-gray-300 mb-6">
            Our goal is to foster a vibrant community where developers can grow, share, and build great software. Whether you&apos;re just starting out or you&apos;re a seasoned pro, CodeNest.io provides a space to work, learn, and connect.
          </p>
          <p className="text-lg font-semibold text-gray-200 mb-6">
            Start coding now and join a community of like-minded developers!
          </p>
        </section>

        {/* Start Creating Folder Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-800 text-center p-10 rounded-lg mb-12 shadow-xl hover:scale-105 transform transition-all duration-300 dark:from-gray-800 dark:to-gray-900 dark:text-white dark:shadow-2xl">
  <h2 className="text-4xl font-extrabold text-white mb-4 tracking-wide dark:text-gray-100">
    Start by Creating Your First Folder!
  </h2>
  <p className="text-lg text-gray-200 mb-6 leading-relaxed dark:text-gray-300">
    Organize your code and projects by creating folders. To create a folder, go to the Profile Section above.
  </p>
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 dark:bg-blue-500 dark:hover:bg-blue-600">
    Create Folder
  </button>
</section>


        {/* <FileManager /> */}
        {/* <CodeRunner /> */}
        {/* <ProblemShare /> */}
      </main>
    </div> 
  );
};

export default Home;
