<?php
$file_name = $_FILES['file']['name']; //getting file name 
$tmp_name = $_FILES['file']['tmp_name']; //getting temp_name o 
$file_up_name = time().$file_name; //making file name dynamic 
move_uploaded_file($tmp_name, "files/".$file_up_name);
?>