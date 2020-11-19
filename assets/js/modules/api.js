var base_url = 'https://api.football-data.org/v2/competitions/2021/standings'
var base_url_team = 'https://api.football-data.org/v2/competitions/2021/teams'
var api_token = 'd327b3f79ad54560ac84595be3610b21'
function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
  }
  function json(response) {
    return response.json();
  }
  function error(error) {
   
    console.log("Error : " + error);
  }
  function getStandings() {
    if ("caches" in window) {
      caches.match(base_url + "standings").
      then(function(response) {
        if (response) {
            response.json().
            then(function(data) {
            var standingsHTML = "";
            data = data.standings[0].table
            data.forEach(function(dataTeam) {
                standingsHTML += 
                `
                        <tr>
                            <td>${dataTeam.position}</td>
                            <td>${dataTeam.team.name}</td>
                            <td>${dataTeam.playedGames}</td>
                            <td>${dataTeam.won}</td>
                            <td>${dataTeam.draw}</td>
                            <td>${dataTeam.lost}</td>
                            <td>${dataTeam.goalsFor}</td>
                            <td>${dataTeam.goalsAgainst}</td>
                            <td>${dataTeam.goalDifference}</td>
                            <td>${dataTeam.points}</td>
                        </tr>
                        `});
                    document.getElementById('progress').style.display = 'none'
                    document.getElementById("standings").innerHTML = standingsHTML;
        });
      }
    });
  }
    
  fetch(base_url,{
    headers:{
        'X-Auth-Token' : api_token
    }
})
  .then(status)
  .then(json)
  .then(function(data) {
    var standingsHTML = "";
    data = data.standings[0].table
    
    data.forEach(function(dataTeam) {
      standingsHTML +=             
      `
      <tr>
          <td>${dataTeam.position}</td>
          <td>${dataTeam.team.name}</td>
          <td>${dataTeam.playedGames}</td>
          <td>${dataTeam.won}</td>
          <td>${dataTeam.draw}</td>
          <td>${dataTeam.lost}</td>
          <td>${dataTeam.goalsFor}</td>
          <td>${dataTeam.goalsAgainst}</td>
          <td>${dataTeam.goalDifference}</td>
          <td>${dataTeam.points}</td>
      </tr>
      `
    });
    
    document.getElementById('progress').style.display = 'none'
    document.getElementById("standings").innerHTML = standingsHTML;
  })
  .catch(error);
}
function getTeams() {
    if ("caches" in window) {
      caches.match(base_url_team + "teams")
      .then(function(response) {
        if (response) {
          response.json()
          .then(function(data) {
            var teamsHTML = "";
            data = data.teams
            data.forEach(function(team) {
                let urlTeamImage = team.crestUrl
                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
              teamsHTML += `
              <div class="col s12">
              <div class="card">
              <div class="card-content row valign-wrapper">
              <div class="col s4" class="logo-team">
              <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="50%" >
          </div>
          <div class="col s8 information-team">
                  <span class="badge-blue"><strong>${team.name}</strong></span>
                  <span>${team.venue}</span>
                  </div>
              </div>
              <div class="card-action right-align">
                  <a href="${team.website}" target="_blank" class="waves-effect waves-light btn green accent-3">WEBNYA</a>
                  <button onclick="addfavoriteTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="btn waves-effect waves-light red">Add<i class="material-icons right right">send</i></button>
              </div>
              </div>
          </div>
                  `;
            });

            document.getElementById('progress').style.display = 'none'
            document.getElementById('teams').innerHTML = teamsHTML
        });
      }
    });
  }
  fetch(base_url_team,{
    headers:{
        'X-Auth-Token' : api_token
    }
})
    .then(status)
    .then(json)
    .then(function(data) {
      let teamsHTML = "";
      data = data.teams
      data.forEach(function(team) {
          
        let urlTeamImage = team.crestUrl
        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
        teamsHTML += `
        <div class="col s12">
        <div class="card">
        <div class="card-content row valign-wrapper">
        <div class="col s4" class="logo-team">
        <img src="${urlTeamImage}" alt="${team.name}" class="responsive-img center-align" width="50%" >
    </div>
            <div class="col s8 information-team">
            <span class="badge-blue"><strong>${team.name}</strong></span>
            <span>${team.venue}</span>
            </div>
        </div>
        <div class="card-action right-align">
            <a href="${team.website}" target="_blank" class="waves-effect waves-light btn green accent-3">WEBNYA</a>
            <button onclick="addfavoriteTeam(${team.id},'${urlTeamImage}','${team.name}','${team.venue}','${team.website}')" class="btn waves-effect waves-light red">Add<i class="material-icons right">send</i></button>
        </div>
        </div>
    </div>
            `;
      });
      
      document.getElementById('progress').style.display = 'none'
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}
export default {
    getStandings,
    getTeams
}
