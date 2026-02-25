import { supabase } from "./supabase";

// ข้อมูลสินค้าทองคำแท้ 96.5% (ทองรูปพรรณ) - อ้างอิง ห้างเพชรทองจินตนา
export const products = [
  // --- สร้อยคอ (Necklaces) ---
  {
    id: "n1",
    name: "สร้อยคอทองคำ นน. 5 บาท ลายสี่เสา",
    category: "necklace",
    price: 45000,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/617605004_867848949220797_4818084749583130452_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGzU32VmbVpzdCiT-J6_NBnkm72w3f3BOOSbvbDd_cE42WU3Xa5todiNat4gGHiZ0YTb5MzYJawyO-AWEPTc76i&_nc_ohc=PNn_dfRlGRAQ7kNvwHeCoEw&_nc_oc=AdkUqmCmFy8po-N4OJJI9tL_wO19TJg4X0EySVA6yKAo9d4k3e1Wwg460NSpyM7rEBXBeewqNHXq4OObK61b1mAE&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=w7ukVgm9xJr3rj8940R0vA&oh=00_AfsGvL--FVoVWS71T8hHiODYcB9JM3qOBax_ZM_Fs4p0uA&oe=69A4E97C",
    description: "สร้อยคอทองคำแท้ 96.5% มาตรฐานเยาวราช ลายสี่เสายอดนิยม แข็งแรงทนทาน",
    weight: "5 บาท",
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "n2",
    name: "สร้อยคอทองคำ นน. 5 บาท ลายสุโขทัย",
    category: "necklace",
    price: 92000,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/615495929_867849032554122_3767566933643996842_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFdtE4T2PXMHrCZr7GN1B7ZRYHd1aa_7mlFgd3Vpr_uaSvQx_ggLOWEW4jkvLvAHno1heV5qUrx60oheRjuHpHO&_nc_ohc=aWK0q9ZkAmQQ7kNvwGxPDWd&_nc_oc=AdkNmHff0LTNgF6CExG7gyo6Ly4svYxYyJP56hriZVwp1qSu-fGk8i3GGsboOMETSf0Zzhrlbe2bFmuAe-l_XoGS&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=X78CVJNCNMZMF3RIw9bNgw&oh=00_AfsDA18R9zj97aXe3GGujbZ-B4FrWJ5d-1jzkr9LVldbrQ&oe=69A4EF7F",
    description: "งานปราณีตศิลปะสุโขทัย ลงยาสีสวยงาม งานฝีมือช่างไทยผู้ชำนาญการ",
    weight: "5 บาท",
    rating: 5.0,
    reviews: 45,
  },

  // --- แหวน (Rings) ---
  {
    id: "r1",
    name: "แหวนทองคำ นน. 1 สลึง ลายมังกรคาบแก้วคู่",
    category: "rings",
    price: 24000,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/633146312_886864987319193_7210172545419210309_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGlf-cRpnBuwuZ7ZAKCeJWzNavQ8SoQmHc1q9DxKhCYd-6E9qLL3xNgRRjyOgJd9XdTdtTC-MDNPL-ujvaraBnL&_nc_ohc=QE470Nf1b6MQ7kNvwEHyn5B&_nc_oc=AdlO1QgBnZaDBa-PfIysyIetaLRi9ExaHKtlVjYY5vMLv46RCcudPjP-POYjty89koHgp0YwNZ0m3IEeDtd07mqz&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=LA0-flPOEwHmTqK1OU3FBw&oh=00_AfunBHWBhG-23StDvOILVMvD1axOEPVk0VNJLOStBniHIA&oe=69A4C235",
    description: "แหวนมังกรเสริมบารมี งานแกะสลักละเอียด ลายชัดเจน พร้อมถุงแดงนำโชค",
    weight: "1 สลึง",
    rating: 4.9,
    reviews: 54,
  },
  {
    id: "r2",
    name: "แหวนทองคำ นน. 1 สลึง ลายหัวใจคู่",
    category: "rings",
    price: 12500,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/633848486_886865000652525_458495730071454429_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHbzIn-J08M3jCe9n7hJiIN_5kik7eR2eD_mSKTt5HZ4P5FRnqOHTuXeb6-hJF9wvVyX2bxiQ0YvMvyHPN2y2hD&_nc_ohc=sF3HhCF57ikQ7kNvwGYQeJX&_nc_oc=AdmmInxurzcn0kjOplv_jZTKU2Ng8FZJL4VnUoX9SRme9kZ-WIysip9hdUrUNcT3cDdrsq3gAh8JgGufLuYU-ROH&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=8UW2FVY5MbMRdzN4X6JOLA&oh=00_AfuZoK2ovTFI35HGnCPO-zCVgci6D69_3Vd41X85a7vo_w&oe=69A4D7F7",
    description: "แหวนหัวใจน่ารัก ดีไซน์ทันสมัย เหมาะสำหรับวัยรุ่นหรือเป็นของขวัญ",
    weight: "1 สลึง",
    rating: 4.6,
    reviews: 112,
  },

  // --- กำไล / เลสข้อมือ (Bracelets/Les) ---
  {
    id: "b1",
    name: "เลสข้อมือทองคำ นน. 1-2 บาท ลายมังกร 3D",
    category: "bracelet",
    price: 93500,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/627419705_880042228001469_7662128464231600341_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFWXhFFg9DzUiecNo_JeIJkeoOT9gXN6Cd6g5P2Bc3oJ25gd78fOR_Vce8eIwa6BrjJMZQ5rLKVkcmhd0X93Q0k&_nc_ohc=YeTYmCVncXoQ7kNvwER8SET&_nc_oc=AdmeUyYs483OfU7BZ1AOdr_WBWIOSYyMPvqv4HG3RS1j5-9Z0Ol4mkUwiP5JMCyVrQX2J4N2xUaCuoX9i1N3yET6&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=Ip3vwdL_9hYJzYTg-_VULw&oh=00_AftMFnFTzQ3cahWtnFg8-sF2-pLbxHlP_w7pgQrigCIyZA&oe=69A4DDF3",
    description: "เลสข้อมือหน้ากว้าง แข็งแรง งานละเอียดทรงคุณค่า",
    weight: "2 บาท",
    rating: 5.0,
    reviews: 38,
  },
  {
    id: "b2",
    name: "กำไลทองคำ นน. 3 บาท ลายฉลุพิกุล",
    category: "bracelet",
    price: 138000,
    image: "https://scontent.fkdt3-1.fna.fbcdn.net/v/t39.30808-6/624703497_880041548001537_6328666914172442928_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFD0sy4LLAvH3WW2icba3sno2g84sba01ejaDzixtrTV4jdypQR8D8u0mMu7WRd26ZsQC6QOsOGYbC04AdD0e6N&_nc_ohc=eiZOEezVs1YQ7kNvwGJQEOo&_nc_oc=Adl-_iAj11mP964OGOmR3Qn6ldL7rlT_BVyqxfonjASVTyTagICgn7vgrBIevaiWidDeiOu-Ab3dB1RTAdG3iCts&_nc_zt=23&_nc_ht=scontent.fkdt3-1.fna&_nc_gid=P_74gEkSBZjFwt_6hNJYDA&oh=00_AfsiWu3Kz7BN8N958c2wBfTdBquXwLVCaIreF-9zWInl5Q&oe=69A4F0CF",
    description: "กำไลวงกว้าง งานฉลุลายไทยโบราณ สวยงามตระการตาแบบไทยเดิม",
    weight: "3 บาท",
    rating: 5.0,
    reviews: 12,
  },

  // --- จี้ / พระเลี่ยมทอง (Pendants) ---
  {
    id: "p1",
    name: "พระพุทธชินราช เลี่ยมกรอบทองคำแท้ พร้อมเพชร",
    category: "pendant",
    price: 52000,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/617901886_871765895495769_7118139168907467290_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFZQrzWI5GCDfBW6zjE0w7TWSFFc9DVxCdZIUVz0NXEJxTZs46goT-IiP3YbwTUNkk321n4EP1AHNa8K2yFXbjG&_nc_ohc=qcUaJntj1pkQ7kNvwH_M5ST&_nc_oc=AdmKV-s2QQW7csPdc5KY1hUgJ6ccaU-2ETtJ0m5m2P7_8aSmIz_XpebotNzzO3E9amr96zrokRYIakGMrCIjw99q&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=x9bLltbamk7FwGH2XPrKQQ&oh=00_AfszsFxynblwN0DRHW5nguJD9zixN7Zypmiz_BP4gTqAyA&oe=69A4CA02",
    description: "องค์พระเนื้อทองเหลือง เลี่ยมกรอบทองคำแท้ 90% พร้อมเพชร กันน้ำระดับดีเยียม",
    weight: "กรอบ 3 กรัม",
    rating: 5.0,
    reviews: 94,
  },
  {
    id: "p2",
    name: "จี้พระหลวงพ่อโต เลี่ยมกรอบทองคำแท้ พร้อมเพชร",
    category: "pendant",
    price: 60200,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/617799659_871765922162433_856113887376814377_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeE9uLpIzfVPPQapqv8x5o1dlZKlyjueNX-VkqXKO541f-faY2UU4L7Jqir69w2FRlIt1bRfCZyQejNb_MG1V6DC&_nc_ohc=R8cdGRJnprUQ7kNvwEqx_9v&_nc_oc=AdkTqnMpJ17B9j99esMbx09Ngz2OUrMIulFbX2K3IhQndAVddgiR-4ZPkH3XZ1RxEVQBf6KgmaI1MVGkfzt2MmCA&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=B_khnnwn5tGFvcu2Giy7lg&oh=00_Afsdg0aRQnHz9YKkMa-JzTGtffFjBi3bH0AgKU6NPiXvug&oe=69A4E452",
    description: "องค์พระเนื้อทองเหลือง เลี่ยมกรอบทองคำแท้ 90% พร้อมเพชร กันน้ำระดับดีเยียม",
    weight: "1 กรัม",
    rating: 4.8,
    reviews: 156,
  },

  // --- ต่างหู (Earrings) ---
  {
    id: "e1",
    name: "ต่างหูทองคำ งานแฟชั่น ครึ่งสลึง",
    category: "earring",
    price: 6500,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/624313440_877697561569269_4121756596627822764_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHV2bAE0PUcMSwakajBkl7A0OThvSl5PGrQ5OG9KXk8al4Nux07rsMnxaQbFzvPZ2EOcXg6npIcryR1n0Q9Tu5_&_nc_ohc=irA-zLr1gm8Q7kNvwEmCifN&_nc_oc=Adk5KfxIXXVy-xoOCAHP73o8ZlSgDPEKQT4bydNY5AVEoMT4HJ4TMRPhT3BF3JvHDHTW-d3wlM3Igmy4MovKXR3_&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=HIh7D3U_h-dr8pXTG3ImPg&oh=00_AftXPXCjoi7V51QPjmVulxqakjhnWNqaFMqRIPvjrsGzeg&oe=69A4E5EA",
    description: "ต่างหูแป้น ลายแฟชั่น สวยหวานทันสมัย ใส่เป็นประจำได้",
    weight: "2 กรัม",
    rating: 4.7,
    reviews: 67,
  },
  {
    id: "e2",
    name: "ต่างหูเพชรแท้เบลเยี่ยม ห่วงเพชร",
    category: "earring",
    price: 11000,
    image: "https://scontent.fkdt3-2.fna.fbcdn.net/v/t39.30808-6/622080706_874431855229173_8518479689890223_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHdhxWAk5W3tNHZbKqhRA2PZ7e8Eo8IdFhnt7wSjwh0WLZzVvUV46hvPo-21gq9cfd_Y8KdfzeO7bHIoQNe4Xf3&_nc_ohc=7lzuOgf5HdsQ7kNvwE443EB&_nc_oc=Adlj1KpMM4v8ZQpCnZblf2sVupy87TLtC-fDvfrUjZE6PGk3QD485knsXCN8yxMiBoIOl_UB-3Dhqtu3R2jl-xhU&_nc_zt=23&_nc_ht=scontent.fkdt3-2.fna&_nc_gid=KR3JjsgX2S222gWe-nPLfw&oh=00_Afs7OvOxsKuWAq-bjS2wtgTD5dXCXZ-EqlziOOmCMFtfbw&oe=69A4C32B",
    description: "ต่างหูห่วงเพชรแท้ ดีไซน์เรียบง่ายเข้ากับทุกชุด มาตรฐานทองเยาวราช",
    weight: "1 สลึง",
    rating: 4.8,
    reviews: 89,
  },
  // --- ทองคำแท่ง (Gold Bars) ---
  {
    id: "gb1",
    name: "ทองคำแท่ง นน. 10 บาท มาตรฐาน สคบ.",
    category: "goldbar",
    price: 75000,
    image: "https://filebroker-cdn.lazada.co.th/kf/S302dd5a5ff5d40c594b813b58585d496S.jpg",
    description: "ทองคำแท่งบริสุทธิ์ 96.5% บล็อกมาตรฐาน ขายคืนได้ราคาสูงสุดตามประกาศสมาคม",
    weight: "10 บาท",
    rating: 5.0,
    reviews: 210,
  },
  {
    id: "gb2",
    name: "ทองคำแท่ง นน. 1 บาท พรีเมียมการ์ด",
    category: "goldbar",
    price: 75000,
    image: "https://st-th-1.byteark.com/assets.punpro.com/contents/i48808/1668413900286-314952935_6318462814856685_6747005919144338957_n.jpg",
    description: "ทองคำแท่งแผ่นเล็ก ดีไซน์สวยในแพ็กเกจการ์ด เหมาะสำหรับมอบเป็นของขวัญหรือสะสม",
    weight: "1 บาท",
    rating: 4.9,
    reviews: 145,
  },
];

export const categories = [
  { id: "all", name: "ทั้งหมด" },
  { id: "goldbar", name: "ทองคำแท่ง" },
  { id: "necklace", name: "สร้อยคอ" },
  { id: "rings", name: "แหวน" },
  { id: "bracelet", name: "กำไล / เลส" },
  { id: "earring", name: "ต่างหู" },
  { id: "pendant", name: "จี้ / พระเลี่ยมทอง" },
];

export const getProductsByCategory = async (category: string) => {
  try {
    let query = supabase.from("products").select("*");

    if (category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;
    if (data && data.length > 0) return data;

    // Fallback to mock data if empty
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  } catch (error) {
    console.warn("Supabase fetch error, using mock data:", error);
    if (category === "all") return products;
    return products.filter((p) => p.category === category);
  }
};

export const getProductById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (data) return data;

    return products.find((p) => p.id === id);
  } catch (error) {
    console.warn("Supabase fetch error, using mock data:", error);
    return products.find((p) => p.id === id);
  }
};

export const sampleReviews = [
  {
    id: "1",
    author: "นางสาวทิพย์",
    rating: 5,
    text: "สินค้าสวยมากค่ะ ของแท้ ราคาดี ส่งไวมากค่ะ",
    date: "2025-02-15",
  },
  {
    id: "2",
    author: "นายวรรณ",
    rating: 4.8,
    text: "งานละเอียด ลายชัดเจนมากครับ มั่นใจร้านชื่อดังเยาวราช/อยุธยา",
    date: "2025-02-10",
  },
  {
    id: "3",
    author: "คุณสุชาดา",
    rating: 4.9,
    text: "ชอบมากค่ะ ลายสุโขทัยสวยมาก บริการดีประทับใจ",
    date: "2025-02-05",
  },
];

export const storeInfo = {
  name: "Aoffy Jewelry",
  phone: "081-234-5678",
  email: "contact@aoffyjewelry.com",
  address: "Central Central, Bangkok, Thailand",
  openHours: "10:30 - 20:00 (จันทร์-อาทิตย์)",
  description: "ที่สุดแห่งเครื่องประดับทองคำแท้ 96.5% งานปราณีตมาตรฐานเยาวราช พร้อมบริการออมทองและสั่งทำเครื่องประดับทุกชนิด",
};
