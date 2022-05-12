<?php
    $id = $_POST["pic_id"];

    require_once("password.php");

    $conn = new mysqli($servername , $username, $password);

    if ($conn -> connect_error) {
        die("ERROR CONNECTING" . $conn -> connect_error);
    }

    mysqli_select_db($conn , "yiyandingzhen");


    $sql_search = "SELECT * FROM comments WHERE pic_id = {$id} ";
    
    $retvar = $conn -> query($sql_search);

    $result = mysqli_fetch_array($retvar);



    $retarr[] = array(
        'result' => $result
    );

    echo json_encode($retarr,JSON_UNESCAPED_UNICODE);




?>