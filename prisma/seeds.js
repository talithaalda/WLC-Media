const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const saltRounds = 10;

  // Seed admin user
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "wlcmedia@gmail.com",
      password: await bcrypt.hash("123456", saltRounds),
      role: "admin",
    },
  });

  // Seed talents (dummy data from Aespa and IVE members with endorsement prices in Rupiah)
  const talents = [
    // Aespa members
    {
      name: "Karina",
      category: "K-Pop Idol",
      userIG: "karinaaespa",
      follIG: "12M",
      ERIG: 12.5,
      startfromIG: 225000000, // Endorsement price in IDR
      userTikTok: "karinaaespa_tiktok",
      follTikTok: "5M",
      ERTikTok: 10.2,
      startfromTikTok: 150000000, // Endorsement price in IDR
      path: "/images/talent/karina_photo.jpg",
      filename: "karina_photo.jpg",
    },
    {
      name: "Winter",
      category: "K-Pop Idol",
      userIG: "winteraespa",
      follIG: "11.5M",
      ERIG: 11.8,
      startfromIG: 210000000, // Endorsement price in IDR
      userTikTok: "winteraespa_tiktok",
      follTikTok: "4.5M",
      ERTikTok: 9.5,
      startfromTikTok: 142500000, // Endorsement price in IDR
      path: "/images/talent/winter_photo.jpg",
      filename: "winter_photo.jpg",
    },
    {
      name: "Giselle",
      category: "K-Pop Idol",
      userIG: "giselleaespa",
      follIG: "11M",
      ERIG: 12.1,
      startfromIG: 225000000, // Endorsement price in IDR
      userTikTok: "giselleaespa_tiktok",
      follTikTok: "4.2M",
      ERTikTok: 9.8,
      startfromTikTok: 147000000, // Endorsement price in IDR
      path: "/images/talent/giselle_photo.jpg",
      filename: "giselle_photo.jpg",
    },
    {
      name: "NingNing",
      category: "K-Pop Idol",
      userIG: "ningningaespa",
      follIG: "10.8M",
      ERIG: 11.5,
      startfromIG: 217500000, // Endorsement price in IDR
      userTikTok: "ningningaespa_tiktok",
      follTikTok: "4M",
      ERTikTok: 9.0,
      startfromTikTok: 135000000, // Endorsement price in IDR
      path: "/images/talent/ningning_photo.jpg",
      filename: "ningning_photo.jpg",
    },

    // IVE members
    {
      name: "Yujin",
      category: "K-Pop Idol",
      userIG: "yujin_ive",
      follIG: "8M",
      ERIG: 9.2,
      startfromIG: 180000000, // Endorsement price in IDR
      userTikTok: "yujin_ive_tiktok",
      follTikTok: "3M",
      ERTikTok: 8.5,
      startfromTikTok: 120000000, // Endorsement price in IDR
      path: "/images/talent/yujin_photo.jpg",
      filename: "yujin_photo.jpg",
    },
    {
      name: "Wonyoung",
      category: "K-Pop Idol",
      userIG: "wonyoung_ive",
      follIG: "9M",
      ERIG: 10.1,
      startfromIG: 195000000, // Endorsement price in IDR
      userTikTok: "wonyoung_ive_tiktok",
      follTikTok: "3.5M",
      ERTikTok: 9.0,
      startfromTikTok: 127500000, // Endorsement price in IDR
      path: "/images/talent/wonyoung_photo.jpg",
      filename: "wonyoung_photo.jpg",
    },
    {
      name: "Gaeul",
      category: "K-Pop Idol",
      userIG: "gaeul_ive",
      follIG: "7.5M",
      ERIG: 8.8,
      startfromIG: 172500000, // Endorsement price in IDR
      userTikTok: "gaeul_ive_tiktok",
      follTikTok: "2.8M",
      ERTikTok: 7.5,
      startfromTikTok: 112500000, // Endorsement price in IDR
      path: "/images/talent/gaeul_photo.jpg",
      filename: "gaeul_photo.jpg",
    },
    {
      name: "Rei",
      category: "K-Pop Idol",
      userIG: "rei_ive",
      follIG: "7.8M",
      ERIG: 8.9,
      startfromIG: 177000000, // Endorsement price in IDR
      userTikTok: "rei_ive_tiktok",
      follTikTok: "2.9M",
      ERTikTok: 7.8,
      startfromTikTok: 117000000, // Endorsement price in IDR
      path: "/images/talent/rei_photo.jpg",
      filename: "rei_photo.jpg",
    },
    {
      name: "Liz",
      category: "K-Pop Idol",
      userIG: "liz_ive",
      follIG: "7.2M",
      ERIG: 8.5,
      startfromIG: 168000000, // Endorsement price in IDR
      userTikTok: "liz_ive_tiktok",
      follTikTok: "2.6M",
      ERTikTok: 7.2,
      startfromTikTok: 108000000, // Endorsement price in IDR
      path: "/images/talent/liz_photo.jpg",
      filename: "liz_photo.jpg",
    },
    {
      name: "Leeseo",
      category: "K-Pop Idol",
      userIG: "leeseo_ive",
      follIG: "7M",
      ERIG: 8.4,
      startfromIG: 165000000, // Endorsement price in IDR
      userTikTok: "leeseo_ive_tiktok",
      follTikTok: "2.5M",
      ERTikTok: 7.0,
      startfromTikTok: 105000000, // Endorsement price in IDR
      path: "/images/talent/leeseo_photo.jpg",
      filename: "leeseo_photo.jpg",
    },
    {
      name: "Karina",
      category: "K-Pop Idol",
      userIG: "karinaaespa",
      follIG: "12M",
      ERIG: 12.5,
      startfromIG: 225000000, // Endorsement price in IDR
      userTikTok: "karinaaespa_tiktok",
      follTikTok: "5M",
      ERTikTok: 10.2,
      startfromTikTok: 150000000, // Endorsement price in IDR
      path: "/images/talent/karina_photo.jpg",
      filename: "karina_photo.jpg",
    },
    {
      name: "Winter",
      category: "K-Pop Idol",
      userIG: "winteraespa",
      follIG: "11.5M",
      ERIG: 11.8,
      startfromIG: 210000000, // Endorsement price in IDR
      userTikTok: "winteraespa_tiktok",
      follTikTok: "4.5M",
      ERTikTok: 9.5,
      startfromTikTok: 142500000, // Endorsement price in IDR
      path: "/images/talent/winter_photo.jpg",
      filename: "winter_photo.jpg",
    },
    {
      name: "Giselle",
      category: "K-Pop Idol",
      userIG: "giselleaespa",
      follIG: "11M",
      ERIG: 12.1,
      startfromIG: 225000000, // Endorsement price in IDR
      userTikTok: "giselleaespa_tiktok",
      follTikTok: "4.2M",
      ERTikTok: 9.8,
      startfromTikTok: 147000000, // Endorsement price in IDR
      path: "/images/talent/giselle_photo.jpg",
      filename: "giselle_photo.jpg",
    },
    {
      name: "NingNing",
      category: "K-Pop Idol",
      userIG: "ningningaespa",
      follIG: "10.8M",
      ERIG: 11.5,
      startfromIG: 217500000, // Endorsement price in IDR
      userTikTok: "ningningaespa_tiktok",
      follTikTok: "4M",
      ERTikTok: 9.0,
      startfromTikTok: 135000000, // Endorsement price in IDR
      path: "/images/talent/ningning_photo.jpg",
      filename: "ningning_photo.jpg",
    },
  ];

  // Insert talents into the database
  await prisma.talent.createMany({
    data: talents,
  });

  // Seed category and portfolio items
  const categoryPorto = await prisma.categoryPorto.create({
    data: {
      name: "Music Videos",
    },
  });

  const portfolios = [
    {
      title: "Next Level",
      sow: "Music Video Production",
      talent: "Aespa",
      categoryId: categoryPorto.id,
      path: "/images/talent/next_level.mp4",
      filename: "next_level.mp4",
    },
    {
      title: "Bonajour",
      sow: "Brand Ambassador Bonajour",
      talent: "Rei",
      categoryId: categoryPorto.id,
      path: "/images/talent/porto1.jpeg",
      filename: "porto1.jpeg",
    },
    {
      title: "Black Mamba",
      sow: "Music Video Production",
      talent: "Aespa",
      categoryId: categoryPorto.id,
      path: "/images/talent/black_mamba.mp4",
      filename: "black_mamba.mp4",
    },
    {
      title: "CLIO",
      sow: "Brand Ambassador CLIO",
      talent: "Yujin",
      categoryId: categoryPorto.id,
      path: "/images/talent/porto2.jpeg",
      filename: "porto2.jpeg",
    },
    {
      title: "Girls",
      sow: "Music Video Production",
      talent: "Aespa",
      categoryId: categoryPorto.id,
      path: "/images/talent/girls.mp4",
      filename: "girls.mp4",
    },
    {
      title: "Chanel",
      sow: "Brand Ambassador Chanel",
      talent: "Aespa",
      categoryId: categoryPorto.id,
      path: "/images/talent/porto3.jpeg",
      filename: "porto3.jpeg",
    },
    {
      title: "Dreams Come True",
      sow: "Music Video Production",
      talent: "Aespa",
      categoryId: categoryPorto.id,
      path: "/images/talent/dreams_come_true.mp4",
      filename: "dreams_come_true.mp4",
    },
    {
      title: "Chopard",
      sow: "Brand Ambassador Chopard",
      talent: "Rei",
      categoryId: categoryPorto.id,
      path: "/images/talent/porto4.jpeg",
      filename: "porto4.jpeg",
    },
    {
      title: "Eleven",
      sow: "Music Video Production",
      talent: "IVE",
      categoryId: categoryPorto.id,
      path: "/images/talent/eleven.mp4",
      filename: "eleven.mp4",
    },
    {
      title: "Love Dive",
      sow: "Music Video Production",
      talent: "IVE",
      categoryId: categoryPorto.id,
      path: "/images/talent/love_dive.mp4",
      filename: "love_dive.mp4",
    },
    {
      title: "After Like",
      sow: "Music Video Production",
      talent: "IVE",
      categoryId: categoryPorto.id,
      path: "/images/talent/after_like.mp4",
      filename: "after_like.mp4",
    },
    {
      title: "I AM",
      sow: "Music Video Production",
      talent: "IVE",
      categoryId: categoryPorto.id,
      path: "/images/talent/i_am.mp4",
      filename: "i_am.mp4",
    },
  ];

  // Insert portfolios into the database
  await prisma.porto.createMany({
    data: portfolios,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
