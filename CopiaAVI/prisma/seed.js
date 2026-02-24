const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed...');

    // ── ADMIN ──────────────────────────────────────────────
    const passwordAdmin = await bcrypt.hash('admin123', 10);

    const admin = await prisma.aDMIN.upsert({
        where: { idADMIN: 1 },
        update: {},
        create: {
            idADMIN: 1,
            nombre: 'Administrador Principal',
            email: 'admin@avi.com',
            password: passwordAdmin,
            activo: true
        }
    });
    console.log('✅ Admin creado:', admin.email);

    // ── ASPIRANTE ──────────────────────────────────────────
    const passwordAsp = await bcrypt.hash('aspirante123', 10);

    const aspirante = await prisma.aSPIRANTE.upsert({
        where: { idASPIRANTE: 1001 },
        update: {},
        create: {
            idASPIRANTE: 1001,
            nombre_completo: 'María García López',
            fechaNacimiento: new Date('2000-05-15'),
            email: 'maria@correo.com',
            telefono: '3001234567',
            barrio: 'El Centro',
            direccion: 'Calle 10 # 5-20',
            ocupacion: 'Colegio',
            institucion: 'Colegio San José',
            password: passwordAsp,
            activo: true
        }
    });
    console.log('✅ Aspirante creado:', aspirante.email);

    console.log('\n🎉 Seed completado exitosamente!');
    console.log('─────────────────────────────────────');
    console.log('👤 Admin    → id: 1    | email: admin@avi.com    | pass: admin123');
    console.log('👤 Aspirante→ id: 1001 | email: maria@correo.com | pass: aspirante123');
    console.log('─────────────────────────────────────');
}

main()
    .catch((e) => {
        console.error('❌ Error en seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
