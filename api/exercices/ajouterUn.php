<?php
try {
  //Afficher les erreurs
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    $host = "localhost";
    $port = "3306";
    $dbname = "exercice";
    $username = "root";
    $password = "root";

    //Connexion
    $conn = mysqli_connect($host, $username, $password,$dbname);

    //Requête à la base de données
    $data = json_decode(file_get_contents("php://input"));
    $type = $data->type;
    $date = $data->date;
    $duree = $data->duree;
    $description = $data->description;
    $difficulte = $data->difficulte;

    //Prepared statement
    $stmt = $conn->prepare("INSERT INTO exercices (type, date,duree, description,difficulte ) VALUES (?, ?, ?,?,?)");
    $stmt->bind_param("ssisi",$type, $date,$duree,$description,$difficulte);


    if (  $stmt->execute() === TRUE) {
      // Récupérer l'id de l'élément ajouté
        $last_id = $conn->insert_id;
        $message = ["message" => "L \'élément a été ajouté avec succès", "id" => $last_id];
      }

$stmt->close();
$conn->close();

    //Retourne la réponse
    header("Content-Type: application/json");
    http_response_code(200);
    echo json_encode($message);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => $e->getMessage()]);
}