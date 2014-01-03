var approx = function( angle, julianCycle) {
	JULIAN_2000_JANUARY_1_NOON = 2451545.0009;
	return JULIAN_2000_JANUARY_1_NOON - angle / 360 + julianCycle;
}

var fmod = function (a, b) {
	while ( b <= a) {a -= b}
	return a;
}

var solarMeanAnomaly = function (J) {
	return fmod((357.5291 + 0.98560028 * (J - 2451545)), 360);
}

var degreesToRadians = function(degrees) {
	return degrees * Math.PI / 180;
}

var radiansToDegrees = function(radians) {
	return radians * 180 / Math.PI;
}
		
var equationOfCenter = function(M) {
    return 	1.9148 * Math.sin(degreesToRadians(M)) +
        	0.0200 * Math.sin(2 * degreesToRadians(M)) +
        	0.0003 * Math.sin(3 * degreesToRadians(M));
}

var eclipticLongitude = function (M, C) {
	return degreesToRadians(fmod((M + 102.9372 + C + 180), 360));
}

var hourAngle = function (angle, latitude, delta){
    return radiansToDegrees(Math.acos((Math.sin(degreesToRadians(angle)) - 
	Math.sin(degreesToRadians(latitude))*
	Math.sin(delta))/(Math.cos(degreesToRadians(latitude)) * 
	Math.cos(delta))));
}

var epochFromJulian = function(julian) {
    return epoch = 86400 * (julian - + 2440587.5);
}

var calculate = function() {
	longitude = 17;
	latitude = 51;
	julianCycle = 5116;

	noon = approx(longitude, julianCycle);
	anomaly = solarMeanAnomaly(noon);	
	center = equationOfCenter(anomaly);
	lambda = eclipticLongitude(anomaly,center);
	buffer = 	noon + 
				0.0053 * Math.sin(degreesToRadians(anomaly)) - 
				0.0069 * Math.sin(2*lambda);
				
	while (anomaly != solarMeanAnomaly(buffer))
	{
        anomaly = solarMeanAnomaly(buffer);
        center = equationOfCenter(anomaly);
        lambda = eclipticLongitude(anomaly, center);
        buffer = 	noon + 
					0.0053 * Math.sin(degreesToRadians(anomaly)) - 
					0.0069 * Math.sin(2*lambda);
	}
	noon = buffer;
	
    delta = Math.asin(Math.sin(lambda) * 
			Math.sin(degreesToRadians(23.45)));
	
	FIRST_TOUCH = 0.83;
	ASTRO = 18;
	NAVI = 12;
	CIVIL = 6;

	firstTouchAngle = hourAngle(-FIRST_TOUCH, latitude, delta);
	astroAngle = hourAngle(-ASTRO, latitude, delta);
	naviAngle = hourAngle(-NAVI, latitude, delta);
	civilAngle = hourAngle(-CIVIL, latitude, delta);
	
    stage = 4;
    if (astroAngle != astroAngle)           stage = 3;
    if (naviAngle != naviAngle)             stage = 2;
    if (civilAngle != civilAngle)           stage = 1;
    if (firstTouchAngle != firstTouchAngle) stage = 0;
	
    lastTouchTime = approx(longitude - firstTouchAngle , julianCycle);
	lastAstroTime = approx(longitude - astroAngle, julianCycle);
	lastNaviTime = approx(longitude - naviAngle, julianCycle);
	lastCivilTime = approx(longitude - civilAngle, julianCycle);
	
    sunset = 	lastTouchTime + 
				(0.0053 * Math.sin(degreesToRadians(anomaly)) - 
				(0.0069 * Math.sin(2 * lambda)));
	sunrise = noon - ( sunset - noon );
	
    astroDawn = lastAstroTime + 
				(0.0053 * Math.sin(degreesToRadians(anomaly)) - 
				(0.0069 * Math.sin(2* lambda)));
    astroDusk = noon - (astroDawn - noon);

    naviDawn = 	lastNaviTime + 
				(0.0053 * Math.sin(degreesToRadians(anomaly)) - 
				(0.0069 * Math.sin(2* lambda)));
    naviDusk = noon - (naviDawn - noon);

    civilDawn = lastCivilTime + 
				(0.0053 * Math.sin(degreesToRadians(anomaly)) - 
				(0.0069 * Math.sin(2* lambda)));
    civilDusk = noon - (civilDawn - noon);
	
	
	calculations = new Array();
	calculations[0] = sunrise;
	calculations[1] = sunset;
	
	calculations[2] = civilDusk;
	calculations[3] = civilDawn;
	
	calculations[4] = naviDusk;
	calculations[5] = naviDawn;
	
	calculations[6] = astroDusk;
	calculations[7] = astroDawn;
	
	return calculations;
	
};