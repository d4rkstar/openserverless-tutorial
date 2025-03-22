// notify.js
//--param NOTIFICATION_URL $NOTIFICATION_URL

function main(args) {
    const { name, email, phone, message } = args;

    const subject = `New contact request from Apache OpenServerless`;
    const payload = {
        subject,
        name,
        email,
        phone,
        message,
    };

    console.log("Built message", payload);

    return fetch(args.NOTIFICATION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (!response.ok) {
                console.log("Error sending message. Status code:", response.status);
            } else {
                console.log("Message sent successfully");
            }
            return {
                body: args.body,
            };
        })
        .catch(error => {
            console.log("Error sending message", error);
            return {
                body: error,
            };
        });
}
