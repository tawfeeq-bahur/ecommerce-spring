import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CreditCard,
  Truck,
  Shield,
  Check,
  ChevronRight,
  MapPin,
  Phone,
  User,
  Mail,
} from "lucide-react";

const CheckoutPopup = ({
  show,
  handleClose,
  cartItems,
  totalPrice,
  handleCheckout,
}) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "card",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmPurchase = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    // Call the original checkout handler after short delay
    setTimeout(() => {
      handleCheckout();
    }, 2000);
  };

  const resetAndClose = () => {
    setStep(1);
    setOrderComplete(false);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
      paymentMethod: "card",
    });
    handleClose();
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-display font-bold text-gray-900 dark:text-white">
                  {orderComplete ? "Order Confirmed!" : "Checkout"}
                </h2>
                {!orderComplete && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Step {step} of 2
                  </p>
                )}
              </div>
              <button
                onClick={resetAndClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Progress Bar */}
            {!orderComplete && (
              <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= 1
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {step > 1 ? <Check className="w-4 h-4" /> : "1"}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Review
                    </span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className={`h-full bg-pink-500 rounded-full transition-all ${
                        step >= 2 ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step >= 2
                          ? "bg-pink-500 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      2
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-[50vh] p-6">
              {orderComplete ? (
                /* Order Success */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Thank You for Your Order!
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Your order has been placed successfully. We'll send you an
                    email confirmation shortly.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 max-w-xs mx-auto">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Order Total
                    </p>
                    <p className="text-2xl font-bold text-pink-500">
                      ₹{totalPrice.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ) : step === 1 ? (
                /* Step 1: Order Review */
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Order Summary
                  </h3>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-pink-500 font-semibold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Order Benefits */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <Truck className="w-5 h-5 mx-auto text-green-500 mb-1" />
                      <p className="text-xs text-green-600 dark:text-green-400">
                        Free Shipping
                      </p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <Shield className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        Secure
                      </p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                      <CreditCard className="w-5 h-5 mx-auto text-purple-500 mb-1" />
                      <p className="text-xs text-purple-600 dark:text-purple-400">
                        Easy Pay
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Step 2: Shipping & Payment */
                <div className="space-y-6">
                  {/* Shipping Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-pink-500" />
                      Shipping Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="input-field pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="400001"
                          className="input-field"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Fashion Street, Apartment 4B"
                          className="input-field"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-pink-500" />
                      Payment Method
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "card", label: "Credit/Debit Card", icon: "💳" },
                        { value: "upi", label: "UPI", icon: "📱" },
                        { value: "netbanking", label: "Net Banking", icon: "🏦" },
                        { value: "cod", label: "Cash on Delivery", icon: "💵" },
                      ].map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, paymentMethod: method.value })
                          }
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            formData.paymentMethod === method.value
                              ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-pink-300"
                          }`}
                        >
                          <span className="text-xl block mb-1">{method.icon}</span>
                          <span
                            className={`text-sm font-medium ${
                              formData.paymentMethod === method.value
                                ? "text-pink-600 dark:text-pink-400"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {method.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!orderComplete && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 dark:text-gray-400">Total</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-3">
                  {step === 2 && (
                    <button
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </button>
                  )}
                  {step === 1 ? (
                    <button
                      onClick={() => setStep(2)}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirmPurchase}
                      disabled={isProcessing}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Pay ₹{totalPrice.toFixed(2)}
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutPopup;
