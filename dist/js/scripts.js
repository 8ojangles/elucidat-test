(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = {
    seats: [
        {
            "seatNumber": "1A",
            "price": "£19.99",
            "available": true,
            "disabilityAccessible": true
        },
        {
            "seatNumber": "2A",
            "price": "£19.99",
            "available": false,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "3A",
            "price": "£19.99",
            "available": false,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "4A",
            "price": "£19.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "5A",
            "price": "£19.99",
            "available": false,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "1B",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": true
        },
        {
            "seatNumber": "2B",
            "price": "£12.99",
            "available": false,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "3B",
            "price": "£12.99",
            "available": false,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "4B",
            "price": "£12.99",
            "available": false,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "5B",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "1C",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": true
        },
        {
            "seatNumber": "2C",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "3C",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "4C",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "5C",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "1D",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": true
        },
        {
            "seatNumber": "2D",
            "price": "£12.99",
            "available": false,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "3D",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "4D",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "5D",
            "price": "£12.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "1E",
            "price": "£8.99",
            "available": true,
            "disabilityAccessible": true
        },
        {
            "seatNumber": "2E",
            "price": "£8.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "3E",
            "price": "£8.99",
            "available": false,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "4E",
            "price": "£8.99",
            "available": true,
            "disabilityAccessible": false
        },
        {
            "seatNumber": "5E",
            "price": "£8.99",
            "available": true,
            "disabilityAccessible": false
        },
    ]
}
},{}],2:[function(require,module,exports){
// data
var seatData = require( '../data/seatData.js' ).seats;
// elements
const pageEls = require( './pageElements.js' ).pageEls;
// app data stores
const stores = require( './stores.js' ).stores;
// app functions
const fN = require( './functions.js' ).fN;


$( document ).ready( function(){

	/**
 	* DOM functions
 	*/

 	/**
	 * sets the html on an element.
	 * @function
	 * @param {jQuery} el - The DOM (jquery) element to affect.
	 * @param {string} data - The object parameter to match from the array.
	 */
	function setElementHtml( el, data ){
		el.html( data.toString() );
	};

	/**
	 * Sets either a message or error based on availability.
	 * @function
	 * @param {boolean} availability - the availability of the seat.
	 */
	function setMessage( availability ) {
		if ( availability === false ) {
			$( pageEls.messages ).removeClass( stores.classes.messsage ).addClass( stores.classes.error );
		} else {
			$( pageEls.messages ).removeClass( stores.classes.error ).addClass( stores.classes.messsage );
		}
	};

	/**
	 * Swaps inner panels of modal.
	 * @function
	 */
	function swapOffscreentPanel(){
		$( pageEls.ticketLoading ).removeClass( stores.classes.active );
		$( pageEls.ticketConfirmation ).addClass( stores.classes.active );
	};

	/**
 	* DOM Events
 	*/

	/**
 	* On MOUSEOVER of a seat gets associated data and adds to onscreen details panel.
 	*/
	$( pageEls.seat ).on( 'mouseover', function( event ){
		let seatNum = $( this ).data( 'column' ) + $( this ).data( 'row' );
		let thisSeat = fN.checkSeatInfo( seatData, 'seatNumber', seatNum );
		setMessage( thisSeat.available );
		let seatInfo = fN.populateSeatInfo( stores.elToDataArr, thisSeat );
		$( pageEls.detailsPanel ).addClass( stores.classes.active );
		if ( !stores.state.hasBooked ) {
			stores.state.currentBooking = seatInfo;
			stores.state.currentBooking.forEach( function( item ){
				setElementHtml( $( pageEls.detailsPanel + item.el ), item.data  );
			} );
		} else {
			seatInfo.forEach( function( item ){
				setElementHtml( $( pageEls.detailsPanel + item.el ), item.data  );
			} );
		}
	} );


	/**
 	* On MOUSEOUT removes active class on onscreen details panel.
 	*/
	$( pageEls.seat ).on( 'mouseout', function( event ){
		$(  pageEls.detailsPanel ).removeClass( stores.classes.active );
	} );

	/**
 	* On CLICK chekcs if seat is available and books seat for
 	* customer if true and customer has not already booked a seat.
 	*/
	$( pageEls.seat ).click( function( event ){

		let seatNum = $( this ).data( 'column' ) + $( this ).data( 'row' );
		let thisSeat = fN.checkSeatInfo( seatData, 'seatNumber', seatNum );
		
		if ( !stores.state.hasBooked ) {
			if ( thisSeat.available === true ) {
				$( this ).addClass( stores.classes.active ).siblings().removeClass( stores.classes.active );
				stores.state.hasBooked = true;
				stores.state.currentBooking.forEach( function( item ){
					setElementHtml( $( pageEls.ticket + item.el ), item.data  );
				} );
				$( pageEls.ticket ).addClass( stores.classes.active );
				$( pageEls.ticketLoading ).addClass( stores.classes.active );
				$( pageEls.isBooking ).addClass( stores.classes.active );
				$( pageEls.isBooked ).removeClass( stores.classes.active );
				requestTimeout( swapOffscreentPanel, 2000 );
			}
		} else {
			$( pageEls.ticket ).addClass( stores.classes.active );
			$( pageEls.isBooking ).removeClass( stores.classes.active );
			$( pageEls.isBooked ).addClass( stores.classes.active );
		}

	} );

	/**
 	* Closes the modal
 	*/
	$( pageEls.closeModalBtn ).click( function( event ){
		$( pageEls.closeModalEls ).removeClass( stores.classes.active );
	} );

	/**
 	* Resets the demo and booking info
 	*/
	$( pageEls.demoResetBtn ).click( function( event ){
		$( pageEls.demoResetEls ).removeClass( stores.classes.active );
		stores.state.hasBooked = false;
	} );

} );
},{"../data/seatData.js":1,"./functions.js":4,"./pageElements.js":5,"./stores.js":6}],3:[function(require,module,exports){
require( './app.js' );
},{"./app.js":2}],4:[function(require,module,exports){

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
},{}],5:[function(require,module,exports){
/**
 * element store containing relevant page selectors.
 */
const pageEls = {
	seat: '.js-seat',
	ticket: '.offscreen--ticket',
	ticketLoading: '.offscreen--ticket__loading',
	ticketConfirmation: '.offscreen--ticket__confirmation',
	detailsPanel: '.details--panel',
	messages: '.info--row__messages',
	closeModalBtn: '.js-close-modal',
	closeModalEls: '.offscreen--ticket',
	demoResetBtn: '.js-reset-demo',
	demoResetEls: '.offscreen--ticket, .offscreen--ticket__slide, .js-seat',
	infoSeat: ' .js-seat-number',
	infoPrice: ' .js-seat-price',
	infoAvailable: ' .js-seat-availability',
	infoDisability: ' .js-seat-disabled',
	isBooking: '.is-booking',
	isBooked: '.is-booked'
}

module.exports.pageEls = pageEls;
},{}],6:[function(require,module,exports){
//////// elements
const pageEls = require( './pageElements.js' ).pageEls;

/**
 * parent store object for application.
 */
const stores = {
	classes: {
		active: 'is-active',
		message: 'message',
		error: 'error'
	},
	elToDataArr: [
		{ el: pageEls.infoSeat, key: 'seatNumber' },
		{ el: pageEls.infoPrice, key: 'price' },
		{ el: pageEls.infoAvailable, key: 'available' },
		{ el: pageEls.infoDisability, key: 'disabilityAccessible' }
	],
	state: {
		hasBooked: false,
		currentBooking: []
	}
}

module.exports.stores = stores;
},{"./pageElements.js":5}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZGF0YS9zZWF0RGF0YS5qcyIsInNyYy9qcy9hcHAuanMiLCJzcmMvanMvZW50cnkuanMiLCJzcmMvanMvZnVuY3Rpb25zLmpzIiwic3JjL2pzL3BhZ2VFbGVtZW50cy5qcyIsInNyYy9qcy9zdG9yZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBzZWF0czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWF0TnVtYmVyXCI6IFwiMUFcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiBcIsKjMTkuOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjJBXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozE5Ljk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjNBXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozE5Ljk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjRBXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozE5Ljk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZGlzYWJpbGl0eUFjY2Vzc2libGVcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWF0TnVtYmVyXCI6IFwiNUFcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiBcIsKjMTkuOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogZmFsc2UsXHJcbiAgICAgICAgICAgIFwiZGlzYWJpbGl0eUFjY2Vzc2libGVcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWF0TnVtYmVyXCI6IFwiMUJcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiBcIsKjMTIuOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjJCXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozEyLjk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjNCXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozEyLjk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjRCXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozEyLjk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjVCXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozEyLjk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZGlzYWJpbGl0eUFjY2Vzc2libGVcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWF0TnVtYmVyXCI6IFwiMUNcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiBcIsKjMTIuOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjJDXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozEyLjk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZGlzYWJpbGl0eUFjY2Vzc2libGVcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWF0TnVtYmVyXCI6IFwiM0NcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiBcIsKjMTIuOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInNlYXROdW1iZXJcIjogXCI0Q1wiLFxyXG4gICAgICAgICAgICBcInByaWNlXCI6IFwiwqMxMi45OVwiLFxyXG4gICAgICAgICAgICBcImF2YWlsYWJsZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjVDXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozEyLjk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZGlzYWJpbGl0eUFjY2Vzc2libGVcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWF0TnVtYmVyXCI6IFwiMURcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiBcIsKjMTIuOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjJEXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozEyLjk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjNEXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozEyLjk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZGlzYWJpbGl0eUFjY2Vzc2libGVcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXCJzZWF0TnVtYmVyXCI6IFwiNERcIixcclxuICAgICAgICAgICAgXCJwcmljZVwiOiBcIsKjMTIuOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInNlYXROdW1iZXJcIjogXCI1RFwiLFxyXG4gICAgICAgICAgICBcInByaWNlXCI6IFwiwqMxMi45OVwiLFxyXG4gICAgICAgICAgICBcImF2YWlsYWJsZVwiOiB0cnVlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjFFXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozguOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjJFXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozguOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInNlYXROdW1iZXJcIjogXCIzRVwiLFxyXG4gICAgICAgICAgICBcInByaWNlXCI6IFwiwqM4Ljk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IGZhbHNlLFxyXG4gICAgICAgICAgICBcImRpc2FiaWxpdHlBY2Nlc3NpYmxlXCI6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFwic2VhdE51bWJlclwiOiBcIjRFXCIsXHJcbiAgICAgICAgICAgIFwicHJpY2VcIjogXCLCozguOTlcIixcclxuICAgICAgICAgICAgXCJhdmFpbGFibGVcIjogdHJ1ZSxcclxuICAgICAgICAgICAgXCJkaXNhYmlsaXR5QWNjZXNzaWJsZVwiOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcInNlYXROdW1iZXJcIjogXCI1RVwiLFxyXG4gICAgICAgICAgICBcInByaWNlXCI6IFwiwqM4Ljk5XCIsXHJcbiAgICAgICAgICAgIFwiYXZhaWxhYmxlXCI6IHRydWUsXHJcbiAgICAgICAgICAgIFwiZGlzYWJpbGl0eUFjY2Vzc2libGVcIjogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgXVxyXG59IiwiLy8gZGF0YVxyXG52YXIgc2VhdERhdGEgPSByZXF1aXJlKCAnLi4vZGF0YS9zZWF0RGF0YS5qcycgKS5zZWF0cztcclxuLy8gZWxlbWVudHNcclxuY29uc3QgcGFnZUVscyA9IHJlcXVpcmUoICcuL3BhZ2VFbGVtZW50cy5qcycgKS5wYWdlRWxzO1xyXG4vLyBhcHAgZGF0YSBzdG9yZXNcclxuY29uc3Qgc3RvcmVzID0gcmVxdWlyZSggJy4vc3RvcmVzLmpzJyApLnN0b3JlcztcclxuLy8gYXBwIGZ1bmN0aW9uc1xyXG5jb25zdCBmTiA9IHJlcXVpcmUoICcuL2Z1bmN0aW9ucy5qcycgKS5mTjtcclxuXHJcblxyXG4kKCBkb2N1bWVudCApLnJlYWR5KCBmdW5jdGlvbigpe1xyXG5cclxuXHQvKipcclxuIFx0KiBET00gZnVuY3Rpb25zXHJcbiBcdCovXHJcblxyXG4gXHQvKipcclxuXHQgKiBzZXRzIHRoZSBodG1sIG9uIGFuIGVsZW1lbnQuXHJcblx0ICogQGZ1bmN0aW9uXHJcblx0ICogQHBhcmFtIHtqUXVlcnl9IGVsIC0gVGhlIERPTSAoanF1ZXJ5KSBlbGVtZW50IHRvIGFmZmVjdC5cclxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZGF0YSAtIFRoZSBvYmplY3QgcGFyYW1ldGVyIHRvIG1hdGNoIGZyb20gdGhlIGFycmF5LlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHNldEVsZW1lbnRIdG1sKCBlbCwgZGF0YSApe1xyXG5cdFx0ZWwuaHRtbCggZGF0YS50b1N0cmluZygpICk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU2V0cyBlaXRoZXIgYSBtZXNzYWdlIG9yIGVycm9yIGJhc2VkIG9uIGF2YWlsYWJpbGl0eS5cclxuXHQgKiBAZnVuY3Rpb25cclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGF2YWlsYWJpbGl0eSAtIHRoZSBhdmFpbGFiaWxpdHkgb2YgdGhlIHNlYXQuXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gc2V0TWVzc2FnZSggYXZhaWxhYmlsaXR5ICkge1xyXG5cdFx0aWYgKCBhdmFpbGFiaWxpdHkgPT09IGZhbHNlICkge1xyXG5cdFx0XHQkKCBwYWdlRWxzLm1lc3NhZ2VzICkucmVtb3ZlQ2xhc3MoIHN0b3Jlcy5jbGFzc2VzLm1lc3NzYWdlICkuYWRkQ2xhc3MoIHN0b3Jlcy5jbGFzc2VzLmVycm9yICk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCBwYWdlRWxzLm1lc3NhZ2VzICkucmVtb3ZlQ2xhc3MoIHN0b3Jlcy5jbGFzc2VzLmVycm9yICkuYWRkQ2xhc3MoIHN0b3Jlcy5jbGFzc2VzLm1lc3NzYWdlICk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogU3dhcHMgaW5uZXIgcGFuZWxzIG9mIG1vZGFsLlxyXG5cdCAqIEBmdW5jdGlvblxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHN3YXBPZmZzY3JlZW50UGFuZWwoKXtcclxuXHRcdCQoIHBhZ2VFbHMudGlja2V0TG9hZGluZyApLnJlbW92ZUNsYXNzKCBzdG9yZXMuY2xhc3Nlcy5hY3RpdmUgKTtcclxuXHRcdCQoIHBhZ2VFbHMudGlja2V0Q29uZmlybWF0aW9uICkuYWRkQ2xhc3MoIHN0b3Jlcy5jbGFzc2VzLmFjdGl2ZSApO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG4gXHQqIERPTSBFdmVudHNcclxuIFx0Ki9cclxuXHJcblx0LyoqXHJcbiBcdCogT24gTU9VU0VPVkVSIG9mIGEgc2VhdCBnZXRzIGFzc29jaWF0ZWQgZGF0YSBhbmQgYWRkcyB0byBvbnNjcmVlbiBkZXRhaWxzIHBhbmVsLlxyXG4gXHQqL1xyXG5cdCQoIHBhZ2VFbHMuc2VhdCApLm9uKCAnbW91c2VvdmVyJywgZnVuY3Rpb24oIGV2ZW50ICl7XHJcblx0XHRsZXQgc2VhdE51bSA9ICQoIHRoaXMgKS5kYXRhKCAnY29sdW1uJyApICsgJCggdGhpcyApLmRhdGEoICdyb3cnICk7XHJcblx0XHRsZXQgdGhpc1NlYXQgPSBmTi5jaGVja1NlYXRJbmZvKCBzZWF0RGF0YSwgJ3NlYXROdW1iZXInLCBzZWF0TnVtICk7XHJcblx0XHRzZXRNZXNzYWdlKCB0aGlzU2VhdC5hdmFpbGFibGUgKTtcclxuXHRcdGxldCBzZWF0SW5mbyA9IGZOLnBvcHVsYXRlU2VhdEluZm8oIHN0b3Jlcy5lbFRvRGF0YUFyciwgdGhpc1NlYXQgKTtcclxuXHRcdCQoIHBhZ2VFbHMuZGV0YWlsc1BhbmVsICkuYWRkQ2xhc3MoIHN0b3Jlcy5jbGFzc2VzLmFjdGl2ZSApO1xyXG5cdFx0aWYgKCAhc3RvcmVzLnN0YXRlLmhhc0Jvb2tlZCApIHtcclxuXHRcdFx0c3RvcmVzLnN0YXRlLmN1cnJlbnRCb29raW5nID0gc2VhdEluZm87XHJcblx0XHRcdHN0b3Jlcy5zdGF0ZS5jdXJyZW50Qm9va2luZy5mb3JFYWNoKCBmdW5jdGlvbiggaXRlbSApe1xyXG5cdFx0XHRcdHNldEVsZW1lbnRIdG1sKCAkKCBwYWdlRWxzLmRldGFpbHNQYW5lbCArIGl0ZW0uZWwgKSwgaXRlbS5kYXRhICApO1xyXG5cdFx0XHR9ICk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzZWF0SW5mby5mb3JFYWNoKCBmdW5jdGlvbiggaXRlbSApe1xyXG5cdFx0XHRcdHNldEVsZW1lbnRIdG1sKCAkKCBwYWdlRWxzLmRldGFpbHNQYW5lbCArIGl0ZW0uZWwgKSwgaXRlbS5kYXRhICApO1xyXG5cdFx0XHR9ICk7XHJcblx0XHR9XHJcblx0fSApO1xyXG5cclxuXHJcblx0LyoqXHJcbiBcdCogT24gTU9VU0VPVVQgcmVtb3ZlcyBhY3RpdmUgY2xhc3Mgb24gb25zY3JlZW4gZGV0YWlscyBwYW5lbC5cclxuIFx0Ki9cclxuXHQkKCBwYWdlRWxzLnNlYXQgKS5vbiggJ21vdXNlb3V0JywgZnVuY3Rpb24oIGV2ZW50ICl7XHJcblx0XHQkKCAgcGFnZUVscy5kZXRhaWxzUGFuZWwgKS5yZW1vdmVDbGFzcyggc3RvcmVzLmNsYXNzZXMuYWN0aXZlICk7XHJcblx0fSApO1xyXG5cclxuXHQvKipcclxuIFx0KiBPbiBDTElDSyBjaGVrY3MgaWYgc2VhdCBpcyBhdmFpbGFibGUgYW5kIGJvb2tzIHNlYXQgZm9yXHJcbiBcdCogY3VzdG9tZXIgaWYgdHJ1ZSBhbmQgY3VzdG9tZXIgaGFzIG5vdCBhbHJlYWR5IGJvb2tlZCBhIHNlYXQuXHJcbiBcdCovXHJcblx0JCggcGFnZUVscy5zZWF0ICkuY2xpY2soIGZ1bmN0aW9uKCBldmVudCApe1xyXG5cclxuXHRcdGxldCBzZWF0TnVtID0gJCggdGhpcyApLmRhdGEoICdjb2x1bW4nICkgKyAkKCB0aGlzICkuZGF0YSggJ3JvdycgKTtcclxuXHRcdGxldCB0aGlzU2VhdCA9IGZOLmNoZWNrU2VhdEluZm8oIHNlYXREYXRhLCAnc2VhdE51bWJlcicsIHNlYXROdW0gKTtcclxuXHRcdFxyXG5cdFx0aWYgKCAhc3RvcmVzLnN0YXRlLmhhc0Jvb2tlZCApIHtcclxuXHRcdFx0aWYgKCB0aGlzU2VhdC5hdmFpbGFibGUgPT09IHRydWUgKSB7XHJcblx0XHRcdFx0JCggdGhpcyApLmFkZENsYXNzKCBzdG9yZXMuY2xhc3Nlcy5hY3RpdmUgKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCBzdG9yZXMuY2xhc3Nlcy5hY3RpdmUgKTtcclxuXHRcdFx0XHRzdG9yZXMuc3RhdGUuaGFzQm9va2VkID0gdHJ1ZTtcclxuXHRcdFx0XHRzdG9yZXMuc3RhdGUuY3VycmVudEJvb2tpbmcuZm9yRWFjaCggZnVuY3Rpb24oIGl0ZW0gKXtcclxuXHRcdFx0XHRcdHNldEVsZW1lbnRIdG1sKCAkKCBwYWdlRWxzLnRpY2tldCArIGl0ZW0uZWwgKSwgaXRlbS5kYXRhICApO1xyXG5cdFx0XHRcdH0gKTtcclxuXHRcdFx0XHQkKCBwYWdlRWxzLnRpY2tldCApLmFkZENsYXNzKCBzdG9yZXMuY2xhc3Nlcy5hY3RpdmUgKTtcclxuXHRcdFx0XHQkKCBwYWdlRWxzLnRpY2tldExvYWRpbmcgKS5hZGRDbGFzcyggc3RvcmVzLmNsYXNzZXMuYWN0aXZlICk7XHJcblx0XHRcdFx0JCggcGFnZUVscy5pc0Jvb2tpbmcgKS5hZGRDbGFzcyggc3RvcmVzLmNsYXNzZXMuYWN0aXZlICk7XHJcblx0XHRcdFx0JCggcGFnZUVscy5pc0Jvb2tlZCApLnJlbW92ZUNsYXNzKCBzdG9yZXMuY2xhc3Nlcy5hY3RpdmUgKTtcclxuXHRcdFx0XHRyZXF1ZXN0VGltZW91dCggc3dhcE9mZnNjcmVlbnRQYW5lbCwgMjAwMCApO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQkKCBwYWdlRWxzLnRpY2tldCApLmFkZENsYXNzKCBzdG9yZXMuY2xhc3Nlcy5hY3RpdmUgKTtcclxuXHRcdFx0JCggcGFnZUVscy5pc0Jvb2tpbmcgKS5yZW1vdmVDbGFzcyggc3RvcmVzLmNsYXNzZXMuYWN0aXZlICk7XHJcblx0XHRcdCQoIHBhZ2VFbHMuaXNCb29rZWQgKS5hZGRDbGFzcyggc3RvcmVzLmNsYXNzZXMuYWN0aXZlICk7XHJcblx0XHR9XHJcblxyXG5cdH0gKTtcclxuXHJcblx0LyoqXHJcbiBcdCogQ2xvc2VzIHRoZSBtb2RhbFxyXG4gXHQqL1xyXG5cdCQoIHBhZ2VFbHMuY2xvc2VNb2RhbEJ0biApLmNsaWNrKCBmdW5jdGlvbiggZXZlbnQgKXtcclxuXHRcdCQoIHBhZ2VFbHMuY2xvc2VNb2RhbEVscyApLnJlbW92ZUNsYXNzKCBzdG9yZXMuY2xhc3Nlcy5hY3RpdmUgKTtcclxuXHR9ICk7XHJcblxyXG5cdC8qKlxyXG4gXHQqIFJlc2V0cyB0aGUgZGVtbyBhbmQgYm9va2luZyBpbmZvXHJcbiBcdCovXHJcblx0JCggcGFnZUVscy5kZW1vUmVzZXRCdG4gKS5jbGljayggZnVuY3Rpb24oIGV2ZW50ICl7XHJcblx0XHQkKCBwYWdlRWxzLmRlbW9SZXNldEVscyApLnJlbW92ZUNsYXNzKCBzdG9yZXMuY2xhc3Nlcy5hY3RpdmUgKTtcclxuXHRcdHN0b3Jlcy5zdGF0ZS5oYXNCb29rZWQgPSBmYWxzZTtcclxuXHR9ICk7XHJcblxyXG59ICk7IiwicmVxdWlyZSggJy4vYXBwLmpzJyApOyIsIlxyXG4vLyBhcHAgZnVuY3Rpb25zXHJcblxyXG4vKipcclxuICogY2hlY2tzIHRoZSBzZWF0aW5nIGFycmF5IGFuZCByZXR1cm5zIG1hdGNoZWQgaXRlbS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGFyciAtIFRoZSBzZWF0IGRhdGEgYXJyYXkuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUgb2JqZWN0IHBhcmFtZXRlciB0byBtYXRjaCBmcm9tIHRoZSBhcnJheS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbCAtIFRoZSB2YWx1ZSB0byBtYXRjaCBpbiB0aGUgYXJyYXkuXHJcbiAqIEByZXR1cm5zIHtvYmplY3R9IC0gVGhlIG1hdGNoZWQgb2JqZWN0IGZyb20gdGhlIGFycmF5LCBlbHNlIHJldHVucyBmYWxzZVxyXG4gKi9cclxuIC8qXHJcbiAvLyBlczVcclxuIC8vIGxldCBhcnJMZW4gPSBhcnIubGVuZ3RoIC0gMTtcclxuIC8vIGZvciAobGV0IGkgPSBhcnJMZW47IGkgPj0gMDsgaS0tKSB7XHJcbiAvLyBcdGlmICggYXJyWyBpIF1bIGtleSBdID09PSB2YWwgKSB7XHJcbiAvLyBcdFx0cmV0dXJuIGFyclsgaSBdO1xyXG4gLy8gXHR9XHJcbiAvLyB9XHJcbiAvLyByZXR1cm4gZmFsc2U7XHJcbiAqL1xyXG5mdW5jdGlvbiBjaGVja1NlYXRJbmZvKCBhcnIsIGtleSwgdmFsICkge1xyXG5cdGxldCB0aGlzSXRlbSA9IGFyci5maWx0ZXIoIGl0ZW0gPT4gaXRlbVsga2V5IF0gPT09IHZhbCApO1xyXG5cdGlmICggdGhpc0l0ZW0ubGVuZ3RoID4gMCApIHtcclxuXHRcdHJldHVybiB0aGlzSXRlbVsgMCBdO1xyXG5cdH1cclxuXHRyZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIGxvb3BzIGFycmF5IG9mIGVsZW1lbnRzIGFuZCBjaGFuZ2VzIGlubmVySHRtbCBiYXNlZCBvbiBtYXBwZWQgZGF0YS5cclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7YXJyYXl9IGFyciAtIGFycmF5IG9mIGVsZW1lbnRzLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YSAtIFRoZSBvYmplY3QgY29udGFpbmluZyBodG1sIGRhdGEgdG8gaW5zZXJ0LlxyXG4gKi9cclxuZnVuY3Rpb24gcG9wdWxhdGVTZWF0SW5mbyggYXJyLCBkYXRhICkge1xyXG5cdGxldCBhcnJMZW4gPSBhcnIubGVuZ3RoIC0gMTtcclxuXHR2YXIgdGVtcEFyciA9IFtdO1xyXG5cdGZvciAobGV0IGkgPSBhcnJMZW47IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRsZXQgaXRlbSA9IGFyclsgaSBdO1xyXG5cdFx0dGVtcEFyci5wdXNoKCB7IGVsOiBpdGVtLmVsLCBkYXRhOiBkYXRhWyBpdGVtLmtleSBdIH0gKTtcclxuXHR9XHJcblx0cmV0dXJuIHRlbXBBcnI7XHJcbn07XHJcblxyXG5cclxuY29uc3QgZk4gPSB7XHJcblx0Y2hlY2tTZWF0SW5mbzogY2hlY2tTZWF0SW5mbyxcclxuXHRwb3B1bGF0ZVNlYXRJbmZvOiBwb3B1bGF0ZVNlYXRJbmZvXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzLmZOID0gZk47IiwiLyoqXHJcbiAqIGVsZW1lbnQgc3RvcmUgY29udGFpbmluZyByZWxldmFudCBwYWdlIHNlbGVjdG9ycy5cclxuICovXHJcbmNvbnN0IHBhZ2VFbHMgPSB7XHJcblx0c2VhdDogJy5qcy1zZWF0JyxcclxuXHR0aWNrZXQ6ICcub2Zmc2NyZWVuLS10aWNrZXQnLFxyXG5cdHRpY2tldExvYWRpbmc6ICcub2Zmc2NyZWVuLS10aWNrZXRfX2xvYWRpbmcnLFxyXG5cdHRpY2tldENvbmZpcm1hdGlvbjogJy5vZmZzY3JlZW4tLXRpY2tldF9fY29uZmlybWF0aW9uJyxcclxuXHRkZXRhaWxzUGFuZWw6ICcuZGV0YWlscy0tcGFuZWwnLFxyXG5cdG1lc3NhZ2VzOiAnLmluZm8tLXJvd19fbWVzc2FnZXMnLFxyXG5cdGNsb3NlTW9kYWxCdG46ICcuanMtY2xvc2UtbW9kYWwnLFxyXG5cdGNsb3NlTW9kYWxFbHM6ICcub2Zmc2NyZWVuLS10aWNrZXQnLFxyXG5cdGRlbW9SZXNldEJ0bjogJy5qcy1yZXNldC1kZW1vJyxcclxuXHRkZW1vUmVzZXRFbHM6ICcub2Zmc2NyZWVuLS10aWNrZXQsIC5vZmZzY3JlZW4tLXRpY2tldF9fc2xpZGUsIC5qcy1zZWF0JyxcclxuXHRpbmZvU2VhdDogJyAuanMtc2VhdC1udW1iZXInLFxyXG5cdGluZm9QcmljZTogJyAuanMtc2VhdC1wcmljZScsXHJcblx0aW5mb0F2YWlsYWJsZTogJyAuanMtc2VhdC1hdmFpbGFiaWxpdHknLFxyXG5cdGluZm9EaXNhYmlsaXR5OiAnIC5qcy1zZWF0LWRpc2FibGVkJyxcclxuXHRpc0Jvb2tpbmc6ICcuaXMtYm9va2luZycsXHJcblx0aXNCb29rZWQ6ICcuaXMtYm9va2VkJ1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5wYWdlRWxzID0gcGFnZUVsczsiLCIvLy8vLy8vLyBlbGVtZW50c1xyXG5jb25zdCBwYWdlRWxzID0gcmVxdWlyZSggJy4vcGFnZUVsZW1lbnRzLmpzJyApLnBhZ2VFbHM7XHJcblxyXG4vKipcclxuICogcGFyZW50IHN0b3JlIG9iamVjdCBmb3IgYXBwbGljYXRpb24uXHJcbiAqL1xyXG5jb25zdCBzdG9yZXMgPSB7XHJcblx0Y2xhc3Nlczoge1xyXG5cdFx0YWN0aXZlOiAnaXMtYWN0aXZlJyxcclxuXHRcdG1lc3NhZ2U6ICdtZXNzYWdlJyxcclxuXHRcdGVycm9yOiAnZXJyb3InXHJcblx0fSxcclxuXHRlbFRvRGF0YUFycjogW1xyXG5cdFx0eyBlbDogcGFnZUVscy5pbmZvU2VhdCwga2V5OiAnc2VhdE51bWJlcicgfSxcclxuXHRcdHsgZWw6IHBhZ2VFbHMuaW5mb1ByaWNlLCBrZXk6ICdwcmljZScgfSxcclxuXHRcdHsgZWw6IHBhZ2VFbHMuaW5mb0F2YWlsYWJsZSwga2V5OiAnYXZhaWxhYmxlJyB9LFxyXG5cdFx0eyBlbDogcGFnZUVscy5pbmZvRGlzYWJpbGl0eSwga2V5OiAnZGlzYWJpbGl0eUFjY2Vzc2libGUnIH1cclxuXHRdLFxyXG5cdHN0YXRlOiB7XHJcblx0XHRoYXNCb29rZWQ6IGZhbHNlLFxyXG5cdFx0Y3VycmVudEJvb2tpbmc6IFtdXHJcblx0fVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cy5zdG9yZXMgPSBzdG9yZXM7Il19
