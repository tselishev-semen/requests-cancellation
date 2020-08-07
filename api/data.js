export async function handler(events) {
   // slow down backend, just to simulate cancellation
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        statusCode: 200,
        body:  JSON.stringify(events.queryStringParameters)
    };
}