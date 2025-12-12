const bcrypt = require('bcryptjs');
const { db, initDB } = require('./db');

async function seed() {
    // Initialize database first
    initDB();

    console.log('Starting database seed...');

    // Clear existing data
    db.set('orders', []).write();
    db.set('books', []).write();
    db.set('clients', []).write();
    db.set('admins', []).write();

    // Seed admin
    const adminPassword = await bcrypt.hash('admin123', 10);
    db.get('admins').push({
        id: 1,
        username: 'admin',
        password_hash: adminPassword
    }).write();
    console.log('✓ Admin user created (username: admin, password: admin123)');

    // Seed sample clients
    const clientPassword = await bcrypt.hash('password123', 10);
    db.get('clients').push({
        id: 1,
        name: 'राज कुमार',
        email: 'raj@example.com',
        password_hash: clientPassword
    }).write();
    db.get('clients').push({
        id: 2,
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password_hash: clientPassword
    }).write();
    console.log('✓ Sample clients created');

    // Seed books
    const books = [
        {
            id: 1,
            slug: 'bhagavad-gita',
            title_hi: 'श्रीमद् भगवद् गीता',
            title_en: 'Bhagavad Gita',
            short_hi: 'जीवन का सार',
            short_en: 'The essence of life',
            description_hi: 'भगवद गीता भारतीय संस्कृति का एक अमूल्य रत्न है। यह जीवन के गहरे रहस्यों को समझाती है।',
            description_en: 'The Bhagavad Gita is a precious gem of Indian culture. It explains the deep mysteries of life.',
            price: 299,
            ex_tax: 269,
            category: 'spiritual',
            tags: ['spiritual', 'philosophy', 'classic'],
            language: 'both',
            stock: 50,
            cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
        },
        {
            id: 2,
            slug: 'premchand-godan',
            title_hi: 'गोदान - मुंशी प्रेमचंद',
            title_en: 'Godan by Premchand',
            short_hi: 'भारतीय किसान जीवन की कहानी',
            short_en: 'Story of Indian farmer life',
            description_hi: 'गोदान प्रेमचंद का सबसे प्रसिद्ध उपन्यास है जो ग्रामीण जीवन की कठिनाइयों को दर्शाता है।',
            description_en: 'Godan is Premchand\'s most famous novel depicting the hardships of rural life.',
            price: 199,
            ex_tax: 179,
            category: 'fiction',
            tags: ['hindi-literature', 'classic', 'social'],
            language: 'hindi',
            stock: 35,
            cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop'
        },
        {
            id: 3,
            slug: 'ncert-science-class10',
            title_hi: 'एनसीईआरटी विज्ञान कक्षा 10',
            title_en: 'NCERT Science Class 10',
            short_hi: 'कक्षा 10 के लिए विज्ञान पाठ्यपुस्तक',
            short_en: 'Science textbook for class 10',
            description_hi: 'CBSE पाठ्यक्रम के अनुसार कक्षा 10 की आधिकारिक विज्ञान पुस्तक।',
            description_en: 'Official science book for class 10 as per CBSE curriculum.',
            price: 150,
            ex_tax: 135,
            category: 'education',
            tags: ['textbook', 'science', 'ncert', 'class10'],
            language: 'both',
            stock: 100,
            cover_url: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop'
        },
        {
            id: 4,
            slug: 'hindi-grammar',
            title_hi: 'हिंदी व्याकरण',
            title_en: 'Hindi Grammar',
            short_hi: 'संपूर्ण हिंदी व्याकरण',
            short_en: 'Complete Hindi grammar',
            description_hi: 'हिंदी व्याकरण की सभी बारीकियों को सरल भाषा में समझाया गया है।',
            description_en: 'All nuances of Hindi grammar explained in simple language.',
            price: 250,
            ex_tax: 225,
            category: 'education',
            tags: ['grammar', 'hindi', 'reference'],
            language: 'hindi',
            stock: 60,
            cover_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop'
        },
        {
            id: 5,
            slug: 'ramayana',
            title_hi: 'रामायण',
            title_en: 'Ramayana',
            short_hi: 'भगवान राम की जीवन गाथा',
            short_en: 'The life story of Lord Rama',
            description_hi: 'रामायण भारतीय संस्कृति का महाकाव्य है जो धर्म और नैतिकता की शिक्षा देता है।',
            description_en: 'Ramayana is an epic of Indian culture that teaches dharma and morality.',
            price: 349,
            ex_tax: 314,
            category: 'spiritual',
            tags: ['spiritual', 'epic', 'mythology'],
            language: 'both',
            stock: 45,
            cover_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop'
        },
        {
            id: 6,
            slug: 'english-speaking-course',
            title_hi: 'अंग्रेजी बोलना सीखें',
            title_en: 'Learn English Speaking',
            short_hi: '30 दिनों में अंग्रेजी बोलना सीखें',
            short_en: 'Learn English speaking in 30 days',
            description_hi: 'यह पुस्तक हिंदी माध्यम के छात्रों के लिए विशेष रूप से तैयार की गई है।',
            description_en: 'This book is specially designed for Hindi medium students.',
            price: 180,
            ex_tax: 162,
            category: 'education',
            tags: ['english', 'language', 'self-help'],
            language: 'both',
            stock: 70,
            cover_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=600&fit=crop'
        },
        {
            id: 7,
            slug: 'kabir-dohe',
            title_hi: 'कबीर के दोहे',
            title_en: 'Kabir\'s Dohas',
            short_hi: 'संत कबीर की वाणी',
            short_en: 'Words of Saint Kabir',
            description_hi: 'कबीर दास जी के प्रसिद्ध दोहे जो जीवन की सच्चाई बताते हैं।',
            description_en: 'Famous dohas of Kabir Das that tell the truth of life.',
            price: 120,
            ex_tax: 108,
            category: 'spiritual',
            tags: ['poetry', 'spiritual', 'hindi'],
            language: 'hindi',
            stock: 40,
            cover_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop'
        },
        {
            id: 8,
            slug: 'general-knowledge-2024',
            title_hi: 'सामान्य ज्ञान 2024',
            title_en: 'General Knowledge 2024',
            short_hi: 'प्रतियोगी परीक्षाओं के लिए',
            short_en: 'For competitive exams',
            description_hi: 'सभी प्रतियोगी परीक्षाओं के लिए अद्यतन सामान्य ज्ञान।',
            description_en: 'Updated general knowledge for all competitive exams.',
            price: 280,
            ex_tax: 252,
            category: 'education',
            tags: ['competitive', 'gk', 'exams'],
            language: 'both',
            stock: 80,
            cover_url: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=600&fit=crop'
        },
        {
            id: 9,
            slug: 'panchatantra',
            title_hi: 'पंचतंत्र की कहानियां',
            title_en: 'Panchatantra Stories',
            short_hi: 'बच्चों के लिए नैतिक कहानियां',
            short_en: 'Moral stories for children',
            description_hi: 'पंचतंत्र की प्रसिद्ध कहानियां जो बच्चों को जीवन की सीख देती हैं।',
            description_en: 'Famous Panchatantra stories that teach life lessons to children.',
            price: 160,
            ex_tax: 144,
            category: 'children',
            tags: ['children', 'stories', 'moral'],
            language: 'both',
            stock: 55,
            cover_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop'
        },
        {
            id: 10,
            slug: 'indian-history',
            title_hi: 'भारत का इतिहास',
            title_en: 'History of India',
            short_hi: 'प्राचीन से आधुनिक भारत',
            short_en: 'Ancient to modern India',
            description_hi: 'भारत के गौरवशाली इतिहास की संपूर्ण जानकारी।',
            description_en: 'Complete information about India\'s glorious history.',
            price: 320,
            ex_tax: 288,
            category: 'education',
            tags: ['history', 'india', 'reference'],
            language: 'both',
            stock: 42,
            cover_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=600&fit=crop'
        },
        {
            id: 11,
            slug: 'yoga-pradipika',
            title_hi: 'योग प्रदीपिका',
            title_en: 'Yoga Pradipika',
            short_hi: 'योग का संपूर्ण मार्गदर्शन',
            short_en: 'Complete guide to yoga',
            description_hi: 'योग की विभिन्न मुद्राओं और प्राणायाम की विस्तृत जानकारी।',
            description_en: 'Detailed information about various yoga postures and pranayama.',
            price: 240,
            ex_tax: 216,
            category: 'health',
            tags: ['yoga', 'health', 'wellness'],
            language: 'both',
            stock: 38,
            cover_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop'
        },
        {
            id: 12,
            slug: 'mathematics-class12',
            title_hi: 'गणित कक्षा 12',
            title_en: 'Mathematics Class 12',
            short_hi: 'NCERT कक्षा 12 गणित',
            short_en: 'NCERT Class 12 Mathematics',
            description_hi: 'बोर्ड परीक्षा के लिए NCERT की आधिकारिक गणित पुस्तक।',
            description_en: 'Official NCERT mathematics book for board exams.',
            price: 175,
            ex_tax: 158,
            category: 'education',
            tags: ['textbook', 'mathematics', 'ncert', 'class12'],
            language: 'both',
            stock: 90,
            cover_url: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=400&h=600&fit=crop'
        },
        {
            id: 13,
            slug: 'ayurveda-basics',
            title_hi: 'आयुर्वेद के मूल सिद्धांत',
            title_en: 'Basics of Ayurveda',
            short_hi: 'स्वस्थ जीवन का विज्ञान',
            short_en: 'Science of healthy living',
            description_hi: 'आयुर्वेद के मूल सिद्धांतों की सरल व्याख्या।',
            description_en: 'Simple explanation of basic principles of Ayurveda.',
            price: 210,
            ex_tax: 189,
            category: 'health',
            tags: ['ayurveda', 'health', 'traditional'],
            language: 'both',
            stock: 33,
            cover_url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop'
        },
        {
            id: 14,
            slug: 'hindi-kahaniyan',
            title_hi: 'हिंदी कहानियां',
            title_en: 'Hindi Short Stories',
            short_hi: 'प्रसिद्ध लेखकों की कहानियां',
            short_en: 'Stories by famous authors',
            description_hi: 'प्रेमचंद, जयशंकर प्रसाद और अन्य प्रसिद्ध लेखकों की श्रेष्ठ कहानियां।',
            description_en: 'Best stories by Premchand, Jaishankar Prasad and other famous authors.',
            price: 185,
            ex_tax: 167,
            category: 'fiction',
            tags: ['stories', 'hindi', 'classic'],
            language: 'hindi',
            stock: 48,
            cover_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop'
        },
        {
            id: 15,
            slug: 'chanakya-neeti',
            title_hi: 'चाणक्य नीति',
            title_en: 'Chanakya Neeti',
            short_hi: 'जीवन में सफलता के सूत्र',
            short_en: 'Formulas for success in life',
            description_hi: 'आचार्य चाणक्य के प्रसिद्ध सूत्र जो जीवन में सफल होने की कुंजी हैं।',
            description_en: 'Famous sutras of Acharya Chanakya that are the key to success in life.',
            price: 145,
            ex_tax: 131,
            category: 'self-help',
            tags: ['wisdom', 'philosophy', 'self-help'],
            language: 'both',
            stock: 62,
            cover_url: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop'
        }
    ];

    books.forEach(book => {
        db.get('books').push(book).write();
    });

    console.log(`✓ ${books.length} sample books created`);
    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nDefault credentials:');
    console.log('  Admin: username = admin, password = admin123');
    console.log('  Client: email = raj@example.com, password = password123');
}

// Run seed
seed().catch(console.error);
