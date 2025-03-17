//--web true
//--kind nodejs:default

function main(args) {
    let message = [];
    let errors = [];

    // validate the name
    if (args.name) {
        message.push("name: " + args.name)
    } else {
        errors.push("No name provided")
    }

    // validate the email
    var re = /\S+@\S+\.\S+/;
    if (args.email && re.test(args.email)) {
        message.push("email: " + args.email);
    } else {
        errors.push("Email missing or incorrect.");
    }

    // validate the phone
    if (args.phone && args.phone.match(/\d/g).length >= 10) {
        message.push("phone: " + args.phone);
    } else {
        errors.push("Phone number missing or incorrect.");
    }

    // validate the message
    if (args.message) {
        message.push("message:" + args.message);
    }

    // return the result
    if (errors.length) {
        var errs = "<ul><li>" + errors.join("</li><li>") + "</li></ul>";
        return {
            body: "<h1>Errors!</h1>" +
                errs + '<br><a href="javascript:window.history.back()">Back</a>'
        };
    } else {
        var data = "<pre>" + message.join("\n") + "</pre>";
        return {
            body: "<h1>Thank you!</h1>" + data,
            name: args.name,
            email: args.email,
            phone: args.phone,
            message: args.message
        };
    }
}
