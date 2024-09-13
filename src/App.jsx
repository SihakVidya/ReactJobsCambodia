import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import HomePage from "../src/pages/HomePage";
import MainLayout from "../src/layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const addJob = async (newjob) => {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newjob),
  });
};

const deleteJob = async (id) => {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });
};

const updateJob = async (updatedJob) => {
  try {
    const res = await fetch(`/api/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    if (!res.ok) throw new Error("Failed to update job");
  } catch (error) {
    console.error(error.message);
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route
        path="/add-job-page"
        element={<AddJobPage addJobSubmit={addJob} />}
      />
      <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} />
      <Route
        path="/edit-jobs/:id"
        element={<EditJobPage updateJobSubmit={updateJob} />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
