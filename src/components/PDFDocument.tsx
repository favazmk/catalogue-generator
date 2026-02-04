import { Page, Text, View, Document, StyleSheet, Image, Link } from '@react-pdf/renderer';
import type { Product } from '../context/CatalogueContext';

// Register fonts if needed, but standard defaults work for "Clean".
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 40,
    },
    logoHeader: {
        position: 'absolute',
        top: 20,
        left: 40,
        width: 60,
        height: 60,
    },
    logo: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    productContainer: {
        marginBottom: 20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 400, // Fixed height for consistency
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        objectFit: 'contain',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    detailsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    modelName: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        textAlign: 'center',
    },
    separator: {
        width: 60,
        height: 2,
        backgroundColor: '#000000',
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
        width: '100%',
        justifyContent: 'center',
    },
    label: {
        fontSize: 10,
        color: '#666666',
        marginRight: 5,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 10,
        color: '#000000',
    },
    description: {
        fontSize: 10,
        color: '#444444',
        textAlign: 'center',
        marginTop: 5,
        maxWidth: '80%',
        lineHeight: 1.4,
    },
    priceBox: {
        marginTop: 20,
        border: '1pt solid #000000',
        padding: '8 20',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    whatsappButton: {
        marginTop: 15,
        backgroundColor: '#25D366',
        padding: '12 30',
        borderRadius: 8,
        textDecoration: 'none',
    },
    whatsappText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        textDecoration: 'none',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        fontSize: 8,
        color: '#999999',
        textAlign: 'center',
        borderTop: '1pt solid #EEEEEE',
        paddingTop: 10,
    }
});

interface PDFCatalogueProps {
    products: Product[];
}

function createWhatsAppLink(product: Product): string {
    const message = `Hi, I'm interested in ${product.name}${product.price ? ` (Rs. ${product.price})` : ''}. Could you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/919061926060?text=${encodedMessage}`;
}

export function PDFCatalogue({ products }: PDFCatalogueProps) {
    return (
        <Document>
            {products.map((product) => (
                <Page key={product.id} size="A4" style={styles.page}>
                    {/* Company Logo Header */}
                    <View style={styles.logoHeader}>
                        <Image src="/company-logo.png" style={styles.logo} />
                    </View>

                    <View style={styles.productContainer}>

                        {/* Image Center */}
                        <View style={styles.imageContainer}>
                            {/* @react-pdf/renderer Image requires a URL or buffer */}
                            <Image
                                src={product.imageFile ? URL.createObjectURL(product.imageFile) : ''}
                                style={styles.image}
                            />
                        </View>

                        {/* Details */}
                        <View style={styles.detailsContainer}>
                            <Text style={styles.modelName}>{product.name}</Text>

                            <View style={styles.separator} />

                            {(product.material) && (
                                <View style={styles.row}>
                                    <Text style={styles.label}>MATERIAL:</Text>
                                    <Text style={styles.value}>{product.material}</Text>
                                </View>
                            )}

                            {(product.description) && (
                                <Text style={styles.description}>{product.description}</Text>
                            )}

                            {(product.price) && (
                                <View style={styles.priceBox}>
                                    <Text style={styles.price}>Rs. {product.price}</Text>
                                </View>
                            )}

                            {/* WhatsApp Enquiry Button */}
                            <Link src={createWhatsAppLink(product)} style={styles.whatsappButton}>
                                <Text style={styles.whatsappText}>WhatsApp Enquiry</Text>
                            </Link>
                        </View>

                    </View>
                </Page>
            ))}
        </Document>
    );
}
