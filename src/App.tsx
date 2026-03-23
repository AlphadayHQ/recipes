import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthModal } from "./components/auth/AuthModal";
import { ToastContainer } from "./components/ui/Toast";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "./pages/Dashboard";
import { ManageRecipes } from "./pages/ManageRecipes";

function App() {
  return (
    <div className="bg-background min-h-screen text-text overflow-hidden flex flex-col relative w-full">
      <Navbar />
      <AuthModal />
      <div className="flex-1 w-full flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/manage-recipes" element={<ManageRecipes />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
