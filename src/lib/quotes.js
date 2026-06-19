const quotes = [
  "Hard work beats talent when talent doesn't work hard.",
  "The pain you feel today will be the strength you feel tomorrow.",
  "Champions train, losers complain.",
  "You don't find willpower, you create it.",
  "Discipline is choosing between what you want now and what you want most.",
  "The only way to prove you are a good sport is to lose.",
  "Every shot you don't take is a missed opportunity.",
  "Consistency is what transforms average into excellence.",
  "Work hard in silence, let your success make the noise.",
  "Talent sets the floor, hard work sets the ceiling.",
  "The difference between good and great is extra effort.",
  "You either get better or you get worse, you never stay the same.",
  "Pressure is something you feel when you haven't prepared.",
  "Train like you've never won, play like you've never lost.",
  "Success is earned, never given.",
];

export const getRandomQuote = () => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
};

export default quotes;