import React, { useEffect, useState } from "react";
import { FaRegStar, FaRegEye, FaRegDotCircle } from "react-icons/fa";
import { TbGitFork } from "react-icons/tb";
import { useParams } from "react-router";
import "./index.css";

function RepoDetails() {
  const [repoDetails, setRepoDetails] = useState(null);
  const routeParams = useParams();
  console.log("routeParams", routeParams);

  useEffect(() => {
    fetch("https://api.github.com/repos/godaddy/" + routeParams.id)
      .then(response => response.json())
      .then(jsonResponse => {
        setRepoDetails(jsonResponse);
      });
  }, [routeParams.id]);

  return repoDetails ? (
    <div className="repo-details-container">
      <h1>Repo Details</h1>
      <div className="repo-details">
        <div>
          <b>Name:</b> {repoDetails.name}
        </div>
        <div>
          <b>Full Name:</b> {repoDetails.full_name}
        </div>
        <div>
          <b>Description:</b> {repoDetails.description}
        </div>
        <div>
          <b>Language:</b> {repoDetails.language}
        </div>
        <div>
          <b>Github Repo:</b> <a href={repoDetails.html_url}>click Here</a>
        </div>
        <div className="other-details">
          <div>
            <TbGitFork />
            &nbsp;Forks: {repoDetails.forks_count}
          </div>
          <div>
            <FaRegStar />
            &nbsp;Stars: {repoDetails.stargazers_count}
          </div>
          <div>
            <FaRegDotCircle />
            &nbsp;Open Issues: {repoDetails.open_issues_count}
          </div>
          <div>
            <FaRegEye />
            &nbsp;Watchers: {repoDetails.watchers_count}
          </div>
        </div>
        <span>Created at: {Date(repoDetails.created_at)}</span>
        <span>Updated at: {Date(repoDetails.updated_at)}</span>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default RepoDetails;
