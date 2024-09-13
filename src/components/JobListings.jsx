import React from "react";
import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const title = isHome ? "Featured Jobs" : "All Jobs";
  const displayedJobs = isHome ? jobs.slice(0, 3) : jobs;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedJobs.map((job) => (
            <JobListing key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
