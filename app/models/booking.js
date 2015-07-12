var mongoose = require('../../app/models/mongoose');

var bookingSchema = mongoose.Schema({
  timeSlots: [{type: mongoose.Schema.Types.ObjectId, ref: 'TimeSlot'}],
  bookable: {type: mongoose.Schema.Types.ObjectId, ref: 'Bookable'},
  date: Date
});

module.exports = mongoose.model('Booking', bookingSchema);
