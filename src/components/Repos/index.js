import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function Repos() {
  const [repoList, setRepoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, toggleLoading] = useState(false);
  const [showViewMore, setShowViewMore] = useState("");

  useEffect(() => {
    toggleLoading(true);
    fetch(
      `https://api.github.com/orgs/godaddy/repos?per_page=6&page=${currentPage}`
    )
      .then(response => response.json())
      .then(jsonResponse => {
        setRepoList(jsonResponse);
        if (jsonResponse.length === 0) {
          setShowViewMore("End of Repos");
        } else {
          setRepoList([...repoList, ...jsonResponse]);
          setShowViewMore("View More");
        }
        toggleLoading(false);
      });
  }, [currentPage]);

  const viewMore = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      <h1>Godaddy Repos List</h1>
      <ul className="list-container">
        {repoList.length ? (
          repoList.map(repo => {
            return (
              <li className="repo-item" key={repo.id}>
                <div className="repo-name">
                  <Link to={"/details/" + repo.name}>{repo.name}</Link>
                </div>
                <div>{repo.description}</div>
                <div>
                  <a href={repo.html_url}>Open in github</a>
                </div>
                <div>{repo.name}</div>
              </li>
            );
          })
        ) : (
          <h3 style={{ justifyContent: "center" }}>
            {loading ? "loading" : "No any Repos"}{" "}
          </h3>
        )}
        {showViewMore ? (
          <div className="view-more">
            <p onClick={viewMore}>View More</p>
          </div>
        ) : (
          <></>
        )}
      </ul>
    </>
  );
}

export default Repos;
