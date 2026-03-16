import React, { useState } from 'react';
import { 
  ChevronRight, 
  Upload, 
  Info, 
  ShieldCheck, 
  Sparkles, 
  Lock,
  Image as ImageIcon,
  CheckCircle2,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const ChevronDown = ({ className, size }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const Bot = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 8V4H8"/>
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
);

const CreateBrand = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState(['AI & ML']);

  const steps = [
    { id: 1, name: 'Identity' },
    { id: 2, name: 'Market Position' },
    { id: 3, name: 'Social Connections' }
  ];

  const categories = ['AI & ML', 'EV', 'Wearables', 'SaaS', 'Fintech', 'Food Tech', 'Consumer Tech'];

  const toggleCategory = (cat) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 flex flex-col items-center font-['Inter',_sans-serif]">
        {/* Breadcrumb */}
        <div className="w-full max-w-4xl mb-6 flex items-center gap-2 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">
          <Link to="/brands" className="hover:text-primary transition-colors">Brands</Link>
          <ChevronRight size={12} />
          <span className="text-[#1e293b]">Add New Brand</span>
        </div>

        {/* Title Section */}
        <div className="w-full max-w-4xl mb-12">
          <h1 className="text-4xl font-black text-[#0f172a] mb-2 tracking-tight">Create Brand Profile</h1>
          <p className="text-sm font-bold text-[#64748b]">Step {currentStep} of 3: Brand Identity & Basic Information</p>
        </div>

        {/* Stepper */}
        <div className="w-full max-w-4xl mb-16 flex items-center justify-between px-4">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all shadow-md ${
                  currentStep >= step.id ? 'bg-primary text-white scale-110' : 'bg-white text-[#94a3b8] border border-[#e2e8f0]'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 size={20} /> : step.id}
                </div>
                <span className={`text-xs font-black uppercase tracking-widest ${
                  currentStep >= step.id ? 'text-[#1e293b]' : 'text-[#94a3b8]'
                }`}>
                  {step.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px bg-[#e2e8f0] mx-8" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Container */}
        <div className="w-full max-w-4xl bg-white rounded-[32px] border border-[#eef2f6] shadow-2xl shadow-slate-200/50 p-12 mb-12">
          {/* Logo Upload */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-8 text-primary">
              <ImageIcon size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b]">Brand Logo</h3>
            </div>
            
            <div className="flex items-center gap-10">
              <div className="w-40 h-40 bg-[#f8fafc] border-2 border-dashed border-[#e2e8f0] rounded-3xl flex flex-col items-center justify-center gap-3 text-[#94a3b8] cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group">
                <Upload size={32} className="group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-black uppercase tracking-widest">Upload Logo</span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-black text-[#1e293b] mb-2">Profile Display Image</h4>
                <p className="text-xs font-medium text-[#64748b] leading-relaxed mb-6">
                  This will be shown on your brand profile and throughout the platform. Recommended: 400×400px, PNG or SVG. Max file size: 5MB.
                </p>
                <button className="px-6 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-xs font-black text-[#1e293b] hover:bg-slate-50 transition-all shadow-sm">
                  Change image
                </button>
              </div>
            </div>
          </section>

          {/* Core Info */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-8 text-primary">
              <Info size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b]">Core Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-[#1e293b] uppercase tracking-widest">Brand Name</label>
                <input type="text" placeholder="e.g. InnovateX" className="w-full px-6 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5" />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-[#1e293b] uppercase tracking-widest">Tagline</label>
                <input type="text" placeholder="The future of automation" className="w-full px-6 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5" />
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <label className="text-xs font-black text-[#1e293b] uppercase tracking-widest">Founding Year</label>
              <div className="relative">
                <select className="w-full px-6 py-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold appearance-none focus:outline-none">
                  {[2024, 2023, 2022, 2021, 2020].map(yr => <option key={yr}>{yr}</option>)}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" size={18} />
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <label className="text-xs font-black text-[#1e293b] uppercase tracking-widest">Detailed Product Description</label>
              <textarea 
                rows={5} 
                placeholder="Briefly describe what your brand does, your mission, and your target audience..." 
                className="w-full px-6 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 leading-relaxed"
              />
              <p className="flex items-center gap-2 text-[10px] font-bold text-[#94a3b8] italic">
                <Sparkles size={12} /> Keep it concise and highlight your unique value proposition.
              </p>
            </div>
          </section>

          {/* Category Section */}
          <section className="mb-14">
            <div className="flex items-center gap-2 mb-8 text-primary">
              <Bot size={20} />
              <h3 className="text-sm font-black uppercase tracking-widest text-[#1e293b]">Industry Category</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${
                    selectedCategories.includes(cat)
                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                    : 'bg-white text-[#64748b] border-[#e2e8f0] hover:border-primary/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button className="px-5 py-3 rounded-full text-[11px] font-black uppercase tracking-widest border-2 border-dashed border-[#e2e8f0] text-[#94a3b8] hover:border-primary hover:text-primary transition-all">
                + Add Others
              </button>
            </div>
          </section>

          {/* Footer Actions */}
          <div className="pt-10 border-t border-[#f1f5f9] flex items-center justify-between">
            <button className="flex items-center gap-2 text-xs font-black text-[#94a3b8] uppercase tracking-widest hover:text-rose-500 transition-colors">
              <X size={16} /> Discard
            </button>
            <div className="flex items-center gap-4">
              <button className="px-8 py-4 bg-white border border-[#e2e8f0] rounded-2xl font-black text-xs uppercase tracking-widest text-[#1e293b] hover:bg-slate-50 transition-all">
                Save Draft
              </button>
              <button 
                onClick={() => setCurrentStep(2)}
                className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                Next Step <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="w-full max-w-4xl grid grid-cols-3 gap-8 pb-12">
          <div className="p-8 bg-white rounded-3xl border border-[#eef2f6] shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-sm font-black text-[#1e293b] mb-3">Verify Brand</h4>
            <p className="text-xs font-medium text-[#64748b] leading-relaxed">Official brands get a blue checkmark on their profile for increased trust.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-[#eef2f6] shadow-sm">
            <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-6">
              <Sparkles size={20} />
            </div>
            <h4 className="text-sm font-black text-[#1e293b] mb-3">Strong Taglines</h4>
            <p className="text-xs font-medium text-[#64748b] leading-relaxed">Keep it under 6 words. A memorable tagline helps in brand recall and discovery.</p>
          </div>
          <div className="p-8 bg-white rounded-3xl border border-[#eef2f6] shadow-sm">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-6">
              <Lock size={20} />
            </div>
            <h4 className="text-sm font-black text-[#1e293b] mb-3">Data Privacy</h4>
            <p className="text-xs font-medium text-[#64748b] leading-relaxed">Your brand data is stored securely using enterprise-grade encryption protocols.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateBrand;
