import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: 'Aguachile de Medallón de Atún',
      description: 'Medallones de atún rojo en aguachile verde de chile serrano, limón y aceite de oliva. Aguacate y ajonjolí tostado.',
      price: 285,
      category: 'Aguachiles',
      image: '/images/atun.png',
      status: 'active'
    },
    {
      name: 'Aguachile Verde',
      description: 'Camarón fresco marinado en limón, chile serrano y cilantro. Acompañado de cebolla morada y pepino.',
      price: 185,
      category: 'Aguachiles',
      image: '/images/hero.png',
      status: 'active'
    },
    {
      name: 'Aguachile Negro Chiltepín',
      description: 'La especialidad de la casa. Camarón en salsa negra de chiltepín tatemado. Sabor intenso y ahumado.',
      price: 195,
      category: 'Aguachiles',
      image: '/images/hero.png',
      status: 'active'
    },
    {
      name: 'Tostada de Ceviche de Sierra',
      description: 'Pescado sierra molido con zanahoria, cebolla y un toque de orégano.',
      price: 65,
      category: 'Tostadas',
      image: '/images/platter.png',
      status: 'active'
    },
    {
      name: 'Tostada Chiltepín Especial',
      description: 'Cama de ceviche de camarón, pulpo, callo de hacha y nuestra salsa secreta.',
      price: 120,
      category: 'Tostadas',
      image: '/images/platter.png',
      status: 'active'
    },
    {
      name: 'Ceviche Mixto',
      description: 'Camarón, pulpo y pescado marinados al momento con limón y sal de mar.',
      price: 175,
      category: 'Ceviches',
      image: '/images/platter.png',
      status: 'active'
    },
    {
      name: 'Torre de Mariscos',
      description: 'Impresionante torre con camarón cocido, crudo, pulpo, callo y aguacate. Bañada en salsa negra.',
      price: 320,
      category: 'Especialidades',
      image: '/images/platter.png',
      status: 'active'
    },
    {
      name: 'Coca-Cola 355ml',
      description: 'Refresco de lata original.',
      price: 30,
      category: 'Bebidas',
      image: '/images/coca.png',
      status: 'active'
    },
    {
      name: 'Agua de Jamaica 1L',
      description: 'Refrescante agua natural de jamaica preparada al momento.',
      price: 30,
      category: 'Bebidas',
      image: '/images/jamaica.png',
      status: 'active'
    },
    {
      name: 'Preparado de Michelada 1L',
      description: 'Nuestra mezcla especial de salsas negras, limón y especias. (No incluye cerveza)',
      price: 35,
      category: 'Bebidas',
      image: '/images/michelada_mix.png',
      status: 'active'
    }
  ];

  console.log('Seeding products...');
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
