

var heightWithMinutes = function(minutes) {
	return minutes / 1440 * 568;
}

var moveHand = function() {
	var myDate = new Date();
	seconds = myDate.getSeconds();
	minutes = myDate.getMinutes() + 60 * myDate.getHours();
	
	handWidth = seconds / 58 * 320;
	handPosition = heightWithMinutes(minutes);
	
	if(seconds == 0 || seconds == 59){
		$('#ticker').css("opacity", 0);	
	}
	else{
		$('#ticker').css("opacity", 1);
	}
	$('#ticker').css("width", handWidth);
	$('#hand').css("top", handPosition);
	
	minutesS = myDate.getMinutes();
	secondsS = myDate.getSeconds();
	
	if(minutesS< 10) minutesS = "0" + minutesS;
	if(secondsS< 10) secondsS = "0" + secondsS;
	
	
	//$('#subtext').text("it's " + myDate.getHours() + ':' + minutesS + ':' + secondsS);
};

var enableAnimations = function() {
	$('#ticker').css("-webkit-transition", ".75s ease-in");
	$('#hand').css("-webkit-transition", ".75s ease-in");
	$('#ticker').css("-moz-transition", ".75s ease-in");
	$('#hand').css("-moz-transition", ".75s ease-in");
}

var setPagesize = function() {
	hght = pageHeight;
	$('.page').css("height", hght);
}

var setBars = function(calculations, mode) {
	
	dawnIndex = mode;
	
	sunset = new Date(epochFromJulian(calculations[0]) * 1000);
	sunrise = new Date(epochFromJulian(calculations[1]) * 1000);
	dawn =  new Date(epochFromJulian(calculations[0 + mode*2]) * 1000);
	dusk =  new Date(epochFromJulian(calculations[1 + mode*2]) * 1000);
	
	sunsetHeight = heightWithMinutes(	sunset.getMinutes() + 
										sunset.getHours() * 60);

	duskHeight = heightWithMinutes(	dawn.getMinutes() + 
									dawn.getHours() * 60);
									
	twillightSpace = heightWithMinutes((sunrise.getMinutes() + 
										sunrise.getHours() * 60) -
									   (sunset.getMinutes() + 
										sunset.getHours() * 60));
	
	nightSpace = heightWithMinutes((dusk.getMinutes() + 
									dusk.getHours() * 60) -
								   (dawn.getMinutes() + 
									dawn.getHours() * 60));
									
	if(mode == 0){
		sunsetHeight = duskHeight = 0;
		twillightSpace = nightSpace = 568;
	}

	$('#pretwillight').css("height", sunsetHeight);
	$('#prenight').css("height", duskHeight);

	$('#twillightspace').css("height", twillightSpace);
	$('#nightspace').css("height", nightSpace);
}

$( window ).scroll(function() {
	scrollTop = $(window).scrollTop();
	if(scrollTop > 0 && !direction) direction = 1;
	if(scrollTop < 0 && !direction) direction = -1;
	if(scrollTop == 0)
	{
		page = page + direction;
	
		if(page < 0) page = 0;
		if(page > pagesCount) page = pagesCount;
		
		setPage(page);
		direction = 0;
	}
});

$( window ).resize(function() {
	setPagesize();
});
