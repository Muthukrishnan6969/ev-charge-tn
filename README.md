# EV Charge India

A full-stack web application for locating EV charging stations across India.

## Tech Stack
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, React Query, React Router, React Leaflet.
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose.

## Project Structure
This repository contains both the frontend and backend in a monorepo setup:
- `/frontend`: The React application.
- `/backend`: The Express API.

## Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or a MongoDB Atlas URI)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (optional if you use localhost):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ev-charge-india
   ```
4. Start your local MongoDB server (e.g., via Docker or locally installed `mongod`).
5. Seed the database with dummy charging stations:
   ```bash
   npm run seed
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will be running on `http://localhost:5000`.

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be running on `http://localhost:5173`.

## Features Delivered in Phase 1 (MVP)
- **Modern Landing Page:** Premium UI with Framer Motion animations and Glassmorphism effects.
- **Search System:** Search for stations by city.
- **Interactive Map:** View charging stations on an OpenStreetMap powered by Leaflet.
- **REST API:** Fully functional backend with Mongoose schemas for charging stations.
