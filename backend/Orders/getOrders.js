exports.handler = async () => {
    const orders = [
        { id: 1, name: "Order #123", status: "Processed" },
        { id: 2, name: "Order #456", status: "Shipped" },
        { id: 3, name: "Order #789", status: "Delivered" }
    ];

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(orders)
    };
};