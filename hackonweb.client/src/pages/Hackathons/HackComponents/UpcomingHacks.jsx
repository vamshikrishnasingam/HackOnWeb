import React from 'react';

function UpcomingHacks() {
    const products = [
        {
            id: 1,
            name: 'Webothan',
            href: '#',
            price: '$48',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },
        {
            id: 2,
            name: 'VJ HACK',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 3,
            name: 'Kruthomedth',
            href: '#',
            price: '$89',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 4,
            name: 'TeamSprint',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        {
            id: 5,
            name: 'Webothan',
            href: '#',
            price: '$48',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
            imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        },  
        {
            id: 6,
            name: 'VJ HACK',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
            imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
        },
        {
            id: 7,
            name: 'Kruthomedth',
            href: '#',
            price: '$89',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
            imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        },
        {
            id: 8,
            name: 'TeamSprint',
            href: '#',
            price: '$35',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        },
        // More products...
    ]
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <a key={product.id} href={product.href} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                            <h3 className="mt-4 text-sm text-gray-700">{product.imageAlt}</h3>
                            <div className="d-flex ms-auto m-5">
                                <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Details
                                </button>
                                <button
                                    type="button"
                                    className=" ml-12 text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Register
                                </button>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UpcomingHacks;