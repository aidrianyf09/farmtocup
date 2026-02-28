import { useState, useEffect } from 'react';
import api from '../lib/axios';
import type { SiteContent } from '../data/mockData';

const defaultContent: Partial<SiteContent> = {
  heroHeadline: 'Farm to Cup Philippines',
  heroSubtitle: 'Farm. Roast. Brew.',
  weddingsTitle: 'Private Events (Weddings)',
  weddingsDesc: 'Elevate your special day with our premium coffee catering service. We bring the farm-to-cup experience to your wedding reception, creating memorable moments over exceptional Philippine coffee.',
  birthdaysTitle: 'Birthday Celebrations',
  birthdaysDesc: 'Make your birthday unforgettable with a private coffee bar experience. From latte art to cold brew stations, we craft personalized coffee experiences for your celebration.',
  farmToursTitle: 'Private Farm Tours',
  farmToursDesc: 'Journey to our partner farms in the highlands of Benguet and Sagada. Experience the full coffee journey from cherry picking to cupping in an intimate farm-to-table setting.',
  brandStoryText: 'Farm to Cup Philippines was born from a deep love for Philippine coffee and the hardworking farmers who grow it. We source directly from smallholder farms across the Cordilleras and Mindanao, building lasting relationships that ensure fair compensation and sustainable practices. Every bag tells the story of the land, the farmer, and the community behind your cup.',
  contactEmail: 'hello@farmtocup.ph',
  contactPhone: '+63 917 123 4567',
  whatsappNumber: '639171234567',
  messengerUrl: 'https://m.me/farmtocupph',
};

export function useCMS() {
  const [content, setContent] = useState<Partial<SiteContent>>(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/cms')
      .then(({ data }) => {
        setContent({ ...defaultContent, ...data });
      })
      .catch(() => {
        setContent(defaultContent);
      })
      .finally(() => setLoading(false));
  }, []);

  return { content, loading };
}
