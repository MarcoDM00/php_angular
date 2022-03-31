<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
$records = [];
$sql = "SELECT * FROM records";

if ($result = mysqli_query($con,$sql)) {
  $n = 0;
  while ($row = mysqli_fetch_assoc($result))   {
    $records[$n]['id']    = $row['id'];
	$records[$n]['win']    = $row['vincitore'];
    $records[$n]['nMosse'] = $row['nMosse'];
    $records[$n]['data'] = $row['data'];
    $n++;
  }
    
  echo json_encode(['data'=>$records]);
} else {
  http_response_code(404);
}

?>