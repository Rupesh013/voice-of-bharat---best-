import React from 'react';
import { ICONS } from '../constants';

interface ContactInfoItemProps {
  Icon: React.ElementType;
  title: string;
  content: string;
  href: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ Icon, title, content, href }) => (
    <div className="flex items-start">
        <Icon className="h-8 w-8 text-orange-500 mt-1 flex-shrink-0" />
        <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-orange-600 transition-colors break-all">
                {content}
            </a>
        </div>
    </div>
);

const ContactUsPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    // In a real app, you would handle form submission here.
  };

  return (
    <div className="bg-gray-50">
        {/* Hero */}
        <div className="bg-gray-800 text-white text-center py-20 relative overflow-hidden">
             <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop')"}}></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
              <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-300">
                  Have questions, suggestions, or collaboration ideas? We’d love to hear from you.
              </p>
            </div>
        </div>
        
        {/* Main Content */}
        <div className="py-16">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-xl shadow-lg max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                            <p className="text-gray-600">
                                We’re a student-led team dedicated to building digital empowerment tools for every Indian citizen. Reach out below!
                            </p>
                        </div>
                        <div className="space-y-6">
                            <ContactInfoItem 
                                Icon={ICONS.Email}
                                title="Email"
                                content="voiceofbharat.help@gmail.com"
                                href="mailto:voiceofbharat.help@gmail.com"
                            />
                            <ContactInfoItem 
                                Icon={ICONS.WhatsApp}
                                title="WhatsApp"
                                content="+91 7997401678"
                                href="https://wa.me/917997401678"
                            />
                             <ContactInfoItem 
                                Icon={ICONS.GitHub}
                                title="GitHub"
                                content="github.com/rupesh9502"
                                href="https://github.com/rupesh9502"
                            />
                             <ContactInfoItem 
                                Icon={ICONS.Location}
                                title="College"
                                content="Sree Vidyanikethan Engineering College, Tirupati – 517102"
                                href="https://maps.google.com/?q=Sree+Vidyanikethan+Engineering+College,+Tirupati"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                                <input type="text" id="name" className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 text-gray-900" required />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                                <input type="email" id="email" className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 text-gray-900" required />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea id="message" rows={5} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 text-gray-900" required></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 transition duration-300">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactUsPage;