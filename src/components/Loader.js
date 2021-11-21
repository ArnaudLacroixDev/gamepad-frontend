import "./Loader.css";

const Loader = () => {
  return (
    <main className="loader-div">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading, please wait...</p>
    </main>
  );
};

export default Loader;
