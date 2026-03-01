import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Coffee, Leaf, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import { useFarms } from '../hooks/useFarms';
import { useProducts } from '../hooks/useProducts';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { Badge } from '../components/ui/Badge';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function Home() {
  const { content } = useCMS();
  const { farms } = useFarms();
  const { products } = useProducts();
  const { addItem } = useCart();
  const [currentFarm, setCurrentFarm] = useState(0);
  const featuredProducts = products.slice(0, 3);

  const nextFarm = () => setCurrentFarm(i => (i + 1) % Math.max(farms.length, 1));
  const prevFarm = () => setCurrentFarm(i => (i - 1 + Math.max(farms.length, 1)) % Math.max(farms.length, 1));

  const handleQuickAdd = (product: any) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      selectedVariant: product.variants[0] || '250g',
      image: product.image?.url,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#1E1008] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: content?.heroImage?.url
              ? `url(${content.heroImage.url})`
              : 'url(https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1008]/60 via-[#1E1008]/30 to-[#1E1008]/80" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="font-label text-xs tracking-[0.3em] uppercase text-[#8B5E3C] mb-6 animate-fade-in-up">
            Proudly Philippine Coffee
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#FAF7F2] mb-6 leading-tight animate-fade-in-up">
            {content?.heroHeadline || 'Farm to Cup'}
          </h1>
          <p className="font-display text-xl md:text-2xl text-[#8B5E3C] italic mb-10 animate-fade-in-up">
            {content?.heroSubtitle || 'Farm. Roast. Brew.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <Link to="/shop" className="btn-primary text-sm">
              Shop Our Coffee
            </Link>
            <Link to="/about" className="btn-secondary text-sm border-[#FAF7F2] text-[#FAF7F2] hover:bg-[#FAF7F2] hover:text-[#4A2C17]">
              Our Story
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-[#8B5E3C]/50" />
          <p className="font-label text-xs text-[#8B5E3C]/70 tracking-widest uppercase">Scroll</p>
        </div>
      </section>

      {/* Story Strip */}
      <section className="bg-[#4A2C17] py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center md:text-left">
            {[
              { icon: <Leaf size={20} />, label: 'Direct Trade', desc: 'From highland farms' },
              { icon: <Coffee size={20} />, label: 'Small Batch Roasted', desc: 'For peak freshness' },
              { icon: <Star size={20} />, label: 'Philippine Origin', desc: 'Supporting local farmers' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-[#8B5E3C]">{item.icon}</div>
                <div>
                  <p className="font-label text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">{item.label}</p>
                  <p className="font-body text-xs text-[#FAF7F2]/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm Origins Carousel */}
      {farms.length > 0 && (
        <section className="section-padding bg-[#FAF7F2]">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="font-label text-xs tracking-[0.2em] uppercase text-[#8B5E3C] mb-3">From Field to Cup</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#4A2C17]">Our Partner Farms</h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-72 md:h-auto">
                  <ImageWithFallback
                    src={farms[currentFarm]?.image?.url}
                    alt={farms[currentFarm]?.name}
                    className="w-full h-full object-cover"
                    fallback="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1E1008]/40" />
                </div>
                <div className="bg-[#1E1008] p-10 flex flex-col justify-center">
                  <p className="font-label text-xs tracking-widest text-[#8B5E3C] uppercase mb-3">
                    {farms[currentFarm]?.region}
                  </p>
                  <h3 className="font-display text-3xl font-bold text-[#FAF7F2] mb-4">
                    {farms[currentFarm]?.name}
                  </h3>
                  <p className="font-body text-sm text-[#FAF7F2]/70 leading-relaxed mb-8">
                    {farms[currentFarm]?.description || 'A partner farm producing exceptional Philippine coffee with sustainable farming practices.'}
                  </p>
                  <div className="flex items-center gap-4">
                    <button onClick={prevFarm} className="p-2 rounded-full border border-[#FAF7F2]/20 text-[#FAF7F2]/60 hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition-colors">
                      <ChevronLeft size={18} />
                    </button>
                    <span className="font-label text-xs text-[#FAF7F2]/40">
                      {currentFarm + 1} / {farms.length}
                    </span>
                    <button onClick={nextFarm} className="p-2 rounded-full border border-[#FAF7F2]/20 text-[#FAF7F2]/60 hover:border-[#8B5E3C] hover:text-[#8B5E3C] transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <p className="font-label text-xs tracking-[0.2em] uppercase text-[#8B5E3C] mb-3">Freshly Roasted</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-[#4A2C17]">Featured Coffees</h2>
            </div>
            <Link to="/shop" className="flex items-center gap-2 font-label text-sm font-semibold uppercase tracking-wider text-[#4A2C17] hover:text-[#8B5E3C] transition-colors mt-4 md:mt-0">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <div key={product._id} className="card group">
                <div className="relative overflow-hidden h-56">
                  <ImageWithFallback
                    src={product.image?.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fallback="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={product.category === 'green' ? 'green' : 'roasted'}>
                      {product.category === 'green' ? 'Green Beans' : 'Roasted'}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-[#4A2C17] mb-2">{product.name}</h3>
                  <p className="font-body text-sm text-[#8B5E3C]/80 leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-[#4A2C17]">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="btn-primary text-xs py-2 px-4"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Events Section */}
      <section className="section-padding bg-[#FAF7F2]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="font-label text-xs tracking-[0.2em] uppercase text-[#8B5E3C] mb-3">Exclusive Experiences</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#4A2C17]">Private Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: content?.weddingsTitle || 'Private Events (Weddings)',
                desc: content?.weddingsDesc || 'Elevate your special day with our premium coffee catering service.',
                image: content?.weddingsImage?.url || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
              },
              {
                title: content?.birthdaysTitle || 'Birthday Celebrations',
                desc: content?.birthdaysDesc || 'Make your birthday unforgettable with a private coffee bar experience.',
                image: content?.birthdaysImage?.url || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&q=80',
              },
              {
                title: content?.farmToursTitle || 'Private Farm Tours',
                desc: content?.farmToursDesc || 'Journey to our partner farms for an intimate farm-to-table experience.',
                image: content?.farmToursImage?.url || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&q=80',
              },
            ].map((event, i) => (
              <div key={i} className="card group overflow-hidden">
                <div className="relative h-52 overflow-hidden">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1008]/70 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-[#4A2C17] mb-3">{event.title}</h3>
                  <p className="font-body text-sm text-[#8B5E3C]/80 leading-relaxed mb-4">{event.desc}</p>
                  <Link to="/connect" className="flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-wider text-[#4A7C59] hover:text-[#4A2C17] transition-colors">
                    Inquire Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#4A7C59] py-16 text-center">
        <div className="container-custom">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#FAF7F2] mb-4">
            Taste the Philippines in Every Cup
          </h2>
          <p className="font-body text-lg text-[#FAF7F2]/80 mb-8 max-w-xl mx-auto">
            Order today and experience the richness of highland Philippine coffee, delivered to your door.
          </p>
          <Link to="/shop" className="btn-primary bg-[#FAF7F2] text-[#4A2C17] hover:bg-white text-sm">
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}
