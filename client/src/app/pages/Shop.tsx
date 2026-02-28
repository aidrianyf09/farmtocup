import React, { useState } from 'react';
import { ShoppingCart, Filter } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { Badge } from '../components/ui/Badge';
import { ProductCardSkeleton } from '../components/ui/LoadingSkeleton';
import { formatPrice } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

const FILTERS = [
  { value: 'all', label: 'All Coffee' },
  { value: 'green', label: 'Green Beans' },
  { value: 'roasted', label: 'Roasted Coffee' },
];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const { products, loading } = useProducts(activeFilter);
  const { addItem } = useCart();

  const getVariant = (productId: string, variants: string[]) =>
    selectedVariants[productId] || variants[0] || '250g';

  const handleVariantChange = (productId: string, variant: string) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variant }));
  };

  const handleAddToCart = (product: any) => {
    const variant = getVariant(product._id, product.variants);
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      selectedVariant: variant,
      image: product.image?.url,
    });
    toast.success(`${product.name} (${variant}) added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-16 lg:pt-20">
      {/* Hero */}
      <section className="relative h-52 bg-[#4A2C17] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1200&q=80)' }} />
        <div className="relative z-10 text-center px-6">
          <p className="font-label text-xs tracking-[0.3em] uppercase text-[#8B5E3C] mb-3">Philippine Single Origin</p>
          <h1 className="font-display text-5xl font-bold text-[#FAF7F2]">Our Coffee</h1>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#8B5E3C]/15 py-4 shadow-sm">
        <div className="container-custom flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-[#8B5E3C]">
            <Filter size={16} />
            <span className="font-label text-xs uppercase tracking-wider">Filter:</span>
          </div>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`font-label text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full transition-all ${
                activeFilter === f.value
                  ? 'bg-[#4A2C17] text-[#FAF7F2]'
                  : 'text-[#4A2C17] border border-[#4A2C17]/30 hover:border-[#4A2C17]'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto font-label text-xs text-[#8B5E3C]/70 uppercase tracking-wider">
            {loading ? 'Loading...' : `${products.length} products`}
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-[#8B5E3C] mb-3">No products found</p>
              <p className="font-body text-sm text-[#8B5E3C]/70">Try a different filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product._id} className="card group flex flex-col">
                  <div className="relative overflow-hidden h-56 flex-shrink-0">
                    <ImageWithFallback
                      src={product.image?.url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      fallback="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant={product.category === 'green' ? 'green' : 'roasted'}>
                        {product.category === 'green' ? 'Green' : 'Roasted'}
                      </Badge>
                      {product.stock <= 5 && product.stock > 0 && (
                        <Badge variant="warning">Low Stock</Badge>
                      )}
                      {product.stock === 0 && (
                        <Badge variant="danger">Sold Out</Badge>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-display text-lg font-semibold text-[#4A2C17] mb-2">{product.name}</h3>
                    <p className="font-body text-sm text-[#8B5E3C]/80 leading-relaxed mb-4 flex-1 line-clamp-3">
                      {product.description}
                    </p>

                    {/* Variant Selector */}
                    {product.variants.length > 0 && (
                      <div className="mb-4">
                        <p className="font-label text-xs uppercase tracking-wider text-[#8B5E3C] mb-2">Size</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.variants.map(v => (
                            <button
                              key={v}
                              onClick={() => handleVariantChange(product._id, v)}
                              className={`px-3 py-1.5 rounded text-xs font-label font-semibold uppercase tracking-wider border transition-all ${
                                getVariant(product._id, product.variants) === v
                                  ? 'bg-[#4A2C17] text-[#FAF7F2] border-[#4A2C17]'
                                  : 'text-[#4A2C17] border-[#4A2C17]/30 hover:border-[#4A2C17]'
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#8B5E3C]/10">
                      <span className="font-display text-xl font-bold text-[#4A2C17]">{formatPrice(product.price)}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded font-label text-xs font-semibold uppercase tracking-wider transition-all ${
                          product.stock === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-[#4A2C17] text-[#FAF7F2] hover:bg-[#6B4423]'
                        }`}
                      >
                        <ShoppingCart size={14} />
                        {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-[#4A2C17] py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Free Shipping', desc: 'On orders above ₱1,500' },
              { title: 'Freshly Roasted', desc: 'Roasted within 48hrs of shipment' },
              { title: 'Direct Trade', desc: 'Supporting Filipino farmers' },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="font-label text-sm font-bold uppercase tracking-wider text-[#FAF7F2] mb-1">{item.title}</h3>
                <p className="font-body text-sm text-[#FAF7F2]/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
