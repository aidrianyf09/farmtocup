const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: String,
  variant: String,
  quantity: Number,
  price: Number,
});

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: String,
    province: String,
    zipCode: String,
  },
  items: [OrderItemSchema],
  subtotal: Number,
  shippingFee: { type: Number, default: 150 },
  total: Number,
  paymentMethod: {
    type: String,
    enum: ['gcash', 'bank_transfer', 'cod', 'maya'],
    required: true
  },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  adminNotes: String,
  contactChannel: { type: String, enum: ['whatsapp', 'messenger'], default: 'whatsapp' },
}, { timestamps: true });

OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `FTC-${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
