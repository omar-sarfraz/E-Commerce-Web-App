export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "image",
            title: "Image",
            type: "array",
            of: [{ type: "image" }],
            options: {
                hotspot: true
            }
        },
        {
            name: "name",
            title: "Name",
            type: "string"
        },
        {
            name: 'slug',
            title: "Slug",
            type: "slug",
            options: {
                source: 'name',
                maxLength: 90
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'details',
            title: 'Details',
            type: "string"
        },
        {
            name: 'category',
            title: "Category",
            type: "string",
            validation: Rule => Rule.required().custom(category => {
                switch (category) {
                    case 'headphones':
                        return true
                    case 'earphones':
                        return true
                    case 'speakers':
                        return true
                    case 'mobiles':
                        return true
                    case 'iphones':
                        return true
                    default:
                        return 'The category can only be headphones, earphones, speakers, mobiles and iphones.'
                }
            })
        }, {
            name: 'company',
            title: "Company",
            type: "string",
            validation: Rule => Rule.required().custom(company => {
                switch (company) {
                    case 'apple':
                        return true
                    case 'samsung':
                        return true
                    case 'xiaomi':
                        return true
                    default:
                        return 'The company can only be apple, samsung and xiaomi.'
                }
            })
        }
    ]
}