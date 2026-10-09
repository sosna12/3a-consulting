# 3A Consulting Engineers — Website

Full-stack website for **3A Consulting Engineers PLC**, Addis Ababa, Ethiopia.

**Founder:** Awoke Aya Azen
**Developer:** Sosna Adugna Aya

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6
- Axios
- Recharts (project charts)
- Custom CSS

**Backend**
- Node.js + Express
- MongoDB Atlas (cloud)
- Mongoose
- JWT authentication
- bcrypt password hashing
- Multer (image uploads — planned)

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Features

### Public
- Home, About, News, Projects, Careers, Policy, Contact
- Live data from the backend API
- Project charts & filters
- Responsive design

### Admin (Awoke)
- Secure JWT login
- Dashboard with live stats
- Manage News (CRUD)
- Manage Projects (CRUD)
- Manage Careers (CRUD)
- Contact inbox with unread badge

---

## Local Development

### Frontend
```bash
npm install
npm run dev          # http://localhost:5173


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
