/*globals showDriverDetailsPanel showDriverAprroveRejectPanel msgObj*/
/* global new_block,formatDate, randStr, bag, $, clear_blocks, document, WebSocket, escapeHtml, window , testing*/

//part1.js
var ws = {};
var bgcolors = ["whitebg", "blackbg", "redbg", "greenbg", "bluebg", "purplebg", "pinkbg", "orangebg", "yellowbg"];

// =================================================================================
// On Load
// =================================================================================
$(document).on("ready", function() {
	connect_to_server();
	$("input[name=\"name\"]").val("r" + randStr(6));
	
	// =================================================================================
	// jQuery UI Events
	// =================================================================================
	$("#submit").click(function(){
		console.log("creating marble");
		var obj = 	{
						type: "create",
						name: $("input[name=\"name\"]").val().replace(" ", ""),
						color: $(".colorSelected").attr("color"),
						size: $("select[name=\"size\"]").val(),
						user: $("select[name=\"user\"]").val(),
						v: 1
					};
		if(obj.user && obj.name && obj.color){
			console.log("creating marble, sending", obj);
			ws.send(JSON.stringify(obj));
			showHomePanel();
			$(".colorValue").html("Color");											//reset
			for(var i in bgcolors) $(".createball").removeClass(bgcolors[i]);		//reset
			$(".createball").css("border", "2px dashed #fff");						//reset
		}
			return false;
		});

	$("#loginuser").click(function(){
		console.log('Inside login user click');
		var obj = 	{
						type: 'loginuser',
						loginusername: $("input[name=\"loginusername\"]").val().replace(" ", ""),
						loginpassword: $("input[name=\"loginpassword\"]").val().replace(" ", ""),
						v: 1
					};
	if(obj.loginusername && obj.loginpassword){
			console.log('sending login details for validation', obj);
			ws.send(JSON.stringify(obj));
			console.log('login details sent to ws for validation', obj);
//			showHomePanel();
//			$('.colorValue').html('Color');											//reset
//			for(var i in bgcolors) $('.createball').removeClass(bgcolors[i]);		//reset
//			$('.createball').css('border', '2px dashed #fff');						//reset
		}
//		$("#signupPanel").fadeIn(300);
//		$("#loginuserPanel").hide();
	
	
//		var driverlistobj = 	{
//				type: "listdriver",
//				v: 1
//			};
//		
//		console.log("listing drivers, sending", driverlistobj);
//		ws.send(JSON.stringify(driverlistobj));
//		function onMessage(msg){
//		try{
//			var msgObj = JSON.parse(msg.data);
//			
//			if(msgObj.msg === "driverslist"){
//				console.log("Status", msgObj.eachdriver.status);
//				if(msgObj.eachdriver.status == "P"){
//				build_driver(msgObj.eachdriver);
//			}
//
//			}
//			
//		} 
//		catch(e){
//			console.log("ERROR", e);
//			}
//
//	}
//
//		$("#driverdetailsPanel").hide();
//		showDriverPendingListPanel();
//		$("#loginuserPanel").hide();
//}
//	else {
//	 	console.log("checking up driver logging-1");
//		var checkdriverobj = {
//					type: "checkdriverdetails",
//						checkdriveremail: $("input[name=\"username\"]").val().replace(" ", ""),
//						v: 1
//					};
////		if(obj.user && obj.name && obj.color){
//			console.log("doing sign up, sending", checkdriverobj);
//			ws.send(JSON.stringify(checkdriverobj));
//			
//			function onMessage(msg){
//		try{
//			var msgObj = JSON.parse(msg.data);
//			
//			if(msgObj.msg === "driver"){
//				console.log("rec", msgObj.msg, msgObj.driver);
//				//build_ball(msgObj.marble);
//				$("input[name=\"driverdetailsemail\"]").val(msgObj.driver.email);
//				$("input[name=\"driverdetailspassword\"]").val(msgObj.driver.password);
//				//showDriverDetailsPanel();
//			}
//		}
//
//	catch(e){
//			console.log("ERROR", e);
//			
//			}
//		}
//	
//
//			console.log("checking up driver logging");
//			console.log("obj.username", obj.username);
//	 		console.log("msgObj.driver.email" ,msgObj.driver.email);
//	 		console.log("obj.password", obj.password);
//	 		console.log("msgObj.password" ,msgObj.driver.password);
//			if (obj.username === msgObj.driver.email && obj.password === msgObj.driver.password) {
//				$("input[name=\"userrole\"]").val("Driver Logged In");
//				showDriverDetailsPanel();
//				$("#loginuserPanel").hide();
//				
//			}
//			else{
//				console.log("NOt a driver");
//	    		}
//	} 

	 return false;
	});

	
	$("#logoutuserLink").click(function(){
	
		//$("#loginwrap").empty();
		//showLoginUserPanel();
		$("input[name=\"userrole\"]").val("");
		$("input[name=\"loginusername\"]").val("");
		$("input[name=\"loginpassword\"]").val("");
		showLoginUserPanel();

		return false;
	});
	
	
	$("#signup").click(function(){
		console.log("Signing up driver");
		var driverobj = {
						type: "signup",
						firstname: $("input[name=\"firstname\"]").val().replace(" ", ""),
						lastname: $("input[name=\"lastname\"]").val().replace(" ", ""),
						email: $("input[name=\"email\"]").val().replace(" ", ""),
						mobile: $("input[name=\"mobile\"]").val().replace(" ", ""),
						password: $("input[name=\"password\"]").val().replace(" ", ""),
						street: $("input[name=\"street\"]").val().replace(" ", ""),
						city: $("input[name=\"city\"]").val().replace(" ", ""),
						state: $("input[name=\"state\"]").val().replace(" ", ""),
						zip: $("input[name=\"zip\"]").val().replace(" ", ""),
						v: 1
					};
//		if(obj.user && obj.name && obj.color){
			console.log("doing sign up, sending", driverobj);
			ws.send(JSON.stringify(driverobj));
			//			showHomePanel();
//			$('.colorValue').html('Color');											//reset
//			for(var i in bgcolors) $('.createball').removeClass(bgcolors[i]);		//reset
//			$('.createball').css('border', '2px dashed #fff');						//reset
//		}
		
//		showHomePanel();
	$("#loginuserPanel").fadeIn(300);
	$("#signupPanel").hide();
	//	showDriverPendingListPanel();
		
		return false;
	});
	
	
	$("#approvedriver").click(function(){
		console.log("approving driver");
		var driverobj = 	{
						type: "updateapprovereject",
						firstname: $("input[name=\"driverdetailsfirstname\"]").val().replace(" ", ""),
						lastname: $("input[name=\"driverdetailslastname\"]").val().replace(" ", ""),
						email: $("input[name=\"driverdetailsemail\"]").val().replace(" ", ""),
						mobile: $("input[name=\"driverdetailsmobile\"]").val().replace(" ", ""),
						password: $("input[name=\"driverdetailspassword\"]").val().replace(" ", ""),
						street: $("input[name=\"driverdetailsstreet\"]").val().replace(" ", ""),
						city: $("input[name=\"driverdetailscity\"]").val().replace(" ", ""),
						state: $("input[name=\"driverdetailsstate\"]").val().replace(" ", ""),
						zip: $("input[name=\"driverdetailszip\"]").val().replace(" ", ""),
						status: "A",
						v: 1
					};
					
					console.log("approverejectdriver"+driverobj);
//		if(obj.user && obj.name && obj.color){
			console.log("approve, sending", driverobj);
			ws.send(JSON.stringify(driverobj));
			

//			now listing approved drivers			
//			var driverlistobj = 	{
//					type: "listdriver",
//					v: 1
//				};
//			
//			console.log("listing drivers, sending", driverlistobj);
//			ws.send(JSON.stringify(driverlistobj));
			
			$("#driverapproverejectPanel").hide();
			$("#drlistwrapa").empty();
			showDriverApprovalListPanel();
			
			
			
//			showHomePanel();
//			$('.colorValue').html('Color');											//reset
//			for(var i in bgcolors) $('.createball').removeClass(bgcolors[i]);		//reset
//			$('.createball').css('border', '2px dashed #fff');						//reset
//		}

//           var driverlistobj = 	{
//				type: "listdriver",
//				v: 1
//			};
//		
//		console.log("listing drivers, sending", driverlistobj);
//		ws.send(JSON.stringify(driverlistobj));
//		function onMessage(msg){
//		try{
//			var msgObj = JSON.parse(msg.data);
//			if(msgObj.marble){
//				console.log("rec", msgObj.msg, msgObj);
//				build_ball(msgObj.marble);
//			}
//			if(msgObj.msg === "driverslist"){
//				console.log("Status", msgObj.eachdriver.status);
//				if(msgObj.eachdriver.status == "A"){
//				build_drivera(msgObj.eachdriver);
//			}
//
//				//$("#driverdetailslist").append(msgObj.eachdriver.email +"<br>");
//				//showDriverApprovalListPanel();		
//			}
//			else if(msgObj.msg === "chainstats"){
//				console.log("rec", msgObj.msg, ": ledger blockheight", msgObj.chainstats.height, "block", msgObj.blockstats.height);
//				if(msgObj.blockstats && msgObj.blockstats.transactions) {
//                    var e = formatDate(msgObj.blockstats.transactions[0].timestamp.seconds * 1000, "%M/%d/%Y &nbsp;%I:%m%P");
//                    $("#blockdate").html("<span style=\"color:#fff\">TIME</span>&nbsp;&nbsp;" + e + " UTC");
//                    var temp =  {
//                        id: msgObj.blockstats.height,
//                        blockstats: msgObj.blockstats
//                    };
//                    new_block(temp);								//send to blockchain.js
//				}
//			}
//			else console.log("rec", msgObj.msg, msgObj);
//		}
//		catch(e){
//			console.log("ERROR", e);
//		}
//	}

//		showDriverApprovalListPanel();
		
		//$("#driverapprovallistPanel").hide();
		
		
		return false;
	});
	
	
	
	$("#approverejecteddriver").click(function(){
		console.log("approving driver");
		var driverobj = 	{
						type: "updateapprovereject",
						firstname: $("input[name=\"driverdetailsfirstname\"]").val().replace(" ", ""),
						lastname: $("input[name=\"driverdetailslastname\"]").val().replace(" ", ""),
						email: $("input[name=\"driverdetailsemail\"]").val().replace(" ", ""),
						mobile: $("input[name=\"driverdetailsmobile\"]").val().replace(" ", ""),
						password: $("input[name=\"driverdetailspassword\"]").val().replace(" ", ""),
						street: $("input[name=\"driverdetailsstreet\"]").val().replace(" ", ""),
						city: $("input[name=\"driverdetailscity\"]").val().replace(" ", ""),
						state: $("input[name=\"driverdetailsstate\"]").val().replace(" ", ""),
						zip: $("input[name=\"driverdetailszip\"]").val().replace(" ", ""),
						status: "A",
						v: 1
					};
					
					console.log("approverejectdriver"+driverobj);
//		if(obj.user && obj.name && obj.color){
			console.log("approve, sending", driverobj);
			ws.send(JSON.stringify(driverobj));
			

//			now listing approved drivers			
//			var driverlistobj = 	{
//					type: "listdriver",
//					v: 1
//				};
//			
//			console.log("listing drivers, sending", driverlistobj);
//			ws.send(JSON.stringify(driverlistobj));
			
			$("#driverrejectshowPanel").hide();
			$("#drlistwrapa").empty();
			showDriverApprovalListPanel();
			
			
			
//			showHomePanel();
//			$('.colorValue').html('Color');											//reset
//			for(var i in bgcolors) $('.createball').removeClass(bgcolors[i]);		//reset
//			$('.createball').css('border', '2px dashed #fff');						//reset
//		}

//           var driverlistobj = 	{
//				type: "listdriver",
//				v: 1
//			};
//		
//		console.log("listing drivers, sending", driverlistobj);
//		ws.send(JSON.stringify(driverlistobj));
//		function onMessage(msg){
//		try{
//			var msgObj = JSON.parse(msg.data);
//			if(msgObj.marble){
//				console.log("rec", msgObj.msg, msgObj);
//				build_ball(msgObj.marble);
//			}
//			if(msgObj.msg === "driverslist"){
//				console.log("Status", msgObj.eachdriver.status);
//				if(msgObj.eachdriver.status == "A"){
//				build_drivera(msgObj.eachdriver);
//			}
//
//				//$("#driverdetailslist").append(msgObj.eachdriver.email +"<br>");
//				//showDriverApprovalListPanel();		
//			}
//			else if(msgObj.msg === "chainstats"){
//				console.log("rec", msgObj.msg, ": ledger blockheight", msgObj.chainstats.height, "block", msgObj.blockstats.height);
//				if(msgObj.blockstats && msgObj.blockstats.transactions) {
//                    var e = formatDate(msgObj.blockstats.transactions[0].timestamp.seconds * 1000, "%M/%d/%Y &nbsp;%I:%m%P");
//                    $("#blockdate").html("<span style=\"color:#fff\">TIME</span>&nbsp;&nbsp;" + e + " UTC");
//                    var temp =  {
//                        id: msgObj.blockstats.height,
//                        blockstats: msgObj.blockstats
//                    };
//                    new_block(temp);								//send to blockchain.js
//				}
//			}
//			else console.log("rec", msgObj.msg, msgObj);
//		}
//		catch(e){
//			console.log("ERROR", e);
//		}
//	}

//		showDriverApprovalListPanel();
		
		//$("#driverapprovallistPanel").hide();
		
		
		return false;
	});
	
	
	

          //$("#driverapproverejectsuccessPanel").fadeIn(300);
		 // $("#driverapproverejectPanel").hide();
			//$("#createPanel").hide();
			//$("#signupPanel").hide();
		//	$("#driverapprovallistPanel").hide();
		//	$("#checkdriverPanel").hide();
		
		//var part = window.location.pathname.substring(0,3);
		//window.history.pushState({},"", part + "/driverdetails");
				
		//return false;
	//});
	
$("#rejectdriver").click(function(){
		console.log("Rejecting driver");
		var driverobj = 	{
						type: "updateapprovereject",
						firstname: $("input[name=\"driverdetailsfirstname\"]").val().replace(" ", ""),
						lastname: $("input[name=\"driverdetailslastname\"]").val().replace(" ", ""),
						email: $("input[name=\"driverdetailsemail\"]").val().replace(" ", ""),
						mobile: $("input[name=\"driverdetailsmobile\"]").val().replace(" ", ""),
						password: $("input[name=\"driverdetailspassword\"]").val().replace(" ", ""),
						street: $("input[name=\"driverdetailsstreet\"]").val().replace(" ", ""),
						city: $("input[name=\"driverdetailscity\"]").val().replace(" ", ""),
						state: $("input[name=\"driverdetailsstate\"]").val().replace(" ", ""),
						zip: $("input[name=\"driverdetailszip\"]").val().replace(" ", ""),
						status:"R",
						v: 1
					};
					
					console.log("approverejectdriver"+ driverobj.status);
//		if(obj.user && obj.name && obj.color){
			console.log("Rejecting driver, sending", driverobj);
			 ws.send(JSON.stringify(driverobj));


//			showHomePanel();
//			$('.colorValue').html('Color');											//reset
//			for(var i in bgcolors) $('.createball').removeClass(bgcolors[i]);		//reset
//			$('.createball').css('border', '2px dashed #fff');						//reset
//		}

//var driverlistobj = 	{
//				type: "listdriver",
//				v: 1
//			};
//		
//		console.log("listing drivers, sending", driverlistobj);
//		ws.send(JSON.stringify(driverlistobj));
		
		
//		function onMessage(msg){
//		try{
//			var msgObj = JSON.parse(msg.data);
//			if(msgObj.marble){
//				console.log("rec", msgObj.msg, msgObj);
//				build_ball(msgObj.marble);
//			}
//			if(msgObj.msg === "driverslist"){
//				console.log("Status", msgObj.eachdriver.status);
//				if(msgObj.eachdriver.status == "R"){
//				build_driverr(msgObj.eachdriver);
//			}
//
//				//$("#driverdetailslist").append(msgObj.eachdriver.email +"<br>");
//				//showDriverApprovalListPanel();		
//			}
//			else if(msgObj.msg === "chainstats"){
//				console.log("rec", msgObj.msg, ": ledger blockheight", msgObj.chainstats.height, "block", msgObj.blockstats.height);
//				if(msgObj.blockstats && msgObj.blockstats.transactions) {
//                    var e = formatDate(msgObj.blockstats.transactions[0].timestamp.seconds * 1000, "%M/%d/%Y &nbsp;%I:%m%P");
//                    $("#blockdate").html("<span style=\"color:#fff\">TIME</span>&nbsp;&nbsp;" + e + " UTC");
//                    var temp =  {
//                        id: msgObj.blockstats.height,
//                        blockstats: msgObj.blockstats
//                    };
//                    new_block(temp);								//send to blockchain.js
//				}
//			}
//			else console.log("rec", msgObj.msg, msgObj);
//		}
//		catch(e){
//			console.log("ERROR", e);
//		}
//	}

		$("#drlistwrapr").empty();
		showDriverRejectListPanel();
	    $("#driverapproverejectPanel").hide();
		
		return false;
	});




$("#rejectapproveddriver").click(function(){
	console.log("Rejecting driver");
	var driverobj = 	{
					type: "updateapprovereject",
					firstname: $("input[name=\"driverdetailsfirstname\"]").val().replace(" ", ""),
					lastname: $("input[name=\"driverdetailslastname\"]").val().replace(" ", ""),
					email: $("input[name=\"driverdetailsemail\"]").val().replace(" ", ""),
					mobile: $("input[name=\"driverdetailsmobile\"]").val().replace(" ", ""),
					password: $("input[name=\"driverdetailspassword\"]").val().replace(" ", ""),
					street: $("input[name=\"driverdetailsstreet\"]").val().replace(" ", ""),
					city: $("input[name=\"driverdetailscity\"]").val().replace(" ", ""),
					state: $("input[name=\"driverdetailsstate\"]").val().replace(" ", ""),
					zip: $("input[name=\"driverdetailszip\"]").val().replace(" ", ""),
					status:"R",
					v: 1
				};
				
				console.log("approverejectdriver"+ driverobj.status);
//	if(obj.user && obj.name && obj.color){
		console.log("Rejecting driver, sending", driverobj);
		 ws.send(JSON.stringify(driverobj));


//		showHomePanel();
//		$('.colorValue').html('Color');											//reset
//		for(var i in bgcolors) $('.createball').removeClass(bgcolors[i]);		//reset
//		$('.createball').css('border', '2px dashed #fff');						//reset
//	}

//var driverlistobj = 	{
//			type: "listdriver",
//			v: 1
//		};
//	
//	console.log("listing drivers, sending", driverlistobj);
//	ws.send(JSON.stringify(driverlistobj));
	
	
//	function onMessage(msg){
//	try{
//		var msgObj = JSON.parse(msg.data);
//		if(msgObj.marble){
//			console.log("rec", msgObj.msg, msgObj);
//			build_ball(msgObj.marble);
//		}
//		if(msgObj.msg === "driverslist"){
//			console.log("Status", msgObj.eachdriver.status);
//			if(msgObj.eachdriver.status == "R"){
//			build_driverr(msgObj.eachdriver);
//		}
//
//			//$("#driverdetailslist").append(msgObj.eachdriver.email +"<br>");
//			//showDriverApprovalListPanel();		
//		}
//		else if(msgObj.msg === "chainstats"){
//			console.log("rec", msgObj.msg, ": ledger blockheight", msgObj.chainstats.height, "block", msgObj.blockstats.height);
//			if(msgObj.blockstats && msgObj.blockstats.transactions) {
//                var e = formatDate(msgObj.blockstats.transactions[0].timestamp.seconds * 1000, "%M/%d/%Y &nbsp;%I:%m%P");
//                $("#blockdate").html("<span style=\"color:#fff\">TIME</span>&nbsp;&nbsp;" + e + " UTC");
//                var temp =  {
//                    id: msgObj.blockstats.height,
//                    blockstats: msgObj.blockstats
//                };
//                new_block(temp);								//send to blockchain.js
//			}
//		}
//		else console.log("rec", msgObj.msg, msgObj);
//	}
//	catch(e){
//		console.log("ERROR", e);
//	}
//}

	$("#drlistwrapr").empty();
	showDriverRejectListPanel();
    $("#driverapproverejectPanel").hide();
    $("#driverapproveshowPanel").hide();
    
	
	return false;
});




		//$("#driverapproverejectsuccessPanel").fadeIn(300);
		//$("#driverapproverejectPanel").hide();
		//	$("#createPanel").hide();
	//		$("#signupPanel").hide();
		//	$("#driverapprovallistPanel").hide();
		//	$("#checkdriverPanel").hide();
		
	//	var part = window.location.pathname.substring(0,3);
		//window.history.pushState({},"", part + "/driverdetails");
		
		
		//return false;
	//});
	
$("#updatedriver").click(function(){
		console.log("Updating driver");
		var driverobj = 	{
						type: "updatedriverdetails",
						firstname: $("input[name=\"driverdetailsfirstname\"]").val().replace(" ", ""),
						lastname: $("input[name=\"driverdetailslastname\"]").val().replace(" ", ""),
						email: $("input[name=\"driverdetailsemail\"]").val().replace(" ", ""),
						mobile: $("input[name=\"driverdetailsmobile\"]").val().replace(" ", ""),
						password: $("input[name=\"driverdetailspassword\"]").val().replace(" ", ""),
						street: $("input[name=\"driverdetailsstreet\"]").val().replace(" ", ""),
						city: $("input[name=\"driverdetailscity\"]").val().replace(" ", ""),
						state: $("input[name=\"driverdetailsstate\"]").val().replace(" ", ""),
						zip: $("input[name=\"driverdetailszip\"]").val().replace(" ", ""),
						status:"P",
						v: 1
					};
					
					console.log("updatedriver"+ driverobj.status);
//		if(obj.user && obj.name && obj.color){
			console.log("Update, sending", driverobj);
			ws.send(JSON.stringify(driverobj));
//			showHomePanel();
//			$('.colorValue').html('Color');											//reset
//			for(var i in bgcolors) $('.createball').removeClass(bgcolors[i]);		//reset
//			$('.createball').css('border', '2px dashed #fff');						//reset
//		}
		$("#driverapproverejectsuccessPanel").fadeIn(300);
		$("#driverapproverejectPanel").hide();
			$("#createPanel").hide();
			$("#signupPanel").hide();
			$("#driverapprovallistPanel").hide();
			$("#checkdriverPanel").hide();
			$("#driverdetailsPanel").hide();
			
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/driverdetails");
		
		
		return false;
	});
	

	$("#checkdriverdetails").click(function(){
		console.log("checking up driver");
		var checkdriverobj = {
						type: "checkdriverdetails",
						checkdriveremail: $("input[name=\"checkdriveremail\"]").val().replace(" ", ""),
						v: 1
					};
//		if(obj.user && obj.name && obj.color){
			//console.log('doing sign up, sending', driverobj);
			ws.send(JSON.stringify(checkdriverobj));
			showDriverDetailsPanel();
//			showHomePanel();
//			$('.colorValue').html('Color');											//reset
//			for(var i in bgcolors) $('.createball').removeClass(bgcolors[i]);		//reset
//			$('.createball').css('border', '2px dashed #fff');						//reset
//		}
			
		//var	driverdetailsmail=$('input[name="checkdriveremail"]').val().replace(' ', '');
		
		//$('input[name="driverdetailsemail"]').val(driverdetailsmail);
		//showDriverDetailsPanel();
		
		return false;
	});
	
	
	
	$("#homeLink").click(function(){
		showHomePanel();
	});
	
	$("#loginuserLink").click(function(){
		//$("#loginwrap").empty();
		$("input[name=\"userrole\"]").val("");
		$("input[name=\"loginusername\"]").val("");
		$("input[name=\"loginpassword\"]").val("");
		showLoginUserPanel();
		//$("input[name=\"userrole\"]").val("");
	});
	
	$("#signupLink").click(function(){
		$("#signupwrap").empty();
		$("input[name=\"firstname\"]").val("");
			$("input[name=\"lastname\"]").val("");
			$("input[name=\"email\"]").val("");
			$("input[name=\"mobile\"]").val("");
			$("input[name=\"password\"]").val("");
			$("input[name=\"street\"]").val("");
			$("input[name=\"city\"]").val("");
			$("input[name=\"state\"]").val("");
			$("input[name=\"zip\"]").val("");
		showSignupPanel();
	});

	$("#createLink").click(function(){
		$("input[name=\"name\"]").val("r" + randStr(6));
	});
	
	$("#checkdriverLink").click(function(){
		showcheckdriverPanel();
	});
	
	$("#driverdetailsLink").click(function(){
		showDriverDetailsPanel();
	});


	$("#pendingdriverlistLink").click(function(){
		if($("input[name=\"userrole\"]").val() === "Driver"){
		//if(bag.ssn.loginresult === "Driver"){
			
			$("#noaccessPanel").fadeIn(300);
	
		}
		else if($("input[name=\"userrole\"]").val() === "")
		{
			$("#noaccessPanel").fadeIn(300);
		}
		else if($("input[name=\"userrole\"]").val() === "LoginFailure")
		{
			$("#noaccessPanel").fadeIn(300);
		}
		else {
		
		//ws.send(JSON.stringify({type: 'chainstats', v:1}));
		console.log("Retrieve list of drivers");
		$("#drlistwrap").empty();
		
		var driverlistobj = 	{
				type: "listdriver",
				v: 1
			};
		
		console.log("listing drivers, sending", driverlistobj);
		ws.send(JSON.stringify(driverlistobj));
		showDriverPendingListPanel();
		}
	});
	
	$("#approvaldriverlistLink").click(function(){
		if($("input[name=\"userrole\"]").val() === "Driver"){
			
			$("#noaccessPanel").fadeIn(300);
	
		}else if($("input[name=\"userrole\"]").val() === "LoginFailure")
		{
			$("#noaccessPanel").fadeIn(300);
		}else if ($("input[name=\"userrole\"]").val() === "")
		{
			$("#noaccessPanel").fadeIn(300);
		}else {
		//ws.send(JSON.stringify({type: 'chainstats', v:1}));
		console.log("Retrieve list of drivers");
		$("#drlistwrapa").empty();
		
		var driverlistobj = 	{
				type: "listdriver",
				v: 1
			};
		
		console.log("listing drivers, sending", driverlistobj);
		ws.send(JSON.stringify(driverlistobj));
		showDriverApprovalListPanel();
	}

	});
	
	$("#rejectdriverlistLink").click(function(){
		
		if($("input[name=\"userrole\"]").val() === "Driver"){
			
			$("#noaccessPanel").fadeIn(300);
		}else if ($("input[name=\"userrole\"]").val() === "")
		{
			$("#noaccessPanel").fadeIn(300);
		}else if($("input[name=\"userrole\"]").val() === "LoginFailure")
		{
			$("#noaccessPanel").fadeIn(300);
		}else {
		//ws.send(JSON.stringify({type: 'chainstats', v:1}));
		console.log("Retrieve list of drivers");
		$("#drlistwrapr").empty();
		
		var driverlistobj = 	{
				type: "listdriver",
				v: 1
			};
		
		console.log("listing drivers, sending", driverlistobj);
		ws.send(JSON.stringify(driverlistobj));
		showDriverRejectListPanel();
		
	}

	});
	
	
	//marble color picker
	$(document).on("click", ".colorInput", function(){
		$(".colorOptionsWrap").hide();											//hide any others
		$(this).parent().find(".colorOptionsWrap").show();
	});
	$(document).on("click", ".colorOption", function(){
		var color = $(this).attr("color");
		var html = "<span class=\"fa fa-circle colorSelected " + color + "\" color=\"" + color + "\"></span>";
		
		$(this).parent().parent().find(".colorValue").html(html);
		$(this).parent().hide();

		for(var i in bgcolors) $(".createball").removeClass(bgcolors[i]);			//remove prev color
		$(".createball").css("border", "0").addClass(color + "bg");				//set new color
	});
	
	
	//drag and drop marble
	$("#user2wrap, #user1wrap, #trashbin").sortable({connectWith: ".sortable"}).disableSelection();
	$("#user2wrap").droppable({drop:
		function( event, ui ) {
			var user = $(ui.draggable).attr("user");
			if(user.toLowerCase() != bag.setup.USER2){
				$(ui.draggable).addClass("invalid");
				transfer($(ui.draggable).attr("id"), bag.setup.USER2);
			}
		}
	});
	$("#user1wrap").droppable({drop:
		function( event, ui ) {
			var user = $(ui.draggable).attr("user");
			if(user.toLowerCase() != bag.setup.USER1){
				$(ui.draggable).addClass("invalid");
				transfer($(ui.draggable).attr("id"), bag.setup.USER1);
			}
		}
	});
	$("#trashbin").droppable({drop:
		function( event, ui ) {
			var id = $(ui.draggable).attr("id");
			if(id){
				console.log("removing marble", id);
				var obj = 	{
								type: "remove",
								name: id,
								v: 1
							};
				ws.send(JSON.stringify(obj));
				$(ui.draggable).fadeOut();
				setTimeout(function(){
					$(ui.draggable).remove();
				}, 300);
				showHomePanel();
			}
		}
	});
	
	
	// =================================================================================
	// Helper Fun
	// ================================================================================
	//show admin panel page
	function showHomePanel(){
		$("#homePanel").fadeIn(300);
		$("#createPanel").hide();
		$("#signupPanel").hide();
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/home");						//put it in url so we can f5
		
		console.log("getting new balls");
		setTimeout(function(){
			$("#user1wrap").html("");											//reset the panel
			$("#user2wrap").html("");
			ws.send(JSON.stringify({type: "get", v: 1}));						//need to wait a bit
			ws.send(JSON.stringify({type: "chainstats", v: 1}));
		}, 1000);
	}
	
	
	function showLoginUserPanel(){
		$("#loginuserPanel").fadeIn(300);
		$("#createPanel").hide();
		$("#signupPanel").hide();
		//$('#createPanel').hide();
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/loginuser");	
		
	}
	
	function showDriverDetailsPanel(){
		$("#drvdwrap").empty();
		$("#driverdetailsPanel").fadeIn(300);
		$("#createPanel").hide();
		$("#signupPanel").hide();
		//$('#home').hide();
		$("#checkdriverPanel").hide();
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/driverdetails");	
	}
	
 function showDriverPendingListPanel(){
		
		$("#driverpendinglistPanel").fadeIn(300);
		$("#createPanel").hide();
		$("#signupPanel").hide();
		//$('#home').hide();
		$("#checkdriverPanel").hide();
		$("#driverrejectlistPanel").hide();
		$("#driverapprovallistPanel").hide();
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/pendingdrivers");	

	}
	
	function showDriverApprovalListPanel(){
		
		$("#driverapprovallistPanel").fadeIn(300);
			$("#createPanel").hide();
			$("#signupPanel").hide();
			//$("#driverapprovallistPanel").hide();
			$("#checkdriverPanel").hide();
			$("#driverpendinglistPanel").hide();
			$("#driverrejectlistPanel").hide();
		
		var part = window.location.pathname.substring(0,3);
		//window.history.pushState({},"", part + "/driverdetails");	
		window.history.pushState({},"", part + "/approvedrivers");	
	}

 function showDriverRejectListPanel(){
 	
			$("#driverrejectlistPanel").fadeIn(300);
			$("#createPanel").hide();
			$("#signupPanel").hide();
		//	$("#driverapprovallistPanel").hide();
			$("#checkdriverPanel").hide();
			$("#driverpendinglistPanel").hide();
			$("#driverapprovallistPanel").hide();
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/rejectdrivers");
		
		//window.history.pushState({},"", part + "/dirverapprovallist");	
	}

	
	function showcheckdriverPanel(){
		$("#checkdriverPanel").fadeIn(300);
		$("#createPanel").hide();
		$("#signupPanel").hide();
		$("#driverdetailsPanel").hide();
		//$('#homePanel').hide();
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/checkdriver");						//put it in url so we can f5
		
//		console.log('getting list of drivers');
//		setTimeout(function(){
//		//	$('#user1wrap').html('');											//reset the panel
//		//	$('#user2wrap').html('');
//		//	ws.send(JSON.stringify({type: 'get', v: 1}));						//need to wait a bit
//		//	ws.send(JSON.stringify({type: 'chainstats', v: 1}));
//			
//									//need to wait a bit
//			
//		}, 1000);
	}
	
	//show Signup panel page
	function showSignupPanel(){
		$("#signupPanel").fadeIn(300);
		$("#createPanel").hide();
		$("#loginuserPanel").hide();
		//$('#createPanel').hide();
		
		var part = window.location.pathname.substring(0,4);
		window.history.pushState({},"", part + "/signup");						//put it in url so we can f5		
	}
	
	//show Signup panel page
	function showSucessPanel(){
		$("#driverapproverejectsuccessPanel").fade(300);
	
		$("#driverapproverejectPanel").hide();
			$("#createPanel").hide();
			$("#signupPanel").hide();
			$("#driverapprovallistPanel").hide();
			$("#checkdriverPanel").hide();
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/driverdetails");
		
	}
	
	//transfer selected ball to user
	function transfer(marbleName, user){
		if(marbleName){
			console.log("transfering", marbleName);
			var obj = 	{
							type: "transfer",
							name: marbleName,
							user: user,
							v: 1
						};
			ws.send(JSON.stringify(obj));
			showHomePanel();
		}
	}
});


// =================================================================================
// Socket Stuff
// =================================================================================
function connect_to_server(){
	var connected = false;

    // Redirect https requests to http so the server can handle them
    if(this.location.href.indexOf("https://") > -1) {
        this.location.href = this.location.href.replace("https://", "http://");
    }

	connect();

	function connect(){
		var wsUri = "ws://" + document.location.hostname + ":" + document.location.port;
		console.log("Connectiong to websocket", wsUri);
		
		ws = new WebSocket(wsUri);
		ws.onopen = function(evt) { onOpen(evt); };
		ws.onclose = function(evt) { onClose(evt); };
		ws.onmessage = function(evt) { onMessage(evt); };
		ws.onerror = function(evt) { onError(evt); };
	}
	
	function onOpen(evt){
		console.log("WS CONNECTED");
		connected = true;
		clear_blocks();
		$("#errorNotificationPanel").fadeOut();
		ws.send(JSON.stringify({type: "get", v:1}));
		ws.send(JSON.stringify({type: "chainstats", v:1}));
	}

	function onClose(evt){
		console.log("WS DISCONNECTED", evt);
		connected = false;
		setTimeout(function(){ connect(); }, 5000);					//try again one more time, server restarts are quick
	}

	function onMessage(msg){
		try{
			var msgObj = JSON.parse(msg.data);
			if(msgObj.marble){
				console.log("rec", msgObj.msg, msgObj);
				build_ball(msgObj.marble);
			}
			if(msgObj.msg === "checklogin"){
				console.log("Logged in user details", msgObj.msg, msgObj.driver);

				if(msgObj.authentication === "failure")
					{
						//bag.ssn.loginresult="LoginFailure";
						$("input[name=\"userrole\"]").val("LoginFailure");
					}
				
				if(msgObj.authentication === "success")
				{
					if(msgObj.driver.email==="admin@fleetchain.com")
						{
							
							//bag.ssn.loginresult="Uber Admin";			
							$("input[name=\"userrole\"]").val("Uber Admin");
							
							$("#loginuserPanel").hide();
							$("#driverpendinglistPanel").fadeIn(300);
							
							//show pending driver list
							//ws.send(JSON.stringify({type: 'chainstats', v:1}));
							console.log("Retrieve list of drivers");
							$("#drlistwrap").empty();
							
							var pendingdriverlistobj = {
									type: "listdriver",
									v: 1
								};
							
							console.log("listing drivers, sending", pendingdriverlistobj);
							ws.send(JSON.stringify(pendingdriverlistobj));
							//showDriverPendingListPanel();
						
						}
					else
						{
							
							//bag.ssn.loginresult="Driver";
							$("input[name=\"userrole\"]").val("Driver");
							
							//show driver details
							$("input[name=\"driverdetailsemail\"]").val(msgObj.driver.email);
							$("input[name=\"driverdetailsfirstname\"]").val(msgObj.driver.firstname);
							$("input[name=\"driverdetailslastname\"]").val(msgObj.driver.lastname);
							$("input[name=\"driverdetailsmobile\"]").val(msgObj.driver.mobile);
							$("input[name=\"driverdetailspassword\"]").val(msgObj.driver.password);
							$("input[name=\"driverdetailsstreet\"]").val(msgObj.driver.street);
							$("input[name=\"driverdetailscity\"]").val(msgObj.driver.city);
							$("input[name=\"driverdetailsstate\"]").val(msgObj.driver.state);
							$("input[name=\"driverdetailszip\"]").val(msgObj.driver.zip);
							$("input[name=\"driverdetailsstatus\"]").val(msgObj.driver.status);
							
							
							
							$("#loginuserPanel").hide();
							$("#driverdetailsPanel").fadeIn(300);
//							$("#createPanel").hide();
//							$("#signupPanel").hide();
//							$("#driverpendinglistPanel").hide();
//							$("#checkdriverPanel").hide();
//							$("#driverrejectlistPanel").hide();
//							$("#driverapprovallistPanel").hide();
						
						}
				
				
				}
				
				
				//showDriverDetailsPanel();
			}
			if(msgObj.msg === "driver"){
				console.log("rec", msgObj.msg, msgObj.driver);

				
				//build_ball(msgObj.marble);
				$("input[name=\"driverdetailsemail\"]").val(msgObj.driver.email);
				$("input[name=\"driverdetailsfirstname\"]").val(msgObj.driver.firstname);
				$("input[name=\"driverdetailslastname\"]").val(msgObj.driver.lastname);
				$("input[name=\"driverdetailsmobile\"]").val(msgObj.driver.mobile);
				$("input[name=\"driverdetailspassword\"]").val(msgObj.driver.password);
				$("input[name=\"driverdetailsstreet\"]").val(msgObj.driver.street);
				$("input[name=\"driverdetailscity\"]").val(msgObj.driver.city);
				$("input[name=\"driverdetailsstate\"]").val(msgObj.driver.state);
				$("input[name=\"driverdetailszip\"]").val(msgObj.driver.zip);
				$("input[name=\"driverdetailsstatus\"]").val(msgObj.driver.status);
				//showDriverDetailsPanel();
			}
			if(msgObj.msg === "driverslist"){
				console.log("Status", msgObj.eachdriver.status);
				if(msgObj.eachdriver.status == "P"){
				build_driver(msgObj.eachdriver);
			}

				if(msgObj.eachdriver.status == "A"){
				build_drivera(msgObj.eachdriver);
			}

			if(msgObj.eachdriver.status == "R"){
				build_driverr(msgObj.eachdriver);
			}

				//$("#driverdetailslist").append(msgObj.eachdriver.email +"<br>");
				//showDriverApprovalListPanel();		
			}
			else if(msgObj.msg === "chainstats"){
				console.log("rec", msgObj.msg, ": ledger blockheight", msgObj.chainstats.height, "block", msgObj.blockstats.height);
				if(msgObj.blockstats && msgObj.blockstats.transactions) {
                    var e = formatDate(msgObj.blockstats.transactions[0].timestamp.seconds * 1000, "%M/%d/%Y &nbsp;%I:%m%P");
                    $("#blockdate").html("<span style=\"color:#fff\">TIME</span>&nbsp;&nbsp;" + e + " UTC");
                    var temp =  {
                        id: msgObj.blockstats.height,
                        blockstats: msgObj.blockstats
                    };
                    new_block(temp);								//send to blockchain.js
				}
			}
			else console.log("rec", msgObj.msg, msgObj);
		}
		catch(e){
			console.log("ERROR", e);
		}
	}

	function onError(evt){
		console.log("ERROR ", evt);
		if(!connected && bag.e == null){											//don't overwrite an error message
			$("#errorName").html("Warning");
			$("#errorNoticeText").html("Waiting on the node server to open up so we can talk to the blockchain. ");
			$("#errorNoticeText").append("This app is likely still starting up. ");
			$("#errorNoticeText").append("Check the server logs if this message does not go away in 1 minute. ");
			$("#errorNotificationPanel").fadeIn();
		}
	}
}


// =================================================================================
//	UI Building
// =================================================================================
function build_ball(data){
	var html = "";
	var colorClass = "";
	var size = "fa-5x";
	
	data.name = escapeHtml(data.name);
	data.color = escapeHtml(data.color);
	data.user = escapeHtml(data.user);
	
	console.log("got a marble: ", data.color);
	if(!$("#" + data.name).length){								//only populate if it doesn't exists
		if(data.size == 16) size = "fa-3x";
		if(data.color) colorClass = data.color.toLowerCase();
		
		html += "<span id=\"" + data.name + "\" class=\"fa fa-circle " + size + " ball " + colorClass + " title=\"" + data.name + "\" user=\"" + data.user + "\"></span>";
		if(data.user && data.user.toLowerCase() == bag.setup.USER1){
			$("#user1wrap").append(html);
		}
		else{
			$("#user2wrap").append(html);
		}
	}
	return html;
}

function build_driver(data){
	var html = "";
	var colorClass = "";
	var size = "12";
	
	data.firstname = escapeHtml(data.firstname);
	data.lastname = escapeHtml(data.lastname);
	data.email = escapeHtml(data.email);
	data.password = escapeHtml(data.password);
	
	console.log("Got a driver: ", data.email);
	//if(!$('#' + data.email).length){								//only populate if it doesn't exists
		//if(data.size == 16) size = '12';
		//if(data.color) colorClass = data.color.toLowerCase();
		
		//html += '<span id="' + data.email + '" style="color:#ffff00' + ' First Name="' + data.firstname + ' Last Name="' + data.lastname+ '" Passwordr="' + data.password + '"></span>';
		
		html += "<tr><th>" + data.firstname + "</th><th>" + data.lastname + "</th><th><a href=\"javascript:showdriverdetails('"+data.email+"');\">" + data.email + "</a></th></tr>" ;
		
		$("#drlistwrap").append(html);
	//}
	
	console.log("driverlist message ", html);
//	showDriverListPanel();
	
	return html;
}

function showdriverdetails(email){
	console.log("After hyperlink cliuck" + email);
	var checkdriverobj = {
						type: "checkdriverdetails",
						checkdriveremail:email,
						v: 1
					};
//		if(obj.user && obj.name && obj.color){
			//console.log('doing sign up, sending', driverobj);
			ws.send(JSON.stringify(checkdriverobj));
			$("#driverapproverejectPanel").fadeIn(300);
			$("#createPanel").hide();
			$("#signupPanel").hide();
			$("#driverpendinglistPanel").hide();
			$("#checkdriverPanel").hide();
			$("#driverrejectlistPanel").hide();
			$("#driverapprovallistPanel").hide();
			
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/driverdetails");	
}

function showdriverdetailsapprove(email){
	console.log("After hyperlink cliuck" + email);
	var checkdriverobj = {
						type: "checkdriverdetails",
						checkdriveremail:email,
						v: 1
					};
//		if(obj.user && obj.name && obj.color){
			//console.log('doing sign up, sending', driverobj);
			ws.send(JSON.stringify(checkdriverobj));
			$("#driverapproveshowPanel").fadeIn(300);
			$("#driverapproverejectPanel").hide();
			$("#driverrejectshowPanel").hide();
			$("#createPanel").hide();
			$("#signupPanel").hide();
			$("#driverpendinglistPanel").hide();
			$("#checkdriverPanel").hide();
			$("#driverrejectlistPanel").hide();
			$("#driverapprovallistPanel").hide();
			
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/approvedriverdetails");	
}

function showdriverdetailsreject(email){
	console.log("After hyperlink cliuck" + email);
	var checkdriverobj = {
						type: "checkdriverdetails",
						checkdriveremail:email,
						v: 1
					};
//		if(obj.user && obj.name && obj.color){
			//console.log('doing sign up, sending', driverobj);
			ws.send(JSON.stringify(checkdriverobj));
	        $("#driverrejectshowPanel").fadeIn(300);
			$("#driverapproveshowPanel").hide();	
			$("#createPanel").hide();
			$("#signupPanel").hide();
			$("#driverpendinglistPanel").hide();
			$("#checkdriverPanel").hide();
			$("#driverrejectlistPanel").hide();
			$("#driverapprovallistPanel").hide();
			
		
		var part = window.location.pathname.substring(0,3);
		window.history.pushState({},"", part + "/rejectdriverdetails");	
}

function build_drivera(data){
	var html = "";
	var colorClass = "";
	var size = "12";
	
	data.firstname = escapeHtml(data.firstname);
	data.lastname = escapeHtml(data.lastname);
	data.email = escapeHtml(data.email);
	data.password = escapeHtml(data.password);
	
	console.log("Got a driver approved: ", data.email);
	//if(!$('#' + data.email).length){								//only populate if it doesn't exists
		//if(data.size == 16) size = '12';
		//if(data.color) colorClass = data.color.toLowerCase();
		
		//html += '<span id="' + data.email + '" style="color:#ffff00' + ' First Name="' + data.firstname + ' Last Name="' + data.lastname+ '" Passwordr="' + data.password + '"></span>';
		
			html += "<tr><th>" + data.firstname + "</th><th>" + data.lastname + "</th><th><a href=\"javascript:showdriverdetailsapprove('"+data.email+"');\">" + data.email + "</a></th></tr>" ;
		
		$("#drlistwrapa").append(html);
	//}
	
	console.log("driverlist message approved ", html);
//	showDriverListPanel();

			
	return html;
}

function build_driverr(data){
	var html = "";
	var colorClass = "";
	var size = "12";
	
	data.firstname = escapeHtml(data.firstname);
	data.lastname = escapeHtml(data.lastname);
	data.email = escapeHtml(data.email);
	data.password = escapeHtml(data.password);
	
	console.log("Got a rejected driver: ", data.email);
	//if(!$('#' + data.email).length){								//only populate if it doesn't exists
		//if(data.size == 16) size = '12';
		//if(data.color) colorClass = data.color.toLowerCase();
		
		//html += '<span id="' + data.email + '" style="color:#ffff00' + ' First Name="' + data.firstname + ' Last Name="' + data.lastname+ '" Passwordr="' + data.password + '"></span>';
		
			html += "<tr><th>" + data.firstname + "</th><th>" + data.lastname + "</th><th><a href=\"javascript:showdriverdetailsreject('"+data.email+"');\">" + data.email + "</a></th></tr>" ;
		$("#drlistwrapr").append(html);
	//}
	
	console.log("driverlist message rejected ", html);
//	showDriverListPanel();
	
	return html;
}