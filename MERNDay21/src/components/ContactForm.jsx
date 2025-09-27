import React, { useState } from "react";
import { assets } from "../assets/assets";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // Form handling
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            alert("All fields are required");
            return;
        }

        console.log("Form Data:", { name, email, message });
        alert("Form submitted successfully!");

        // Field reset
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <div className="w-[90vw] mx-auto h-[80vh] min-h-[600px] flex rounded-2xl overflow-hidden shadow-2xl mt-10 " style={{backgroundImage: `url(${assets.left})`}}>
            {/* Form Section */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 w-full h-full p-8 flex flex-col items-center justify-center">
                <div className="w-full  bg-white-1/2 h-full backdrop-blur-sm rounded-xl p-8 ">
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-4 rounded-lg border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 rounded-lg border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                            />
                        </div>

                        <div>
                            <textarea
                                placeholder="Your message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={4}
                                className="w-full p-4 rounded-lg border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 resize-none"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            type="button"
                            className="w-full bg-white text-indigo-600 py-4 px-6 rounded-lg font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </div>

            {/* Image Section */}
            <div className="w-1/2 h-full bg-gradient-to-bl from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent"></div>
                <img
                    src={assets.right}
                    alt="Contact illustration"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default ContactForm;
