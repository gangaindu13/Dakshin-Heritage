import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData.ts';
import { ReservationDetails } from '../types.ts';
import { MapPin, Phone, Mail, Clock, CalendarDays, CheckCircle2, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ReservationDetails>({
    fullName: '',
    email: '',
    phone: '',
    date: '2026-10-02',
    time: '19:00',
    guests: 2,
    seatingArea: 'traditional',
    specialRequests: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      return;
    }
    const code = 'DH-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(code);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      date: '2026-10-02',
      time: '19:00',
      guests: 2,
      seatingArea: 'traditional',
      specialRequests: '',
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B84A24]">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Vanakkam & Welcome</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#29221F] tracking-tight">
            Reserve Your South Indian Dining Experience
          </h2>
          <p className="text-sm sm:text-base text-[#594A42] leading-relaxed">
            Reserve your table for freshly flipped dosas, aromatic Seeraga Samba biryani pots, and our Sunday Grand Banana Leaf Sadhya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Reservation Form (7 cols on lg) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-[#E2D5C3] shadow-xs">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#29221F]">
                  Vanakkam! Table Confirmed
                </h3>
                <p className="text-xs sm:text-sm text-[#594A42] max-w-md mx-auto">
                  Thank you, {formData.fullName}! Your reservation at Dakshin Heritage has been placed. A confirmation email has been dispatched to <span className="font-semibold text-[#29221F]">{formData.email}</span>.
                </p>

                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC8] max-w-sm mx-auto text-left space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#E8DEC8] pb-1.5">
                    <span className="text-[#8C6D58]">Booking Reference</span>
                    <strong className="font-mono text-[#B84A24]">{bookingCode}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C6D58]">Date & Time</span>
                    <span className="font-medium text-[#29221F]">{formData.date} at {formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C6D58]">Party Size</span>
                    <span className="font-medium text-[#29221F]">{formData.guests} Guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C6D58]">Seating</span>
                    <span className="font-medium text-[#29221F] capitalize">{formData.seatingArea.replace('-', ' ')}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    type="button"
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg transition-colors"
                  >
                    Make Another Booking
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#F2ECE1] pb-3">
                  <h3 className="font-serif text-xl font-bold text-[#29221F]">
                    Table Reservation
                  </h3>
                  <p className="text-xs text-[#8C6D58]">
                    Reserve your dining experience online. For large celebrations or festive catering, please call us directly.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#29221F] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Priya Natarajan"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DDCFBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#29221F] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="priya@example.com"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DDCFBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F]"
                    />
                  </div>
                </div>

                {/* Phone & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#29221F] mb-1.5">
                      Mobile Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(212) 555-0372"
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DDCFBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#29221F] mb-1.5">
                      Number of Guests
                    </label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DDCFBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#29221F] mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DDCFBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#29221F] mb-1.5">
                      Seating Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DDCFBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F]"
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="12:30">12:30 PM (Lunch)</option>
                      <option value="13:00">1:00 PM (Lunch)</option>
                      <option value="13:30">1:30 PM (Lunch)</option>
                      <option value="17:30">5:30 PM (Dinner)</option>
                      <option value="18:00">6:00 PM (Dinner)</option>
                      <option value="18:30">6:30 PM (Dinner)</option>
                      <option value="19:00">7:00 PM (Prime Dinner)</option>
                      <option value="19:30">7:30 PM (Prime Dinner)</option>
                      <option value="20:00">8:00 PM (Prime Dinner)</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <label className="block text-xs font-semibold text-[#29221F] mb-1.5">
                    Seating Experience
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'traditional', label: 'Plantain Leaf Seating', desc: 'Banana leaf table setup' },
                      { id: 'main-hall', label: 'Central Dining', desc: 'Comfortable family tables' },
                      { id: 'courtyard', label: 'Veranda', desc: 'Quiet garden alcove' },
                    ].map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingArea: area.id as any })}
                        className={`p-2.5 text-left rounded-lg border transition-all ${
                          formData.seatingArea === area.id
                            ? 'border-[#B84A24] bg-[#FAF3EB] text-[#29221F]'
                            : 'border-[#DDCFBC] bg-white text-[#594A42] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <span className="block text-xs font-bold leading-tight">{area.label}</span>
                        <span className="text-[10px] text-[#8C6D58] hidden sm:block">{area.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-[#29221F] mb-1.5">
                    Dietary Preferences (Vegan, Jain, Gluten-Free) or Requests
                  </label>
                  <textarea
                    rows={2}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="e.g. Jain food preparation; high baby chair requested..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DDCFBC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B84A24] text-[#29221F]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-white bg-[#B84A24] hover:bg-[#933418] rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Table Reservation</span>
                </button>
              </form>
            )}
          </div>

          {/* Location & Hours Info Column (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Hours Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2D5C3] shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 text-[#B84A24]">
                <Clock className="w-5 h-5" />
                <h3 className="font-serif text-xl font-bold text-[#29221F]">
                  Tiffin & Dining Hours
                </h3>
              </div>

              <div className="divide-y divide-[#F2ECE1] text-xs">
                {RESTAURANT_INFO.hours.map((schedule) => (
                  <div key={schedule.days} className="py-2.5 flex items-center justify-between">
                    <div>
                      <strong className="block text-[#29221F]">{schedule.days}</strong>
                      <span className="text-[#8C6D58]">Lunch: {schedule.lunch}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-[#B84A24]">Dinner</span>
                      <span className="block text-[#594A42]">{schedule.dinner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2D5C3] shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#29221F]">
                Location & Inquiries
              </h3>

              <div className="space-y-3.5 text-xs text-[#594A42]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B84A24] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#29221F]">Restaurant Address</strong>
                    <span>{RESTAURANT_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B84A24] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#29221F]">Telephone & Takeout</strong>
                    <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#B84A24]">
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B84A24] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#29221F]">Catering & Banquets</strong>
                    <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-[#B84A24]">
                      {RESTAURANT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Stylized Direction Map Card */}
              <div className="mt-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-between">
                <div>
                  <span className="block text-xs font-bold text-[#29221F]">Transit & Subways</span>
                  <span className="text-[11px] text-[#8C6D58]">28th St & 33rd St (6 Train) · 2 min walk</span>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-semibold text-[#B84A24] hover:text-[#933418] hover:underline"
                >
                  Map & Directions →
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
