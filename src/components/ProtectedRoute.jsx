// ================================================
//  ProtectedRoute — redirects to /login if not authenticated
// ================================================

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // While checking localStorage, show nothing
  if (loading) {
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        Loading…
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the page
  return children;
}