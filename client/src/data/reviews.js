// Google Reviews showcase (DEC-010, DEC-020).
//
// DEVELOPMENT PLACEHOLDERS: the rating, count and reviews below are sample
// content so the section can be designed while the site is under development.
// Replace them with real reviews from the official Villa Cinnamoon Castle
// Google Business Profile (planned: Business Profile API) before launch.
//
// The reviews are split in half across the two moving rows (upper row drifts
// right, lower row drifts left). Six or more reviews give the best result.
// Set `googleReviews` to null to fall back to the "Read Reviews on Google" state.
export const googleReviews = {
  placeholder: true,
  rating: 4.8,
  total: 24,
  items: [
    {
      author: 'Sample Guest 1',
      date: '2 weeks ago',
      rating: 5,
      text: 'We stayed as a family of eight and the whole villa was ours. The upstairs lounge was our favourite spot in the evenings, and the host replied quickly on WhatsApp whenever we needed anything.',
    },
    {
      author: 'Sample Guest 2',
      date: '1 month ago',
      rating: 5,
      text: 'Quiet, green and only a short drive to Hikkaduwa beach. The kitchen had everything we needed to cook for the group.',
    },
    {
      author: 'Sample Guest 3',
      date: '1 month ago',
      rating: 4,
      text: 'Spacious rooms and a lovely garden. We chose the A/C option for the two main bedrooms, which helped a lot in the afternoons.',
    },
    {
      author: 'Sample Guest 4',
      date: '2 months ago',
      rating: 5,
      text: 'Perfect for our friends’ weekend. Plenty of space, a big dining table and a relaxed courtyard for BBQ nights. Check-in was simple and everything was clean and ready when we arrived.',
    },
    {
      author: 'Sample Guest 5',
      date: '3 months ago',
      rating: 5,
      text: 'Private and peaceful — it felt like our own home among the trees. Would come back with the whole family.',
    },
    {
      author: 'Sample Guest 6',
      date: '3 months ago',
      rating: 4,
      text: 'Good value for a large group. The host helped arrange a lagoon boat trip, and the beach and town were close enough for day trips.',
    },
    {
      author: 'Sample Guest 7',
      date: '4 months ago',
      rating: 5,
      text: 'Clean bedrooms, hot showers and a calm neighbourhood. The balcony view over the palms in the morning was the best part.',
    },
    {
      author: 'Sample Guest 8',
      date: '5 months ago',
      rating: 5,
      text: 'Easy booking through WhatsApp and very helpful hosts. Great place for a family reunion.',
    },
  ],
};
