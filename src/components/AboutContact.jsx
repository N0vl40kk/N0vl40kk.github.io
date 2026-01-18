import React, { useState, forwardRef } from 'react';
import { Mail, Phone, Send, X, Loader2 } from 'lucide-react';
import MagneticButton from './MagneticButton';

const AboutContact = forwardRef(({ t }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const closeModal = () => {
      setIsClosing(true);
      setTimeout(() => {
          setIsModalOpen(false);
          setIsClosing(false);
      }, 350); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => { 
        setFormStatus('success');
        setTimeout(() => { 
            closeModal(); 
            setFormStatus('idle'); 
            setFormData({ name:'', phone:'', message:'' }); 
        }, 2000);
    }, 1000);
  };

  return (
    <section ref={ref} id="section-contact" className="min-h-screen flex flex-col items-center justify-center relative z-40 px-6 text-center overflow-hidden bg-black border-t border-white/5">
        
        {/* ФОН - BLOBS ИЗ CSS */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="blob-anim" style={{ top: '10%', left: '20%', width: '35vw', height: '35vw', background: '#9333ea' }}></div>
            <div className="blob-anim blob-anim-2" style={{ top: '30%', right: '20%', width: '30vw', height: '30vw', background: '#2563eb' }}></div>
            <div className="blob-anim blob-anim-3" style={{ bottom: '10%', left: '30%', width: '40vw', height: '40vw', background: '#db2777' }}></div>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[30px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="font-monument text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-40 mb-8 text-white">BIOGRAPHY</h2>
            <p className="font-mono font-light leading-relaxed tracking-wide text-white opacity-40 text-sm md:text-lg text-balance uppercase">
                {t.about}
            </p>
            <div className="mt-12 w-12 h-[1px] bg-white/20 mx-auto"></div>
        </div>

        <div className="relative z-10">
            <h2 className="font-monument mb-10 uppercase tracking-[0.3em] opacity-80 text-white text-xl md:text-2xl">CONTACT</h2>
            
            <div className="flex flex-wrap justify-center gap-3 font-mono text-[10px] md:text-xs">
                <MagneticButton href="https://wa.me/77766806526" target="_blank" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-white/90 hover:text-white hover:border-[#25D366] bg-black/40 backdrop-blur-md transition-all font-monument tracking-wider"><Phone size={14} className="text-[#25D366]" /> WhatsApp</MagneticButton>
                <MagneticButton href="https://t.me/nxxbruh" target="_blank" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-white/90 hover:text-white hover:border-[#0088cc] bg-black/40 backdrop-blur-md transition-all font-monument tracking-wider"><Send size={14} className="text-[#0088cc]" /> Telegram</MagneticButton>
                <MagneticButton href="mailto:zhengisbayy@gmail.com" className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-white/90 hover:text-white hover:border-white bg-black/40 backdrop-blur-md transition-all font-monument tracking-wider"><Mail size={14} /> Gmail</MagneticButton>
                
                <MagneticButton onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full cursor-pointer text-white hover:text-white hover:border-red-600 bg-zinc-900 transition-all font-monument tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"/> Quick Request
                </MagneticButton>
            </div>
        </div>

        {isModalOpen && (
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-[5px] ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}>
                <div className={`relative bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] p-8 md:p-12 max-w-lg w-full shadow-2xl overflow-hidden glassy-card ${isClosing ? 'animate-modal-out' : 'animate-modal-in'}`}>
                    <button onClick={closeModal} className="absolute top-6 right-6 text-white/30 hover:text-white z-20 transition-colors"><X size={24} /></button>
                    <h3 className="font-pipec text-3xl text-white mb-8 uppercase tracking-tight relative z-10">Quick Request</h3>
                    {formStatus === 'success' ? (
                         <div className="text-center py-12 relative z-10 animate-pulse"><Send size={48} className="text-green-500 mx-auto mb-6" /><h4 className="font-monument text-white uppercase tracking-widest text-lg">Message Sent</h4></div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left relative z-10">
                            <div>
                                <label htmlFor="form-name" className="block text-[10px] font-monument uppercase text-white/40 mb-2 ml-1 tracking-widest">Name</label>
                                <input 
                                    id="form-name" 
                                    required 
                                    type="text" 
                                    name="name" 
                                    autoComplete="name"
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    placeholder="Your name" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20 font-monument text-xs" 
                                />
                            </div>
                            <div>
                                <label htmlFor="form-phone" className="block text-[10px] font-monument uppercase text-white/40 mb-2 ml-1 tracking-widest">Contact</label>
                                <input 
                                    id="form-phone"
                                    type="text" 
                                    name="phone" 
                                    autoComplete="tel"
                                    value={formData.phone} 
                                    onChange={handleInputChange} 
                                    placeholder="Telegram / WhatsApp" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20 font-monument text-xs" 
                                />
                            </div>
                            <div>
                                <label htmlFor="form-message" className="block text-[10px] font-monument uppercase text-white/40 mb-2 ml-1 tracking-widest">Message</label>
                                <textarea 
                                    id="form-message"
                                    required 
                                    name="message" 
                                    autoComplete="off"
                                    value={formData.message} 
                                    onChange={handleInputChange} 
                                    placeholder="Tell me about your project..." 
                                    rows="3" 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none placeholder:text-white/20 font-monument text-xs" 
                                />
                            </div>
                            <button disabled={formStatus === 'sending'} type="submit" className="mt-2 w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 active:scale-[0.98] font-monument uppercase tracking-widest text-xs">
                                {formStatus === 'sending' ? <Loader2 className="animate-spin" size={18} /> : <>SEND MESSAGE</>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        )}
    </section>
  );
});
AboutContact.displayName = 'AboutContact';
export default AboutContact;
