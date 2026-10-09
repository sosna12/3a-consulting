import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import News from "./components/News";
import Projects from "./components/Projects";
import Careers from "./components/Careers";
import Policy from "./components/Policy";
import Contact from "./components/Contact";
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageNews from "./components/admin/ManageNews";
import NewsForm from "./components/admin/NewsForm";
import ManageProjects from "./components/admin/ManageProjects";
import ProjectForm from "./components/admin/ProjectForm";
import ManageCareers from "./components/admin/ManageCareers";
import JobForm from "./components/admin/JobForm";
import ManageMessages from "./components/admin/ManageMessages";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Protected admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/news"
  element={
    <ProtectedRoute>
      <ManageNews />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/news/new"
  element={
    <ProtectedRoute>
      <NewsForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/news/edit/:id"
  element={
    <ProtectedRoute>
      <NewsForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/projects"
  element={
    <ProtectedRoute>
      <ManageProjects />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/projects/new"
  element={
    <ProtectedRoute>
      <ProjectForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/projects/edit/:id"
  element={
    <ProtectedRoute>
      <ProjectForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/careers"
  element={
    <ProtectedRoute>
      <ManageCareers />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/careers/new"
  element={
    <ProtectedRoute>
      <JobForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/careers/edit/:id"
  element={
    <ProtectedRoute>
      <JobForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/messages"
  element={
    <ProtectedRoute>
      <ManageMessages />
    </ProtectedRoute>
  }
/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}