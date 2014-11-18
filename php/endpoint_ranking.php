<?php

include 'connection_ddbb.php';

$var = array();
$sql = "SELECT * FROM ranking ORDER BY points DESC";
$ranking = mysqli_query($con, $sql);

while($obj = mysqli_fetch_object($ranking)) {
$var[] = $obj;
}

echo '{"ranking":'.json_encode($var).'}';
?>