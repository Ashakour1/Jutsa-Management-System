import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { ALL_PERMISSIONS } from '../constants/permissions.js';

const prisma = new PrismaClient();

function emailToUsername(email) {
    return email
        .toLowerCase()
        .replace(/@/g, '_at_')
        .replace(/[^a-z0-9._-]/gi, '_');
}

async function main() {
    console.log('🌱 Starting database seeding...\n');

    // ── Clean slate ──────────────────────────────────────────────────────────────
    console.log('🧹 Clearing existing data...');
    await prisma.finance.deleteMany();
    await prisma.activity.deleteMany();
    await prisma.candidate.deleteMany();
    await prisma.caawiye.deleteMany();
    await prisma.competitor.deleteMany();
    await prisma.sport.deleteMany();
    await prisma.member.deleteMany();
    await prisma.position.deleteMany();
    await prisma.userRole.deleteMany();
    await prisma.rolePermission.deleteMany();
    await prisma.user.deleteMany();
    await prisma.permission.deleteMany();
    await prisma.role.deleteMany();
    console.log('   Done.\n');

    console.log('🔐 Roles & permissions...');
    for (const name of ALL_PERMISSIONS) {
        await prisma.permission.create({
            data: {
                name,
                module: name.split('.')[0],
                description: `Access: ${name}`,
            },
        });
    }
    const permRecords = await prisma.permission.findMany();
    const permIdByName = Object.fromEntries(permRecords.map((p) => [p.name, p.id]));

    const roleSuper = await prisma.role.create({
        data: { name: 'SUPER_ADMIN', description: 'Full system access' },
    });
    const roleAdmin = await prisma.role.create({
        data: { name: 'ADMIN', description: 'Administrative access' },
    });
    const roleUser = await prisma.role.create({
        data: { name: 'USER', description: 'Standard operator' },
    });

    const allPermIds = ALL_PERMISSIONS.map((n) => ({
        permissionId: permIdByName[n],
    }));

    await prisma.rolePermission.createMany({
        data: allPermIds.map((x) => ({ roleId: roleSuper.id, ...x })),
    });
    await prisma.rolePermission.createMany({
        data: allPermIds.map((x) => ({ roleId: roleAdmin.id, ...x })),
    });

    const userScoped = ALL_PERMISSIONS.filter((n) => !n.startsWith('users.'));
    await prisma.rolePermission.createMany({
        data: userScoped.map((n) => ({
            roleId: roleUser.id,
            permissionId: permIdByName[n],
        })),
    });
    console.log('   ✅ RBAC seeded.\n');

    // ── 1. Users ─────────────────────────────────────────────────────────────────
    console.log('👥 Creating Users...');

    const salt = await bcrypt.genSalt(10);
    const superAdminPass = await bcrypt.hash('SuperAdmin@123', salt);
    const adminPass = await bcrypt.hash('Admin@123', salt);
    const userPass = await bcrypt.hash('User@123', salt);

    const userDefs = [
        ['superadmin@jutsa.org', 'Ismail Mohamed', superAdminPass, roleSuper.id],
        ['admin1@jutsa.org', 'Asad Farah', adminPass, roleAdmin.id],
        ['admin2@jutsa.org', 'Hinda Warsame', adminPass, roleAdmin.id],
        ['user1@jutsa.org', 'Omar Hassan', userPass, roleUser.id],
        ['user2@jutsa.org', 'Faadumo Ali', userPass, roleUser.id],
        ['user3@jutsa.org', 'Abdullahi Nur', userPass, roleUser.id],
        ['user4@jutsa.org', 'Nasra Ibrahim', userPass, roleUser.id],
        ['user5@jutsa.org', 'Yusuf Mohamud', userPass, roleUser.id],
        ['user6@jutsa.org', 'Hodan Jama', userPass, roleUser.id],
        ['user7@jutsa.org', 'Mahad Abdi', userPass, roleUser.id],
        ['user8@jutsa.org', 'Ikran Salah', userPass, roleUser.id],
    ];

    const createdUsers = [];
    for (const [email, name, hash, rid] of userDefs) {
        const user = await prisma.user.create({
            data: {
                email,
                username: emailToUsername(email),
                name,
                passwordHash: hash,
                userRoles: { create: [{ roleId: rid }] },
            },
        });
        createdUsers.push(user);
    }
    console.log(`   ✅ Created ${createdUsers.length} users.\n`);

    // ── 2. Positions ─────────────────────────────────────────────────────────────
    console.log('📋 Creating Positions...');
    const positionDefs = [
        { title: 'President', description: 'Leads the student association and represents it at all official events and meetings.' },
        { title: 'Vice President', description: 'Supports the president and takes over duties in their absence.' },
        { title: 'Secretary', description: 'Manages communications, records meeting minutes, and maintains association records.' },
        { title: 'Treasurer', description: 'Oversees all financial activities, budgets, and expense reports.' },
        { title: 'Events Coordinator', description: 'Plans and executes all association events, workshops, and seminars.' },
        { title: 'PR & Marketing Officer', description: 'Manages social media presence and internal/external communications.' },
        { title: 'IT Lead', description: 'Oversees all technical systems and software used by the association.' },
        { title: 'Sports Captain', description: 'Coordinates all sports-related activities and inter-faculty games.' },
        { title: 'Academic Advisor', description: 'Supports members with academic guidance and tutoring resources.' },
    ];

    const positions = [];
    for (const p of positionDefs) {
        const pos = await prisma.position.create({ data: p });
        positions.push(pos);
    }
    console.log(`   ✅ Created ${positions.length} positions.\n`);

    // ── 3. Members ───────────────────────────────────────────────────────────────
    console.log('🧑‍🎓 Creating Members...');
    const departments = ['Computer Science', 'Information Technology', 'Software Engineering', 'Networking', 'Cybersecurity'];
    const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];

    for (let i = 0; i < 60; i++) {
        const randomPosition = positions[Math.floor(Math.random() * positions.length)];
        await prisma.member.create({
            data: {
                name: faker.person.fullName(),
                address: faker.location.streetAddress() + ', ' + faker.location.city(),
                email: faker.internet.email(),
                semester: faker.helpers.arrayElement(semesters),
                studentId: `JU${faker.string.numeric(7)}`,
                year: faker.helpers.arrayElement(years),
                position_Id: randomPosition.id,
            },
        });
    }
    console.log('   ✅ Created 60 members.\n');

    // ── 4. Finances (linked to real users) ───────────────────────────────────────
    console.log('💰 Creating Finance Records...');
    const financeTypes = ['INCOME', 'EXPENSE'];
    const financeCategories = [
        'Membership Fees', 'Event Sponsorship', 'Equipment Purchase',
        'Printing Costs', 'Server Hosting', 'Refreshments', 'Travel Allowance',
        'IT Day Revenue', 'Sports Fee', 'Donation',
    ];
    const financeTitles = [
        'Annual Membership Collection', 'IT Day Sponsorship', 'Office Supplies',
        'Trophy Purchase', 'Website Renewal', 'Workshop Catering', 'Banner Printing',
        'Faculty Grant', 'Sports Equipment', 'Projector Rental', 'Guest Speaker Fee',
        'T-Shirt Printing', 'Certificate Paper', 'Award Ceremony Venue', 'Photography',
    ];

    for (let i = 0; i < 80; i++) {
        const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
        await prisma.finance.create({
            data: {
                id: faker.string.uuid(),
                userId: randomUser.id,
                title: faker.helpers.arrayElement(financeTitles),
                amount: parseFloat(faker.commerce.price({ min: 20, max: 2000 })),
                type: faker.helpers.arrayElement(financeTypes),
                category: faker.helpers.arrayElement(financeCategories),
                createdAt: faker.date.between({ from: '2024-01-01', to: '2025-12-31' }),
            },
        });
    }
    console.log('   ✅ Created 80 finance records.\n');

    // ── 5. Competitors (IT Day) ──────────────────────────────────────────────────
    console.log('🏆 Creating IT Day Competitors...');
    const competitionTypes = ['Hackathon', 'Coding Challenge', 'UI/UX Design', 'Network Security', 'App Development'];
    const techStacks = [
        'React, Node.js, MongoDB', 'Vue.js, Laravel, MySQL', 'Flutter, Firebase',
        'Python, Django, PostgreSQL', 'Next.js, Prisma, Supabase', 'Angular, Express, Redis',
        'Swift, iOS', 'Kotlin, Android', 'Figma, Adobe XD', 'Cisco Packet Tracer',
    ];
    const skills = ['Frontend Dev', 'Backend Dev', 'Full Stack', 'UI/UX Design', 'Network Administration', 'Cybersecurity', 'Mobile Dev'];

    for (let i = 0; i < 40; i++) {
        await prisma.competitor.create({
            data: {
                name: faker.person.fullName(),
                number: parseInt(faker.string.numeric(6), 10),
                email: faker.internet.email(),
                semester: faker.helpers.arrayElement(semesters),
                className: `CS-${faker.number.int({ min: 101, max: 501 })}`,
                idNumber: `ID${faker.string.numeric(7)}`,
                type: faker.helpers.arrayElement(competitionTypes),
                skill: faker.helpers.arrayElement(skills),
                projectName: faker.company.catchPhrase(),
                technologies: faker.helpers.arrayElement(techStacks),
                status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
            },
        });
    }
    console.log('   ✅ Created 40 competitors.\n');

    // ── 6. Sports ────────────────────────────────────────────────────────────────
    console.log('⚽ Creating Sports Records...');
    const sportDescriptions = [
        'Inter-faculty football tournament round 1', 'Basketball practice session',
        'Volleyball championship qualifier', 'Annual sports day registration',
        'Table tennis elimination round', 'Chess club open tournament',
        'Swimming gala participation', 'Athletics training camp',
    ];

    for (let i = 0; i < 30; i++) {
        await prisma.sport.create({
            data: {
                monitorName: faker.person.fullName(),
                monitorNumber: faker.phone.number({ style: 'international' }),
                className: `Class ${faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E'])}`,
                description: faker.helpers.arrayElement(sportDescriptions),
                amount: parseFloat(faker.commerce.price({ min: 30, max: 500 })),
            },
        });
    }
    console.log('   ✅ Created 30 sports records.\n');

    // ── 7. Caawiye (Support Tickets) ─────────────────────────────────────────────
    console.log('🤝 Creating Caawiye Support Records...');
    const problems = [
        'Unable to access student portal', 'Missing exam results in the system',
        'Academic advisor not responding to emails', 'Library card deactivated unexpectedly',
        'Lab equipment malfunction during class', 'Scholarship application not processing',
        'Timetable conflict between two compulsory courses', 'Wi-Fi not available in Block C',
        'Printer in the computer lab out of paper', 'Final project submission portal closed early',
    ];
    const solutions = [
        'Escalated to IT department — resolved within 24 hours',
        'Contacted registrar office — grades resubmitted',
        'Meeting scheduled with head of department',
        'Library issued a replacement card',
        'Equipment replaced with backup unit',
        'Application resubmitted with correct documents',
        'Student moved to alternative class section',
        'Reported to facilities — technician dispatched',
        'Paper restocked by admin staff',
        'Extension granted by faculty coordinator',
    ];

    for (let i = 0; i < 25; i++) {
        await prisma.caawiye.create({
            data: {
                id: faker.string.uuid(),
                name: faker.person.fullName(),
                number: parseInt(faker.string.numeric(6), 10),
                semester: faker.helpers.arrayElement(semesters),
                className: `CS-${faker.number.int({ min: 101, max: 401 })}`,
                password: 'student123',
                problems: faker.helpers.arrayElement(problems),
                solutions: faker.helpers.arrayElement(solutions),
                status: faker.helpers.arrayElement(['Open', 'Resolved', 'In Progress']),
            },
        });
    }
    console.log('   ✅ Created 25 caawiye records.\n');

    // ── 8. Candidates ────────────────────────────────────────────────────────────
    console.log('🗳️  Creating Election Candidates...');
    const campaignPlans = [
        "I plan to improve the student association's digital presence and create a dedicated app for all members.",
        'My campaign focuses on increasing faculty engagement and ensuring every student voice is heard.',
        'I will work closely with faculty leadership to secure more funding for student activities.',
        'My priority is mental health awareness and creating safe spaces for open discussion.',
        'I aim to introduce a mentorship program pairing seniors with freshmen during orientation.',
        'I will digitize all club documentation and streamline administrative processes.',
        'My focus is securing industry internship partnerships for all CS students.',
        'I plan to organize monthly tech talks with industry professionals.',
    ];

    for (let i = 0; i < 20; i++) {
        await prisma.candidate.create({
            data: {
                studentID: `CD${faker.string.numeric(7)}`,
                name: faker.person.fullName(),
                number: parseInt(faker.string.numeric(6), 10),
                email: faker.internet.email(),
                gpa: faker.number.float({ min: 2.5, max: 4.0, fractionDigits: 2 }),
                semester: faker.helpers.arrayElement(semesters),
                department: faker.helpers.arrayElement(departments),
                className: `CS-${faker.number.int({ min: 101, max: 401 })}`,
                failedCourse: faker.helpers.arrayElement(['None', 'None', 'None', 'Math 101', 'Physics I', 'Programming C++']),
                financeDue: faker.helpers.arrayElement(['No', 'No', 'No', 'Yes - $50', 'Yes - $100']),
                experience: faker.lorem.sentences(2),
                campaignPlan: faker.helpers.arrayElement(campaignPlans),
                status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
            },
        });
    }
    console.log('   ✅ Created 20 candidates.\n');

    // ── 9. Activities (Seminars & Workshops) ─────────────────────────────────────
    console.log('📅 Creating Activities...');
    const activityTitles = [
        'Introduction to Cloud Computing', 'Cybersecurity Awareness Workshop',
        'Machine Learning for Beginners', 'UI/UX Design Masterclass',
        'Entrepreneurship & Innovation Summit', 'Open Source Contribution Sprint',
        'Docker & Kubernetes Hands-On Lab', 'Career Guidance: Tech Industry Panel',
        'Data Science with Python Workshop', 'Competitive Programming Contest Prep',
        'Freelancing & Online Work Seminar', 'Git & GitHub Best Practices',
        'AI Tools for Students', 'Digital Marketing Fundamentals',
        'Database Design Patterns', 'Mobile App Development Bootcamp',
        'Soft Skills for Engineers Workshop', 'Networking Fundamentals Seminar',
    ];
    const speakers = [
        'Dr. Ahmed Shire', 'Eng. Layla Hassan', 'Prof. Mohamed Farah',
        'Ms. Safia Warsame', 'Mr. Abdi Osman', 'Dr. Amina Jama',
        'Eng. Yusuf Ibrahim', 'Mr. Omar Nuur', 'Ms. Hodan Ali',
    ];
    const locations = [
        'Main Auditorium', 'Block A – Room 101', 'Computer Lab 3',
        'Conference Room B', 'Open Air Amphitheatre', 'Block C – Room 204',
        'E-Learning Center', 'Innovation Hub', 'Library Seminar Room',
    ];
    const activityTypes = ['Workshop', 'Seminar', 'Tech Talk', 'Meeting', 'Bootcamp', 'Contest'];

    for (let i = 0; i < 50; i++) {
        await prisma.activity.create({
            data: {
                title: faker.helpers.arrayElement(activityTitles),
                description: faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 })),
                date: faker.date.between({ from: '2024-01-01', to: '2026-06-30' }),
                speaker: faker.helpers.arrayElement(speakers),
                location: faker.helpers.arrayElement(locations),
                type: faker.helpers.arrayElement(activityTypes),
            },
        });
    }
    console.log('   ✅ Created 50 activities.\n');

    // ── Summary ──────────────────────────────────────────────────────────────────
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅  DATABASE SEEDING COMPLETE');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('🔑  LOGIN CREDENTIALS\n');
    console.log('  SUPER ADMIN');
    console.log('  ├─ Email:    superadmin@jutsa.org');
    console.log('  └─ Password: SuperAdmin@123\n');
    console.log('  ADMIN 1');
    console.log('  ├─ Email:    admin1@jutsa.org');
    console.log('  └─ Password: Admin@123\n');
    console.log('  ADMIN 2');
    console.log('  ├─ Email:    admin2@jutsa.org');
    console.log('  └─ Password: Admin@123\n');
    console.log('  USERS (password for all: User@123)');
    for (let i = 1; i <= 8; i++) {
        console.log(`  ├─ user${i}@jutsa.org`);
    }
    console.log('═══════════════════════════════════════════════════════\n');
}

main()
    .catch((e) => {
        console.error('❌ Error during database seeding:');
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
