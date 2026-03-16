import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Info, 
  UploadCloud, 
  Trash2, 
  Plus, 
  CheckCircle2, 
  Zap, 
  FileText, 
  Tag as TagIcon, 
  X,
  Monitor
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const AddProduct = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('CONCEPT');
  const [tags, setTags] = useState(['Innovation', 'AI']);
  const [tagInput, setTagInput] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Hardware',
    price: '',
    description: '',
    year: '2024'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      const newProduct = {
        ...formData,
        type: formData.category === 'SaaS' ? 'Productivity' : 'Interface', // Mocked type
        tag: 'New',
        tagClass: 'bg-primary shadow-lg shadow-primary/30',
        bgClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
        rating: 5.0,
        reviews: 0,
        demand: 100,
        specs: [
          { label: 'New Tech' }
        ],
        tags: tags
      };

      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      if (response.ok) {
        setTimeout(() => {
          setIsPublishing(false);
          navigate('/admin');
        }, 2000);
      } else {
        throw new Error('Failed to publish product');
      }
    } catch (error) {
      console.error('Error publishing product:', error);
      setIsPublishing(false);
      alert('Failed to publish product');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-12 overflow-x-hidden font-['Inter',_sans-serif]">
        {/* Top Navigation */}
        <header className="flex justify-between items-center mb-16 px-2">
          <div className="flex items-center gap-6 text-[10px] font-black text-[#94a3b8] uppercase tracking-widest">
             <Link to="/admin" className="hover:text-primary transition-colors">Products</Link>
             <ChevronRight size={14} className="opacity-40" />
             <span className="text-[#1e293b]">Add New Product</span>
          </div>
          <div className="flex items-center gap-6">
             <button className="px-8 py-3 bg-white border border-[#e2e8f0] text-[#1e293b] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
                Save Draft
             </button>
             <button 
               onClick={handlePublish}
               className="px-8 py-3.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-105 transition-all active:scale-95"
             >
                Publish Product
             </button>
          </div>
        </header>

        {/* Title Section */}
        <div className="mb-12 px-2">
           <h1 className="text-5xl font-black text-[#0f172a] mb-5 tracking-tighter leading-tight font-['Outfit',_sans-serif]">Create Listing</h1>
           <p className="text-[#64748b] font-medium text-lg leading-relaxed">Introduce your next big innovation to the LaunchRadar community.</p>
        </div>

        {/* Form Wizard Layout */}
        <div className="max-w-4xl mx-auto space-y-10 pb-20 px-2">
           
           {/* Section 1: Basic Info */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-sm relative overflow-hidden"
           >
              <div className="flex items-center gap-5 mb-10">
                 <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                    <Info size={20} />
                 </div>
                 <h2 className="text-xl font-black text-[#1e293b] tracking-tight">Basic Information</h2>
              </div>

              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Product Name</label>
                     <input 
                       type="text" 
                       name="name"
                       value={formData.name}
                       onChange={handleInputChange}
                       placeholder="e.g. VisionPro Max Gen 2" 
                       className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                     />
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Category</label>
                        <div className="relative">
                          <select 
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-inner"
                          >
                             <option value="Hardware">Hardware</option>
                             <option value="SaaS">SaaS</option>
                             <option value="AI Models">AI Models</option>
                          </select>
                          <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Estimated Price ($)</label>
                        <input 
                          type="text" 
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="299.00" 
                          className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner" 
                        />
                    </div>
                 </div>
              </div>
           </motion.section>

           {/* Section 2: Product Details */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-sm relative overflow-hidden"
           >
              <div className="flex items-center gap-5 mb-10">
                 <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                    <FileText size={20} />
                 </div>
                 <h2 className="text-xl font-black text-[#1e293b] tracking-tight">Product Details</h2>
              </div>

              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Description</label>
                     <textarea 
                       name="description"
                       value={formData.description}
                       onChange={handleInputChange}
                       placeholder="Tell the world what makes this product unique..." 
                       className="w-full h-40 px-8 py-6 bg-[#f8fafc] border border-[#e2e8f0] rounded-3xl text-sm font-bold text-[#1e293b] focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all shadow-inner resize-none" 
                     />
                 </div>

                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Launch Year</label>
                        <div className="relative">
                          <select 
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                            className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] appearance-none focus:outline-none focus:ring-4 focus:ring-primary/5 shadow-inner"
                          >
                             <option value="2024">2024</option>
                             <option value="2025">2025</option>
                             <option value="2026">2026</option>
                          </select>
                          <ChevronDown size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-[#94a3b8] pointer-events-none" />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-[#1e293b] uppercase tracking-widest">Status</label>
                       <div className="bg-[#f1f5f9] p-1.5 rounded-[18px] flex gap-1">
                          {['CONCEPT', 'PROTOTYPE', 'PRODUCTION'].map((s) => (
                             <button 
                               key={s}
                               onClick={() => setStatus(s)}
                               className={`flex-1 py-3 px-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${status === s ? 'bg-white text-primary shadow-lg shadow-slate-200 border border-slate-100' : 'text-[#64748b] hover:text-[#1e293b]'}`}
                             >
                                {s}
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           </motion.section>

           {/* Section 3: Media & Assets */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-sm relative overflow-hidden"
           >
              <div className="flex items-center gap-5 mb-10">
                 <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                    <Monitor size={20} />
                 </div>
                 <h2 className="text-xl font-black text-[#1e293b] tracking-tight">Media & Assets</h2>
              </div>

              <div className="space-y-8">
                 <div className="w-full h-64 border-2 border-dashed border-[#e2e8f0] bg-[#f8fafc] rounded-[32px] flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:border-primary/50 transition-all">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl shadow-slate-200/50 mb-6 group-hover:scale-110 transition-transform">
                       <UploadCloud size={32} />
                    </div>
                    <h4 className="text-sm font-black text-[#1e293b] mb-1">Click to upload or drag and drop</h4>
                    <p className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-widest">High-resolution PNG, JPG or GIF (max. 10MB)</p>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="w-40 h-40 bg-[#fde1d3] rounded-[24px] overflow-hidden border border-white shadow-sm relative group cursor-pointer">
                       <img src="https://images.unsplash.com/photo-1510511459019-5dee99c48ea9?auto=format&fit=crop&q=80&w=200" alt="Preview" className="w-full h-full object-cover opacity-80" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <Trash2 size={24} className="text-white" />
                       </div>
                    </div>
                    <div className="w-40 h-40 border-2 border-dashed border-[#e2e8f0] rounded-[24px] flex items-center justify-center text-[#94a3b8] hover:border-primary/50 hover:text-primary transition-all cursor-pointer">
                       <Plus size={32} />
                    </div>
                 </div>
              </div>
           </motion.section>

           {/* Section 4: Discovery Tags */}
           <motion.section 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="bg-white p-12 rounded-[40px] border border-[#eef2f6] shadow-sm relative overflow-hidden"
           >
              <div className="flex items-center gap-5 mb-10">
                 <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
                    <TagIcon size={20} />
                 </div>
                 <h2 className="text-xl font-black text-[#1e293b] tracking-tight">Discovery Tags</h2>
              </div>

              <div className="space-y-8">
                 <div className="relative">
                    <input 
                      type="text" 
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Add tags (e.g. Sustainable, Future, Minimalist)" 
                      className="w-full px-8 py-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1e293b] focus:outline-none shadow-inner" 
                    />
                 </div>
                 <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                       <span key={tag} className="px-5 py-2.5 bg-slate-100 text-[#1e293b] text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center gap-2 group hover:bg-rose-50 hover:text-rose-500 transition-all cursor-pointer" onClick={() => removeTag(tag)}>
                          #{tag} <X size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                       </span>
                    ))}
                 </div>
              </div>
           </motion.section>

           {/* Final CTA */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.4 }}
             className="bg-primary/5 border border-primary/20 p-12 rounded-[48px] flex justify-between items-center group overflow-hidden relative"
           >
              <div className="relative z-10">
                 <h3 className="text-2xl font-black text-[#0f172a] mb-2 tracking-tight">Ready to go?</h3>
                 <p className="text-[11px] font-bold text-[#64748b] max-w-sm">Your product will be reviewed by our curators before going live.</p>
              </div>
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="relative z-10 px-14 py-6 bg-primary text-white rounded-[24px] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95 flex items-center gap-4 group disabled:opacity-50"
              >
                 {isPublishing ? 'Publishing...' : 'Publish Product Now'} <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-primary/5 group-hover:rotate-12 transition-transform duration-1000" />
           </motion.div>
        </div>

        {/* Success Animation Overlay */}
        <AnimatePresence>
           {isPublishing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-xl flex items-center justify-center"
              >
                 <motion.div 
                   initial={{ scale: 0.5, rotate: -45 }}
                   animate={{ scale: 1, rotate: 0 }}
                   className="flex flex-col items-center"
                 >
                    <div className="w-32 h-32 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40 mb-10">
                       <CheckCircle2 size={64} />
                    </div>
                    <h2 className="text-4xl font-black text-[#0f172a] tracking-tighter mb-4 italic">Publishing Successful!</h2>
                    <p className="text-lg font-bold text-[#64748b]">Redirecting to console...</p>
                 </motion.div>
              </motion.div>
           )}
        </AnimatePresence>

        {/* Floating Mini Profile (as seen in screenshot 2) */}
        <div className="fixed bottom-12 left-6 w-52 z-50">
           <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[28px] border border-slate-100 shadow-2xl shadow-slate-200/40">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-rose-100 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80" alt="Avatar" />
                 </div>
                 <div>
                    <h4 className="text-xs font-black text-[#1e293b] leading-tight mb-1">Alex Rivera</h4>
                    <p className="text-[10px] font-bold text-[#94a3b8] italic lowercase leading-none">Product Curator</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

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

export default AddProduct;
