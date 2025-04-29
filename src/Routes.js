import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './sections/Home';
import About from './sections/About';
import BreathingExercises from './sections/BreathingExercises';
import StressInputForm from './components/StressInputForm';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout';
import UserProfile from './components/UserProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="exercises" element={<BreathingExercises />} />
        <Route path="stress-tool" element={<StressInputForm />} />
        <Route path="login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route 
          path="profile" 
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          } 
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
