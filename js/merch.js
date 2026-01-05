
// Product Data
const products = [
  {
    id: 'collar-girasoles',
    name: 'Pendientes Girasoles',
    category: 'joyas',
    categoryLabel: 'JOYAS',
    price: 145.00,
    description: 'Elegante collar inspirado en los icónicos girasoles de Van Gogh.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:6cb1b7d0-3858-4811-bba4-df9317a0b626/636925-2.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'pendientes-noche',
    name: 'Pendientes Noche Estrellada',
    category: 'joyas',
    categoryLabel: 'JOYAS',
    price: 89.00,
    description: 'Pendientes con el icónico diseño de La Noche Estrellada.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:45de3d15-c10d-4c80-a0cc-cd1ad00ac9c4/636987-1.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'pulsera-almendro',
    name: 'Pulsera Almendro en Flor',
    category: 'joyas',
    categoryLabel: 'JOYAS',
    price: 75.00,
    description: 'Delicada pulsera con flores de almendro en plata.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:6ae8c27d-dc86-4a09-984c-f909954a6d34/paintthestars-1x1.jpg?scaleType=1&width=2000&height=2000&color=ffffffp',
    large: false
  },
  {
    id: 'anillo-iris',
    name: 'Anillo Lirios',
    category: 'joyas',
    categoryLabel: 'JOYAS',
    price: 165.00,
    description: 'Anillo con diseño de lirios en oro y esmalte.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:9a6ca8bb-5340-426e-abeb-9ad4170dfc22/681963-3.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'bufanda-noche',
    name: 'Bufanda Almendro en Flor',
    category: 'moda',
    categoryLabel: 'MODA',
    price: 45.00,
    description: 'Bufanda de seda con estampado de Almendro en Flor.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:4ed428f7-022b-4599-a836-f77bfe23c507/685909-5.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: true
  },
  {
    id: 'camiseta-girasoles',
    name: 'Camiseta Van Gogh',
    category: 'moda',
    categoryLabel: 'MODA',
    price: 30.00,
    description: 'Camiseta de algodón orgánico con estampado artístico.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:288fba88-d593-4431-9d51-ce31c1843fe3/677911-2.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'bolso-arte',
    name: 'Bolso Tote Artístico',
    category: 'moda',
    categoryLabel: 'MODA',
    price: 25.00,
    description: 'Bolso tote con collage de obras de Van Gogh.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:0e2fa573-8630-4367-8d13-e789a9452794/606003-4.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'panuelo-almendro',
    name: 'Pañuelo Almendro',
    category: 'moda',
    categoryLabel: 'MODA',
    price: 35.00,
    description: 'Pañuelo de seda con motivo de Almendro en Flor.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:eba3d9dd-7081-431b-91b0-cc0a6cd1e6b8/633481-2.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'cojin-girasoles',
    name: 'Cojín Girasoles',
    category: 'casa',
    categoryLabel: 'PARA CASA',
    price: 40.00,
    description: 'Cojín decorativo con estampado de girasoles.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:91cc7cdc-26b2-435d-a3dd-bb4070bf751d/635577-3.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'manta-noche',
    name: 'Manta de Jacquard',
    category: 'casa',
    categoryLabel: 'PARA CASA',
    price: 299.00,
    description: 'Manta de jacquard de lujo es mucho más que una simple prenda.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:dda7bd43-b225-47a3-9331-8796504a84b0/636345-3.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'posavasos-set',
    name: 'Set Posavasos Arte',
    category: 'casa',
    categoryLabel: 'PARA CASA',
    price: 20.00,
    description: '¡Con estos posavasos especiales aportará un acento alegre a su interior!',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:2aad208e-8541-49d3-a0f1-38f75a925309/606461-2.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'taza-cafe',
    name: 'Taza Café',
    category: 'casa',
    categoryLabel: 'PARA CASA',
    price: 15.00,
    description: 'Taza de porcelana.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:ccc16653-0976-459c-81ca-8b801cacaca6/691290-2.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'figura-vincent',
    name: 'Figura Vincent',
    category: 'deco',
    categoryLabel: 'DECO',
    price: 60.00,
    description: 'Figura decorativa del artista en madera.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:89582007-696e-4117-a383-10dcef80ff6d/637175-2.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'lampara-arte',
    name: 'IXXI Van Gogh',
    category: 'deco',
    categoryLabel: 'DECO',
    price: 130.00,
    description: 'IXXI Van Gogh, Almendro en flor 160 x 120.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:4e2e1773-dd5f-4b5f-ae32-fa9728e8dc11/290103-1.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'reloj-girasoles',
    name: 'Cubierta de jarrón Los girasoles',
    category: 'deco',
    categoryLabel: 'DECO',
    price: 65.00,
    description: 'Cubierta de jarrón de papel, Los girasoles',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:df37cc76-d850-4939-9974-3e72b3d7de79/vaas-697568.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: true
  },
  {
    id: 'lienzo-noche',
    name: 'Lienzo XL Girasoles',
    category: 'arte',
    categoryLabel: 'LIENZOS Y LÁMINAS',
    price: 179.00,
    description: 'Reproducción a tamaño real impresa en lienzo de la más alta calidad. Se entrega enrollada en un tubo y necesita ser tensada por un enmarcador.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:2da725a6-e074-43cd-909d-ed67bf47efdb/206517-2.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'lamina-girasoles',
    name: 'Lienzo XL Almendro',
    category: 'arte',
    categoryLabel: 'LIENZOS Y LÁMINAS',
    price: 179.00,
    description: 'Reproducción a tamaño real impresa en lienzo de la más alta calidad. Se entrega enrollada en un tubo y necesita ser tensada por un enmarcador.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:2254320e-b2b0-45fe-9aff-e0540286de24/206555-2.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'poster-almendro',
    name: 'Lienzo L Almendro',
    category: 'arte',
    categoryLabel: 'LIENZOS Y LÁMINAS',
    price: 109.00,
    description: 'En lino de la más fina calidad',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:04a0ba50-6970-4b93-9266-454d76ce30cb/206838-4.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  },
  {
    id: 'marco-dorado',
    name: 'Azulejo cerámico en marco de madera, Girasoles',
    category: 'arte',
    categoryLabel: 'LIENZOS Y LÁMINAS',
    price: 50.00,
    description: 'Hecho a mano en nuestro taller de Ámsterdam, cuidadosamente envuelto en papel seda amarillo y negro y presentado en una caja hecha a medida. Incluye un certificado con el sello dorado de Dutch Art Reproductions. Un regalo que da gusto abrir, para otra persona o para ti mismo.',
    image: 'https://www.vangogh.shop/l/es/library/download/urn:uuid:3a6b2c35-e508-407d-a88c-af5e83dd7d14/636222+3.jpg?scaleType=1&width=2000&height=2000&color=ffffff',
    large: false
  }
];