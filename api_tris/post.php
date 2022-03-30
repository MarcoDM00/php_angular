<?php
require 'connect.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)) {
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if(trim($request->data) < 1) {
    return http_response_code(400);
  }
	
  // Sanitize.
  $nMosse = mysqli_real_escape_string($con, $request->data);
    

  // Store.
  $sql = "INSERT INTO records(nMosse) VALUES ('{$nMosse}')";

  if(mysqli_query($con,$sql)) {
	$id = mysqli_insert_id($con);
	$sql = "SELECT * FROM records WHERE id = {$id} LIMIT 1";
	if ($result = mysqli_query($con, $sql)) {
		$row = mysqli_fetch_assoc($result);
		$record = [
		  'nMosse' => $row['nMosse'],
		  'data' => $row['data'],
		  'id' => $row['id']
		];
		http_response_code(201);
		echo json_encode(['data'=>$record]);
	} else {
		http_response_code(422);
	}
  } else {
    http_response_code(422);
  }
}

?>