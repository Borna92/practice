import logo from "./logo.svg";
import "./App.css";
import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Menu } from "./pages/Menu";
import { Contact } from "./pages/Contact";
import { Navbar } from "./Navbar";
import { Profile } from "./pages/Profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppContext = createContext();

function App() {
  const client = new QueryClient();
  const [username, setUsername] = useState("Borna");

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AppContext.Provider value={{ username, setUsername }}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
            <div>Footer</div>
          </Router>
        </AppContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
