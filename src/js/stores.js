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