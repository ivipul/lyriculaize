<?php
header('Content-Type: application/json');

if(isset($_GET['action']) && !empty($_GET['action'])) {
    $action = $_GET['action'];
    switch($action) {
        case 'getVizData' : getVizData($_GET['type'],$_GET['val'],$_GET['mode']);break;
    }
}
/*
$type: What type is the value in $val is of type Artist, Genre or Word
		Allowed Values: artist, genre, word
$val : Value
#mode : Is it a single search or comparison of two values of a single type
		Allowed Values: single, compare
*/


function getVizData($type, $val, $mode){
	if ($type == "artist")
		$column_name = "artist_id";
	else if ($type == "genre")
		$column_name = "genre";
	if ($type == "word")
		$column_name = "word";
		
	if ($mode == "single"){
		
	}
	$db = new SQLite3('track_metadata.db');
	$results = $db->query("SELECT * FROM songs WHERE ".$column_name." = '".$val."' LIMIT 10");
	$return_array = array(); 
	while ($row = $results->fetchArray()) {
		var_dump($row);
		$temp_array=array(
				 "track_id" => $row['track_id'],
				 "title" => $row['title'],
				 "song_id" => $row['song_id'],
				 "year" => $row['year']
			);
		array_push($return_array, $temp_array);
	}
	echo json_encode($return_array);	
}

?>
