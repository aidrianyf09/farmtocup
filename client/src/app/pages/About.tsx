import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Leaf, Users, ArrowRight } from 'lucide-react';
import { useCMS } from '../hooks/useCMS';
import { useTeam } from '../hooks/useTeam';
import { useFarms } from '../hooks/useFarms';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { Skeleton } from '../components/ui/LoadingSkeleton';

export default function About() {
  const { content, loading: cmsLoading } = useCMS();
  const { team, loading: teamLoading } = useTeam();
  const { farms } = useFarms();

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-16 lg:pt-20">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 bg-[#4A2C17] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&q=80)' }}
        />
        <div className="relative z-10 text-center px-6">
          <p className="font-label text-xs tracking-[0.3em] uppercase text-[#8B5E3C] mb-3">Get to Know Us</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-[#FAF7F2]">Our Story</h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-label text-xs tracking-[0.2em] uppercase text-[#8B5E3C] mb-4">Who We Are</p>
              <h2 className="font-display text-4xl font-bold text-[#4A2C17] mb-6">
                Rooted in the Highlands of the Philippines
              </h2>
              {cmsLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                <div className="space-y-4 font-body text-base text-[#1E1008]/80 leading-relaxed">
                  {(content?.brandStoryText || 'Farm to Cup Philippines was born from a deep love for Philippine coffee and the hardworking farmers who grow it. We source directly from smallholder farms across the Cordilleras and Mindanao, building lasting relationships that ensure fair compensation and sustainable practices.\n\nEvery bag tells the story of the land, the farmer, and the community behind your cup. When you choose Farm to Cup, you are not just buying coffee — you are investing in Filipino livelihoods and the future of Philippine specialty coffee.')
                    .split('\n\n')
                    .map((para: string, i: number) => <p key={i}>{para}</p>)
                  }
                </div>
              )}
              <Link to="/connect" className="btn-primary mt-8 inline-flex items-center gap-2 text-sm">
                Get in Touch <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <ImageWithFallback
                src={content?.brandStoryImage?.url}
                alt="Our Story"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
                fallback="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#4A7C59] text-[#FAF7F2] p-6 rounded-xl shadow-lg">
                <p className="font-display text-3xl font-bold">100%</p>
                <p className="font-label text-xs uppercase tracking-wider mt-1">Philippine Origin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-[#4A2C17]">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="font-label text-xs tracking-[0.2em] uppercase text-[#8B5E3C] mb-3">What Drives Us</p>
            <h2 className="font-display text-4xl font-bold text-[#FAF7F2]">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf size={32} className="text-[#4A7C59]" />,
                title: 'Sustainability',
                desc: 'We work only with farms that use environmentally responsible practices — protecting the land for future generations of Filipino farmers.',
              },
              {
                icon: <Heart size={32} className="text-[#8B5E3C]" />,
                title: 'Direct Trade',
                desc: 'By buying directly from farmers at premium prices, we ensure they receive fair compensation for their exceptional work.',
              },
              {
                icon: <Users size={32} className="text-[#FAF7F2]" />,
                title: 'Community',
                desc: 'Coffee is more than a beverage — it is a bridge connecting farmers, roasters, and coffee lovers across the archipelago.',
              },
            ].map((val, i) => (
              <div key={i} className="text-center p-8">
                <div className="flex justify-center mb-5">{val.icon}</div>
                <h3 className="font-display text-xl font-semibold text-[#FAF7F2] mb-3">{val.title}</h3>
                <p className="font-body text-sm text-[#FAF7F2]/70 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Farms */}
      {farms.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <p className="font-label text-xs tracking-[0.2em] uppercase text-[#8B5E3C] mb-3">Where It All Begins</p>
              <h2 className="font-display text-4xl font-bold text-[#4A2C17]">Our Partner Farms</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {farms.map(farm => (
                <div key={farm._id} className="card overflow-hidden group">
                  <div className="relative h-44 overflow-hidden">
                    <ImageWithFallback
                      src={farm.image?.url}
                      alt={farm.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      fallback="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1008]/60 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="font-label text-xs text-[#8B5E3C] uppercase tracking-wider mb-1">{farm.region}</p>
                    <h3 className="font-display text-lg font-semibold text-[#4A2C17]">{farm.name}</h3>
                    {farm.description && (
                      <p className="font-body text-xs text-[#8B5E3C]/80 mt-2 leading-relaxed line-clamp-2">{farm.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="font-label text-xs tracking-[0.2em] uppercase text-[#8B5E3C] mb-3">The People Behind the Cup</p>
            <h2 className="font-display text-4xl font-bold text-[#4A2C17]">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamLoading
              ? Array(3).fill(0).map((_, i) => (
                  <div key={i} className="text-center">
                    <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <Skeleton className="h-5 w-32 mx-auto mb-2" />
                    <Skeleton className="h-4 w-24 mx-auto mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5 mx-auto" />
                  </div>
                ))
              : team.map(member => (
                  <div key={member._id} className="text-center group">
                    <div className="relative w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-[#8B5E3C]/20 group-hover:ring-[#4A7C59]/40 transition-all">
                      <ImageWithFallback
                        src={member.photo?.url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        fallback={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=4A2C17&color=FAF7F2&size=144`}
                      />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#4A2C17]">{member.name}</h3>
                    <p className="font-label text-xs uppercase tracking-wider text-[#8B5E3C] mt-1 mb-3">{member.role}</p>
                    {member.bio && (
                      <p className="font-body text-sm text-[#1E1008]/70 leading-relaxed max-w-xs mx-auto">{member.bio}</p>
                    )}
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#4A2C17] py-20 text-center">
        <div className="container-custom">
          <h2 className="font-display text-4xl font-bold text-[#FAF7F2] mb-4">Ready to Experience Our Coffee?</h2>
          <p className="font-body text-lg text-[#FAF7F2]/70 mb-8">Shop our selection of Philippine single-origin coffees.</p>
          <Link to="/shop" className="btn-primary bg-[#8B5E3C] hover:bg-[#A8784E] text-sm">
            Explore the Shop
          </Link>
        </div>
      </section>
    </div>
  );
}
