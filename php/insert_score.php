<?php

include 'connection_ddbb.php';

$name = $_POST['name'];
$email = $_POST['email'];
$finalPoints = $_POST['finalPoints'];

echo "NAME: ".$name."\n<br/>";
echo "EMAIL: ".$email."\n<br/>";
echo "POINTS: ".$finalPoints."\n<br/>";

if($name !=''||$email !=''){
//Insert Query of SQL
$query = mysqli_query($con, "insert into ranking(name, email, points) values ('$name', '$email', '$finalPoints')");
echo "<br/><br/><span>Data Inserted successfully...!!</span>";
}
else{
echo "<p>Insertion Failed <br/> Some Fields are Blank....!!</p>";
}

mysqli_close($con); // Closing Connection with Server
?>