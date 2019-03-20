class GameController {
  static getGames(req, res, next) {
    return res.send(["game1", "game2"]);
  }
}

module.exports = GameController;
