// main Variables
// const usernameInput = document.querySelector('.username-input');
const getButton = document.querySelector(".get-button");
const showData = document.querySelector(".show-data");
const theInput = document.querySelector(".get-repos input");

// Get Repos Function
function getRepos() {
  // Get Repos Code Here
  if (theInput.value === "") {
    // If Value is Empty
    showData.innerHTML = `<span>Please enter a username</span>`;
  } else {
    // showData.innerHTML = `<span>Username: ${theInput.value}</span>`;
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found or API error");
        }
        return response.json();
      })
      .then((data) => {
        // Empty The Container
        showData.innerHTML = "";

        // Check if user has no repos
        if (data.length === 0) {
          showData.innerHTML = `<span>This user has no public repositories</span>`;
          return;
        }

        // Loop On Repos
        data.forEach((repo) => {
          // Create The Main Div
          const mainDiv = document.createElement("div");
          // Create Repo Name Text
          const repoName = document.createElement("p");
          repoName.innerHTML = `Repo Name: <strong>${repo.name}</strong>`;
          // Append The Text To mainDiv
          mainDiv.appendChild(repoName);

          // Create Repo URL
          const repoUrl = document.createElement("a");
          // Create Repo URL Text
          const repoUrlText = document.createTextNode("Visit Repo");
          // Append The Text To repoUrl
          repoUrl.appendChild(repoUrlText);
          // Add Attribute
          //  repoUrl.setAttribute('href', repo.html_url);
          repoUrl.href =
            "https://github.com/" + theInput.value + "/" + repo.name;
          // Add Attribute Blank
          repoUrl.target = "_blank";
          // Append repoUrl To mainDiv
          mainDiv.appendChild(repoUrl);

          // Create Stars Count
          const starsCount = document.createElement("span");
          // Create Stars Count Text
          const starsCountText = document.createTextNode(
            `Stars: ${repo.stargazers_count}`,
          );
          // Append The Text To starsCount
          starsCount.appendChild(starsCountText);
          // Append starsCount To mainDiv
          mainDiv.appendChild(starsCount);

          // Add Attribute
          mainDiv.setAttribute("class", "repo-box");
          // Append mainDiv To Container
          showData.appendChild(mainDiv);
        });
      })
      .catch((error) => {
        showData.innerHTML = `<span>Error: ${error.message}</span>`;
      });
  }
}

// Add Event Listener
getButton.addEventListener("click", getRepos);
