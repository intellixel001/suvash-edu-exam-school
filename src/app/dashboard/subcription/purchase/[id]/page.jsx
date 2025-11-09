"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";
import { FaUniversity } from "react-icons/fa";

export default function PurchasePage() {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("bkash"); // ✅ Default Selected
  const [trxId, setTrxId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      const res = await apiClient(`/student/exam/package/single/${id}`);
      setPkg(res.data);
    } catch (error) {
      console.error("Fetch Package Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const paymentMethods = [
    {
      id: "bkash",
      name: "bKash",
      icon: <img src="/icons/bkash.png" className="w-8 h-8" />,
      number: "017XXXXXXXX",
      type: "Personal",
    },
    {
      id: "nagad",
      name: "Nagad",
      icon: <img src="/icons/nagad.png" className="w-8 h-8" />,
      number: "018XXXXXXXX",
      type: "Personal",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: (
        <FaUniversity className="text-blue-700 dark:text-blue-400 text-3xl" />
      ),
      bankName: "Sonali Bank",
      accountNo: "123456789",
    },
  ];

  const selectedPaymentInfo = paymentMethods.find(
    (m) => m.id === selectedMethod
  );

  const handleRequestPayment = async () => {
    if (!trxId) return alert("Please enter Transaction ID!");

    try {
      setSubmitting(true);

      const payload = {
        packageId: id,
        paymentMethod: selectedMethod,
        transactionId: trxId,
      };

      const res = await apiClient.post(
        "/student/exam/package/purchase",
        payload
      );

      alert(res.data?.message || "Payment Request Sent Successfully!");
      window.history.back();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Failed to send payment request. Please try again.";

      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <p className="text-center py-6 text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    );

  if (!pkg)
    return (
      <p className="text-center py-6 text-gray-500 dark:text-gray-400">
        Package not found
      </p>
    );

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Package Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 border border-gray-200 dark:border-gray-700 mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {pkg.name}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Duration:
          </span>{" "}
          {pkg.duration} Days
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Access:
          </span>{" "}
          {pkg.position}
          {pkg?.classId && ` > ${pkg.classId}`}
          {pkg?.subjectId && ` > ${pkg.subjectId}`}
        </p>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
          ৳{pkg.price}
        </p>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
          Select Payment Method
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`flex flex-col items-center gap-1 border p-3 rounded-lg transition 
              ${
                selectedMethod === method.id
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/40"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              {method.icon}
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                {method.name}
              </span>
            </button>
          ))}
        </div>

        {/* Payment Details */}
        <div className="mt-4">
          {selectedMethod !== "bank" ? (
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Send money to the following {selectedPaymentInfo.name} account:
              </p>
              <p className="font-medium text-gray-900 dark:text-gray-100 mt-1">
                Number: {selectedPaymentInfo.number}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Account Type: {selectedPaymentInfo.type}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {selectedPaymentInfo.bankName}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Account No: {selectedPaymentInfo.accountNo}
              </p>
            </div>
          )}
        </div>

        {/* TRX ID Input */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Enter Transaction ID
          </label>
          <input
            type="text"
            placeholder="e.g. TXN12345678"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg outline-none 
            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
            focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleRequestPayment}
          disabled={submitting}
          className={`w-full mt-5 py-3 rounded-lg text-white font-semibold transition 
    ${
      submitting
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
    }`}
        >
          {submitting ? "Please wait..." : "Request for Payment Approval"}
        </button>
      </div>
    </div>
  );
}
