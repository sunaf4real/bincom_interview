<?php require_once 'connection.php';?>
<?php
$action=$_GET['action'];

switch ($action){

	
	case 'get_election_result':
		$state_id=trim($_POST['state_id']);
		$lga_id=trim($_POST['lga_id']);
		$ward_id=trim($_POST['ward_id']);
		$polling_unit_id=trim($_POST['polling_unit_id']);
		
		
	$select="SELECT c.lga_id, c.lga_name, b.uniqueid AS pu_id, b.polling_unit_name, a.party_abbreviation, a.party_score 
	FROM announced_pu_results a, polling_unit b, lga c 
	WHERE a.polling_unit_uniqueid=b.uniqueid AND b.lga_id=c.lga_id
	AND c.state_id LIKE '%$state_id%' AND c.lga_id LIKE '%$lga_id%' AND b.ward_id LIKE '%$ward_id%' AND a.polling_unit_uniqueid LIKE '$polling_unit_id'";
		
		$query=mysqli_query($conn,$select)or die (mysqli_error($conn));
		$count=mysqli_num_rows($query);
		if($count==0){///start if 2
			$response['response']=99;
			$response['result']=false;
			$response['message']="No Record found";
		}else{///else if 2

			$response['response']=100; 
			$response['result']=true;
			while($fetch_query=mysqli_fetch_all($query, MYSQLI_ASSOC)){
				$response['data']=$fetch_query;
			}
		}

	echo json_encode($response);
break;
	






case 'fetch_states':
		$query=mysqli_query($conn,"SELECT * FROM states ORDER BY state_name ASC")or die (mysqli_error($conn));
			$response['response']=101;
			$response['result']=true;
			while($fetch_query=mysqli_fetch_all($query, MYSQLI_ASSOC)){
				$response['data']=$fetch_query;
			}
	echo json_encode($response); 
break;


case 'fetch_lga':
	$query=mysqli_query($conn,"SELECT * FROM lga ORDER BY lga_name ASC")or die (mysqli_error($conn));
		$response['response']=102;
		$response['result']=true;
		while($fetch_query=mysqli_fetch_all($query, MYSQLI_ASSOC)){
			$response['data']=$fetch_query;
		}
echo json_encode($response); 
break;


case 'fetch_ward':
	$query=mysqli_query($conn,"SELECT * FROM ward ORDER BY ward_name ASC")or die (mysqli_error($conn));
		$response['response']=103;
		$response['result']=true;
		while($fetch_query=mysqli_fetch_all($query, MYSQLI_ASSOC)){
			$response['data']=$fetch_query;
		}
echo json_encode($response); 
break;


case 'fetch_polling_unit':
	$query=mysqli_query($conn,"SELECT * FROM polling_unit WHERE polling_unit_name!='' ORDER BY polling_unit_name ASC")or die (mysqli_error($conn));
		$response['response']=104;
		$response['result']=true;
		while($fetch_query=mysqli_fetch_all($query, MYSQLI_ASSOC)){
			$response['data']=$fetch_query;
		}
echo json_encode($response); 
break;


}
?>


