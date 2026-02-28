import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Seed categories (6)
  const categories = [
    { name: "Textbooks", slug: "textbooks", iconName: "book-open" },
    { name: "Electronics", slug: "electronics", iconName: "laptop" },
    { name: "Furniture", slug: "furniture", iconName: "armchair" },
    { name: "Clothing", slug: "clothing", iconName: "shirt" },
    { name: "Sports & Fitness", slug: "sports-fitness", iconName: "dumbbell" },
    { name: "Stationery", slug: "stationery", iconName: "pencil" },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }
  console.log(`  ✅ ${categories.length} categories seeded`)

  // Seed test colleges (5 Mumbai colleges)
  const colleges = [
    {
      name: "Sardar Patel Institute of Technology",
      slug: "spit",
      emailDomain: "spit.ac.in",
      city: "Mumbai",
      state: "Maharashtra",
      campusLat: 19.1234,
      campusLng: 72.8369,
      isActive: true,
    },
    {
      name: "DJ Sanghvi College of Engineering",
      slug: "djsce",
      emailDomain: "djsce.ac.in",
      city: "Mumbai",
      state: "Maharashtra",
      campusLat: 19.1075,
      campusLng: 72.8370,
      isActive: true,
    },
    {
      name: "KJ Somaiya College of Engineering",
      slug: "kjsce",
      emailDomain: "somaiya.edu",
      city: "Mumbai",
      state: "Maharashtra",
      campusLat: 19.0728,
      campusLng: 72.9001,
      isActive: true,
    },
    {
      name: "Thadomal Shahani Engineering College",
      slug: "tsec",
      emailDomain: "tsec.ac.in",
      city: "Mumbai",
      state: "Maharashtra",
      campusLat: 19.0860,
      campusLng: 72.8332,
      isActive: true,
    },
    {
      name: "Veermata Jijabai Technological Institute",
      slug: "vjti",
      emailDomain: "vjti.ac.in",
      city: "Mumbai",
      state: "Maharashtra",
      campusLat: 19.0222,
      campusLng: 72.8561,
      isActive: true,
    },
  ]

  for (const college of colleges) {
    await prisma.college.upsert({
      where: { slug: college.slug },
      update: {},
      create: college,
    })
  }
  console.log(`  ✅ ${colleges.length} colleges seeded`)

  // Seed test admin user (will be linked to Clerk via webhook later)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@unideal.in" },
    update: {},
    create: {
      clerkId: "clerk_admin_placeholder",
      email: "admin@unideal.in",
      fullName: "Unideal Admin",
      isAdmin: true,
      onboardingComplete: true,
      verificationStatus: "VERIFIED",
    },
  })

  // Ensure admin has a wallet
  await prisma.wallet.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
    },
  })
  console.log("  ✅ Admin user seeded")

  console.log("🌱 Seeding complete!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
