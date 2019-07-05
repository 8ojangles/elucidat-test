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