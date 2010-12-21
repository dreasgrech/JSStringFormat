String.format = String.format || function (format) {
	var params = [].splice.call(arguments, 1), nextOpen, nextClose = 0, index, plValue, spaces, totalSpaces;

	while ((nextOpen = format.indexOf('{', nextClose)) >= 0) {
		if (isNaN(+format[nextOpen+1])) {
			nextClose = nextOpen + 1;
			continue;
		}
		nextClose = format.indexOf('}', nextOpen);
		index = format.substring(nextOpen + 1, nextClose);
		if (index.indexOf(',') > 0) {
			spaces = +index.substring(index.indexOf(',') + 1);
			index = +index.substring(0, index.indexOf(','));
		}
		plValue = params[index] + '';
		if (spaces) {
			totalSpaces = new Array(Math.abs(spaces) - plValue.length + 1).join(" ");
			plValue = spaces > 0 ? totalSpaces + plValue : plValue + totalSpaces;
		}
		format = format.substring(0, nextOpen) + ((!plValue && plValue != 0) ? "" : plValue) + format.substring(nextClose + 1);
		spaces = 0;
	}
	return format;
};
