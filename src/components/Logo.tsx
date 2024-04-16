export default (id: string) => {
    //const id = Math.random().toString().slice(2)
    return `<svg xmlns="http://www.w3.org/2000/svg" width="108" height="108"><defs><linearGradient id="${id}"><stop offset="0" stop-color="#006838"/><stop offset="1" stop-color="#32de85"/></linearGradient></defs><path xmlns="http://www.w3.org/2000/svg" fill="url(#${id})" d="M21.667 73.809V33.867l28.33-16.188 28.337 16.188V66.13L49.997 82.321 35 73.75V41.604l14.997-8.57L65 41.604v16.788l-15.003 8.571-1.663-.95v-16.67l8.382-4.792-6.719-3.838-8.33 4.763V69.88l8.33 4.762 21.67-12.383V37.737l-21.67-12.379-21.663 12.379v39.88L49.997 90 85 70V30L49.997 10 15 30v40z" transform="translate(-8.75 -7.5)scale(1.25)"/></svg>`;
};
