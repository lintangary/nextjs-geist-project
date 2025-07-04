const clientPromise = require("./src/lib/mongodb").default;

async function seed() {
  try {
    const client = await clientPromise;
    const db = client.db("dompet");

    // Clear existing collections
    await db.collection("categories").deleteMany({});
    await db.collection("accounts").deleteMany({});
    await db.collection("banks").deleteMany({});
    await db.collection("budgetPeriods").deleteMany({});
    await db.collection("transactions").deleteMany({});

    // Seed categories
    await db.collection("categories").insertMany([
      { id: 1, name: "Gaji", icon: "💰" },
      { id: 2, name: "Hadiah", icon: "🎁" },
      { id: 3, name: "Investasi", icon: "📈" },
      { id: 4, name: "Lainnya", icon: "🧾" },
      { id: 5, name: "Makanan", icon: "🍔" },
      { id: 6, name: "Belanja", icon: "🛒" },
      { id: 7, name: "Transport", icon: "🚗" },
    ]);

    // Seed accounts
    await db.collection("accounts").insertMany([
      { name: "Bank Jago", icon: "🏦", balance: 395252 },
      { name: "Tunai", icon: "💵", balance: 500000 },
    ]);

    // Seed banks
    await db.collection("banks").insertMany([
      { name: "Bank Mandiri", icon: "🏦" },
      { name: "BCA", icon: "🏦" },
      { name: "Bank Jago", icon: "🏦" },
      { name: "BRI", icon: "🏦" },
      { name: "BNI", icon: "🏦" },
    ]);

    // Seed budgetPeriods
    await db.collection("budgetPeriods").insertMany([
      { label: "Minggu ini", dateRange: "01/07-07/07" },
      { label: "Bulan ini", dateRange: "01/07-31/07" },
      { label: "Kuartal ini", dateRange: "01/07-30/09" },
      { label: "Tahun ini", dateRange: "01/01-31/12" },
    ]);

    // Seed transactions
    await db.collection("transactions").insertMany([
      {
        category: { id: 7, name: "Transport", icon: "🚗" },
        account: { name: "Bank Jago" },
        amount: 20000,
        type: "expense",
        date: new Date("2025-07-03"),
        description: "Transport expense",
      },
      {
        category: { id: 5, name: "Makanan", icon: "🍔" },
        account: { name: "Tunai" },
        amount: 35000,
        type: "expense",
        date: new Date("2025-07-02"),
        description: "Food expense",
      },
      {
        category: { id: 1, name: "Gaji", icon: "💰" },
        account: { name: "Bank Jago" },
        amount: 5000000,
        type: "income",
        date: new Date("2025-07-01"),
        description: "Salary",
      },
    ]);

    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
