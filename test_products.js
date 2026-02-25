
const { getProductById } = require('./services/products');

async function test() {
    const products = ['n1', 'r1', 'b1'];
    for (const id of products) {
        const product = await getProductById(id);
        console.log(`Product ${id}:`, product ? 'Found' : 'Not Found');
        if (product) {
            console.log(`- Image: ${product.image || product.image_url}`);
        }
    }
}

test();
