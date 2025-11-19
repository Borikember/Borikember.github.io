<?php
session_start();
include 'storage.php';
$error = '';
// STORAGE először!
$playerstorage = new Storage(new SerializeIO('players.db'));

// --- PLAYER CLASS ---
class Player {
    public $id;
    public $email;
    public $name;
    public $password;

    public function __construct(int $id, string $email, string $name, string $password) {
        $this->id = $id;
        $this->email = $email;
        $this->name = $name;
        $this->password = $password;
    }
}

// --- PLAYER EXISTS ---
function playerexists($name) {
    global $playerstorage;
    return $playerstorage->findOne(['name' => $name]) !== null;
}
function isValidEmail($email) {
    // Define a simple regex pattern for email validation
    $pattern = "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/";

    // Use preg_match() to check if the email matches the pattern
    if (preg_match($pattern, $email)) {
        return true;
    } else {
        return false;
    }
}
// --- REGISTER ---
if (isset($_POST['register'])) {

    $email = $_POST['player_email'];
    $name = $_POST['player_name'];
    $pw = $_POST['player_password'];
    if (!isValidEmail($email)) {
        die("<p style='color:red'>Érvénytelen email cím!</p>");
    }
    if (!playerexists($name)) {

        $hashed = password_hash($pw, PASSWORD_DEFAULT);
        $id = count($playerstorage->findAll()) + 1;

        $playerstorage->add(new Player($id,$email, $name, $hashed));
        echo "<p style='color:green'>Sikeres regisztráció!</p>";

    } else {
        $error= "<p style='color:red'>Ez a név már foglalt!</p>";
    }
}

// --- LOGIN ---
if (isset($_POST['login'])) {
    $currentplayer = null;
    $name = $_POST['player_name'];
    $pw = $_POST['player_password'];

    $player = $playerstorage->findOne(['name' => $name]);
    $email = $playerstorage->findOne(['email' => $email]);

    if ($email && $player && password_verify($pw, $player->password)) {

        $_SESSION['player'] = $player->name;
        $currentplayer = $player->name;
        echo "<p style='color:green'>Sikeres belépés!</p>";

    } else {
        $error = "<p style='color:red'>Hibás név vagy jelszó!</p>";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jungle Escape</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="jungle_icon.png">
</head>

<body>
    <div id="main_menu">
        <h1>Jungle Escape</h1><br>
        <button id="start_game">Start Game</button>
        <button id="instruction">How to Play</button>
    </div>
    
    <div id="game_over">
        <h1>Game Over</h1><br>
        <div id="final_score"></div>
        <button id="restart_game">Restart Game</button>
    </div>
    <div id="welcome_message">
        <h1>Welcome, <?= isset($_SESSION['player']) ? htmlspecialchars($_SESSION['player']) : 'Guest' ?>!</h1>
<br>
        <button id="proceed_to_game">Proceed to Game</button>
    </div>
    <div id="login_register">
    <form id="name_form" method="post">
        <p>Username</p>
        <input type="text" name="player_name" required>
        <p>Email</p>
        <input type="email" name="player_email" required>
        <p>Password</p>
        <input type="password" name="player_password" required>
        <div><?= $error ?></div>
        <button type="submit" name="register">Regisztráció</button>
        <button type="submit" name="login">Belépés</button>
    </form>
    </div>
    <div id="scoreboard">
        <h1>Scoreboard</h1><br>
        <ul>
            <?php foreach ($playerstorage->findAll() as $player): ?>
                <li><?= htmlspecialchars($player->name) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>

    <div id="how_to_play">
        <h1>How to Play</h1>
        <p>Press Space to jump over obstacles. Avoid collisions to keep playing! Collect coins to try to earn a high score!</p>
        <button id="back_to_menu">Back to Menu</button>
    </div>

    <canvas id="game"></canvas>

</body>

<script src="classes.js"></script>
<script src="const.js"></script>
<script src="game.js"></script>
</html>
