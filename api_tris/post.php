<?php
require 'connect.php';	

// Get the posted data.
$postdata = file_get_contents("php://input");


if(isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);
	

  // Validate.
  if((int)$request->data->w >= 1 && (int)$request->data->n >= 5) {
    // Sanitize.
    $win = mysqli_real_escape_string($con, $request->data->w);
    $nMosse = mysqli_real_escape_string($con, $request->data->n);
      
      // Store.
    $sql = "INSERT INTO records(vincitore, nMosse) VALUES ('{$win}', '{$nMosse}')";

    if(mysqli_query($con,$sql)) {
      $id = mysqli_insert_id($con);
      $sql = "SELECT * FROM records WHERE id = {$id} LIMIT 1";
      if ($result = mysqli_query($con, $sql)) {
        $row = mysqli_fetch_assoc($result);
        $record = [
          'id' => $row['id'],
          'win' => $row['vincitore'],
          'nMosse' => $row['nMosse'],
          'data' => $row['data']
        ];
        http_response_code(201);
        echo json_encode(['data'=>$record]);
      }
    }
  }
}
?>