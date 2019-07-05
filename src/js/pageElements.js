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