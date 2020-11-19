import database from './database.js'

const getAllTeam = () => {
    //Get All favorite Team From Database
    database.getTeam()
        .then(data => {
            let teamsHTML = ''
            data.forEach(team => {
                teamsHTML  +=
                `
                <div class="col s12">
                    <div class="card">
                    <div class="card-content row valign-wrapper">
                    <div class="col s4" class="logo-team">
                    <img src="${team.logo}" alt="${team.name}" class="responsive-img center-align" width="50%" >
                    </div>
                        <div class="col s8 information-team">
                        <span class="badge-blue"><strong>${team.name}</strong></span>
                        <span>${team.venue}</span>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <a href="${team.website}" target="_blank" class="waves-effect waves-light btn green accent-3">WEBNYA</a>
                        <button onclick="deletefavoriteTeam(${team.id},'${team.name}')" class="btn waves-effect waves-light red">REMOVE<i class= "material-icons right right">delete</i></button>
                        </div>
                    </div>
                </div>
                `
            })
            //insert All Team in Database to DOM
            document.getElementById('progress').style.display = 'none'
            document.getElementById('favoriteTeams').innerHTML = teamsHTML
        })
}

const pushNotification = msg => {
    const title = 'NOTIFICATION!!!';
    const options = {
        body: msg,
        icon: '/epl.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addfavoriteTeam = (id,logo,name,venue,website) => {
    //Add To Database
    database.addTeam({id,logo,name,venue,website})
    
    //Push Notification
    pushNotification(`Added successfully ${name}`)
}

const deletefavoriteTeam = (id,name) => {
    //Conform Delete favorite ?
    let imSure = confirm(`Delete  ${name} from Selection ?`)
    if(imSure){
        //Delete Team From Database
        database.deleteTeam(id)
        //Fetch All Team
        getAllTeam()
        //Push Notification
        pushNotification(`Deleted Successfully ${name}`)
    }
    
}

export default {
    addfavoriteTeam,
    getAllTeam,
    deletefavoriteTeam
}