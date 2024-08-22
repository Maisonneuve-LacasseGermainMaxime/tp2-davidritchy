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
    $sql = "SELECT * FROM exercices ORDER BY date";
    $query = $conn->query($sql);
 
    if (mysqli_query($conn, $sql)) {
   
        $taches = $query->fetch_all(MYSQLI_ASSOC);
        
    //Retourne la réponse
        header("Content-Type: application/json");
        http_response_code(200);
        echo json_encode($taches);

      } 
            
      mysqli_close($conn);

   } catch (Exception $e) {

    http_response_code(500);
    echo json_encode(["message" => $e->getMessage()]);
  
}
