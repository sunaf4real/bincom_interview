//// for application
var website_url="http://localhost/bincom/bincom_interview/app";
var local_url=website_url+"/config/code.php"



//// for API
var api_url='http://localhost/bincom/bincom_interview/api';
var fetch_states_url=api_url+'/?action=fetch_states';
var fetch_lga_url=api_url+'/?action=fetch_lga';
var fetch_ward_url=api_url+'/?action=fetch_ward';
var fetch_polling_unit_url=api_url+'/?action=fetch_polling_unit';
var fetch_election_result_url=api_url+'/?action=get_election_result';




function _get_states_info(input_id){
	$.ajax({
		type: "POST",
		url: fetch_states_url,
		dataType: 'json',
		cache: false,
		success: function(info){
			var response = info.response;
			var result = info.result;
			var message = info.message;
				var data=info.data
				for (var i = 0; i < data.length; i++) {
				  var state_id = data[i].state_id;
				  var state_name = data[i].state_name;
					$('#'+input_id).append('<option value="'+state_id+'">'+state_name+'</option>');
				}
		}
	});
}




function _get_lga_info(input_id){
	$.ajax({
		type: "POST",
		url: fetch_lga_url,
		dataType: 'json',
		cache: false,
		success: function(info){
			var response = info.response;
			var result = info.result;
			var message = info.message;
				var data=info.data
				for (var i = 0; i < data.length; i++) {
				  var lga_id = data[i].lga_id;
				  var lga_name = data[i].lga_name;
					$('#'+input_id).append('<option value="'+lga_id+'">'+lga_name+'</option>');
				}
		}
	});
}


function _get_ward_info(input_id){
	$.ajax({
		type: "POST",
		url: fetch_ward_url,
		dataType: 'json',
		cache: false,
		success: function(info){
			var response = info.response;
			var result = info.result;
			var message = info.message;
				var data=info.data
				for (var i = 0; i < data.length; i++) {
				  var ward_id = data[i].ward_id;
				  var ward_name = data[i].ward_name;
					$('#'+input_id).append('<option value="'+ward_id+'">'+ward_name+'</option>');
				}
		}
	});
}


function _get_polling_unit_info(input_id){
	$.ajax({
		type: "POST",
		url: fetch_polling_unit_url,
		dataType: 'json',
		cache: false,
		success: function(info){
			var response = info.response;
			var result = info.result;
			var message = info.message;
				var data=info.data
				for (var i = 0; i < data.length; i++) {
				  var polling_unit_id = data[i].uniqueid;
				  var polling_unit_name = data[i].polling_unit_name;
					$('#'+input_id).append('<option value="'+polling_unit_id+'">'+polling_unit_name+'</option>');
				}
		}
	});
}





function _get_election_result(){
		var state_id = $('#state_id').val();
		var lga_id = $('#lga_id').val();
		var ward_id = $('#ward_id').val();
		var polling_unit_id = $('#polling_unit_id').val();
	
		var dataString ='state_id='+ state_id+'&lga_id='+ lga_id+'&ward_id='+ ward_id+'&polling_unit_id='+ polling_unit_id;
	$('#matrix-div').html('<div class="ajax-loader"><img src="'+website_url+'/all-images/images/ajax-loader.gif"/></div>').fadeIn('fast');
	 var pie='';
	$.ajax({
		type: "POST",
		url: fetch_election_result_url,
		data: dataString,
		dataType: 'json',
		cache: false,
		success: function(info){
		$('#matrix-div').html('');
			var response = info.response;
			var result = info.result;
			var message = info.message;
			if(result==true){
				var data=info.data
				for (var i = 0; i < data.length; i++) {
				  var party_abbreviation = data[i].party_abbreviation;
				  var party_score  = data[i].party_score ;
					$('#matrix-div').append('<div class="matrix-div"> '+party_abbreviation+' <button class="btn">'+party_score+'</button><br clear="all" /></div>');
				pie +='{ label: "'+party_abbreviation+'", y: '+party_score+'},';
				}
				_get_pie(pie);
				_get_bar(pie);
			}else{
				$('#warning-div').html('<div><i class="bi-exclamation-octagon-fill"></i></div> CAUTION ALERT!<br /><span>'+message+'</span>').fadeIn(500).delay(5000).fadeOut(100);
			}
				
		}
	});
}



function _get_pie(pie){
	$('#pie').html('<div class="ajax-loader"><img src="'+website_url+'/all-images/images/ajax-loader.gif"/></div>').fadeIn('fast');
		var dataString ='pie='+ pie;
	$.ajax({
		type: "POST",
		url: local_url+'?action=pie',
		data: dataString,
		cache: false,
		success: function(html){
		$('#pie').html(html);
		}
	});

}



function _get_bar(bar){
	$('#bar').html('<div class="ajax-loader"><img src="'+website_url+'/all-images/images/ajax-loader.gif"/></div>').fadeIn('fast');
		var dataString ='bar='+ bar;
	$.ajax({
		type: "POST",
		url: local_url+'?action=bar',
		data: dataString,
		cache: false,
		success: function(html){
		$('#bar').html(html);
		}
	});

}