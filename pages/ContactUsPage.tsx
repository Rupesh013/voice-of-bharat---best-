import React, { useState } from 'react';
import { ICONS } from '../constants';
import { useTranslation } from '../hooks/useTranslation';

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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="bg-gray-50">
        {/* Hero */}
        <div className="bg-gray-800 text-white text-center py-20 relative overflow-hidden">
             <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{backgroundImage: "url('https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?q=80&w=2070&auto=format&fit=crop')"}}></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold">{t('pages.contact.title')}</h1>
              <p className="text-lg mt-4 max-w-2xl mx-auto text-gray-300">
                  {t('pages.contact.subtitle')}
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
                            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('pages.contact.getInTouch')}</h2>
                            <p className="text-gray-600">
                                {t('pages.contact.getInTouchSubtitle')}
                            </p>
                        </div>
                        <div className="space-y-6">
                            <ContactInfoItem 
                                Icon={ICONS.Email}
                                title={t('pages.contact.email')}
                                content="voiceofbharat.help@gmail.com"
                                href="mailto:voiceofbharat.help@gmail.com"
                            />
                            <ContactInfoItem 
                                Icon={ICONS.WhatsApp}
                                title={t('pages.contact.whatsapp')}
                                content="+91 7997401678"
                                href="https://wa.me/917997401678"
                            />
                             <ContactInfoItem 
                                Icon={ICONS.GitHub}
                                title={t('pages.contact.github')}
                                content="github.com/rupesh9502"
                                href="https://github.com/rupesh9502"
                            />
                             <ContactInfoItem 
                                Icon={ICONS.Location}
                                title={t('pages.contact.college')}
                                content="Sree Vidyanikethan Engineering College, Tirupati – 517102"
                                href="https://maps.google.com/?q=Sree+Vidyanikethan+Engineering+College,+Tirupati"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('pages.contact.sendMessage')}</h2>
                        {isSuccess ? (
                            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                                <p className="font-bold">{t('pages.contact.success.title')}</p>
                                <p>{t('pages.contact.success.description')}</p>
                                <button onClick={() => setIsSuccess(false)} className="mt-4 text-sm text-green-800 font-semibold hover:underline">
                                    {t('pages.contact.success.sendAnother')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('pages.contact.form.name')}</label>
                                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 text-gray-900" required />
                                </div>
                                 <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('pages.contact.form.email')}</label>
                                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 text-gray-900" required />
                                </div>
                                 <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('pages.contact.form.message')}</label>
                                    <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={5} className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-3 focus:ring-orange-500 focus:border-orange-500 text-gray-900" required></textarea>
                                </div>
                                <div>
                                    <button type="submit" disabled={isSubmitting} className="w-full bg-orange-500 text-white font-semibold py-3 px-4 rounded-md hover:bg-orange-600 transition duration-300 disabled:bg-orange-300">
                                        {isSubmitting ? t('pages.contact.form.sending') : t('pages.contact.form.sendButton')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactUsPage;