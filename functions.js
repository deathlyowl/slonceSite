var moveHand = function() {
	var myDate = new Date();
	seconds = myDate.getSeconds();
	minutes = myDate.getMinutes() + 60 * myDate.getHours();
	
	handWidth = seconds / 58 * 320;
	handPosition = minutes / 1440 * 568;
	
	if(seconds == 0 || seconds == 59){
		$('#ticker').css("opacity", 0);	
	}
	else{
		$('#ticker').css("opacity", 1);
	}
	$('#ticker').css("width", handWidth);
	$('#hand').css("top", handPosition);
};

var enableAnimations = function() {
	$('#ticker').css("-webkit-transition", ".75s ease-in");
	$('#hand').css("-webkit-transition", ".75s ease-in");
}