var ChessWebAPI = require('chess-web-api');
var chessAPI = new ChessWebAPI();

chessAPI.getPlayer('ohquinton')
    .then(function(response) {
        console.log('Player Profile', response.body);
    })
    .catch(function(err) {
        console.error(err);
    });

chessAPI.getPlayerStats('ohquinton')
    .then(function(response) {
        console.log('Player Stats', response.body);
    })
    .catch(function(err) {
        console.error(err);
    });
