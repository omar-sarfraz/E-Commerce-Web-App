export default {
    name: 'banner',
    title: 'Banner',
    type: 'document',
    fields: [
        {
            name: "image",
            title: "Image",
            type: "array",
            of: [{ type: "image" }],
            options: {
                hotspot: true
            }
        }, {
            name: 'slug',
            title: "Slug",
            type: "slug",
            options: {
                source: 'productName',
                maxLength: 90
            }
        }, {
            name: 'productName',
            title: 'Product Name',
            type: 'string',
        },
        {
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
        },
        {
            name: 'bigTitle',
            title: 'Big Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        }
    ],
};