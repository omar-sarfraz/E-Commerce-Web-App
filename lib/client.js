import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: '30sq6gu1',
    dataset: 'production',
    apiVersion: '2022-09-24',
    useCdn: true,
    token: process.env.SANITY_TOKEN
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)