import "./App.css";
import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import Graph from "./components/Graph/Graph";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <main className="flex flex-col">
        <Navbar />
        <div className="max-w-full flex">
          <LeftSidebar />
          <Graph />
          <RightSidebar />
        </div>
        <Footer />
      </main>
      <Toaster />
    </>
  );
}

export default App;
