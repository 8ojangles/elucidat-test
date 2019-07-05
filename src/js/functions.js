
// app functions

/**
 * checks the seating array and returns matched item.
 * @function
 * @param {array} arr - The seat data array.
 * @param {string} key - The object parameter to match from the array.
 * @param {string} val - The value to match in the array.
 * @returns {object} - The matched object from the array, else retuns false
 */
 /*
 // es5
 // let arrLen = arr.length - 1;
 // for (let i = arrLen; i >= 0; i--) {
 // 	if ( arr[ i ][ key ] === val ) {
 // 		return arr[ i ];
 // 	}
 // }
 // return false;
 */
function checkSeatInfo( arr, key, val ) {
	let thisItem = arr.filter( item => item[ key ] === val );
	if ( thisItem.length > 0 ) {
		return thisItem[ 0 ];
	}
	return false;
};


/**
 * loops array of elements and changes innerHtml based on mapped data.
 * @function
 * @param {array} arr - array of elements.
 * @param {object} data - The object containing html data to insert.
 */
function populateSeatInfo( arr, data ) {
	let arrLen = arr.length - 1;
	var tempArr = [];
	for (let i = arrLen; i >= 0; i--) {
		let item = arr[ i ];
		tempArr.push( { el: item.el, data: data[ item.key ] } );
	}
	return tempArr;
};


const fN = {
	checkSeatInfo: checkSeatInfo,
	populateSeatInfo: populateSeatInfo
}

module.exports.fN = fN;