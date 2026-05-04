export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const MENU_ITEMS: Product[] = [
  {
    id: '9',
    name: 'Aguachile de Medallón de Atún',
    description: 'Medallones de atún rojo en aguachile verde de chile serrano, limón y aceite de oliva. Aguacate y ajonjolí tostado.',
    price: 285,
    category: 'Aguachiles',
    image: '/images/atun.png'
  },
  {
    id: '1',
    name: 'Aguachile Verde',
    description: 'Camarón fresco marinado en limón, chile serrano y cilantro. Acompañado de cebolla morada y pepino.',
    price: 185,
    category: 'Aguachiles',
    image: '/images/hero.png'
  },
  {
    id: '2',
    name: 'Aguachile Negro Chiltepín',
    description: 'La especialidad de la casa. Camarón en salsa negra de chiltepín tatemado. Sabor intenso y ahumado.',
    price: 195,
    category: 'Aguachiles',
    image: '/images/hero.png'
  },
  {
    id: '3',
    name: 'Tostada de Ceviche de Sierra',
    description: 'Pescado sierra molido con zanahoria, cebolla y un toque de orégano.',
    price: 65,
    category: 'Tostadas',
    image: '/images/platter.png'
  },
  {
    id: '4',
    name: 'Tostada Chiltepín Especial',
    description: 'Cama de ceviche de camarón, pulpo, callo de hacha y nuestra salsa secreta.',
    price: 120,
    category: 'Tostadas',
    image: '/images/platter.png'
  },
  {
    id: '5',
    name: 'Ceviche Mixto',
    description: 'Camarón, pulpo y pescado marinados al momento con limón y sal de mar.',
    price: 175,
    category: 'Ceviches',
    image: '/images/platter.png'
  },
  {
    id: '6',
    name: 'Torre de Mariscos',
    description: 'Impresionante torre con camarón cocido, crudo, pulpo, callo y aguacate. Bañada en salsa negra.',
    price: 320,
    category: 'Especialidades',
    image: '/images/platter.png'
  },
  {
    id: '12',
    name: 'Coca-Cola 355ml',
    description: 'Refresco de lata original.',
    price: 30,
    category: 'Bebidas',
    image: '/images/coca.png'
  },
  {
    id: '13',
    name: 'Agua de Jamaica 1L',
    description: 'Refrescante agua natural de jamaica preparada al momento.',
    price: 30,
    category: 'Bebidas',
    image: '/images/jamaica.png'
  },
  {
    id: '14',
    name: 'Preparado de Michelada 1L',
    description: 'Nuestra mezcla especial de salsas negras, limón y especias. (No incluye cerveza)',
    price: 35,
    category: 'Bebidas',
    image: '/images/michelada_mix.png'
  }
];

export const CATEGORIES = ['Todos', 'Aguachiles', 'Tostadas', 'Ceviches', 'Especialidades', 'Bebidas'];
